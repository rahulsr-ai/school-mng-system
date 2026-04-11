import { model, Schema } from "mongoose";

const studentSchema = new Schema({
    firstName: { 
        type: String, 
        required: [true, "First name is required"],
        trim: true
    },
    lastName: { 
        type: String,
        trim: true
    },
    parentName: {
        type: String,
        required: [true, "Parent name is required"],
        trim: true
    },
    mobileNumber: {
        type: String,
        required: [true, "Mobile number is required"],
        match: [/^[0-9]{10}$/, "Please provide a valid 10-digit mobile number"]
    },
    class: { 
        type: String,
        required: [true, "Class is required"],
        uppercase: true 
    },
    section: { 
        type: String,
        required: [true, "Section is required"],
        uppercase: true,
        default: "A"
    },
    rollno: { 
        type: Number,
        required: [true, "Roll number is required"]
    }
}, { timestamps: true });


studentSchema.index({ class: 1, section: 1, rollno: 1 }, { unique: true });

const StudentModel = model("student", studentSchema);
export default StudentModel;