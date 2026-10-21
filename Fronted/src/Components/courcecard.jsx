import { Link } from 'react-router';

function CourseCard({ course }) {
  return (
    <div>
      <style>
        {`
          div {
            max-width: 420px;
            margin: 20px auto;
            padding: 24px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            font-family: Arial, sans-serif;
          }

          h2 {
            margin: 0 0 14px;
            color: #12372A;
            font-size: 24px;
          }

          p {
            margin: 10px 0;
            color: #4b5563;
            line-height: 1.6;
            font-size: 15px;
          }

          p:first-of-type {
            color: #374151;
          }

          a {
            display: inline-block;
            margin-top: 12px;
            padding: 10px 18px;
            background: #F28C28;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: 0.2s ease;
          }

          a:hover {
            background: #d97706;
            transform: translateY(-1px);
          }

          hr {
            margin-top: 22px;
            border: none;
            border-top: 1px solid #e5e7eb;
          }
        `}
      </style>

      <h2>{course.title}</h2>

      <p>{course.description}</p>

      <p>Course Code: {course.courseCode}</p>

      <p>Fee: ₹{course.fee}</p>

      <p>Duration: {course.durationWeeks} weeks</p>

      <Link to={`/courses/${course._id}`}>
        View Course
      </Link>

      <hr />
    </div>
  );
}

export default CourseCard;