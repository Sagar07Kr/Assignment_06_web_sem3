# EduFlow – Frontend

The website for the EduFlow course enrollment system, built with **React** and **Vite**.
Students can browse courses, see course details, register and log in.

- **Live website:** https://assignment-06-web-sem3.vercel.app
- **Backend API it uses:** https://assignment-06-web-sem3.onrender.com/api

> The backend is on Render's free plan. If the courses take time to appear, wait about 1 minute for the server to wake up and refresh.

---

## Features

- **Home page** with a welcome message, quick links and the list of available courses
- **Courses page** that lists every course with a *View Course* button
- **Course details page** with title, description, course code, fee (₹) and duration in weeks
- **Register form** (name, email, password, phone) with checks:
  - name and email cannot be empty
  - password must be at least 6 characters
  - shows the server's message, for example *Email already registered*
- **Login form** with checks for empty email or password, and shows *Invalid email or password* from the server
- **After login or register** the user is taken to the Courses page
- **Navbar** changes with login state:
  - logged out: *Login* and *Register* links
  - logged in: *Welcome, &lt;name&gt;* and a *Logout* button
- **Login is remembered** after refreshing the page (token and user are saved in `localStorage`)
- **Logout** clears the saved data and goes to the Login page
- **Token is sent automatically** with every API request
- **Responsive design**: layouts adjust on screens 600px wide or smaller
- **Page refresh works** on every route after deployment (see `vercel.json`)

---

## Pages and Routes

| Route | Page file | What it shows |
|-------|-----------|---------------|
| `/` | `Pages/home.jsx` | Welcome section and all courses |
| `/courses` | `Pages/course.jsx` | Course list with *View Course* buttons |
| `/courses/:id` | `Pages/courcedetails.jsx` | Full details of one course |
| `/login` | `Pages/login.jsx` | Login form |
| `/register` | `Pages/register.jsx` | Registration form |

---

## Tech Stack

| Tool | Use |
|------|-----|
| React 19 | User interface |
| React Router 8 | Page routing (`BrowserRouter`, `Routes`, `Link`, `useNavigate`, `useParams`) |
| Vite 8 | Development server and production build |
| CSS | Styling written inside each component with a `<style>` block |
| Fetch API | Calls to the backend |
| ESLint | Code checking |

Colour theme: dark green `#12372A`, orange `#F28C28`, light background `#F5F7F4`.

---

## Folder Structure

```
Fronted/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   ├── clientApi.jsx     # fetch helper: adds JSON headers and the login token, shows server errors
│   │   ├── authApi.jsx       # register, login, getMe
│   │   └── courseApi.jsx     # getCourses, getCourseById
│   ├── Components/
│   │   ├── navbar.jsx        # Top navigation bar
│   │   ├── courcecard.jsx    # Course card component (not used on a page yet)
│   │   └── protected.jsx     # ProtectedRoute component (not used in routes yet)
│   ├── Pages/
│   │   ├── home.jsx
│   │   ├── course.jsx
│   │   ├── courcedetails.jsx
│   │   ├── login.jsx
│   │   └── register.jsx
│   ├── App.jsx               # Routes, login / register / logout logic
│   ├── main.jsx              # Starts the app inside BrowserRouter
│   └── index.css
├── index.html
├── vercel.json               # Sends every route to index.html on Vercel
├── vite.config.js
└── package.json
```

---

## How Login Works

1. The user submits the Login or Register form.
2. The backend sends back a **JWT token**, which is saved in `localStorage`.
3. The app calls `/api/auth/me` to get the user's details and saves them in `localStorage`.
4. The navbar shows *Welcome, &lt;name&gt;*.
5. Every later request sends the token in the header: `Authorization: Bearer <token>`.
6. **Logout** removes the token and user from `localStorage`.

---

## Getting Started

### Requirements
- Node.js **22.22 or newer**
- The backend running (see [Backend README](../Backend/README.md)), or use the live API

### Install and run
```bash
cd Fronted
npm install
npm run dev
```
Open **http://localhost:5173**.

### Environment variable
`Fronted/.env`:
```env
VITE_API_URL=http://localhost:8000/api
```

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Address of the backend API. Must end with `/api`, with no `/` after it |

To use the live backend while developing, set it to `https://assignment-06-web-sem3.onrender.com/api`.
(The live backend only accepts requests from the Vercel website, so local requests may be blocked by CORS.)

### Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the production files into `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally |
| `npm run lint` | Checks the code with ESLint |

---

## Deployment (Vercel)

| Setting | Value |
|---------|-------|
| Root Directory | `Fronted` |
| Framework Preset | Vite |
| Build Command | `npm run build` (default) |
| Output Directory | `dist` (default) |
| Environment variable | `VITE_API_URL` = `https://assignment-06-web-sem3.onrender.com/api` |

`vercel.json` sends every URL to `index.html`, so React Router can show the right page.
Without it, refreshing a page like `/courses` would give a 404 error:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
