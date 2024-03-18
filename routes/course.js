import express from "express"
import {Course} from "../models/Course.js"
import mongoose from "mongoose";


const router = express.Router();

router.get("/courses", async(req,res) => {
    try{
        const query = {}
        const courses = await Course.find(query);
        res.json({status: true, courses});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
router.get("/limited-courses", async(req,res) => {
    try{
        const query = {}
        const courses = await Course.find(query).limit(3);
        res.json({status: true, courses});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});

router.get("/course/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const query = { _id: new mongoose.Types.ObjectId(id) };
        const course = await Course.findOne(query);
        res.json({status: true, course});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
})
router.post("/course", async(req, res) => {
    try{
        const course = req.body;
        if(!course) return res.status(400).json({ message: "Incomplete data" });

        const newCourse = new Course(course);
        const savedCourse = await newCourse.save();
        res.status(200).json({ message: "Course has been added" });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});

router.put('/course/:id', async(req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const course = req.body;
        if(!course) return res.status(400).json({ message: "Incomplete data" });
        
        const updatedCourse = await Course.findByIdAndUpdate(id, course, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({message: "Course updated"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});

router.delete("/course/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const deletedCourse = await Course.findByIdAndDelete(id);
        res.status(200).json({ message: "Course has been deleted" });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
})



export {router as CourseRouter};