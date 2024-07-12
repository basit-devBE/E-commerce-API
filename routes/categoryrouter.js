import express from "express";
import { createCategoryCtrl } from "../controllers/CategoryCtrl.js";
import { isLoggedIn } from "../middlewares/isloggedin.js";

const CategoryRouter =  express.Router()

CategoryRouter.post("api/v1/createcategory" ,isLoggedIn,createCategoryCtrl )