import express from "express";
import { orderController } from "../controllers/orderController.js";
import { verifyAdmin, verifyToken, verifyUserAndOrder } from "../middleware/authMiddleware.js";
import { parseOrderLines, validateOrderId, validateProductIds  } from "../middleware/orderMiddleware.js";

const ordersRouter = express.Router();

ordersRouter.get("/", verifyToken, verifyAdmin, orderController.getOrders);
ordersRouter.post("/checkout", verifyToken, parseOrderLines, validateProductIds, orderController.checkout);
ordersRouter.get("/:orderId", verifyToken, validateOrderId, verifyUserAndOrder, orderController.getOrder);
// ordersRouter.post("/", express.raw({type: 'application/json'}), verifyStripe, constructOrderDetailsFromStripe, parseOrderLines, validateProductIds, orderController.createOrder);


export default ordersRouter;