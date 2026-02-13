import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/orders/my", isLoggedIn, () =>{
  try {
    
  } catch (error) {
    
  }
})

router.post("/orders", isLoggedIn, createOrder);



export default router