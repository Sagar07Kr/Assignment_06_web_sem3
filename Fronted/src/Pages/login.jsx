import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (email === '') {
      setError('Please enter your email');
      return;
    }

    if (password === '') {
      setError('Please enter your password');
      return;
    }

    try {
      await onLogin(email, password);

      navigate('/courses');
    } catch (error) {
      setError(error.message || 'Invalid email or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <p>Login to your account to continue.</p>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link to="/register">Signup</Link>
      </p>

      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
}

export default LoginPage;