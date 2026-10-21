import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import courseApi from '../api/courseApi';

function CourseDetailPage() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function getCourse() {
      try {
        const data = await courseApi.getCourseById(id);
        setCourse(data);
      } catch (error) {
        console.log(error);
      }
    }

    getCourse();
  }, [id]);

  return (
    <div>
      <style>
        {`
          #root > div > div {
            max-width: 850px;
            margin: 0 auto;
            padding: 40px 24px;
            font-family: Arial, sans-serif;
          }

          #root > div > div > a {
            display: inline-block;
            margin-bottom: 24px;
            padding: 10px 18px;
            background: #12372A;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: 0.2s ease;
          }

          #root > div > div > a:hover {
            background: #1b513d;
            transform: translateY(-1px);
          }

          #root > div > div > div {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            padding: 30px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          }

          #root > div > div > div h1 {
            grid-column: 1 / -1;
            margin: 0;
            color: #12372A;
            font-size: 32px;
            line-height: 1.25;
          }

          #root > div > div > div p {
            margin: 0;
            padding: 14px 16px;
            background: #F5F7F4;
            border-left: 4px solid #F28C28;
            border-radius: 8px;
            color: #12372A;
            font-size: 15px;
            font-weight: 600;
          }

          #root > div > div > div p:first-of-type {
            grid-column: 1 / -1;
            margin-bottom: 6px;
            padding: 0;
            background: transparent;
            border: none;
            color: #4b5563;
            font-size: 16px;
            font-weight: normal;
            line-height: 1.7;
          }

          #root > div > div > p {
            text-align: center;
            color: #6F4E37;
            font-weight: 600;
          }

          @media (max-width: 700px) {
            #root > div > div {
              padding: 24px 16px;
            }

            #root > div > div > div {
              grid-template-columns: 1fr;
              padding: 22px;
            }

            #root > div > div > div h1 {
              font-size: 26px;
            }
          }
        `}
      </style>

      <Link to="/courses">Back to Courses</Link>

      {course ? (
        <div>
          <h1>{course.title}</h1>

          <p>{course.description}</p>

          <p>Course Code: {course.courseCode}</p>

          <p>Fee: ₹{course.fee}</p>

          <p>Duration: {course.durationWeeks} Weeks</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CourseDetailPage;