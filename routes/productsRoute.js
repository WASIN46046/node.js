import exppress from 'express';
import upload from '../config/fileUpload.js';
import { 
    createProductCtrl,  
    getProductCtrl,
    getProductsCtrl,
    updateProductCtrl,
    deleteProductCtrl, } from "../controllers/productsCtrl.js";
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from "../middlewares/isAdmin.js";


const productsRouter =exppress.Router();

productsRouter.post("/",upload.array('files'),isAdmin,isLoggedIn,createProductCtrl);
productsRouter.get("/",getProductsCtrl);
productsRouter.get("/:id",getProductCtrl);
productsRouter.put("/:id",isLoggedIn,isAdmin,updateProductCtrl);
productsRouter.delete("/:id/delete",isLoggedIn,isAdmin,deleteProductCtrl);

export default productsRouter;