import express from "express";
import ProductController from "../controllers/product.controller";
import { verifyToken } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/create", verifyToken, ProductController.createSingleProduct);
router.get("/:id", ProductController.getProductById);
router.put("/:id", verifyToken, ProductController.updateProductById);
router.delete("/:id", verifyToken, ProductController.deleteProductById);
router.get("/", ProductController.getProductList);

export default router;
