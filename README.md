# Flexpa-Work-Sample

Your task
Flexpa helps healthcare application developers get health insurance information from patients.

Flexpa Link is the frontend component used to get authorization from a patient.

Flexpa API is a JSON API used to retrieve data.

Your task is to build a simple web app using Flexpa Link and Flexpa API.

To complete this task:

Follow the Flexpa Link guide to add Flexpa Link to a React frontend to start the authorization
Exchange the public_token for an access_token in a backend to complete the authorization
Use the Flexpa API with that access_token to request an ExplanationOfBenefit resource from a payer test server (you can find test credentials in our test mode guide)
Make sure to opt-in to our improved API experience with the X-Flexpa-Raw header.
Create a component to display some information from the ExplanationOfBenefit in the frontend
Publish your source to a public repository (e.g. on Github) and email the link to hiring@flexpa.com
For inspiration, and in case you get stuck, you can find a complete working example application in our Quickstart guide. We strongly recommend not just submitting a fork of this repository or a PR to that repo.

## Installation
Open two terminals

Change directories into felxpa-app and server in each terminal

```bash
cd flexpa-app
```
```bash
cd server
```

Run npm install in each directory

```bash
npm install
```

Run npm run dev in each directory

```bash
npm run dev
```

## Side information

Environment variables here are public and will be available in the cloned repo for ease of use to check if the sample works.
If environment variables aren't working, going into the Flexpa portal and clicking `rotate key` should provide new keys, and those can be put into the env files for the frontend and the backend.


