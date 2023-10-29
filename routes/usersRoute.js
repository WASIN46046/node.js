import exppress from 'express';
import { 
    registerUserCtrl,
    loginUserCtrl,
    getUserProfileCtrl,
    updateShippingAddressctrl
 } from '../controllers/usersCtrl.js';
 
import {isLoggedIn} from "../middlewares/isLoggedIn.js";


const userRoutes =exppress.Router();

userRoutes.post("/register",registerUserCtrl);
userRoutes.post("/login",loginUserCtrl);
userRoutes.get("/profile",isLoggedIn,getUserProfileCtrl);
userRoutes.put("/update/shipping",isLoggedIn,updateShippingAddressctrl);


export default userRoutes;