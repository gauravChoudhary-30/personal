const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();
const connectDB = require('./config/db');
const routes = require('./routes/index')
const port = 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to Database
connectDB();

//Mount the routes
app.use("/", routes);

// Root URL
app.get('/', (req, res) => {
  res.send('Hello World! From Backend');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});