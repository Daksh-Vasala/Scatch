import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import { addToCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart/add", isLoggedIn, addToCart);

export default router;