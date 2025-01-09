import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import jwt from 'jsonwebtoken';

export const authenticateToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if (!token){
            res.status(401).json({ message: 'Authentication token required!' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

        req.user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.user
        };

        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
        return;
    }
}