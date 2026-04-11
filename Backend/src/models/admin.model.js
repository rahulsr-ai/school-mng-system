"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const admin = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6
    }
}, { timestamps: true });
const AdminModel = (0, mongoose_1.model)("admin", admin);
exports.default = AdminModel;
//# sourceMappingURL=admin.model.js.map