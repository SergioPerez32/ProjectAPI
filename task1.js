//Dependencies
const bodyParser = require('body-parser');
const express = require('express');


//Express setup
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
    const secret = { message };
    storage[secretKey] = secret;
    const urlForSecret = `http://localhost:3000/secrets/`+secretKey ;
    res.status(201).json({ secretKey, urlForSecret});
  });


//Launching express app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});