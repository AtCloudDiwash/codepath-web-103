import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import avengerRouter from './routes/avengers.js'
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

dotenv.config();


const PORT = process.env.PORT || 3001;

app.use('/public', express.static('../client/public'));
app.use('/scripts', express.static('../client/public/scripts'));

app.use('/avengers', avengerRouter);

app.get('/', (req, res) => {
  console.log("It was hit")
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Marvel Avengers</h1>')
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
});

import { seedAvengersTable } from './config/reset.js';

// seedAvengersTable();

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
});