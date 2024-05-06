import express from "express";
import { productController } from "../controllers/productController.js";
import { validateProductData, validateProductId } from "../middleware/productMiddleware.js";
import { verifyAdmin, verifyToken } from "../middleware/authMiddleware.js";

const productsRouter = express.Router();

productsRouter.get("/", productController.getProducts);
productsRouter.post("/", verifyToken, verifyAdmin, validateProductData, productController.insertProduct);
productsRouter.get("/:productId", validateProductId, productController.getProduct);
productsRouter.put("/:productId", verifyToken, verifyAdmin, validateProductId, validateProductData, productController.updateProduct);
productsRouter.delete("/:productId", verifyToken, verifyAdmin, validateProductId, productController.deleteProduct);

export default productsRouter;
