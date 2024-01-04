import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model";
import SaleOffProduct from "../models/saleoff-product.model";
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

  /**
   * @method PUT
   * @path /api/product/:id
   * @description Function handle get product by id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async getProductById(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id;
    try {
      const product = await Product.findOne({ _id: productId }).populate(
        "type",
        "name"
      );
      
      let saleOffProduct;
      if (product?.sale_off) {
        saleOffProduct = await SaleOffProduct.findOne({product: productId})
      }
    
      if (product) {
        let productInfo = {
          product, 
          saleOffInfo: saleOffProduct
        }
        
        return resSuccess(res, "Successfully fetch product by id", { productInfo });
      }
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }

  /**
   * @method PUT
   * @path /api/product/:id
   * @description Function handle update product by id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async updateProductById(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id;
    const dataUpdated = req.body;

    try {
      const productUpdated = await Product.findByIdAndUpdate(
        productId,
        dataUpdated,
        {
          new: true,
        }
      );

      return resSuccess(
        res,
        "Successfully update product by id",
        productUpdated
      );
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }

  /**
   * @method DELETE
   * @path /api/product/:id
   * @description Function handle update product by id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async deleteProductById(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id;

    try {
      const productDeleted = await Product.findByIdAndDelete(productId);

      return resSuccess(
        res,
        "Successfully delete product by id",
        productDeleted
      );
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }
}

export default new ProductController();
