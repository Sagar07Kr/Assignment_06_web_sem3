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