import asyncHandler from "express-async-handler";
import Coupon from "../model/Coupon.js";


// @desc create Coupon
// @route POST /api/v1/coupons
// @access Private/Admin


export const createCouponCtrl = 
asyncHandler (async(req,res)=>{
    const {code,startDate,endDate,
    discount}=req.body
    //check if admin
    //check if coupon already exists
    const couponsExists = await Coupon.findOne({
        code,
    })
    if(couponsExists){
        throw new Error("Coupon already exists");
    }
    //check if discount is a number
    if(isNaN(discount)){
        throw new Error ("Discount value must be a number ");
    }
    //create coupon
    const coupon = await Coupon.create({
        code : code?.toUpperCase(),
        startDate,
        endDate,
        discount,
        user:req.userAuthId,
    });
    //send the respone
res.json(201).json({
    msg:"Coupon CTRL",
    message:"Coupon created successfully",
    });
});


// @desc all Coupon
// @route POST /api/v1/coupons
// @access Private/Admin

export const getAllCouponsCtrl = asyncHandler(async(req,res)=>{
    const coupons = await Coupon.find();
    res.status(200).json({
        status:"success",
        message:"All coupon",
        coupons,
    })
});

// @desc single Coupon
// @route GET /api/v1/coupons/:id
// @access Private/Admin

export const getCouponCtrl = asyncHandler(async(req,res)=> {
    const coupon = await Coupon.findById(req.params.id);
    res.json({
        status:"success",
        message:"Coupon fetched",
        coupon,
    });
});

export const updateCouponCtrl = asyncHandler(async(req,res)=>{
   const{ code,startDate,endDate,discount} =req.body

    const coupon =await Coupon.findByIdAndUpdate(
        req.params.id,{
        code:code?.toUpperCase(),
        discount,
        startDate,
        endDate,
    },
    {
        new:true,
    }
    );
    res.json({
        status:"success",
        message:"Coupon updated successfully",
        coupon,
    });
});

export const deleteCouponCtrl = asyncHandler(async(req,res)=>{
      const coupon =await Coupon.findByIdAndDelete(req.params.id);
    res.json({
        status:"success",
        message:"Coupon deleted successfully",
        coupon,
    });
});
