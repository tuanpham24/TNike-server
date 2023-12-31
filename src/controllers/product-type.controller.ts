import { Request, Response, NextFunction } from "express";
import ProductType from "../models/product-type.model";
import { resSuccess, resError } from "../services/response-handlers";

class ProductTypeController {
  /**
   * @method POST
   * @path /api/product-type/create
   * @description Function handle create new product type
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async createSingleProductType(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name } = req.body;

      if (!name) {
        return resError(res, "Fields data is not enough", 400);
      }
      const productTypeData = {
        name,
      };

      const newProductType = new ProductType(productTypeData);
      await newProductType.save();

      return resSuccess(
        res,
        "Successfully create new product type",
        newProductType
      );
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }

  /**
   * @method GET
   * @path /api/product-type/list
   * @description Function handle get product type list
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async getProductTypeList(req: Request, res: Response, next: NextFunction) {
    try {
      const productTypeList: Array<typeof ProductType> = await ProductType.find(
        {}
      );

      if (productTypeList) {
        const results = productTypeList.length;
        return resSuccess(res, "Successfully fetch the product type list", {
          results,
          productTypeList,
        });
      }
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }

  /**
   * @method PUT
   * @path /api/product-type/:id
   * @description Function handle update product type by id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async updateProductTypeById(req: Request, res: Response, next: NextFunction) {
    const productTypeId = req.params.id;
    const dataUpdated = req.body;

    try {
      const productTypeUpdated = await ProductType.findByIdAndUpdate(
        productTypeId,
        dataUpdated,
        {
          new: true,
        }
      );

      return resSuccess(
        res,
        "Successfully update product type by id",
        productTypeUpdated
      );
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }

  /**
   * @method DELETE
   * @path /api/product-type/:id
   * @description Function handle update product type by id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async deleteProductById(req: Request, res: Response, next: NextFunction) {
    const productTypeId = req.params.id;

    try {
      const productTypeDeleted = await ProductType.findByIdAndDelete(
        productTypeId
      );

      return resSuccess(
        res,
        "Successfully delete product type by id",
        productTypeDeleted
      );
    } catch (error) {
      return resError(res, "Internal server error", 500);
    }
  }
}

export default new ProductTypeController();
