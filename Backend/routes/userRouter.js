import express from "express";
import { signup, login, logout, authCheck } from "../controllers/userController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/me', isLoggedIn, authCheck)

router.post('/logout', isLoggedIn, logout);

export default router;