import Product from "../models/Product.js";
import Review from "../models/reviews.js";
import expressAsyncHandler from "express-async-handler";

export const createReviewCtrl = expressAsyncHandler(async (req, res) => {
   const productFound = await Product.findById(req.params.id)
   if(!productFound){
    throw new Error("Product to be reviewed cannot be found")
   }
})