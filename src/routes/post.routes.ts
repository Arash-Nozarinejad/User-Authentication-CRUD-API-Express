import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { createPostValidation, updatePostValidation } from "../validators/post.validators";
import { createPost, updatePost, deletePost, getAllPosts, getUserPosts, getPost } from "../controllers/post.controller";

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPost);

router.use(authenticateToken);
router.post('/', validate(createPostValidation), createPost);
router.get('/user/posts', getUserPosts);
router.put('/:id', validate(updatePostValidation), updatePost);
router.delete('/:id', deletePost);

export default router;