
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const UserRouter = require("./pages/api/auth/UserRouter");

app.use(cors());

const bodyParser = require('express').json();
app.use(express.json());

app.use('/user', UserRouter)

app.listen(port, () => console.log(`Listening on port ${port}`));