import express from "express";
import { userController } from "../controllers/userController.js";
import { validateUserData } from "../middleware/userMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { orderController } from "../controllers/orderController.js";

const usersRouter = express.Router();


usersRouter.get("/", verifyToken, userController.getUser);
usersRouter.post("/register", validateUserData, userController.register);
usersRouter.post("/login", validateUserData, userController.login);
usersRouter.get("/orders", verifyToken, orderController.getUserOrder);


export default usersRouter;