import { Link, useNavigate } from 'react-router';

function Navbar({ user, logout }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav>
      <style>
        {`
          nav {
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 16px 28px;
            background: #12372A;
            color: #ffffff;
            font-family: Arial, sans-serif;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
            flex-wrap: wrap;
          }

          nav a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            transition: 0.2s ease;
          }

          nav a:first-child {
            font-size: 22px;
            color: #F28C28;
            margin-right: 8px;
          }

          nav a:hover {
            color: #38BDF8;
          }

          nav span {
            color: #ffffff;
            font-weight: 500;
          }

          nav button {
            padding: 9px 16px;
            border: none;
            border-radius: 7px;
            background: #D62828;
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s ease;
          }

          nav button:hover {
            background: #b91c1c;
            transform: translateY(-1px);
          }

          @media (max-width: 600px) {
            nav {
              padding: 14px 18px;
              gap: 12px;
            }

            nav a:first-child {
              width: 100%;
              margin-bottom: 4px;
            }
          }
        `}
      </style>

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