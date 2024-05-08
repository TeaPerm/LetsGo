import { z } from "zod";
import { validateAndParseObjectId } from "../utils/helpers.js";
import { Product } from "../model/Product.js";
import { Order } from "../model/Order.js";

const orderSchema = z
  .object({
    product_id: z.string(),
    quantity: z.number().int().positive(),
  })
  .strict()
  .array()
  .min(1);

export const parseOrderLines = (req, res, next) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.issues);
  }
  req.orderLines = parsed.data;
  next();
};

export const validateProductIds = async (req, res, next) => {
  try {
    const orderLines = req.orderLines;
    let products = [];

    for (const orderLineData of orderLines) {
      const { product_id: id } = orderLineData;

      if (!validateAndParseObjectId(id)) {
        return res
          .status(404)
          .json({ message: `${id} is not a valid productID` });
      }

      const product = await Product.findById(id);

      if (!product) {
        return res
          .status(404)
          .json({ message: `${id} this ProductID does not exist` });
      }

      products.push(product);
    }

    req.products = products;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const validateOrderId = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    if (!validateAndParseObjectId(id)) {
      return res.status(404).json({ message: "Not valid order ID" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "No order found with this ID" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
