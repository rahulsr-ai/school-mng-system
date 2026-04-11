"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignHomework = assignHomework;
exports.updateHomeworkStatus = updateHomeworkStatus;
exports.getAllTasks = getAllTasks;
const express_1 = require("express");
const task_model_1 = __importDefault(require("../models/task.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const mongoose_1 = __importDefault(require("mongoose"));
async function assignHomework(req, res) {
    try {
        const { id } = req.params;
        const { title, description, dueDate } = req.body;
        const student = await student_model_1.default.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const newTask = new task_model_1.default({
            title,
            description,
            studentId: id,
            studentName: `${student.firstName} ${student.lastName}`,
            dueDate,
            status: 'Pending'
        });
        await newTask.save();
        return res.status(201).json({
            message: "Homework assigned successfully",
            task: newTask
        });
    }
    catch (error) {
        console.error("Assign Homework Error:", error);
        return res.status(500).json({ message: "Failed to assign homework" });
    }
}
// Route: /api/v1/admin/student/update/homework/:id
async function updateHomeworkStatus(req, res) {
    try {
        const { id } = req.params; // Task ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Task ID" });
        }
        const updatedTask = await task_model_1.default.findByIdAndUpdate(id, { status: 'Completed' }, { returnDocument: 'after' });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({
            message: "Task marked as completed",
            task: updatedTask
        });
    }
    catch (error) {
        console.error("Update Task Error:", error);
        return res.status(500).json({ message: "Failed to update task status" });
    }
}
// Route: /api/v1/admin/student/task/all
async function getAllTasks(req, res) {
    try {
        const tasks = await task_model_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Get Tasks Error:", error);
        return res.status(500).json({ message: "Failed to fetch tasks" });
    }
}
//# sourceMappingURL=task.controller.js.map