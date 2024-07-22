import express from "express";
import { isLoggedIn } from "../middlewares/isloggedin.js";
import { createReviewCtrl } from "../controllers/reviewCtrl.js";

const Reviewroute = express.Router();

Reviewroute.post("/api/v1/reviews/create/:id", isLoggedIn, createReviewCtrl);

export default Reviewroute;
