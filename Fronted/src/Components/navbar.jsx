import { Link, useNavigate } from 'react-router';

function Navbar({ user, logout }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav>
      <Link to="/">EduFlow</Link>

      {' | '}

      <Link to="/courses">Courses</Link>

      {' | '}

      {user ? (
        <>
          <span>Welcome, {user.name}</span>

          {' | '}

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>

          {' | '}

          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;