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
  let productQuery = Product.find();

  if (req.query.name) {
    productQuery = productQuery.find({
      name: {
        $regex: req.query.name,
        $options: 'i'
      }
    });
  }

  if(req.query.brand){
    productQuery = productQuery.find({
      brand: {
        $regex: req.query.brand,
        $options: 'i'
      }
    });
  }

  if(req.query.size){
    productQuery = productQuery.find(
      {sizes: req.query.size}
    )};

    if(req.query.category){
      productQuery = productQuery.find({
        category: { $regex: req.query.category, $options: 'i' }
      });
    }
    if(req.query.color){
      productQuery = productQuery.find({
        colors: { $regex: req.query.color, $options: 'i' }
      });
    }
    
  const products = await productQuery;

  return res.status(200).json({
      msg: "success",
      products
    });
  });

