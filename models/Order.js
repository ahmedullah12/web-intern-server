import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  courseName: { type: String, required: true },
  courseId: { type: String, required: true },
  price: { type: String, required: true },
  date: { type: String, required: true },
  referLinkUser: { type: String},
});

const OrderModel = mongoose.model("orders", OrderSchema);
export {OrderModel as Order};
