// import express, { Express } from "express";
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import accessTokenRouter from './routes/access_token'


// Application Setup
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/', accessTokenRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
