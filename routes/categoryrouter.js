import express from "express";
import { allCategories, createCategoryCtrl, DeleteCategory, SingleCategory, UpdateCategory } from "../controllers/CategoryCtrl.js";
import { isLoggedIn } from "../middlewares/isloggedin.js";

const defaultroute = "api/v1/categories"
const CategoryRouter =  express.Router()

CategoryRouter.post("/api/v1/categories/create" ,isLoggedIn,createCategoryCtrl )
CategoryRouter.get("/api/v1/categories/getallcategories", allCategories)
CategoryRouter.get("/api/v1/categories/singlecategory/:id", SingleCategory)
CategoryRouter.put("/api/v1/categories/updatecategory/:id", isLoggedIn,UpdateCategory);
CategoryRouter.delete(`${defaultroute}/deletecatecory/:id`, isLoggedIn, DeleteCategory)

export default CategoryRouter