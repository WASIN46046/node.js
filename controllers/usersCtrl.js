import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import  { getTokenFromHeader }from "../utils/getTokenFromHeader.js";
import {verifyToken} from"../utils/verifyToken.js";
// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

export const registerUserCtrl = asyncHandler(async(req, res) => {
    const {fullname,email,password} =req.body;
   //Check user exists 
    const userExists = await User.findOne({email});
    if(userExists){
        //throw
        throw new Error("User already exists");

    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    //create the user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        status:'success',
        message:"User Registered Successsfully",
        data:user,
    });
});

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public

export const loginUserCtrl = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    //Find the user in db by email only
    const userFound = await User.findOne({
        email,
    }); 
    if(userFound && (await bcrypt.compare(password, userFound?.password))) {
res.json({
            status:'success',
            message:'User logged in successfully',
            userFound,
            token:generateToken(userFound?._id),
        })
    }else{
        throw new Error("Invalid login credentials");       
    }
});

// @desc    Get     user porfile
// @route   POST /api/v1/users/profile
// @access  Private

export const getUserProfileCtrl = asyncHandler(async(req,res)=>{
    //console.log(req.header);
//const token = req?.headers?.authorization?.split(" ")[1];
//console.log(headerObj);
//const headerObj = req.headers.authorization;
//console.log(headerObj);
//const token = headerObj;

//const token = getTokenFromHeader(req);
//console.log(token);
    //verify token  
  //  const verified = verifyToken(token);
    //console.log(req);
    //res.json({
      //  msg:"Welcome Profile page",
    //});
    const user = await User.findById(req.userAuthId).populate('orders');
    res.json({
        status:'success',
        message:'User profile fetched successfully',
        user,
    })
});

// @desc    Get     user shipping address
// @route   POST /api/v1/users/update/shipping
// @access  Private
export const updateShippingAddressctrl = asyncHandler(async (req,res)=>{
    const{
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        phone,
    } = req.body;
     const user = await User.findByIdAndUpdate(req.userAuthId, {
        shippingAddress:{
            firstName,
            lastName,
            address,
            city,
            postalCode,
            province,
            phone,
            country,
        },
        hasShippingAddress:true,
     },
     {
        new:true,
     }
     );
     res.json({
        status:"success",
        message:"User shipping address updated successfully",
        user,
     })
    });
