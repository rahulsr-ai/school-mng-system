import { Router } from "express"
import { addNewStudent, editStudent, getAllStudents, removeStudent } from "../controllers/students.controller"

const studentRouter = Router()


// /api/v1/admin/add-student
studentRouter.post("/add-student", addNewStudent)
studentRouter.get("/student/all", getAllStudents)
studentRouter.delete("/student/remove-student/:id", removeStudent)
studentRouter.post("/edit-student/:id",  editStudent)



export default studentRouter