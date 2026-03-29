import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routerLamps from './routes/lamps.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/lamps', routerLamps);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
