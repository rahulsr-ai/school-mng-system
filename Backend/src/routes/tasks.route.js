"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const taskRouter = (0, express_1.Router)();
// /api/v1/admin/student/assign-homework/:id
// /api/v1/admin/student/update/homework/:id
// /api/v1/admin/student/task/all
// /api/v1/student
taskRouter.post("/assign-homework/:id", task_controller_1.assignHomework);
taskRouter.post("/update/homework/:id", task_controller_1.updateHomeworkStatus);
taskRouter.get("/task/all", task_controller_1.getAllTasks);
exports.default = taskRouter;
//# sourceMappingURL=tasks.route.js.map