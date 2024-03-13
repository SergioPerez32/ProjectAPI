// Dependencies
import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import crypto from 'crypto';


// Express and app setup
const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(bodyParser.json());


// Database
const storage: Map<string, { message: string }> = new Map();


// Functions
function generateSecretKey():string {
    return crypto.randomBytes(8).toString('hex');
}


// Endpoints
app.post('/secrets', (req: Request, res:Response) => {
    const { message }:{message:string} = req.body;
    const secretKey:string = generateSecretKey();
    storage.set(secretKey, { message });
    const urlForSecret:string = `http://localhost:3000/secrets/`+secretKey;//no estatico config/setting file
    res.status(201).json({ secretKey, urlForSecret});
});

app.get('/secrets/:secretKey', (req, res) => {
  const { secretKey }:{secretKey:string} = req.params;
  const secret:{ message: string } | undefined = storage.get(secretKey);
  console.log(secret)
  console.log(typeof(secret))
  if (!secret) {
    res.status(404).json({ error: 'Secret not found' });
} else {
    storage.delete(secretKey);
    res.json(secret);
}
});


// Launching express app
app.listen(PORT, () => {
  console.log(`Server is running on port `+PORT);
});