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
        console.log("Error fetching the access token: ", error);
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
            {resource?.entry?.[0].resource.identifier?.[0].system ===
            "https://developer.cigna.com" ? (
              <div>
                {resource?.entry?.map((elem: any, i: number) => (
                  <div key={i} className='resource'>
                    <p className='resourceType'>{elem.resource.resourceType}</p>
                    <p>
                      <span className='label'>Insurance: </span>Cigna
                    </p>
                    {elem.resource.billablePeriod && (
                      <div>
                        <label className='label'>Billable Period:</label>
                        <p>
                          <span>Start: </span>
                          {elem.resource.billablePeriod.start}
                        </p>
                        <p>
                          <span>End: </span>
                          {elem.resource.billablePeriod.end}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              resource?.entry?.map((elem: any, i: number) => (
                <div key={i} className='resource'>
                  <p className='resourceType'>{elem.resource.resourceType}</p>
                  <p>
                    <span className='label'>Insurance:</span>{" "}
                    {elem.resource.insurer?.display
                      ? elem.resource.insurer?.display
                      : "Insurance name not found"}
                  </p>
                  <p>
                    <span className='label'>Provider: </span>
                    {elem.resource.provider.display
                      ? elem.resource.provider.display
                      : "Provider name not found"}
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
                      {elem.resource.total ? (
                        elem.resource.total?.map(
                          (innerElem: any, j: number) => (
                            <li key={j}>
                              {innerElem.amount.value}{" "}
                              {innerElem.amount.currency}
                            </li>
                          )
                        )
                      ) : (
                        <p>No total spending found</p>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
