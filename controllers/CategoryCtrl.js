import Category from "../models/Categorymodel.js";
import expressAsyncHandler from "express-async-handler";

export const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
    const {name} = req.body

    const CategoryFound = await Category.findOne({name})
    if(CategoryFound){
        return res.status(400).json({
            msg: "Category already exists"
        })
    }

    const category = await Category.create({name, user:req.AuthId})
    res.json({
        msg: "Category created successfully",
        category
    })
})