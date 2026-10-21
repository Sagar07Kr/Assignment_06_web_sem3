import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

function RegisterPage({ onRegister }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '') {
      setError('Please enter your name');
      return;
    }

    if (email === '') {
      setError('Please enter your email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await onRegister({
        name,
        email,
        password,
        phone,
      });

      navigate('/courses');
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <div>
      <style>
        {`
          #root > div > div {
            max-width: 460px;
            margin: 50px auto;
            padding: 35px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
            font-family: Arial, sans-serif;
          }

          #root > div > div > h1 {
            margin: 0 0 8px;
            color: #12372A;
            font-size: 32px;
          }

          #root > div > div > p {
            margin: 0;
            color: #4b5563;
            line-height: 1.6;
          }

          #root > div > div > h1 + p + p {
            margin-top: 16px;
            padding: 10px 14px;
            background: #fff1f1;
            color: #D62828;
            border: 1px solid #fecaca;
            border-radius: 8px;
            font-weight: 600;
          }

          #root > div > div form {
            margin: 24px 0;
          }

          #root > div > div form br {
            display: none;
          }

          #root > div > div form > div {
            margin-bottom: 18px;
          }

          #root > div > div label {
            display: block;
            margin-bottom: 8px;
            color: #12372A;
            font-size: 14px;
            font-weight: 600;
          }

          #root > div > div input {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            font-family: inherit;
            font-size: 15px;
            outline: none;
            transition: 0.2s ease;
          }

          #root > div > div input:focus {
            border-color: #38BDF8;
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
          }

          #root > div > div button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            background: #F28C28;
            color: #ffffff;
            font-family: inherit;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s ease;
          }

          #root > div > div button:hover {
            background: #d97706;
            transform: translateY(-1px);
          }

          #root > div > div > form ~ p {
            margin: 0 0 8px;
            text-align: center;
          }

          #root > div > div a {
            color: #12372A;
            font-weight: 600;
            text-decoration: none;
          }

          #root > div > div a:hover {
            color: #38BDF8;
          }

          @media (max-width: 600px) {
            #root > div > div {
              margin: 30px 16px;
              padding: 25px 20px;
            }

            #root > div > div > h1 {
              font-size: 28px;
            }
          }
        `}
      </style>

      <h1>Create Account</h1>

      <p>Register to explore our courses.</p>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Signup
        </button>
      </form>

      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link>
      </p>

      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
}

export default RegisterPage;