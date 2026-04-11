import { Request, Response } from 'express';
import TaskModel from '../models/task.model';
import StudentModel from '../models/student.model';
import mongoose from 'mongoose';


export async function assignHomework(req: Request, res: Response) {
    try {
        const { id } = req.params; 
        const { title, description, dueDate } = req.body;

        const student = await StudentModel.findById(id as string);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const newTask = new TaskModel({
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

    } catch (error) {
        console.error("Assign Homework Error:", error);
        return res.status(500).json({ message: "Failed to assign homework" });
    }
}


// Route: /api/v1/admin/student/update/homework/:id
export async function updateHomeworkStatus(req: Request, res: Response) {
    try {
        const { id } = req.params; // Task ID

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return res.status(400).json({ message: "Invalid Task ID" });
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { status: 'Completed' },
            { returnDocument: 'after' }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task marked as completed",
            task: updatedTask
        });

    } catch (error) {
        console.error("Update Task Error:", error);
        return res.status(500).json({ message: "Failed to update task status" });
    }
}


export async function deleteSpecificTask(req: Request, res: Response) {
    try {
        const { taskId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(taskId as string)) {
            return res.status(400).json({ 
                message: "Invalid Task ID format" 
            });
        }

        // 2. Task ko delete karo
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        // 3. Agar task nahi mila (already deleted ya galat ID)
        if (!deletedTask) {
            return res.status(404).json({ 
                message: "Task not found" 
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully",
            deletedId: taskId
        });

    } catch (error) {
        console.error("Delete Task Error:", error);
        return res.status(500).json({ 
            message: "Internal Server Error while deleting task" 
        });
    }
}



// Route: /api/v1/admin/student/task/all
export async function getAllTasks(req: Request, res: Response) {
    try {
      
        const tasks = await TaskModel.find().sort({ createdAt: -1 });

        return res.status(200).json(tasks);

    } catch (error) {
        console.error("Get Tasks Error:", error);
        return res.status(500).json({ message: "Failed to fetch tasks" });
    }
}