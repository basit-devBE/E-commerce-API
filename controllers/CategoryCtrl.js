import Category from "../models/Categorymodel.js";
import expressAsyncHandler from "express-async-handler";

export const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
    const { name }= req.body;

    try {
        const categoryFound = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (categoryFound) {
            return res.status(400).json({
                msg: "Category already exists",
            });
        }

        const category = await Category.create({ 
            name: name.toLowerCase(),
            user: req.userAuthId
         });
        res.status(201).json({
            msg: "Category created successfully",
            category,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message,
        });
    }
});

export const allCategories = expressAsyncHandler(async(req,res)=>{
   const categories = await Category.find();
    res.status(200).json(categories);

})

export const SingleCategory = expressAsyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if(category){
        res.status(200).json(category);
    } else {
        res.status(404).json({
            msg: "Category not found"
        })
        }
})

export const UpdateCategory = expressAsyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if(category){
        category.name = req.body.name || category.name;
        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);
    } else {
        res.status(404).json({
            msg: "Category not found"
        })
    }
});

export const DeleteCategory = expressAsyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if(category){
        await category.remove();
        res.status(200).json({
            msg: "Category deleted successfully"
        });
    }else{
        res.status(404).json({
            msg: "Category not found"
        });
    }
});