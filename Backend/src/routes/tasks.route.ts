import { Router } from "express"
import { assignHomework, getAllTasks, updateHomeworkStatus } from "../controllers/task.controller"

const taskRouter = Router()


// /api/v1/admin/student/assign-homework/:id
// /api/v1/admin/student/update/homework/:id
// /api/v1/admin/student/task/all
// /api/v1/student


taskRouter.post("/assign-homework/:id", assignHomework)
taskRouter.post("/update/homework/:id", updateHomeworkStatus)
taskRouter.get("/task/all", getAllTasks)


export default taskRouter