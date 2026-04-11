"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewStudent = addNewStudent;
exports.getAllStudents = getAllStudents;
exports.editStudent = editStudent;
exports.removeStudent = removeStudent;
const express_1 = require("express");
const student_model_1 = __importDefault(require("../models/student.model"));
const mongoose_1 = __importDefault(require("mongoose"));
async function addNewStudent(req, res) {
    try {
        const { firstName, lastName, parentName, mobileNumber, class: studentClass, section, rollno } = req.body;
        if (!firstName || !parentName || !mobileNumber || !studentClass || !rollno) {
            return res.status(400).json({
                message: "Please provide all required fields."
            });
        }
        if (mobileNumber.length !== 10) {
            return res.status(400).json({
                message: "Mobile number must be exactly 10 digits."
            });
        }
        const newStudent = new student_model_1.default({
            firstName,
            lastName,
            parentName,
            mobileNumber,
            class: studentClass,
            section: section || "A",
            rollno
        });
        await newStudent.save();
        return res.status(201).json({
            message: "Student enrolled successfully!",
            student: newStudent
        });
    }
    catch (error) {
        console.error("Add Student Error:", error);
        // Handle MongoDB Duplicate Key Error (Code 11000)
        if (error.code === 11000) {
            return res.status(409).json({
                message: "A student with this Roll Number already exists in this class and section."
            });
        }
        return res.status(500).json({
            message: "Failed to add new Student. Internal Server Error."
        });
    }
}
async function getAllStudents(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const search = req.query.search || "";
        const limit = 10;
        const skip = (page - 1) * limit;
        const query = search
            ? {
                $or: [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { parentName: { $regex: search, $options: 'i' } }
                ]
            }
            : {};
        const students = await student_model_1.default.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const totalStudents = await student_model_1.default.countDocuments(query);
        return res.status(200).json({
            students,
            totalPages: Math.ceil(totalStudents / limit),
            currentPage: page,
            totalStudents
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching students" });
    }
}
async function editStudent(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Student ID format"
            });
        }
        const updatedStudent = await student_model_1.default.findByIdAndUpdate(id, updateData, { returnDocument: 'after', runValidators: true });
        if (!updatedStudent) {
            return res.status(404).json({
                message: "Student record not found"
            });
        }
        return res.status(200).json({
            message: "Student record updated successfully",
            student: updatedStudent
        });
    }
    catch (error) {
        console.error("Edit Student Error:", error);
        //  Duplicate Roll Number Handle (MongoDB 11000 error)
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Conflict: This roll number is already assigned in this class/section."
            });
        }
        return res.status(500).json({
            message: "Failed to update student record. Internal Server Error."
        });
    }
}
async function removeStudent(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Student ID format"
            });
        }
        const deletedStudent = await student_model_1.default.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({
                message: "Student record not found"
            });
        }
        return res.status(200).json({
            message: "Student record deleted successfully",
            deletedId: id
        });
    }
    catch (error) {
        console.error("Delete Student Error:", error);
        return res.status(500).json({
            message: "Failed to remove student record. Internal Server Error."
        });
    }
}
//# sourceMappingURL=students.controller.js.map