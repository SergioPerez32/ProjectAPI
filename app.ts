// Dependencies
import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { SecretService } from './application/secretsService';
import { EncodeService } from './infrastructure/encodeService';
import { Database } from './infrastructure/database';
require('dotenv').config()


// Express and app setup
export const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(bodyParser.json());

// Services
const encodeService = new EncodeService();
const database = new Database();
const secretsService = new SecretService(encodeService, database);
database.addSecret('mockedSecretKey', 'Test message')

// Endpoints
app.post('/secrets', (req: Request, res:Response) => {
  const { message }:{message:string} = req.body;
  const secretKey = secretsService.saveSecret(message)
  res.status(201).json({secretKey});
});

app.get('/secrets/:secretKey', (req, res) => {
  const { secretKey }:{secretKey:string} = req.params;
  const response = secretsService.getSecret(secretKey)
  res.status(response.status).json(response.message)
});


// Launching express app
app.listen(PORT, () => {
  console.log(`Server is running on port `+PORT);
});