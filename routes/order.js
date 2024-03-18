import express from 'express';
import dotenv from "dotenv"
import { Order } from '../models/Order.js';
const router = express.Router();
dotenv.config();
import stripe from 'stripe';
const stripe1 = stripe(process.env.STRIPE_SECRET);


router.get("/orders", async (req, res) => {
  try{
    const query = {};
    const orders = await Order.find(query);
    res.status(200).json({status: true, orders});
  }
  catch(err){
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

router.get("/user-orders", async (req, res) => {
  try{
    const email = req.query.email;
    const query = {buyerEmail: email};
    const orders = await Order.find(query);
    res.status(200).json({status: true, orders});
  }
  catch(err){
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

router.get("/referedOrders", async(req, res) => {
  try{
    const email = req.query.email;
    const query = {referLinkUser: email};
    const orders = await Order.find(query, { buyerName: 1, buyerEmail: 1 });
    
    res.status(200).json({status: true, orders});
  }
  catch(err){
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
})


router.post('/create-payment-intent', async(req, res) => {
   try{
    const course = req.body;
    const priceString = course.price;
    const price = parseInt(priceString);
    const amount = price * 100;
    
    const paymentIntent = await stripe1.paymentIntents.create({
      currency: 'usd',
      amount: amount,
      payment_method_types: [
        "card"
      ]
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
   }
   catch(err){
     console.error(err);
     res.status(500).json({ status: false, message: "Internal server error" });
   }
  });

router.post("/payment", async(req, res) => {
    try{
        const order = req.body;
        const newOrder = await Order(order);
        const saveOrder = await newOrder.save();

        res.status(200).json({ status: true, message: "Order saved successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});

export {router as OrderRouter}