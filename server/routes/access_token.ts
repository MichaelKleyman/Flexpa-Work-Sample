import express, { Request, Response, Router, NextFunction } from "express";

const router: Router = express.Router();

async function fetchAgain(accessToken: string) {
  const request = await fetch(
    `${process.env.FLEXPA_PUBLIC_API_BASE_URL}/fhir/ExplanationOfBenefit`,
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
        "x-flexpa-raw": "0",
      },
    }
  );
  return request.json();
}

//POST request for the access token
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { public_token } = req.body;

    const request = await fetch(
      `${process.env.FLEXPA_PUBLIC_API_BASE_URL}/link/exchange`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          public_token,
          secret_key: process.env.FLEXPA_API_SECRET_KEY,
        }),
      }
    );

    const { access_token: accessToken, expires_in: expiresIn } =
      await request.json();

    const requestTwo = await fetch(
      `${process.env.FLEXPA_PUBLIC_API_BASE_URL}/link/introspect`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { jti, iat, sub, exp, endpoint } = await requestTwo.json();

    let searchResponse = await fetchAgain(accessToken);

    while (searchResponse.resourceType === "OperationOutcome") {
      searchResponse = await fetchAgain(accessToken);
    }
    
    if (searchResponse) {
      res.send({ searchResponse });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error with exchange: ${error}`);
  }
});

export default router;
