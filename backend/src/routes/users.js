import express from "express";
import { userController } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { orderController } from "../controllers/orderController.js";
import { validateLoginData, validateRegisterData } from "../middleware/userMiddleware.js";

const usersRouter = express.Router();

//GET USER INFO
usersRouter.get("/", verifyToken, userController.getUser);

//REGISTER USER
usersRouter.post("/register", validateRegisterData, userController.register);

//LOGIN USER
usersRouter.post("/login", validateLoginData, userController.login);

//GET USER ORDERS
usersRouter.get("/orders", verifyToken,  orderController.getUserOrder);


export default usersRouter;