import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import { addToCart, getCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart/add", isLoggedIn, addToCart);

router.get("/cart", isLoggedIn, getCart);

export default router;