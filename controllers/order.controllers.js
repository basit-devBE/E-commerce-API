import Order from "../models/order.js";
import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const createOrderCtrl = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.userAuthId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
   const {orderItems,shippingAddress,totalPrice} = req.body
   if(orderItems?.length <=0 ){
         res.status(400);
         throw new Error("No order items")
   }
    //create order
    const order = await Order.create({
        user: req.userAuthId,
        orderItems,
        shippingAddress,
        totalPrice});

    user.orders.push(order._id)
    await user.save()

    for(const item of orderItems){
        const product = await Product.findById(item.productID)
        if(!product){
            res.status(404);
            throw new Error("Product not found")
        }
        if (product.totalQty < item.totalQtyBuying){
            res.status(400);
            throw new Error("Product out of stock")
        }
        console.log(product)
        product.totalQty -= item.totalQtyBuying
        await product.save()
    }
    return res.json({
        status: 200,
        message: "Order created successfully",
        data: order
    })
    
    
  
})