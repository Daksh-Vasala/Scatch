import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import adminAuth from "../middlewares/adminAuth.js"
import { getProducts, getProduct, updateProduct, toggleIsActive, deleteProduct } from "../controllers/adminController.js";

const router = express.Router();

router.get('/admin/products', isLoggedIn, adminAuth, getProducts );

router.get('/admin/products/:id', isLoggedIn, adminAuth, getProduct );

router.put('/admin/products/edit/:id', isLoggedIn, adminAuth, updateProduct );

router.patch('/admin/products/:id', isLoggedIn, adminAuth, toggleIsActive );

router.delete('/admin/products/:id', isLoggedIn, adminAuth, deleteProduct );

export default router;