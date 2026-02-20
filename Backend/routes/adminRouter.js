import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js"
import adminAuth from "../middlewares/adminAuth.js"
import { getProducts, getProduct, updateProduct, toggleIsActive, deleteProduct, createProduct, getAllOrders } from "../controllers/adminController.js";
import { updateOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get('/admin/products', isLoggedIn, adminAuth, getProducts );

router.get('/admin/products/:id', isLoggedIn, adminAuth, getProduct );

router.post('/admin/products', isLoggedIn, adminAuth, createProduct );

router.put('/admin/products/edit/:id', isLoggedIn, adminAuth, updateProduct );

router.patch('/admin/products/:id', isLoggedIn, adminAuth, toggleIsActive );

router.delete('/admin/products/:id', isLoggedIn, adminAuth, deleteProduct );

router.get('/admin/orders', isLoggedIn, adminAuth, getAllOrders );

router.put('/admin/orders/update/:id', isLoggedIn, adminAuth, updateOrder );

export default router;