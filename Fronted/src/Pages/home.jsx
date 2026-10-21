import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import courseApi from '../api/courseApi';

function HomePage() {

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await courseApi.getCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    }

    loadCourses();
  }, []);

  return (
    <div>
      <style>
        {`
          div {
            max-width: 1100px;
            margin: 40px auto;
            padding: 40px;
            background: #F5F7F4;
            border-radius: 18px;
            font-family: Arial, sans-serif;
          }

          h1 {
            margin: 0 0 16px;
            color: #12372A;
            font-size: 40px;
            line-height: 1.2;
          }

          div > p {
            color: #4b5563;
            font-size: 17px;
            line-height: 1.7;
            margin-bottom: 25px;
          }

          div > div {
            max-width: none;
            margin: 0;
            padding: 0;
            background: transparent;
          }

          div > div a {
            display: inline-block;
            margin: 5px 4px;
            padding: 11px 20px;
            background: #F28C28;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: 0.2s ease;
          }

          div > div a:hover {
            background: #d97706;
            transform: translateY(-1px);
          }

          hr {
            margin: 35px 0;
            border: none;
            border-top: 1px solid #d9dfda;
          }

          h2 {
            margin-bottom: 22px;
            color: #12372A;
            font-size: 28px;
          }

          div > div > div {
            max-width: none;
            margin: 16px 0;
            padding: 22px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
          }

          h3 {
            margin: 0 0 10px;
            color: #12372A;
            font-size: 21px;
          }

          div > div > div p {
            margin: 0;
            color: #4b5563;
            line-height: 1.6;
            font-size: 15px;
          }

          @media (max-width: 600px) {
            div {
              margin: 20px 12px;
              padding: 25px 20px;
            }

            h1 {
              font-size: 30px;
            }

            h2 {
              font-size: 24px;
            }

            div > div a {
              padding: 10px 15px;
            }
          }
        `}
      </style>

      <h1>Welcome to Our Learning Platform</h1>

      <p>
        Explore our courses, learn new skills, and improve your knowledge.
      </p>

      <div>
        <Link to="/courses">Explore Courses</Link>{' | '}
        <Link to="/login">Login</Link>{' | '}
        <Link to="/register">Signup</Link>
      </div>

      <hr />

      <h2>Available Courses</h2>

      {courses.map((course) => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;