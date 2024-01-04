import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { resSuccess, resError } from "../services/response-handlers";
import SaleOffProduct from "../models/saleoff-product.model";
import Product from "../models/product.model";

class SaleOffProductController {
  /**
   * @method POST
   * @path /api/saleoff-product/create
   * @description Function handle create saleoff product
   * @param req
   * @param res
   * @param next
   */
  async createSaleOffProduct(req: Request, res: Response, next: NextFunction) {
    const { product, percent, startSale, endSale } = req.body;

    if (!product || !percent || !startSale || !endSale) {
      return resError(res, "Fields data is not enough", 400);
    }

    try {
      const saleOffProductData = {
        product,
        percent,
        startSale,
        endSale,
      };
      // convert product id to ObjectId
      saleOffProductData.product = new mongoose.Types.ObjectId(product);

      const newSaleOffProduct = new SaleOffProduct(saleOffProductData);
      await newSaleOffProduct.save();

      const productSaleOff = await Product.findOne({ _id: product });
      await productSaleOff?.updateOne({ sale_off: true });

      return resSuccess(
        res,
        "Successfully create new sale-off product",
        newSaleOffProduct
      );
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }

  /**
   * @method GET
   * @path /api/saleoff-product/
   * @description Function handle get saleoff product list
   * @param req
   * @param res
   * @param next
   */
  async getSaleOffProductList(req: Request, res: Response, next: NextFunction) {
    try {
      const saleOfProductList: Array<typeof SaleOffProduct> =
        await SaleOffProduct.find({}).populate("product");

      if (saleOfProductList) {
        const results = saleOfProductList.length;
        return resSuccess(res, "Successfully fetch the product list", {
          results,
          saleOfProductList,
        });
      }
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }

    /**
   * @method GET
   * @path /api/saleoff-product/:product_id
   * @description Function handle get saleoff product by id
   * @param req
   * @param res
   * @param next
   */
    async getSaleOffInfoByProductId(req: Request, res: Response, next: NextFunction) {
      const productId = req.params.product_id;
      try {
        const saleOfInfo = await SaleOffProduct.findOne({ product: productId });
        
        if (saleOfInfo) {
          return resSuccess(res, "Successfully fetch sale-off info by product id", { saleOfInfo });
        }
      } catch (error) {
        return resError(res, "Internal server error", 500);
      }
    }
}

export default new SaleOffProductController();
