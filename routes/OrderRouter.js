import express from 'express'
import { isLoggedIn } from '../middlewares/isloggedin.js';
import { createOrderCtrl } from '../controllers/order.controllers.js';


const OrderRouter = express.Router();
OrderRouter.post("/api/v1/orders/create/:id", isLoggedIn,createOrderCtrl)

export default OrderRouter;