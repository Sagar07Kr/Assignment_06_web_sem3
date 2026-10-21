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
          #root > div > div > a {
            grid-column: 1 / -1;
          }

          #root > div > div > h1 {
            margin: 0;
            color: #12372A;
            font-size: 36px;
            line-height: 1.2;
          }

          #root > div > div > p {
            margin: 0 0 10px;
            color: #6b7280;
            font-size: 16px;
          }

          #root > div > div > div {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
            transition: 0.2s ease;
          }

          #root > div > div > div:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
          }

          #root > div > div > div h2 {
            margin: 0 0 12px;
            color: #12372A;
            font-size: 23px;
          }

          #root > div > div > div p {
            flex: 1;
            margin: 0 0 18px;
            color: #4b5563;
            line-height: 1.6;
          }

          #root > div > div > div a {
            display: inline-block;
            padding: 10px 18px;
            background: #F28C28;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: 0.2s ease;
          }

          #root > div > div > div a:hover {
            background: #d97706;
            transform: translateY(-1px);
          }

          #root > div > div > div hr {
            display: none;
          }

          #root > div > div > a {
            justify-self: start;
            margin-top: 10px;
            padding: 11px 20px;
            background: #12372A;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: 0.2s ease;
          }

          #root > div > div > a:hover {
            background: #1b513d;
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

            #root > div > div > div {
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