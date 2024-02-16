import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import submitFormHandler from './src/api/submitForm.js';

import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const port = 5000;

export const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

app.use(express.json());

app.use(cors());
app.use(express.json());

app.get('/pingDatabase', async (req, res) => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    res.status(200).send("Successfully connected to MongoDB.");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error connecting to the database.");
  } finally {
    await client.close();
  }
});


app.post('/submitForm', submitFormHandler);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`MongoDB URI: ${uri}`)
});