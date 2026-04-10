import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// TypeScript interface taaki req.admin par error na aaye
interface AuthRequest extends Request {
    adminId?: string;
}

export const verifyAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
       
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ 
                message: "Unauthorized: No token provided" 
            });
        }

        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as { id: string };

    res.status(200).json({ authenticated: true, message: "Admin is verified" });
      


    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ 
            message: "Unauthorized: Invalid or expired token" 
        });
    }
};