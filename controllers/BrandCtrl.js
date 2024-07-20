import expressAsyncHandler from "express-async-handler";
import Brand from "../models/brand.js";

export const createBrandCtrl = expressAsyncHandler(async(req,res)=>{
    const {name} = req.body;

    try{
        const Brandfound = await Brand.findOne({ name });
        if (Brandfound){
            return res.status(400).json({
                msg: "Brand already exists",
            });
        }

        const brand = await Brand.create({
            name: name.toLowerCase(),
            user:req.userAuthId
        });
        res.status(201).json({
            msg: "Brand created successfully",
            brand,
        });
    }
    catch(error){
        res.status(500).json({
            msg: "Server error",
            error: error.message,
        });
    }
})

export const allBrandsCtrl = expressAsyncHandler(async(req,res) =>{
    const brands = await Brand.find()
    res.status(200).json(brands);
})

export const SingleBrand = expressAsyncHandler(async(req,res)=>{
    const brand = await Brand.findById(req.params.id);
    if(brand){
        res.status(200).json(brand);
    } else {
        res.status(404).json({
            msg: "Brand not found"
        })
    }
})

export const UpdateBrand = expressAsyncHandler(async(req,res)=>{
    const brand = await Brand.findById(req.params.id);
    if(brand){
        brand.name = req.body.name || brand.name;
        const updatedBrand = await brand.save();
        res.status(200).json(updatedBrand);
    } else {
        res.status(404).json({
            msg: "Brand not found"})
        }
});

export const DeleteBrand = expressAsyncHandler(async(req,res)=>{
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if(brand){
        res.status(200).json({
            msg: "Brand deleted successfully"
        });
    } else {
        res.status(404).json({
            msg: "Brand not found"
        });
    }
})