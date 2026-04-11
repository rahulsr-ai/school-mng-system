import { Request, Response } from 'express';
import StudentModel from '../models/student.model';
import mongoose from 'mongoose';

export async function addNewStudent(req: Request, res: Response) {
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


        const newStudent = new StudentModel({
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

    } catch (error: any) {
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


export async function getAllStudents(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const search = (req.query.search as string) || ""; 
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

        const students = await StudentModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalStudents = await StudentModel.countDocuments(query);

        return res.status(200).json({
            students,
            totalPages: Math.ceil(totalStudents / limit),
            currentPage: page,
            totalStudents
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching students" });
    }
}


export async function editStudent(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return res.status(400).json({ 
                message: "Invalid Student ID format" 
            });
        }

        const updatedStudent = await StudentModel.findByIdAndUpdate(
            id, 
            updateData, 
            {returnDocument: 'after', runValidators: true }
        );

      
        if (!updatedStudent) {
            return res.status(404).json({ 
                message: "Student record not found" 
            });
        }

 
        return res.status(200).json({
            message: "Student record updated successfully",
            student: updatedStudent
        });

    } catch (error: any) {
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



export async function removeStudent(req: Request, res: Response) {
    try {
        const { id } = req.params;

     
        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return res.status(400).json({ 
                message: "Invalid Student ID format" 
            });
        }

 
        const deletedStudent = await StudentModel.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ 
                message: "Student record not found" 
            });
        }

   
        return res.status(200).json({
            message: "Student record deleted successfully",
            deletedId: id
        });

    } catch (error) {
        console.error("Delete Student Error:", error);
        return res.status(500).json({ 
            message: "Failed to remove student record. Internal Server Error." 
        });
    }
}