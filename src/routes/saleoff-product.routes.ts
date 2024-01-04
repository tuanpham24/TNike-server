import express from "express";
import saleoffProductController from "../controllers/saleoff-product.controller";
const router = express.Router();

router.post("/create", saleoffProductController.createSaleOffProduct);
router.get("/", saleoffProductController.getSaleOffProductList);
router.get("/:product_id", saleoffProductController.getSaleOffInfoByProductId);

export default router;