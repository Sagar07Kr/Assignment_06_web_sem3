# EduFlow – Course Enrollment & Batch Management System

EduFlow is a full-stack **MERN** (MongoDB, Express, React, Node.js) web application for a learning platform.
Students can browse courses, view course details, create an account and log in.
The backend REST API also lets an **admin** manage courses, batches and enrollments, and see dashboard statistics.

> Assignment 06 – Web Development (Semester 3)

---

## Live Demo

| Part | Hosted on | Link |
|------|-----------|------|
| Frontend (website) | Vercel | https://assignment-06-web-sem3.vercel.app |
| Backend (REST API) | Render | https://assignment-06-web-sem3.onrender.com/api/courses |

> **Note:** The backend uses Render's free plan. It goes to sleep after 15 minutes without visitors,
> so the first request after that can take around 1 minute. After that it is fast.

---

## Features

### Website (Frontend)
- **Home page** with a welcome section and a list of all available courses
- **Courses page** showing every course with a *View Course* button
- **Course details page** showing title, description, course code, fee (₹) and duration
- **Register** a new student account (name, email, password, phone) with form validation
- **Login** with email and password, with clear error messages
- **Navbar** that shows *Welcome, &lt;name&gt;* and a *Logout* button when logged in
- **Stays logged in** after a page refresh (token and user saved in `localStorage`)
- **Responsive design** that works on mobile screens
- Page refresh works on every route (thanks to `vercel.json`)

### REST API (Backend)
- **Authentication** with JWT tokens (valid for 7 days) and passwords hashed using bcrypt
- **Role-based access**: `admin` and `student`
- **Courses**: list, search by title or course code, view one, create, update, delete (admin)
- **Batches**: list batches of a course with **occupied seats** and **seats left**, create, update, delete (admin)
- **Enrollments**: students enroll in a batch and see their own enrollments; admin views batch enrollments and updates status (`Active`, `Completed`, `Dropped`)
- **Admin dashboard**: total courses, active batches, total enrollments and the most popular course
- **Safety rules**:
  - a student cannot enroll twice in the same course
  - a student cannot enroll in a full batch
  - a course with batches or enrollments cannot be deleted
  - a batch with enrollments cannot be deleted
- **Central error handling** for invalid IDs, validation errors and unknown routes
- **Seed script** to fill the database with sample users, courses, batches and enrollments

More details: [Backend README](Backend/README.md) · [Frontend README](Fronted/README.md)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, React Router 8, Vite 8, CSS |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose 9 (MongoDB Atlas in production) |
| Authentication | JSON Web Token (jsonwebtoken), bcryptjs |
| Other | cors, dotenv, ESLint |
| Hosting | Vercel (frontend), Render (backend) |

---

## Project Structure

```
Assignment_06_web_sem3/
├── Backend/                  # Express + MongoDB REST API (deployed on Render)
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Logic for auth, courses, batches, enrollments, dashboard
│   ├── middlewares/          # Login check, role check, error handler
│   ├── models/               # Mongoose schemas: User, Course, Batch, Enrollment
│   ├── routes/               # API routes
│   ├── app.js                # Server entry point
│   └── seed.js               # Sample data script
│
├── Fronted/                  # React + Vite website (deployed on Vercel)
│   ├── src/
│   │   ├── api/              # Functions that call the backend
│   │   ├── Components/       # Navbar and other components
│   │   ├── Pages/            # Home, Courses, Course Details, Login, Register
│   │   ├── App.jsx           # Routes and login state
│   │   └── main.jsx          # App entry point
│   ├── index.html
│   └── vercel.json           # Makes page refresh work on Vercel
│
└── README.md
```

---

## Run the Project Locally

### Requirements
- [Node.js](https://nodejs.org) **22.22 or newer**
- [MongoDB](https://www.mongodb.com/try/download/community) running on your computer, **or** a free MongoDB Atlas database
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Sagar07Kr/Assignment_06_web_sem3.git
cd Assignment_06_web_sem3
```

### 2. Start the backend
```bash
cd Backend
npm install
```

Create a file named `.env` inside `Backend/`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/assignment_6
JWT_SECRET=write_any_long_random_text_here
CLIENT_URL=http://localhost:5173
PORT=8000
```

Add sample data (this **deletes** old data in that database first), then start the server:
```bash
npm run seed
npm start
```
The API now runs at **http://localhost:8000/api**.

### 3. Start the frontend
Open a second terminal:
```bash
cd Fronted
npm install
npm run dev
```
`Fronted/.env` already contains `VITE_API_URL=http://localhost:8000/api`.
Open **http://localhost:5173** in your browser.

### Sample accounts
`npm run seed` creates **1 admin** and **5 student** accounts.
Their emails and passwords are listed in [`Backend/seed.js`](Backend/seed.js).

---

## Environment Variables

**Backend** (`Backend/.env`)

| Name | Description | Example |
|------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/assignment_6` |
| `LOCAL_HOST` | (Optional) backup connection string used if `MONGO_URI` is empty | `mongodb://127.0.0.1:27017/assignment_6` |
| `JWT_SECRET` | Secret used to sign login tokens | any long random text |
| `CLIENT_URL` | Frontend address allowed by CORS | `http://localhost:5173` |
| `PORT` | Server port (Render sets this automatically) | `8000` |

**Frontend** (`Fronted/.env`)

| Name | Description | Example |
|------|-------------|---------|
| `VITE_API_URL` | Backend API address (must end with `/api`) | `http://localhost:8000/api` |

---

## API Endpoints (Summary)

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Logged in |
| GET | `/api/courses` (optional `?search=`) | Public |
| GET | `/api/courses/:id` | Public |
| GET | `/api/courses/:courseId/batches` | Logged in |
| POST / PUT / DELETE | `/api/courses`, `/api/courses/:id` | Admin |
| POST / PUT / DELETE | `/api/batches`, `/api/batches/:id` | Admin |
| GET | `/api/batches/:id/enrollments` | Admin |
| POST | `/api/enrollments` | Student |
| GET | `/api/enrollments/my` | Student |
| PATCH | `/api/enrollments/:id/status` | Admin |
| GET | `/api/dashboard` | Admin |

Full request and response details are in the [Backend README](Backend/README.md#api-endpoints).

---

## Deployment

### Backend on Render
1. **New → Web Service** and connect this GitHub repository
2. **Root Directory:** `Backend` · **Build Command:** `npm install` · **Start Command:** `npm start`
3. **Environment variables:** `MONGO_URI` (MongoDB Atlas link), `JWT_SECRET`, `CLIENT_URL` (the Vercel link), `NODE_VERSION` = `24`

### Frontend on Vercel
1. **Add New → Project** and import this GitHub repository
2. **Root Directory:** `Fronted` · **Framework:** Vite
3. **Environment variable:** `VITE_API_URL` = `https://assignment-06-web-sem3.onrender.com/api`

### Database
MongoDB Atlas (free M0 cluster). Network access is open to `0.0.0.0/0` because Render's IP address changes.

---

## Author

**Sagar Kumar** – [GitHub @Sagar07Kr](https://github.com/Sagar07Kr)
