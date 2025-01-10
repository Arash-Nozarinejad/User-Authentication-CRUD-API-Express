import prisma from '../utils/prisma'
import { Response, Request } from "express";
import { AuthRequest, PostDTO } from "../types";

export const createPost = async (req: AuthRequest, res: Response) => {
    const { title, content, published = false }: PostDTO = req.body;

    const userId = req.user!.id;

    const post = await prisma.post.create({
        data: {
            title, content, published, authorId: userId
        },
        include: {
            author: {
                select: {
                    username: true,
                    email: true
                }
            }
        }
    });

    res.status(201).json({
        message: 'Post created successfully',
        post
    });
}

export const getAllPosts = async(req: Request, res: Response) => {
    const posts = await prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            author: {
                select: {
                    username: true,
                    
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.json(posts);
}

export const getUserPosts = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    const posts = await prisma.post.findMany({
        where: {
            authorId: userId
        },
        include: {
            author: {
                select: {
                    username: true,
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.json(posts);
}

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            author: {
                select: {
                    username: true,
                    email: true
                }
            }
        }
    });

    if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }

    if (!post.published) {
        res.status(403).json({ message: 'Post not available' });
    }

    res.json(post);
}

export const updatePost = async(req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const updates: PostDTO = req.body;

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }

    if (post.authorId !== userId) {
        res.status(403).json({ message: 'not authorized' });
        return;
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: Number(id)
        },
        data: updates,
        include: {
            author: {
                select: {
                    username: true,
                    email: true
                }
            }
        }
    });

    res.json({
        message: 'Post updated successfully',
        post: updatedPost
    });
}

export const deletePost = async(req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!post){
        res.status(404).json({ message: 'post not found' });
        return;
    }

    if (post.authorId !== userId) {
        res.status(403).json({ message: 'unauthorized' });
        return;
    }

    await prisma.post.delete({
        where: {
            id: Number(id)
        }
    });

    res.json({
        message: 'post deleted successfully'
    });
}
