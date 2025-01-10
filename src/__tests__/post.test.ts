import request from 'supertest';
import app from '../index';
import prisma from '../utils/prisma';

describe('Posts Endpoints', () => {
  let authToken: string;
  let userId: number;

  const testUser = {
    email: 'test@test.com',
    username: 'testuser',
    password: 'password123'
  };

  const testPost = {
    title: 'Test Post',
    content: 'This is a test post content',
    published: true
  };

  beforeAll(async () => {
    // Register and login a test user
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    authToken = res.body.token;
    userId = res.body.user.id;
  });

  beforeEach(async () => {
    await prisma.post.deleteMany({});
  });

  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testPost);

      expect(res.status).toBe(201);
      expect(res.body.post).toHaveProperty('title', testPost.title);
    });

    it('should not create post without auth', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send(testPost);

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/posts', () => {
    beforeEach(async () => {
      await prisma.post.create({
        data: {
          ...testPost,
          authorId: userId
        }
      });
    });

    it('should get all published posts', async () => {
      const res = await request(app).get('/api/posts');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(1);
    });
  });

  describe('PUT /api/posts/:id', () => {
    let postId: number;

    beforeEach(async () => {
      const post = await prisma.post.create({
        data: {
          ...testPost,
          authorId: userId
        }
      });
      postId = post.id;
    });

    it('should update a post', async () => {
      const updates = {
        title: 'Updated Title',
        content: 'Updated content'
      };

      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates);

      expect(res.status).toBe(200);
      expect(res.body.post.title).toBe(updates.title);
    });
  });

  describe('DELETE /api/posts/:id', () => {
    let postId: number;

    beforeEach(async () => {
      const post = await prisma.post.create({
        data: {
          ...testPost,
          authorId: userId
        }
      });
      postId = post.id;
    });

    it('should delete a post', async () => {
      const res = await request(app)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      
      const deletedPost = await prisma.post.findUnique({
        where: { id: postId }
      });
      expect(deletedPost).toBeNull();
    });
  });
});
