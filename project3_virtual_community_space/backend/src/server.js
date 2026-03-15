import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routerEvent from "./routes/events.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/events", routerEvent);


app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`));