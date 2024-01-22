import express from "express";
import saleoffProductController from "../controllers/saleoff-product.controller";
import { verifyToken } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/create", verifyToken, saleoffProductController.createSaleOffProduct);
router.get("/", saleoffProductController.getSaleOffProductList);
router.get("/:product_id", saleoffProductController.getSaleOffInfoByProductId);

export default router;