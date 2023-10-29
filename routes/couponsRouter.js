import exppress from"express";
import { createCouponCtrl,
        getAllCouponsCtrl,
        getCouponCtrl,
        updateCouponCtrl,
        deleteCouponCtrl,} from "../controllers/couponsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponsRouter = exppress.Router();

couponsRouter.post("/",isLoggedIn,isAdmin,createCouponCtrl);

couponsRouter.get("/",getAllCouponsCtrl);
couponsRouter.put("/update/:id", isLoggedIn,isAdmin,updateCouponCtrl);
couponsRouter.delete("/delete/:id", isAdmin,isLoggedIn,deleteCouponCtrl);
couponsRouter.get("/single",getCouponCtrl);

export default couponsRouter;