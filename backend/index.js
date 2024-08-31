const express = require('express');
const cors = require('cors');
require("dotenv").config();
const connectDB = require('./db');

const port = 8080;

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
// app.use("/", routes);

app.get('/', (req, res) => {
    res.send('Hello World! From Backend');
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});