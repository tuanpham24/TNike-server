import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./src/configs/db.config";
import routes from "./src/routes/routes";

const app = express(); // Init app

dotenv.config(); // Use config variable

app.use(cors()); // Use cors middleware

app.use(morgan("dev")); // HTTP logger

app.use(express.json()) // destructure data request

connectDB(); // database connection

routes(app); // Routes

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App is listening on port ", port);
});
