import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import AdminModel from '../models/admin.model';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both credentials" })
    }

    const user = await AdminModel.findOne({ email });

    if (!user) {
      const Newpassword = await bcrypt.hash(password, 10)
      AdminModel.create({
        email: email,
        password: Newpassword 
      })
      return res.status(401).json({ message: "Invalid credentials Try Again " });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT Secret is not defined" });
    }

    const token = jwt.sign(
      { id: user._id },
      secret as string,
      { expiresIn: '1d' }
    );


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

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const logoutAdmin = async (req: Request, res: Response) => {
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

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const verifyAdmin = async (req: Request, res: Response) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided"
    });
  }

  // 2. Token ko verify karna
  const secret = process.env.JWT_SECRET as string;
  const decoded = jwt.verify(token, secret) as { id: string };


  res.status(200).json({ authenticated: true, message: "Admin is verified" });
}