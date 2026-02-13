import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

import cors from "cors"

import userRouter from "./routes/userRouter.js"
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js"
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
connectDB();

app.get('/', (req, res) => {
  res.send("Server Started");
})

app.use('/users', userRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);

app.listen(5000, (req, res) => {
  console.log(`Server started at ${process.env.PORT}`);
});