//Dependencies
const express = require('express');


//Express setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

//Database
const storage = {}


//Launching express app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});