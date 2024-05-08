import Stripe from "stripe";
import { Order } from "../model/Order.js";
import { OrderLine } from "../model/OrderLine.js";
import { frontEndURL } from "../utils/constants.js";
import { validateAndParseObjectId } from "../utils/helpers.js";
import { createCheckoutLink } from "../utils/stripe.js";

export const orderController = {
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .select("-__v -updatedAt")
        .populate("user_id");
      const ordersWithLines = await getOrdersWithLines(orders);

      res.status(200).json(ordersWithLines);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
  },

  getOrder: async (req, res) => {
    const orderId = req.params.orderId;

    try {
      const order = await Order.findById(orderId)
        .populate({
          path: "user_id",
          select: "-password -__v -is_admin -createdAt -updatedAt",
          options: { as: "user" },
        })
        .select("-__v");

      const orderLines = await getOrderLines(orderId);

      res.status(200).json({ order: order, orderlines: orderLines });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
  },

  getUserOrder: async (req, res) => {
    try {
      const userId = req.userId;
      const orders = await Order.find({ user_id: userId }).select(
        "-__v -updatedAt"
      );

      const ordersWithLines = await getOrdersWithLines(orders);

      res.status(200).json(ordersWithLines);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Error fetching orders for user ${userId}: ${error}` });
    }
  },

  checkout: async (req, res) => {
    const products = req.products;
    const checkoutItems = req.body;
    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

    const lineItems = products.map((product, index) => {
      return {
        price: product.stripePriceId,
        quantity: checkoutItems[index].quantity,
      };
    });

    const checkoutURL = await createCheckoutLink(lineItems, req.userId, stripe);

    if (!checkoutURL) {
      res.status(503).json({ error: `Could not create Stripe checkout link.` });
    }

    res.status(200).json({
      url: checkoutURL,
    });
  },

  createOrder: async (req, res) => {
    try {
      const order = await Order.create({
        user_id: validateAndParseObjectId(req.userId),
        total: req.total,
      });

      const orderId = order._id;

      await createOrderLines(req.orderLines, orderId);

      res.status(201).json({ message: "Order created succesfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      await Order.findByIdAndDelete(orderId);
      await OrderLine.deleteMany({order_id : orderId});
      res.status(200).json({message: "Order deleted succesfully"})
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

async function getOrdersWithLines(orders) {
  return await Promise.all(
    orders.map(async (order) => {
      const orderLines = await getOrderLines(order._id);
      return {
        order: order,
        orderLines: orderLines,
      };
    })
  );
}

async function getOrderLines(orderId) {
  const orderLines = await OrderLine.find({ order_id: orderId })
    .select("-__v -_id -createdAt -updatedAt -order_id")
    .populate({
      path: "product_id",
      select: "-__v -createdAt -updatedAt",
    });

  return orderLines;
}

async function createOrderLines(orderLinesArray, orderId) {
  try {
    for (const orderLineData of orderLinesArray) {
      OrderLine.create({
        order_id: validateAndParseObjectId(orderId),
        product_id: validateAndParseObjectId(orderLineData.product_id),
        quantity: orderLineData.quantity,
      });
    }
    console.log("OrderLines created successfully!");
  } catch (error) {
    console.error("Error creating OrderLines:", error);
    throw error;
  }
}
