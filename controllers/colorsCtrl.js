import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";
import Color from "../model/Color.js";


// @desc Create new color
// @route POST /api/v1/categories
// @access Private/Admin

export const createColorCtrl = asyncHandler(async(req,res)=>{
    const{name } = req.body;
    //color exists
    const colorFound = await Color.findOne({ name })
    if(colorFound){
        throw new Error ('color already exists')
    }
    //create
    const color = await Color.create({
    name:name.toLowerCase(),
    user: req.userAuthId,
    });
    res.json({
        status:"success",
        message: "color created successfully",
        color,
    }); 
});

// @desc Get all color
// @route GET /api/v1/categories    
// @access Public

export const getAllColorsCtrl = asyncHandler(async(req,res)=>{
   const colors = await Color.find();
    res.json({
        status:"success",
        message: "Colors fetched successfully",
        colors,
    });  
});


// @desc Get single color
// @route GET /api/v1/categories/:id  
// @access Public

export const getSingleColorCtrl = asyncHandler(async(req,res)=>{
    const color = await Color.findById(req.params.id);
     res.json({
         status:"success",
         message: "color fetched successfully",
         color,
     });  
 });

// @desc Update color
// @route PUT /api/categories/:id  
// @access Public/Admin

 export const updateColorCtrl = asyncHandler(async(req,res)=>{
    const {name} =req.body;

  //update
  const color = await Color.findByIdAndUpdate(
    req.params.id,
     {
      name,
    },{
      new:true,
    }); 
    res.json({
      status:"success",
      message:"color fetched successfully",
      color,
    });
  });

  // @des delete color
// @route DELETE /api/v1/color/:id/delete
// @access Private/Admin

export const deleteColorCtrl = asyncHandler(async(req, res)=>{
    await Color.findByIdAndDelete(req.params.id);
   res.json({
     status:"success",
     message:"color delete successfully",
   });
 });