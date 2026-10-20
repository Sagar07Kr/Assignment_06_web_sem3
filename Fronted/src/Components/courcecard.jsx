import { Link } from 'react-router';

function CourseCard({ course }) {
  return (
    <div>
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