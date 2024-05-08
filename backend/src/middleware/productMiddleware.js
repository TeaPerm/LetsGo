import z from "zod";
import { Product } from "../model/Product.js";
import { validateAndParseObjectId } from "../utils/helpers.js";
import { productCategoryTypes } from "../utils/constants.js";

const productSchema = z
  .object({
    name: z.string().min(1),
    price: z.number().int().positive(),
    description: z.string().min(5).optional(),
    category: z.enum(productCategoryTypes),
    image: z.string().url(),
  })
  .strict();

export const validateProductId = async (req, res, next) => {
  try {
    const id = req.params.productId;
    if (!validateAndParseObjectId(id)) {
      return res.status(404).json({ message: "Not valid product ID" });
    }

    const product = await Product.findById(id).select("-__v -stripeProductId -stripePriceId");

    if (!product) {
      return res.status(404).json({ message: "No product found with this ID" });
    }

    req.product = product;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const validateProductData = async (req, res, next) => {
  const productData = req.body;
  const parsed = productSchema.safeParse(productData);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.issues);
  }

  req.productData = parsed.data;
  next();
};
