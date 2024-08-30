const express = require('express');
const cors = require('cors');

const port = 8080;

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/", routes);

app.get('/', (req, res) => {
    res.send('Hello World! From Backend');
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});