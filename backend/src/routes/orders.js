import express from "express";
import { orderController } from "../controllers/orderController.js";
import { verifyAdmin, verifyToken, verifyUserAndOrder } from "../middleware/authMiddleware.js";
import { parseOrderLines, validateOrderId, validateProductIds  } from "../middleware/orderMiddleware.js";

const ordersRouter = express.Router();

//GET ALL ORDERS
ordersRouter.get("/", verifyToken, verifyAdmin, orderController.getOrders);

// CREATE CHECKOUT LINK
ordersRouter.post("/checkout", verifyToken, parseOrderLines, validateProductIds, orderController.checkout);

//GET ORDER
ordersRouter.get("/:orderId", verifyToken, validateOrderId, verifyUserAndOrder, orderController.getOrder);

//DELETE ORDER
ordersRouter.delete("/:orderId", verifyToken, validateOrderId, verifyUserAndOrder, orderController.deleteOrder);

export default ordersRouter;