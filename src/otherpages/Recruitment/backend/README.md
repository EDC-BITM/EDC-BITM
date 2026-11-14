# EDC BIT Mesra Recruitment Backend

Independent Fastify + TypeScript backend connected to Neon PostgreSQL for EDC BIT Mesra student recruitment.

## 🚀 Stack

- **Runtime**: Node.js (>= 18)
- **Framework**: Fastify v5
- **Language**: TypeScript
- **Database**: Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- **Validation**: Zod
- **Security**: `@fastify/cors`, `@fastify/rate-limit`, Honeypot bot protection

---

## 📁 Directory Layout

```
src/otherpages/Recruitment/backend/
├── src/
│   ├── db/
│   │   ├── index.ts        # Neon SQL connection & health check
│   │   ├── migrate.ts      # Automated migration script
│   │   └── schema.sql      # PostgreSQL DDL
│   ├── routes/
│   │   ├── health.ts       # GET /health
│   │   └── recruitment.ts  # POST /api/recruitment
│   ├── app.ts              # Fastify app setup (CORS, Rate Limit)
│   ├── server.ts           # Server bootstrap
│   └── test-runner.ts      # Automated test suite
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `DATABASE_URL` contains your Neon PostgreSQL connection string.

### 3. Run Database Migrations
```bash
npm run migrate
```

### 4. Run Automated Test Suite
```bash
npm test
```

### 5. Start Development Server
```bash
npm run dev
```
The server will start at `http://localhost:8081`.

---

## 📡 API Endpoints

### 1. `GET /health`
* **Purpose**: Verifies server is up and executes `SELECT 1` on Neon.
* **Success (200 OK)**:
  ```json
  {
    "status": "healthy",
    "database": "connected"
  }
  ```
* **Failure (503 Service Unavailable)**:
  ```json
  {
    "status": "unhealthy",
    "database": "disconnected"
  }
  ```

### 2. `POST /api/recruitment`
* **Purpose**: Submits a student recruitment application.
* **Headers**: `Content-Type: application/json`
* **Payload Fields**:
  - `fullName` (string, required)
  - `branch` (string, required)
  - `email` (string, required, valid email)
  - `rollNumber` (string, required, accepts any university roll format)
  - `whatsappNumber` (string, required, 10-digit Indian mobile)
  - `callingNumber` (string, optional)
  - `whyJoin` (string, optional)
  - `experience` (string, optional)
  - `otherSocieties` (string, optional)
  - `commitment` (string, optional)
  - `subTeams` (string[], required, 1 to 2 teams)
  - `discoverySource` (string, required)
  - `portfolioLink` (string, optional)
  - `resumeLink` (string, optional)
  - `campusIdeas` (string, optional)
* **Success (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Application submitted successfully",
    "applicationId": 1
  }
  ```
* **Duplicate Roll Number or Email (409 Conflict)**:
  ```json
  {
    "success": false,
    "message": "An application with this roll number has already been submitted."
  }
  ```
* **Validation Error (400 Bad Request)**:
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": { "email": ["Invalid email format"] }
  }
  ```

---

## ☁️ Render Deployment Guide

1. Log into your **personal Render account** at [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository (`EDC-BITM`).
4. Configure the service settings:
   - **Name**: `edc-recruitment-backend`
   - **Region**: Oregon (or Singapore / Frankfurt, closest to Neon DB region)
   - **Branch**: `master` (or your active branch)
   - **Root Directory**: `src/otherpages/Recruitment/backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
5. Under **Environment Variables**, add:
   - `DATABASE_URL`: *(Your Neon PostgreSQL connection string)*
   - `PORT`: `8080` (or leave default, Render sets this automatically)
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: `https://edcbitmesra.in`
   - `FRONTEND_URL`: `https://www.edcbitmesra.in`
6. Click **Create Web Service**.
7. Once deployed, copy your Render public URL (e.g., `https://edc-recruitment-backend.onrender.com`).
