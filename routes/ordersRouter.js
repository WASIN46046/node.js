import exppress from "express";
import { 
    createOrderCtrl,
    getAllordersCtrl,
    getSingleOrderCtrl,
    updateOrderCtrl,
    getOrderStatsCtrl,
} from "../controllers/orderCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRouter = exppress.Router();

orderRouter.post("/",isLoggedIn,createOrderCtrl);
orderRouter.get("/",isLoggedIn,getAllordersCtrl);
orderRouter.get("/sales/stats",isLoggedIn,getOrderStatsCtrl);
orderRouter.get("/:id",isLoggedIn,getSingleOrderCtrl);
orderRouter.put("/update/:id",isLoggedIn,updateOrderCtrl);
export default orderRouter;