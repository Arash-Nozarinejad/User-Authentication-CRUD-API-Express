import { Request, Response } from "express";
import { RegisterDTO, LoginDTO } from "../types";
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

export const loginUser = async(req: Request, res:Response) => {
    const { email, password }: RegisterDTO = req.body;

    const user = await prisma.user.findUnique({
        where: {email}
    });

    if (!user){
        res.status(401).json({ message: 'Invalid Credentials' });
        return;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
        res.status(401).json({ message: 'Invalid Credentials' });
        return;
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username} ,
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
    );

    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user.id,
            email: user.email,
            password: user.password
        },
        token
    });
}
