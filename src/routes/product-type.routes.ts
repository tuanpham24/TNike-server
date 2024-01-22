import express from "express";
import ProductTypeController from "../controllers/product-type.controller";
import { verifyToken } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/create", verifyToken, ProductTypeController.createSingleProductType);
router.put("/:id", verifyToken, ProductTypeController.updateProductTypeById);
router.delete("/:id", verifyToken, ProductTypeController.deleteProductById);
router.get("/", ProductTypeController.getProductTypeList);

export default router;
