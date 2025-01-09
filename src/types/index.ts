import { Request } from "express";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        username: string;
    };
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO extends LoginDTO {
    username: string;
}

export interface PostDTO {
    title: string;
    content: string;
    published?: boolean;
}