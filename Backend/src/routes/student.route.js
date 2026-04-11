"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const students_controller_1 = require("../controllers/students.controller");
const studentRouter = (0, express_1.Router)();
// /api/v1/admin/add-student
studentRouter.post("/add-student", students_controller_1.addNewStudent);
studentRouter.get("/student/all", students_controller_1.getAllStudents);
studentRouter.delete("/student/remove-student/:id", students_controller_1.removeStudent);
studentRouter.post("/edit-student/:id", students_controller_1.editStudent);
exports.default = studentRouter;
//# sourceMappingURL=student.route.js.map