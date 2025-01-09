import { body } from "express-validator";

export const registerValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('username').isLength({ min: 3 }).withMessage('username must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long')
];

export const loginValidation = [
    body('Email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('password is required')
];