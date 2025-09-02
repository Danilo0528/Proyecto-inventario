const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { getConnection } = require('./db/connect-mongo-db.js'); 

const app = express()
const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json());

getConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})