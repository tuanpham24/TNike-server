import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model";
import { resSuccess, resError } from "../services/response-handlers";

class ProductController {
  /**
   * @method POST
   * @path /api/product/create
   * @description Function handle create new product
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async createSingleProduct(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      type,
      description,
      image_path,
      size,
      purchase_price,
      price,
      sold_quantity,
      stars,
    } = req.body;

    if (
      !name ||
      !type ||
      !description ||
      !image_path ||
      !size ||
      !purchase_price ||
      !price ||
      !sold_quantity ||
      !stars
    ) {
      return resError(res, "Fields data is not enough", 400);
    }

    try {
      const productData = {
        name,
        type,
        description,
        image_path,
        size,
        purchase_price,
        price,
        sold_quantity,
        stars,
      };

      // convert product type to ObjectId
      productData.type = new mongoose.Types.ObjectId(type);

      const newProduct = new Product(productData);
      await newProduct.save();

      return resSuccess(res, "Successfully create new product", newProduct);
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }

  /**
   * @method GET
   * @path /api/product/list
   * @description Function handle get product list
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async getProductList(req: Request, res: Response, next: NextFunction) {
    try {
      const productList: Array<typeof Product> = await Product.find(
        {}
      ).populate("type", "name");

      if (productList) {
        const results = productList.length;
        return resSuccess(res, "Successfully fetch the product list", {
          results,
          productList,
        });
      }
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }
}

export default new ProductController();
