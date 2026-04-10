import { model, Schema } from "mongoose";




const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    studentId: { type: Schema.Types.ObjectId, ref: 'student', required: true },
    studentName: { type: String }, // Quick access ke liye
    dueDate: { type: Date },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
}, { timestamps: true });



const TaskModel = model("task", taskSchema);
export default TaskModel;