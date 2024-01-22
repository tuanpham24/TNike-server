import { Application } from "express";
import ProductRoutes from "./product.routes";
import ProductTypeRoutes from "./product-type.routes";
import SaleOffProductRoutes from "./saleoff-product.routes";
import AuthRoutes from "./auth.routes";

const routes = (app: Application): void => {
  // Product routes
  app.use("/api/products", ProductRoutes);

  // Product type routes
  app.use("/api/product-types", ProductTypeRoutes);

  // Sale-off product routes
  app.use("/api/saleoff-product", SaleOffProductRoutes);

  // Authentication
  app.use("/api/auth", AuthRoutes);
};

export default routes;
