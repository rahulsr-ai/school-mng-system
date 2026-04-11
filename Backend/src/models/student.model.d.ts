import { Schema } from "mongoose";
declare const StudentModel: import("mongoose").Model<{
    firstName: string;
    parentName: string;
    mobileNumber: string;
    class: string;
    section: string;
    rollno: number;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    firstName: string;
    parentName: string;
    mobileNumber: string;
    class: string;
    section: string;
    rollno: number;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    firstName: string;
    parentName: string;
    mobileNumber: string;
    class: string;
    section: string;
    rollno: number;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    firstName: string;
    parentName: string;
    mobileNumber: string;
    class: string;
    section: string;
    rollno: number;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    firstName: string;
    parentName: string;
    mobileNumber: string;
    class: string;
    section: string;
    rollno: number;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    firstName: string;
    parentName: string;
    mobileNumber: string;
    class: string;
    section: string;
    rollno: number;
    lastName?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    firstName: string;
    parentName: string;
    mobileNumber: string;
    class: string;
    section: string;
    rollno: number;
    lastName?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    firstName: string;
    parentName: string;
    mobileNumber: string;
    class: string;
    section: string;
    rollno: number;
    lastName?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default StudentModel;
//# sourceMappingURL=student.model.d.ts.map