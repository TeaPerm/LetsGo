import express from "express";
import { productController } from "../controllers/productController.js";
import { validateProductData, validateProductId } from "../middleware/productMiddleware.js";
import { verifyAdmin, verifyToken } from "../middleware/authMiddleware.js";

const productsRouter = express.Router();

//GET ALL PRODUCTS
productsRouter.get("/", productController.getProducts);

//GET PRODUCT
productsRouter.get("/:productId", validateProductId, productController.getProduct);

//CREATE PRODUCT
productsRouter.post("/", verifyToken, verifyAdmin, validateProductData, productController.insertProduct);

//UPDATE PRODUCT
productsRouter.put("/:productId", verifyToken, verifyAdmin, validateProductId, validateProductData, productController.updateProduct);

//DELETE PRODUCT
productsRouter.delete("/:productId", verifyToken, verifyAdmin, validateProductId, productController.deleteProduct);

export default productsRouter;
