import express from "express";
import { User } from "../models/User.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const user = await User.findOne(query);
    res.json({status: true, user});
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

router.post("/user", async (req, res) => {
  try {
    const user = req.body;
    if (!user) {
      return res.status(400).json({ message: "Incomplete data" });
    }

    const newUser = new User(user);
    const savedUser = await newUser.save();

    res.status(200).json({ message: "User has been saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const name = req.body.name;
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id) };

    const update = { username: name }; 
    const updatedUser = await User.findOneAndUpdate(query, update, { new: true }); 

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res.status(200).json({ status: true, message: "User updated" });
    }
   catch(error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
})

export { router as UserRouter };
