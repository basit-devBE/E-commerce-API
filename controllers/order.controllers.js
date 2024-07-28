import Order from "../models/order.js";
import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.stripe_key)
export const createOrderCtrl = expressAsyncHandler(async (req, res) => {
    const {orderItems,shippingAddress,totalPrice} = req.body
    const user = await User.findById(req.userAuthId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    } 
    if(!user?.hasShippingAddress){
        res.status(400);
        throw new Error("User has no shipping address")
    }

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
        product.totalQty -= item.totalQtyBuying
        product.totalSold += item.totalQtyBuying
        await product.save()
    }
    const convertedItems = orderItems.map((items)=>{
        return{
            price_data:{
                currency: "usd",
                product_data:{
                    name: items?.name,
                    description: items?.description,
                },
                unit_amount: items?.price * 100
            },
            quantity: items?.totalQtyBuying
            }
    })

    const session = await stripe.checkout.sessions.create({
        line_items: convertedItems,    
        mode : 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url :'http://localhost:3000/cancel'  
    });
    res.send({url: session.url})
    // return res.json({
    //     status: 200,
    //     message: "Order created successfully",
    //     data: order
    // })
    
    
  
})