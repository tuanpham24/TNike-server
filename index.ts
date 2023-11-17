import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();

dotenv.config(); // Use config variable

app.use(cors()); // Use cors middleware

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App is listening on port ", port);
});