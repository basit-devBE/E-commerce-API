import express from "express";
import { createColorsCtrl, SingleColorCtrl, UpdateColor } from "../controllers/ColorsCtrl.js";
import { isLoggedIn } from "../middlewares/isloggedin.js";
import { allColorsCtrl } from "../controllers/ColorsCtrl.js";
const ColourRouter = express.Router()

ColourRouter.post("/api/v1/color/createcolor", isLoggedIn, createColorsCtrl);
ColourRouter.get("/api/v1/color/allcolors", allColorsCtrl)
ColourRouter.get("/api/v1/color/:id", SingleColorCtrl)
ColourRouter.put("/api/v1/colors/updateColor/:id", isLoggedIn,UpdateColor)

export default ColourRouter;