import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Category from '../models/Categorymodel.js';
import Brand from '../models/brand.js';
import Color from '../models/colors.js';
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
  const categoryFound = await Category.findOne({name:category});
  if(!categoryFound){
    throw new Error("Category not found or check name of the category")
  }

  const BrandFound = await Brand.findOne({name: brand.toLowerCase()});
  if(!BrandFound){
    throw new Error("Brand not found or check name of the brand");
  }
  const ColorFound = await Color.findOne({name: colors.toLowerCase()})
  if(!ColorFound){
    throw new Error("No exiting Color like this. Check the color name of your product")
  }
  const product = await Product.create({
    name,
    description, 
    category, 
    sizes,
    colors,
    user:req.userAuthId,
    price, 
    totalQty,
    brand,
  });
  categoryFound.products.push(product._id)
  await categoryFound.save()
  BrandFound.products.push(product._id)
  await BrandFound.save()
  ColorFound.products.push(product._id);
  await ColorFound.save()
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

    if(req.query.price){
      const priceRange = req.query.price.split("-");
      productQuery = productQuery.find({
        price: { $gte: priceRange[0], $lte: priceRange[1] }
      });
    }
    
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const TotalProduct = await Product.countDocuments();
  const paginationresults = {}
  if(endIndex < TotalProduct){
    paginationresults.next = {
      page: page + 1,
      limit: limit
    }
  }
  if(startIndex > 0){
    paginationresults.previous = {
      page: page - 1,
      limit: limit
    }
  }

  productQuery =productQuery.skip(startIndex).limit(limit)
  const products = await productQuery.populate('reviews');

  res.json({
    status: "success",
    TotalProduct,
    results: products.length,
    paginationresults,
    message: "Products fetched successfully",
    products
  });
});


// a controller to fetch a single product
export const SingleProduct = expressAsyncHandler(async (req,res) =>
{
  const product = await Product.findById(req.params.id).populate('reviews');
  if (!product){
    throw new Error('Product not found')
  }
  res.json({
    status: "success",
    message: "Product fetched successfully",
    product
  });
  });

  //updaye product
export const upProduct = expressAsyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } = req.body;

  // Find the product by ID
  const product = await Product.findByIdAndUpdate(req.params.id,{
    name,
    description,
    category,
    sizes,
    colors,
    price,
    totalQty,
    brand
  },
  {
    new : true
  });
  res.json({
    status: "sucess",
    message: "Product updated successfully",
    product
  });
});


export const delProd = expressAsyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404).json({
      status: "error",
      message: "Product not found"
    });
    return;
  }
  res.json({
    status: "success",
    message: "Product deleted successfully"
  });
});