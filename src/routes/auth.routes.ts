import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { registerValidation, loginValidation } from "../validators/auth.validators";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', validate(registerValidation),registerUser);
router.post('/login', validate(loginValidation),loginUser);
router.get('/profile', authenticateToken, getProfile);

export default router;
