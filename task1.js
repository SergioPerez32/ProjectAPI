//Dependencies
const bodyParser = require('body-parser');
const express = require('express');


//Express and app setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

//Database
const storage = {}


//Functions
function generateSecretKey() {
    return Math.floor(Math.random() * 1000000);
}


//Endpoints
app.post('/secrets', (req, res) => {
    const { message } = req.body;
    const secretKey = generateSecretKey();
    storage[secretKey] = { message };
    const urlForSecret = `http://localhost:3000/secrets/`+secretKey ;
    res.status(201).json({ secretKey, urlForSecret});
});

app.get('/secrets/:secretKey', (req, res) => {
  const { secretKey } = req.params;
  const secret = storage[secretKey];
  if (!secret) {
    return res.status(404).json({ error: 'Secret not found' });
  }
  delete storage[secretKey];
  res.json(secret);
});

//Launching express app
app.listen(PORT, () => {
  console.log(`Server is running on port `+PORT);
});