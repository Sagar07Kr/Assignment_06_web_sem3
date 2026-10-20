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