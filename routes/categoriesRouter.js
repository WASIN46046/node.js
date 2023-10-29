import exppress from "express";
import categoryFileUpload from "../config/categoryUpload.js";
import { createCategoryCtrl,
    getAllCategoriesCtrl,
    getSingleCategoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl,
 } from "../controllers/categoriesCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const categoriesRouter = exppress.Router();

categoriesRouter.post("/",isLoggedIn,categoryFileUpload.single("file"),createCategoryCtrl);
categoriesRouter.get("/",isLoggedIn,getAllCategoriesCtrl);
categoriesRouter.get("/:id",getSingleCategoryCtrl);
categoriesRouter.delete("/:id",deleteCategoryCtrl);
categoriesRouter.put("/:id",updateCategoryCtrl);


export default categoriesRouter;