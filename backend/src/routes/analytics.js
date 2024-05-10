import express from "express";
import { verifyAdmin, verifyToken } from "../middleware/authMiddleware.js";
import { analyticsController } from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/", verifyToken, verifyAdmin, analyticsController.getAnalytics)

export default analyticsRouter