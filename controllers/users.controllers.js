import { response } from "express";
import User from "../models/User.js";

//@desc register user
//@route POST/api/v1/users/register
//@access Private/admin


export const registerUser = async (req, res) => {
   const {fullname,email,password} = req.body

    const userExists = await User.findOne({email});
    
    if (userExists){
        res.json({
            msg: 'User already exists'
        });
    }
    const user = await User.create({
        fullname,
        email,
        password,
    });
    res.status(201).json({
        status:'success',
        msg:'User registered successfully',
        data:user,
    })
};