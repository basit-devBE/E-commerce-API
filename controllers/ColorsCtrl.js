import Color from "../models/colors.js";
import expressAsyncHandler from "express-async-handler";

export const createColorsCtrl = expressAsyncHandler(async (req, res) => {
    const { name } = req.body;
    try {
        const colorFound = await Color.findOne({ name });
        if (colorFound) {
            return res.status(400).json({
                message: "Color already exists"
            });
        }

        const newColor = await Color.create({
            name: name.toLowerCase(),
            user: req.userAuthId
        });
        res.status(201).json({
            msg: "Color created Successfully",
            color: newColor
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
});



export const allColorsCtrl = expressAsyncHandler(async(req,res)=>{
    try {
        const colors = await Color.find({});
        res.status(200).json({
            msg: "All colors",
            colors
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
})

export const SingleColorCtrl = expressAsyncHandler(async(req,res)=>{
    const color = await Color.findById(req.params.id)
    if(!color){
        throw new Error('Color not found')
    }
    res.status(200).json({
        message:"color found",
        color
    });
})



export const UpdateColor = expressAsyncHandler(async (req, res) => {
    const colorId = req.params.id;

    // Check if ID is valid
    if (!colorId) {
        return res.status(400).json({ message: 'Invalid color ID' });
    }

    // Update the document
    try {
        const color = await Color.findByIdAndUpdate(colorId, req.body, {
            new: true,  // Return the updated document
            runValidators: true // Ensure validators run on update
        });

        if (!color) {
            return res.status(404).json({ message: 'Color not found' });
        }

        res.status(200).json({
            message: 'Color updated successfully',
            color
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});


export const DeleteColor = expressAsyncHandler(async (req, res)=>{
   const color = await Color.findByIdAndDelete(req.params.id);
   if(!color){
    throw new Error('Color not found')}
    res.status(200).json({
        message:"Color deleted"
        })
})