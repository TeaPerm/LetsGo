import express from "express";
import { userController } from "../controllers/userController.js";
import { verifyToken, verifyUserAndOrder } from "../middleware/authMiddleware.js";
import { orderController } from "../controllers/orderController.js";
import { validateLoginData, validateRegisterData } from "../middleware/userMiddleware.js";

const usersRouter = express.Router();


usersRouter.get("/", verifyToken, userController.getUser);
usersRouter.post("/register", validateRegisterData, userController.register);
usersRouter.post("/login", validateLoginData, userController.login);

//TODO - ADMIN AND USER CAN GET
usersRouter.get("/orders", verifyToken,  orderController.getUserOrder);


export default usersRouter;