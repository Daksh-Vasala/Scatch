import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import { addToCart, getCart, removeItem, updateQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart/add", isLoggedIn, addToCart);

router.get("/cart", isLoggedIn, getCart);

router.post("/cart/update", isLoggedIn, updateQuantity);

router.post("/cart/remove", isLoggedIn, removeItem);
export default router;