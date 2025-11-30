# EDC Server - Authentication & Article Management API

A robust REST API built with Fastify, Prisma, and MongoDB featuring JWT authentication, role-based access control, and article management.

## 🚀 Features

- ✅ **User Authentication**
  - Register with email and password
  - Secure login with JWT tokens
  - Access tokens (15 min) and refresh tokens (7 days)
  - Password hashing with bcrypt
  - HttpOnly cookies for refresh tokens

- 🔐 **Security**
  - Role-based access control (USER, ADMIN, MODERATOR)
  - Password validation (min 8 chars, uppercase, lowercase, number)
  - Email validation
  - Protected routes with authentication middleware

- 📝 **Article Management**
  - CRUD operations for articles
  - Author-based access control
  - Published/draft status
  - Pagination and search
  - Rich content support (JSON)

- 🛠️ **Developer Experience**
  - TypeScript for type safety
  - Prisma ORM for database operations
  - MongoDB support
  - Hot reload with nodemon
  - Structured error handling
  - Request logging

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd edc-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and update the values:
   - `DATABASE_URL`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret for JWT tokens
   - `REFRESH_SECRET`: A different strong secret for refresh tokens
   - `COOKIE_SECRET`: Secret for cookie signing

4. **Generate Prisma client and push schema**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:8080`

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints



#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..." // Optional if cookie is set
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

#### Update Profile
```http
PATCH /api/auth/me
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Jane Doe"
}
```

### Article Endpoints

#### Get All Articles
```http
GET /api/articles?page=1&limit=10&search=keyword
```

Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search by title

#### Get Single Article
```http
GET /api/articles/:id
```

#### Get My Articles
```http
GET /api/articles/my/articles?page=1&limit=10
Authorization: Bearer <access_token>
```

#### Create Article
```http
POST /api/articles
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "My Awesome Article",
  "content": {
    "blocks": [
      {
        "type": "paragraph",
        "data": { "text": "Article content here..." }
      }
    ]
  },
  "published": false
}
```

#### Update Article
```http
PATCH /api/articles/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true
}
```

#### Delete Article
```http
DELETE /api/articles/:id
Authorization: Bearer <access_token>
```

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id                   String
  email                String   @unique
  name                 String
  password             String
  role                 Role     @default(USER)
  isEmailVerified      Boolean  @default(false)
  emailVerifyToken     String?
  resetPasswordToken   String?
  resetPasswordExpires DateTime?
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  articles             Article[]
  refreshTokens        RefreshToken[]
}
```

### Article Model
```prisma
model Article {
  id        String   @id
  title     String
  content   Json
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(...)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### RefreshToken Model
```prisma
model RefreshToken {
  id        String   @id
  token     String   @unique
  userId    String
  user      User     @relation(...)
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

### Roles
- `USER`: Default role, can create and manage own articles
- `MODERATOR`: Can moderate content
- `ADMIN`: Full access to all resources

## 🔧 Development

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Format code with Biome
npx biome format --write .

# Lint code
npx biome lint .
```

## 📁 Project Structure

```
edc-server/
├── src/
│   ├── index.ts              # Main server file
│   ├── middleware/
│   │   └── auth.ts           # Authentication middleware
│   ├── routes/
│   │   ├── auth/
│   │   │   └── index.ts      # Auth routes
│   │   └── article/
│   │       └── index.ts      # Article routes
│   └── utils/
│       ├── jwt.ts            # JWT utilities
│       ├── password.ts       # Password utilities
│       └── validation.ts     # Input validation
├── prisma/
│   └── schema.prisma         # Database schema
├── generated/
│   └── prisma/               # Generated Prisma client
├── .env                      # Environment variables
├── .env.example              # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## 🚦 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `409`: Conflict (duplicate resource)
- `500`: Internal Server Error

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It contains sensitive secrets
2. **Use strong secrets** - Generate random strings for JWT_SECRET, REFRESH_SECRET, and COOKIE_SECRET
3. **Enable HTTPS in production** - Set `secure: true` for cookies
4. **Rotate refresh tokens** - Implement token rotation on refresh
5. **Rate limiting** - Add rate limiting middleware in production
6. **Input validation** - All inputs are validated before processing

## 📝 License

MIT

## 👨‍💻 Author

Built with ❤️ using Fastify, Prisma, and MongoDB
