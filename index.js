import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import { UserRouter } from "./routes/user.js";
import { CourseRouter } from "./routes/course.js";
import { OrderRouter } from "./routes/order.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000

// middlewares
app.use(express.json());
app.use(cors({
    origin: "https://web-interns.netlify.app/",
    credentials: true,
}));



mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ttiygsx.mongodb.net/web-intern`)

app.use("/app", UserRouter);
app.use("/app", CourseRouter);
app.use("/app", OrderRouter);



// 
// 

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})