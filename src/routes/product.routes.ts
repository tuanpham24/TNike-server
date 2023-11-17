import express from "express";
import ProductController from "../controllers/product.controller";
const router = express.Router();

router.post("/create", ProductController.createSingleProduct);
// router.get("/:id", ProductController.getProductById);
// router.put("/:id", ProductController.updateProductById);
// router.delete("/:id", ProductController.deleteProductById);
router.get("/", ProductController.getProductList);

export default router;
