import { Request, Response } from "express";
import { RegisterDTO } from "../types";
import prisma from '../utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req:Request, res:Response) => {
    const { email, username, password }: RegisterDTO = req.body;

    const userExists = await prisma.user.findFirst({ /** All functions related to the database should be modularized. */
        where: {
            OR:[
                { email },
                { username }
            ]
        }
    });

    if (userExists) {
        res.status(400).json({ message: 'User already exists.' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10); /** All password related functions should be modularized. */

    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword
        },
        select: {
            id: true,
            email: true,
            username: true
        }
    });

    const token = jwt.sign( /** All token related functions should be modularized. */
        {id: user.id, email: user.email, username: user.username},
        process.env.JWT_SECRET as string,
        { expiresIn: '24h'}
    );

    res.status(201).json({
        message: 'User registered successfully',
        user,
        token
    });
}
