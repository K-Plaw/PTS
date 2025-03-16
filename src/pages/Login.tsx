import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/styles.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      toast.error('Please enter both username and password.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (user) {
      login(user.username, user.role);
      navigate('/dashboard');
      toast.success('Login successful!');
    } else {
      toast.error('User not found. Please register or check your login details.');
    }
  };

  return (
    <div className="login-container">
      <h1>PTS DATA PURCHASE APP</h1>
      <h2>Login</h2>
      <p>Welcome back! Please login to continue.</p>
        <form className='login-form'>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </span>
      </div>
      <button
      className='login-button' 
      onClick={handleLogin}>Login</button>
      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
      <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
