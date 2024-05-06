import Stripe from "stripe";
import { Product } from "../model/Product.js";
import mongoose from "mongoose";
// import dotenv from "dotenv";

export const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
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
    const stripe = Stripe(
      process.env.STRIPE_PRIVATE_KEY
    );

    const productId = new mongoose.Types.ObjectId()
    console.log(productId)


    const {name , image, price , category, description } = req.productData;

    const stripeProductId = await createStripeProduct(name,image,stripe);

    if(!stripeProductId){
      res.status(503).json({error: "Could not create stripe product."})
    }
    
    const stripePriceId = await createStripePrice(productId.toString(),stripeProductId,price,stripe);
    
    if(!stripePriceId){
      res.status(503).json({error: "Could not create stripe price."})
    }

    const newProduct = { _id: productId ,name , image, price , category, description, stripeProductId , stripePriceId}

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

const createStripeProduct = async (productName, imageURL, stripe) => {
  try {
    // Create a product on Stripe
    const productStripe = await stripe.products.create({
      name: productName,
      images: [imageURL],
      active: true,
    });

    return productStripe.id;
  } catch (error) {
    // Handle errors during Stripe or Supabase operations
    console.error(error);
    return null;
  }
};

const createStripePrice = async (productId,stripeProductId, productPrice, stripe) => {
  try {
    // Create a product on Stripe
    const stripePrice = await stripe.prices.create({
      unit_amount: parseInt(productPrice) * 100, // Stripe prices are in cents
      currency: "huf", // Hungarian Forint
      product: stripeProductId,
      active: true,
      metadata:{
        product_id : productId
      }
    });

    return stripePrice.id;
  } catch (error) {
    // Handle errors during Stripe
    console.error(error);
    return null;
  }
};
