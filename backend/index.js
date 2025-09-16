import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { connectToDB } from "./config/db.js";
import dataRouter from "./routes/dataRoutes.js";
const app = express();
app.use(express.json());

await connectToDB();

const corsOptions = { origin: "http://localhost:5173" };
app.use("/data", dataRouter);

const port = 4000;//process.env.PORT;
console.log("Port:",port)
app.listen(port, () => console.log("Server start at port", port));
