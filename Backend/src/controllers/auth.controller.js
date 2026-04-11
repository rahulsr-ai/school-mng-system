"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.logoutAdmin = exports.loginAdmin = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both credentials" });
        }
        const user = await admin_model_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT Secret is not defined" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret, { expiresIn: '1d' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            path: '/'
        }).json({
            message: "Login Successful",
            user: { email: user.email }
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.loginAdmin = loginAdmin;
const logoutAdmin = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            sameSite: 'lax',
            path: '/'
        }).status(200).json({
            message: "Logged out successfully"
        });
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.logoutAdmin = logoutAdmin;
const verifyAdmin = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token provided"
        });
    }
    // 2. Token ko verify karna
    const secret = process.env.JWT_SECRET;
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    res.status(200).json({ authenticated: true, message: "Admin is verified" });
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=auth.controller.js.map