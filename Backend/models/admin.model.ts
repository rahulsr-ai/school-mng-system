import { model, Schema } from "mongoose";


const admin = new Schema({

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6 
    }

}, { timestamps: true })



const AdminModel = model("admin", admin)
export default AdminModel