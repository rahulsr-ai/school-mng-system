"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
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
// 🛡️ UNIQUE CONSTRAINT (Compound Index)
// Ek hi Class aur Section mein same Roll Number repeat nahi ho sakta.
studentSchema.index({ class: 1, section: 1, rollno: 1 }, { unique: true });
const StudentModel = (0, mongoose_1.model)("student", studentSchema);
exports.default = StudentModel;
//# sourceMappingURL=student.model.js.map