"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    studentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'student', required: true },
    studentName: { type: String }, // Quick access ke liye
    dueDate: { type: Date },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
}, { timestamps: true });
const TaskModel = (0, mongoose_1.model)("task", taskSchema);
exports.default = TaskModel;
//# sourceMappingURL=task.model.js.map