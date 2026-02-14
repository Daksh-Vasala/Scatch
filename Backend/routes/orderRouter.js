import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/orders/my", isLoggedIn, getOrders)

router.post("/orders", isLoggedIn, createOrder);



export default router