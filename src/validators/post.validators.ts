import { body } from "express-validator";

export const createPostValidation = [
    body('title').isString().trim().isLength({ min:3 }).withMessage('Title must be at least 3 characters long'),
    body('content').isString().trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters long'),
    body('published').optional().isBoolean().withMessage('Published must be a boolean')
];

export const updatePostValidation = [
    body('title').optional().isString().trim().isLength({ min:3 }).withMessage('Title must be at least 3 characters long'),
    body('content').optional().isString().trim().isLength({ min:10 }).withMessage('Content must be at least 10 characters long'),
    body('published').optional().isBoolean().withMessage('Published must be a boolean')
];