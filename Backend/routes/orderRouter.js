import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import { cancelOrder, createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/orders/my", isLoggedIn, getOrders)

router.post("/orders", isLoggedIn, createOrder);

router.patch("/orders/cancel/:orderId", isLoggedIn, cancelOrder);

export default router