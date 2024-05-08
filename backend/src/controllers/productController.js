import Stripe from "stripe";
import { Product } from "../model/Product.js";
import mongoose from "mongoose";
import { productCategoryTypes } from "../utils/constants.js";
import { createStripePrice, createStripeProduct } from "../utils/stripe.js";

export const productController = {
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 0;
      const search = req.query.search || "";
      let sort = req.query.sort || "createdAt_desc";
      let categories = req.query.category || "All";

      if (categories === "All") {
        categories = [...productCategoryTypes];
      } else {
        categories = req.query.category.split(",");
      }

      let sortBy = {};

      if (req.query.sort) {
        sort = req.query.sort.split(",");
      } else {
        sort = [sort];
      }

      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc";
      }

      const total = await Product.countDocuments({
        category: { $in: [...categories] },
        name: { $regex: search, $options: "i" },
      });

      const products = await Product.find({
        name: { $regex: search, $options: "i" },
      })
        .where("category")
        .in([...categories])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit)
        .select("-__v -stripeProductId -stripePriceId");

      const response = {
        total,
        page: page + 1,
        limit,
        category: categories,
        products,
      };

      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = req.product;
      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
  },

  insertProduct: async (req, res) => {
    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

    const productId = new mongoose.Types.ObjectId();
    console.log(productId);

    const { name, image, price, category, description } = req.productData;

    const stripeProductId = await createStripeProduct(name, image, stripe);

    if (!stripeProductId) {
      res.status(503).json({ error: "Could not create stripe product." });
    }

    const stripePriceId = await createStripePrice(
      productId.toString(),
      stripeProductId,
      price,
      stripe
    );

    if (!stripePriceId) {
      res.status(503).json({ error: "Could not create stripe price." });
    }

    const newProduct = {
      _id: productId,
      name,
      image,
      price,
      category,
      description,
      stripeProductId,
      stripePriceId,
    };

    try {
      await Product.create(newProduct);
      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.product;
      await Product.findByIdAndUpdate(id, req.productData);
      res.status(200).json({
        message: "Product updated successfully",
        newProduct: req.productData,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.product;
      await Product.findByIdAndDelete(id);
      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};
