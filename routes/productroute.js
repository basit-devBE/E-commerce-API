import express from "express";
import { allProductCtrl, createProductCtrl,delProd,SingleProduct, upProduct } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middlewares/isloggedin.js";

const ProductRoutes = express.Router();

ProductRoutes.post("/api/v1/createproduct",isLoggedIn, createProductCtrl);
ProductRoutes.get("/api/v1/allproduct", allProductCtrl);
ProductRoutes.get("/api/v1/product/:id", SingleProduct);
ProductRoutes.put("/api/v1/updateproduct/:id", isLoggedIn, upProduct)
ProductRoutes.delete('/api/v1/products/:id', isLoggedIn, delProd);

export default ProductRoutes;