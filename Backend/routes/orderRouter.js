import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import { cancelOrder, createOrder, getOrders, getOneOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/orders/my", isLoggedIn, getOrders)

router.post("/orders", isLoggedIn, createOrder);

router.patch("/orders/cancel/:orderId", isLoggedIn, cancelOrder);

router.get("/orders/:id", isLoggedIn, getOneOrder );

export default router