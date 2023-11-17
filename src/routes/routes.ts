import { Application } from "express";
import ProductRoutes from "./product.routes";
import ProductTypeRoutes from "./product-type.routes";

const routes = (app: Application): void => {
  // Product routes
  app.use("/api/products", ProductRoutes);

  // Product type routes
  app.use("/api/product-types", ProductTypeRoutes);
};

export default routes;
