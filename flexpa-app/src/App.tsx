/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";
import { Bundle } from "fhir";

function App() {
  const [resource, setResource] = useState<Bundle | null>();
  const [isLoading, setLoading] = useState<boolean>(false);

  FlexpaLink.create({
    publishableKey: import.meta.env.VITE_FLEXPA_PUBLISHABLE_KEY,
    onSuccess: async (publicToken: string) => {
      let x!: Response;
      try {
        setLoading(true);
        setResource(null);
        x = await fetch("http://localhost:3001", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            public_token: publicToken,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      const { searchResponse } = await x.json();
      setResource(searchResponse);
      setLoading(false);
    },
  });

  return (
    <>
      <button onClick={() => FlexpaLink.open()}>
        Connect your health data
      </button>

      <div className={`${!isLoading ? "hidden" : "visible"}`}>
        <p>Requesting ExplanationOfBenefit Resource from payer test server</p>
        <span className='loader'></span>
      </div>

      {resource && (
        <div className='container'>
          <h2>Information has been successfully fetched</h2>
          <div className='resources'>
            {resource?.entry?.map((elem: any, i: number) => (
              <div key={i} className='resource'>
                <p>
                  <span className='label'>Insurance:</span>{" "}
                  {elem.resource.insurer?.display}
                </p>
                <p>
                  <span className='label'>Provider: </span>
                  {elem.resource.provider.display}
                </p>
                {elem.resource.prescription && (
                  <p>
                    <span className='label'>Prescription: </span>
                    {elem.resource.prescription.display}
                  </p>
                )}
                <div>
                  <span className='label'>Total Spending: </span>
                  <ul>
                    {elem.resource.total?.map((innerElem: any, j: number) => (
                      <li key={j}>
                        {innerElem.amount.value} {innerElem.amount.currency}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
