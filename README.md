# Express TypeScript User Authentication & CRUD API

A REST API built with Express.js and TypeScript, featuring user authentication and CRUD operations for posts.

## 🛠 Technologies Used

- **TypeScript** - Static typing and modern JavaScript features
- **Express.js** - Web framework for Node.js
- **Prisma** - Next-generation ORM for Node.js
- **PostgreSQL** - Open-source relational database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Jest & Supertest** - Testing framework and HTTP assertions
- **express-validator** - Input validation middleware

## ✨ Features

- **User Authentication**
  - Registration with email & password
  - Login with JWT token generation
  - Protected routes
  - Password hashing

- **Post Management**
  - Create, read, update, and delete posts
  - Public and private post viewing
  - User-specific post management
  - Input validation

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/basic-crud-auth-api.git
   cd basic-crud-auth-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file and add:
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/basic_crud_db"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```

4. **Set up the database**
   ```bash
   # Start PostgreSQL and create database
   npx prisma migrate dev
   ```

5. **Run the application**
   ```bash
   # Development
   npm run dev

   # Production
   npm run build
   npm start
   ```

## 🧪 Testing

```bash
# Create test database and run tests
npm test
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Posts
- `GET /api/posts` - Get all published posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `GET /api/posts/user/posts` - Get user's posts (protected)

## 📌 Project Structure

```
src/
├── controllers/     # Route controllers
├── middlewares/     # Custom middlewares
├── routes/         # Route definitions
├── utils/          # Helper functions
├── validators/     # Input validators
├── types/          # TypeScript types
└── __tests__/      # Test files
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation and sanitization
- Protected routes with middleware
- Error handling middleware
- TypeScript type safety
