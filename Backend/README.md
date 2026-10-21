# EduFlow – Backend (REST API)

REST API for the EduFlow course enrollment system, built with **Node.js**, **Express** and **MongoDB**.
It handles user accounts, courses, batches, enrollments and an admin dashboard.

- **Live API:** https://assignment-06-web-sem3.onrender.com/api
- **Try it:** https://assignment-06-web-sem3.onrender.com/api/courses
- **Frontend:** https://assignment-06-web-sem3.vercel.app

> Hosted on Render's free plan: the first request after 15 minutes of no activity can take about 1 minute.

---

## Features

- Register and login with **JWT** tokens (valid for 7 days)
- Passwords are **hashed with bcrypt** before saving
- Two roles: **admin** and **student** (every new registration is a student)
- Courses: list, **search** by title or course code, view, create, update, delete
- Batches: list the batches of a course with **occupied seats** and **seats left**
- Enrollments: students enroll in batches and see their own enrollments
- Admin can see who is enrolled in a batch and change an enrollment's status
- Admin dashboard with total courses, active batches, total enrollments and most popular course
- **Rules that protect the data:**
  - a student cannot enroll twice in the same course
  - a student cannot join a batch that is full
  - a course that has batches or enrollments cannot be deleted
  - a batch that has enrollments cannot be deleted
  - course codes are unique and saved in UPPERCASE
- **Central error handler** for wrong IDs, validation errors and duplicate course codes
- **404 response** for unknown routes
- **CORS** allows only the frontend address set in `CLIENT_URL`
- **Seed script** that fills the database with sample data

---

## Tech Stack

| Package | Use |
|---------|-----|
| express | Web server and routing |
| mongoose | MongoDB models and queries |
| jsonwebtoken | Create and check login tokens |
| bcryptjs | Hash and compare passwords |
| cors | Allow requests from the frontend |
| dotenv | Read settings from the `.env` file |

---

## Folder Structure

```
Backend/
├── config/
│   └── db.js                    # Connects to MongoDB
├── controllers/
│   ├── authController.js        # register, login, get current user
│   ├── courseController.js      # course CRUD and search
│   ├── batchController.js       # batch CRUD and seat count
│   ├── enrolmentController.js   # enroll, my enrollments, batch enrollments, status update
│   └── dashboardController.js   # admin statistics
├── middlewares/
│   ├── authHandler.js           # Checks the JWT token and loads the user
│   ├── allowRoles.js            # Allows only a given role (admin / student)
│   └── errorHandler.js          # Sends clean error messages
├── models/
│   ├── users.js                 # User schema
│   ├── course.js                # Course schema
│   ├── batch.js                 # Batch schema
│   └── entrollment.js           # Enrollment schema
├── routes/
│   ├── authRoute.js
│   ├── courseRoute.js
│   ├── batchRouter.js
│   ├── enrollmentRoute.js
│   └── dashboardRoute.js
├── app.js                       # Server entry point
├── seed.js                      # Sample data script
└── package.json
```

---

## Getting Started

### Requirements
- Node.js **20.19 or newer**
- MongoDB running locally, or a MongoDB Atlas connection string

### Install
```bash
cd Backend
npm install
```

### Create `.env`
```env
MONGO_URI=mongodb://127.0.0.1:27017/assignment_6
JWT_SECRET=write_any_long_random_text_here
CLIENT_URL=http://localhost:5173
PORT=8000
```

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB connection string |
| `LOCAL_HOST` | No | Backup connection string, used only if `MONGO_URI` is empty |
| `JWT_SECRET` | Yes | Secret used to sign tokens |
| `CLIENT_URL` | Yes (in production) | Frontend address allowed by CORS. If empty, every site is allowed |
| `PORT` | No | Server port. Default is `5000`. On a Mac use `8000`, because macOS uses port 5000 for AirPlay |

### Scripts

| Command | What it does |
|---------|--------------|
| `npm start` | Starts the server (`node app.js`) |
| `npm run seed` | **Deletes** all users, courses, batches and enrollments, then adds sample data |

### Sample data (from `npm run seed`)
- 1 admin and 5 student accounts (emails and passwords are in `seed.js`)
- 10 courses
- 6 batches (start dates 1–3 weeks from the day you run the seed)
- 7 enrollments with different statuses

---

## Data Models

**User**

| Field | Type | Notes |
|-------|------|-------|
| name | String | required |
| email | String | required, unique, saved in lowercase |
| password | String | required, minimum 6 characters, stored hashed |
| role | String | `admin` or `student` |
| phone | String | optional |

**Course**

| Field | Type | Notes |
|-------|------|-------|
| title | String | required |
| courseCode | String | required, unique, saved in UPPERCASE |
| durationWeeks | Number | required, at least 1 |
| fee | Number | required, cannot be negative |
| description | String | required |

**Batch**

| Field | Type | Notes |
|-------|------|-------|
| course | ObjectId → Course | required |
| batchName | String | required |
| startDate | Date | required |
| timing | String | required, e.g. `09:00 AM - 11:00 AM IST` |
| mode | String | `Online` or `Offline` |
| totalSeats | Number | required, at least 1 |

**Enrollment**

| Field | Type | Notes |
|-------|------|-------|
| student | ObjectId → User | required |
| batch | ObjectId → Batch | required |
| course | ObjectId → Course | required |
| status | String | `Active` (default), `Completed` or `Dropped` |
| enrolledAt | Date | set automatically |

---

## Authentication

1. Call **register** or **login**. The response contains a `token`.
2. Send the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <token>
```

| Access level | Meaning |
|--------------|---------|
| Public | No token needed |
| Logged in | Any valid token (admin or student) |
| Student | Token of a user with role `student` |
| Admin | Token of a user with role `admin` |

---

## API Endpoints

Base URL: `http://localhost:8000/api` (local) or `https://assignment-06-web-sem3.onrender.com/api` (live)

### Auth – `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Create a student account and get a token |
| POST | `/login` | Public | Log in and get a token |
| GET | `/me` | Logged in | Get the logged-in user (without password) |

**Register** – request body:
```json
{ "name": "Rahul Sharma", "email": "rahul@example.com", "password": "rahul123", "phone": "9876500000" }
```
Response `201`:
```json
{ "message": "Registration successful", "token": "<jwt token>" }
```

**Login** – request body:
```json
{ "email": "rahul@example.com", "password": "rahul123" }
```
Response `200`:
```json
{ "message": "Login successful", "token": "<jwt token>" }
```

### Courses – `/api/courses`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | All courses. Add `?search=react` to search by title or course code |
| GET | `/:id` | Public | One course |
| GET | `/:courseId/batches` | Logged in | Batches of a course, each with `occupiedSeats` and `seatsLeft` |
| POST | `/` | Admin | Create a course |
| PUT | `/:id` | Admin | Update a course (send only the fields to change) |
| DELETE | `/:id` | Admin | Delete a course (not allowed if it has batches or enrollments) |

**Create course** – request body (all fields required):
```json
{
  "title": "Web Design Basics",
  "courseCode": "cs-wd101",
  "durationWeeks": 4,
  "fee": 199,
  "description": "HTML and CSS from scratch."
}
```
The course code is saved as `CS-WD101`.

**Batches of a course** – example item in the response:
```json
{
  "_id": "...",
  "course": "...",
  "batchName": "FSW-Morning-Alpha",
  "startDate": "2026-10-28T00:00:00.000Z",
  "timing": "09:00 AM - 11:00 AM IST",
  "mode": "Online",
  "totalSeats": 30,
  "occupiedSeats": 3,
  "seatsLeft": 27
}
```
Only `Active` and `Completed` enrollments count as occupied seats. `Dropped` ones free the seat.

### Batches – `/api/batches`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Admin | Create a batch for a course |
| PUT | `/:id` | Admin | Update a batch |
| DELETE | `/:id` | Admin | Delete a batch (not allowed if students are enrolled) |
| GET | `/:id/enrollments` | Admin | Students enrolled in the batch (name, email, phone, course) |

**Create batch** – request body:
```json
{
  "course": "<courseId>",
  "batchName": "WD-Evening-Batch",
  "startDate": "2026-12-01",
  "timing": "06:00 PM - 08:00 PM IST",
  "mode": "Online",
  "totalSeats": 25
}
```

### Enrollments – `/api/enrollments`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Student | Enroll in a batch |
| GET | `/my` | Student | My enrollments with course and batch details (newest first) |
| PATCH | `/:id/status` | Admin | Change status to `Active`, `Completed` or `Dropped` |

**Enroll** – request body (`batchId` also works instead of `batch`):
```json
{ "batch": "<batchId>" }
```
Response `201`: the new enrollment with course and batch details.

**Update status** – request body:
```json
{ "status": "Completed" }
```

### Dashboard – `/api/dashboard`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Admin | Platform statistics |

Response `200`:
```json
{
  "totalCourses": 10,
  "activeBatches": 6,
  "totalEnrollments": 7,
  "mostPopularCourse": { "course": "Full Stack Web Development", "count": 4 }
}
```
`activeBatches` counts batches that start today or later.

---

## Error Responses

Every error is returned as JSON: `{ "message": "..." }`

| Status | When it happens | Example message |
|--------|-----------------|-----------------|
| 400 | Missing fields, invalid data, wrong ID format, or email / course code already used | `All fields are required`, `Invalid ID format: abc`, `Course code already exists` |
| 401 | No token, wrong token, or wrong email/password | `Authorization token required`, `Invalid email or password` |
| 403 | The user's role is not allowed | `Access denied` |
| 404 | Course, batch or route not found | `Course not found`, `Route not found: /api/xyz` |
| 409 | Already enrolled in the course, or the batch is full | `Already enrolled in this course`, `Batch is full` |
| 500 | Unexpected server error | the error message |

---

## Deployment (Render)

| Setting | Value |
|---------|-------|
| Service type | Web Service |
| Root Directory | `Backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Environment variables | `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_VERSION=24` |

The database is a free **MongoDB Atlas** cluster. Its network access allows `0.0.0.0/0` because Render's IP address changes.
To put sample data in Atlas, run the seed once from your computer:
```bash
MONGO_URI="<your Atlas connection string>" npm run seed
```
