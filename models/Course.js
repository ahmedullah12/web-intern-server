import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    courseName: {type: String, required: true},
    thumbnail: {type: String, required: true},
    details: {type: String, required: true, unique: true},
    instructor: {type: String, required: true},
    price: {type: Number, required: true}
});

const CourseModel = mongoose.model("courses", courseSchema);

export {CourseModel as Course}