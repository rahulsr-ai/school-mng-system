import { Schema } from "mongoose";
declare const TaskModel: import("mongoose").Model<{
    title: string;
    studentId: import("mongoose").Types.ObjectId;
    status: "Pending" | "Completed";
    description?: string | null;
    studentName?: string | null;
    dueDate?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    title: string;
    studentId: import("mongoose").Types.ObjectId;
    status: "Pending" | "Completed";
    description?: string | null;
    studentName?: string | null;
    dueDate?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    studentId: import("mongoose").Types.ObjectId;
    status: "Pending" | "Completed";
    description?: string | null;
    studentName?: string | null;
    dueDate?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    studentId: import("mongoose").Types.ObjectId;
    status: "Pending" | "Completed";
    description?: string | null;
    studentName?: string | null;
    dueDate?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    title: string;
    studentId: import("mongoose").Types.ObjectId;
    status: "Pending" | "Completed";
    description?: string | null;
    studentName?: string | null;
    dueDate?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    studentId: import("mongoose").Types.ObjectId;
    status: "Pending" | "Completed";
    description?: string | null;
    studentName?: string | null;
    dueDate?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title: string;
    studentId: import("mongoose").Types.ObjectId;
    status: "Pending" | "Completed";
    description?: string | null;
    studentName?: string | null;
    dueDate?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    studentId: import("mongoose").Types.ObjectId;
    status: "Pending" | "Completed";
    description?: string | null;
    studentName?: string | null;
    dueDate?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default TaskModel;
//# sourceMappingURL=task.model.d.ts.map