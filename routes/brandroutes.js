import { allBrandsCtrl, createBrandCtrl, DeleteBrand, SingleBrand, UpdateBrand } from "../controllers/BrandCtrl.js";
import express from "express"
import { isLoggedIn } from "../middlewares/isloggedin.js";

const BrandRouter = express.Router();

BrandRouter.post("/api/v1/brands/create", isLoggedIn, createBrandCtrl);
BrandRouter.get("/api/v1/brands/allBrands", allBrandsCtrl);
BrandRouter.get("/api/v1/brands/singlebrand/:id", SingleBrand);
BrandRouter.put("/api/v1/brands/updatebrand/:id", UpdateBrand);
BrandRouter.delete("/api/v1/brands/deletebrand/:id", DeleteBrand)


export default BrandRouter;