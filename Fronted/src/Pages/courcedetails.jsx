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