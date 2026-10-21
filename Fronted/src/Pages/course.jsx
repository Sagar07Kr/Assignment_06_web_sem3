import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import courseApi from '../api/courseApi';

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      try {
        const data = await courseApi.getCourses();
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    }

    getCourses();
  }, []);

  return (
    <div>
      <style>
        {`
          div {
            max-width: 1100px;
            margin: 40px auto;
            padding: 30px;
            background: #F5F7F4;
            border-radius: 16px;
            font-family: Arial, sans-serif;
          }

          h1 {
            margin: 0 0 10px;
            color: #12372A;
            font-size: 36px;
          }

          div > p {
            margin-bottom: 30px;
            color: #6b7280;
            font-size: 16px;
          }

          div > div {
            max-width: none;
            margin: 20px 0;
            padding: 24px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
          }

          h2 {
            margin: 0 0 12px;
            color: #12372A;
            font-size: 23px;
          }

          div > div p {
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 18px;
          }

          div > div a {
            display: inline-block;
            padding: 10px 18px;
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
            margin-top: 22px;
            border: none;
            border-top: 1px solid #e5e7eb;
          }

          div > a:last-child {
            display: inline-block;
            margin-top: 20px;
            padding: 11px 20px;
            background: #12372A;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: 0.2s ease;
          }

          div > a:last-child:hover {
            background: #1b513d;
          }

          @media (max-width: 600px) {
            div {
              margin: 20px 12px;
              padding: 20px;
            }

            h1 {
              font-size: 30px;
            }

            div > div {
              padding: 20px;
            }
          }
        `}
      </style>

      <h1>Courses</h1>

      <p>Explore our available courses.</p>

      {courses.map((course) => (
        <div key={course._id}>
          <h2>{course.title}</h2>

          <p>{course.description}</p>

          <Link to={`/courses/${course._id}`}>
            View Course
          </Link>

          <hr />
        </div>
      ))}

      <Link to="/">
        Back to Home
      </Link>
    </div>
  );
}

export default CoursesPage;