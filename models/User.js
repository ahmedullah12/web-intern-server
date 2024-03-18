import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String, required: true}
});

const UserModel = mongoose.model("users", UserSchema);

export {UserModel as User} 