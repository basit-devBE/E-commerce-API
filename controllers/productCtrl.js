import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

export const createProductCtrl = expressAsyncHandler(async (req, res) => {
  const {
    name, description, category, sizes, colors, user, price, totalQty,brand
  } = req.body;
  const productExists = await Product.findOne({ name });
  if (productExists) {
    return res.status(400).json({
      msg: 'Product already exists',
    });
  }
  const product = await Product.create({
    name,
    description, 
    category, 
    sizes,
    colors,
    user : req.userAuthId,
    price, 
    totalQty,
    brand,
  });
  return res.status(201).json(product);
});


// a controller to fetch all products that exist
export const allProductCtrl = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(products);
});