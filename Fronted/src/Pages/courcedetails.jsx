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
          div {
            max-width: 850px;
            margin: 40px auto;
            padding: 30px;
            background: #F5F7F4;
            border-radius: 16px;
            font-family: Arial, sans-serif;
          }

          div > a {
            display: inline-block;
            margin-bottom: 25px;
            padding: 10px 18px;
            background: #12372A;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: 0.2s ease;
          }

          div > a:hover {
            background: #1b513d;
            transform: translateY(-1px);
          }

          div > div {
            max-width: none;
            margin: 0;
            padding: 30px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          }

          h1 {
            margin: 0 0 20px;
            color: #12372A;
            font-size: 32px;
          }

          p {
            margin: 14px 0;
            color: #4b5563;
            line-height: 1.7;
            font-size: 16px;
          }

          div > p {
            text-align: center;
            color: #6F4E37;
            font-weight: 600;
          }

          @media (max-width: 600px) {
            div {
              margin: 20px 12px;
              padding: 20px;
            }

            div > div {
              padding: 22px;
            }

            h1 {
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