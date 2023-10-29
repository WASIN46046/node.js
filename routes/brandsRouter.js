import exppress from "express";
import { createBrandCtrl,
    getAllBrandsCtrl,
    getSingleBrandCtrl,
    updateBrandCtrl,
    deleteBrandCtrl,
 } from "../controllers/brandsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandsRouter = exppress.Router();

brandsRouter.post("/",isLoggedIn,isAdmin,createBrandCtrl);
brandsRouter.get("/",isLoggedIn,getAllBrandsCtrl);
brandsRouter.get("/:id",getSingleBrandCtrl);
brandsRouter.delete("/:id",isAdmin,isLoggedIn,deleteBrandCtrl);
brandsRouter.put("/:id",isAdmin,isLoggedIn,updateBrandCtrl);


export default brandsRouter;