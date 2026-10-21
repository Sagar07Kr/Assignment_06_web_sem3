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
          #root > div > div {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            max-width: 1100px;
            margin: 0 auto;
            padding: 40px 24px;
            font-family: Arial, sans-serif;
          }

          #root > div > div > h1,
          #root > div > div > p,
          #root > div > div > div:first-of-type,
          #root > div > div > hr,
          #root > div > div > h2 {
            grid-column: 1 / -1;
          }

          #root > div > div > h1 {
            margin: 0;
            color: #12372A;
            font-size: 40px;
            line-height: 1.2;
          }

          #root > div > div > p {
            margin: 0;
            color: #4b5563;
            font-size: 17px;
            line-height: 1.7;
          }

          #root > div > div > div:first-of-type {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            font-size: 0;
          }

          #root > div > div > div:first-of-type a {
            display: inline-block;
            padding: 11px 20px;
            background: #F28C28;
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 8px;
            transition: 0.2s ease;
          }

          #root > div > div > div:first-of-type a:hover {
            background: #d97706;
            transform: translateY(-1px);
          }

          #root > div > div > hr {
            width: 100%;
            margin: 10px 0;
            border: none;
            border-top: 1px solid #d9dfda;
          }

          #root > div > div > h2 {
            margin: 0;
            color: #12372A;
            font-size: 28px;
          }

          #root > div > div > h2 ~ div {
            padding: 22px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
            transition: 0.2s ease;
          }

          #root > div > div > h2 ~ div:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
          }

          #root > div > div > h2 ~ div h3 {
            margin: 0 0 10px;
            color: #12372A;
            font-size: 21px;
          }

          #root > div > div > h2 ~ div p {
            margin: 0;
            color: #4b5563;
            font-size: 15px;
            line-height: 1.6;
          }

          @media (max-width: 700px) {
            #root > div > div {
              grid-template-columns: 1fr;
              gap: 16px;
              padding: 24px 16px;
            }

            #root > div > div > h1 {
              font-size: 30px;
            }

            #root > div > div > h2 {
              font-size: 24px;
            }

            #root > div > div > div:first-of-type a {
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