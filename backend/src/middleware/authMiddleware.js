import jwt from "jsonwebtoken";
import { Order } from "../model/Order.js";
import { User } from "../model/User.js";

export const verifyToken = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ error: "Access denied, no token given" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const verifyUserAndOrder = async (req, res, next) => {
  try {
    const tokenUserId = req.userId;
    const orderUserId = (
      await Order.findById(req.params.orderId).select("user_id")
    ).user_id.toString();

    const isUserAdmin = await User.findById(tokenUserId).select("is_admin");

    if (orderUserId !== tokenUserId && !isUserAdmin) {
      return res.status(401).json({ error: "Unauthorized action!" });
    }

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const tokenUserId = req.userId;

    const user = await User.findById(tokenUserId);

    if (!user.is_admin) {
      return res.status(403).json({ error: "Unauthenticated action!" });
    }

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};