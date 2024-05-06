import jwt from "jsonwebtoken";
import { Order } from "../model/Order.js";
import { User } from "../model/User.js";
import Stripe from "stripe";

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

export const verifyUser = async (req, res, next) => {
  const tokenUserId = req.userId;
  const orderUserId = (
    await Order.findById(req.params.orderId).select("user_id")
  ).user_id.toString();
  // const orderUserId = (await Order.findById(req.params.orderId)).user_id.toString();

  console.log("token", tokenUserId);
  console.log("order", orderUserId);

  if (orderUserId !== tokenUserId) {
    return res.status(401).json({ error: "Unauthorized action!" });
  }

  next();
};

export const verifyAdmin = async (req, res, next) => {
  const tokenUserId = req.userId;


  const user = await User.findById(tokenUserId);

  if (!user.is_admin) {
    return res.status(403).json({ error: "Unauthenticated action!" });
  }

  next();
};

export const verifyStripe = async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    req.stripeEvent = event;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
