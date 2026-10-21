import { useState } from 'react';
import { Routes, Route } from 'react-router';

import authApi from './api/authApi';

import Navbar from './Components/navbar';

import HomePage from './Pages/home';
import CoursesPage from './Pages/course';
import CourseDetailPage from './Pages/courcedetails';
import LoginPage from './Pages/login';
import RegisterPage from './Pages/register';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  const handleLogin = async (email, password) => {
    const data = await authApi.login({
      email,
      password,
    });

    localStorage.setItem('token', data.token);

    const userData = await authApi.getMe();

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

    return userData;
  };

  const handleRegister = async (formData) => {
    const data = await authApi.register(formData);

    localStorage.setItem('token', data.token);

    const userData = await authApi.getMe();

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div>
      <style>
        {`
          div {
            min-height: 100vh;
            margin: 0;
            padding: 0;
            background: #F5F7F4;
            font-family: Arial, sans-serif;
            color: #12372A;
          }

          nav {
            box-sizing: border-box;
            width: 100%;
          }

          @media (max-width: 600px) {
            div {
              width: 100%;
              overflow-x: hidden;
            }
          }
        `}
      </style>

      <Navbar user={user} logout={logout} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/courses" element={<CoursesPage />} />

        <Route
          path="/courses/:id"
          element={<CourseDetailPage />}
        />

        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />

        <Route
          path="/register"
          element={<RegisterPage onRegister={handleRegister} />}
        />
      </Routes>
    </div>
  );
}

export default App;