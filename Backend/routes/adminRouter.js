import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import adminAuth from "../middlewares/adminAuth.js"
import { getProducts, getProduct, updateProduct, toggleIsActive, deleteProduct } from "../controllers/adminController.js";

const router = express.Router();

router.get('/admin/products', isLoggedIn, adminAuth, getProducts );

router.get('/admin/product/:id', isLoggedIn, adminAuth, getProduct );

router.put('/admin/product/edit/:id', isLoggedIn, adminAuth, updateProduct );

router.patch('/admin/product/:id', isLoggedIn, adminAuth, toggleIsActive );

router.delete('/admin/product/:id', isLoggedIn, adminAuth, deleteProduct );

export default router;