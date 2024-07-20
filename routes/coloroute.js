import express from "express";
import { createColorsCtrl, SingleColorCtrl } from "../controllers/ColorsCtrl.js";
import { isLoggedIn } from "../middlewares/isloggedin.js";
import { allColorsCtrl } from "../controllers/ColorsCtrl.js";
const ColourRouter = express.Router()

ColourRouter.post("/api/v1/color/createcolor", isLoggedIn, createColorsCtrl);
ColourRouter.get("/api/v1/color/allcolors", allColorsCtrl)
ColourRouter.get("/api/v1/color/:id", SingleColorCtrl)

export default ColourRouter;