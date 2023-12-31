import express from "express";
import ProductTypeController from "../controllers/product-type.controller";
const router = express.Router();

router.post("/create", ProductTypeController.createSingleProductType);
router.put("/:id", ProductTypeController.updateProductTypeById);
router.delete("/:id", ProductTypeController.deleteProductById);
router.get("/", ProductTypeController.getProductTypeList);

export default router;
