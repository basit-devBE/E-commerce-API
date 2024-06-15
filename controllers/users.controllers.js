import { response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import  getTokenFromHeader  from "../utils/getToken.js";
import  generateToken  from "../utils/generateToken.js";
import { verifyToken } from "../utils/verifytoken.js";

//@desc register user
//@route POST/api/v1/users/register
//@access Private/admin




export const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    const userExists = await User.findOne({ email });
    
    if (userExists) {
        return res.status(400).json({
            msg: 'User already exists'
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        status: 'success',
        msg: 'User registered successfully',
        data: user,
    });
});



export const LoginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) {
        return res.status(404).json({
            msg: 'User not found'
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userFound.password);
    if (isPasswordCorrect) {
        return res.status(200).json({
            msg: 'User logged in successfully',
        token : generateToken(userFound.id)
        });
    } else {
        res.status(401).json({
            msg: 'Invalid password'
        });
    }
});

export const getUserProfileCtrl = asyncHandler(async(req,res) =>{
    const token = getTokenFromHeader(req)
    const verified = verifyToken(token);
    console.log(verified)
    res.json({
        msg : 'user profile'
})

})