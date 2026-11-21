# Backend Student Management

A RESTful Student Management API built with Node.js, Express, PostgreSQL, and TypeScript. The project provides student CRUD operations with password hashing and JWT-based authentication for role-based access.

## Features

- Create, read, update, and delete student records
- PostgreSQL-backed data storage with automatic table initialization
- Password hashing with bcrypt
- Access-token and refresh-token authentication
- Role-based authorization for `admin`, `teacher`, and `student`
- HttpOnly refresh-token cookies
- Environment-based configuration
- JSON, URL-encoded, and text request body support
- Centralized error responses

## Tech Stack

| Category | Technology |
| --- | --- |
| Runtime | Node.js |
| Language | TypeScript |
| Web framework | Express 5 |
| Database | PostgreSQL |
| PostgreSQL client | `pg` |
| Authentication | JSON Web Tokens (`jsonwebtoken`) |
| Password security | `bcryptjs` |
| Configuration | `dotenv` |
| Development runner | `tsx` |

## Project Structure

```text
src/
├── app.ts                         # Express application and middleware setup
├── server.ts                      # Database initialization and server startup
├── config/
│   └── dbconnect.ts               # Environment configuration
├── db/
│   └── db.ts                      # PostgreSQL pool and table initialization
├── middleware/
│   ├── auth.ts                    # Bearer-token and role authorization
│   ├── globalErrorHandler.ts      # Global error response
│   └── loggerMiddleware.ts        # HTTP logging middleware
└── modules/
    └── student_data/
        ├── auth/
        │   ├── login.route.ts
        │   ├── login.controller.ts
        │   └── login.service.ts
        └── create_students/
            ├── students.route.ts
            ├── students.controller.ts
            ├── students.service.ts
            └── students.interface.ts
```

## Requirements

- Node.js 18 or later
- npm
- PostgreSQL

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/student_management
JWT_SECRET=replace-with-a-long-random-access-token-secret
JWT_REFRESH_SECRET=replace-with-a-different-random-refresh-token-secret
NODE_ENV=development
```

`DATABASE_URL` is required. `JWT_SECRET` and `JWT_REFRESH_SECRET` must both be set.

### 3. Run the development server

```bash
npm run dev
```

The server starts on `http://localhost:3000` when `PORT=3000`.

### 4. Build for production

```bash
npm run build
npm start
```

The build output is written to `dist/`.

## API Overview

### Health Check

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Verify that the API is running |

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/login` | Login and receive an access token |
| `POST` | `/api/login/refresh` | Generate a new access token using the refresh-token cookie |
| `POST` | `/api/login/logout` | Clear the refresh-token cookie |

Include the access token in protected requests:

```http
Authorization: Bearer <access-token>
```

### Student Operations

| Method | Endpoint | Role | Description |
| --- | --- | --- | --- |
| `POST` | `/api/students` | `admin` | Create a student |
| `GET` | `/api/students` | `admin`, `teacher`, `student` | Get all students |
| `GET` | `/api/students/:id` | `admin`, `teacher` | Get a student by ID |
| `PUT` | `/api/students/:id` | `admin` | Update a student |
| `DELETE` | `/api/students/:id` | `admin` | Delete a student |

## Request Examples

### Login

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"password123"}'
```

### Create a Student

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access-token>" \
  -d '{
    "name":"Jane Doe",
    "email":"jane@example.com",
    "password":"password123",
    "age":20,
    "department":"Computer Science",
    "marks":88.5,
    "role":"student"
  }'
```

### Update a Student

```bash
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access-token>" \
  -d '{
    "marks":92,
    "address":"123 Main Street",
    "bio":"Final-year computer science student"
  }'
```

## Database Schema

The API initializes a `student_data` table when the server starts.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `SERIAL` | Primary key |
| `name` | `VARCHAR(100)` | Required |
| `email` | `VARCHAR(150)` | Required and unique |
| `password` | `VARCHAR(255)` | Required and bcrypt-hashed |
| `age` | `INT` | Required |
| `department` | `VARCHAR(100)` | Required |
| `marks` | `DECIMAL(5,2)` | Required; defaults to `0` |
| `role` | `VARCHAR(20)` | `admin`, `teacher`, or `student`; defaults to `student` |
| `bio` | `TEXT` | Optional |
| `address` | `TEXT` | Optional |
| `father_name` | `VARCHAR(100)` | Optional |
| `mother_name` | `VARCHAR(100)` | Optional |
| `parents_mobile_number` | `VARCHAR(20)` | Optional |
| `created_at` | `TIMESTAMP` | Set automatically |
| `updated_at` | `TIMESTAMP` | Updated during updates |

## Authentication Behavior

- Access tokens expire after 30 minutes.
- Refresh tokens expire after 3 days.
- Refresh tokens are stored in an HttpOnly cookie.
- Refresh cookies use `Secure` and `SameSite=None` in production; development uses `SameSite=Lax`.
- Protected routes validate the access token and check the student's current database role.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API in watch mode |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled production build |

## Security Notes

- Keep `JWT_SECRET`, `JWT_REFRESH_SECRET`, and `DATABASE_URL` out of source control.
- Use strong, randomly generated JWT secrets in deployed environments.
- Enable HTTPS and set `NODE_ENV=production` for secure cookie behavior.
