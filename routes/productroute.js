import express from "express";
import { allProductCtrl, createProductCtrl } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isloggedin.js";

const ProductRoutes = express.Router();

ProductRoutes.post("/api/v1/product",isLoggedIn, createProductCtrl);
ProductRoutes.get("/api/v1/allproduct", allProductCtrl);


export default ProductRoutes;