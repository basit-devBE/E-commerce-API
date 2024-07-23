import Product from "../models/Product.js";
import expressAsyncHandler from "express-async-handler";
import Review from "../models/reviews.js"; // Ensure the correct import path and naming

export const createReviewCtrl = expressAsyncHandler(async (req, res) => {
  const { productID } = req.params; // Correctly extract productID from params
  const { message, rating } = req.body; // Extract relevant data from request body

  // Find the product by ID
  const productFound = await Product.findById(req.params.id).populate('reviews'); 
  if (!productFound) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  const hasReviwed = productFound?.reviews?.find((review)=>{
   return review?.user?.toString() === req?.userAuthId?.toString()
  })
   if(hasReviwed){
      res.status(400);
      throw new Error('You have already reviewed this product');
   }
  // Create the review
  const review = await Review.create({
    user: req.userAuthId,
    message,
    rating,
    product: productFound._id
  });

  // Add the review to the product
  productFound.reviews.push(review._id);
  await productFound.save();

  // Send response
  res.json({
    status: 200,
    message: "Review created successfully",
    data: review
  });
});
