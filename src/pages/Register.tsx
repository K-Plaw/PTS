import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/styles.css'; // Import styles

type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
  address: string;
  referralCode: string;
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'Editor' | 'Viewer';
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    age: 0,
    address: '',
    referralCode: '',
    username: '',
    email: '',
    password: '',
    role: 'Viewer',
  });
  const navigate = useNavigate();

  const handleRegister = () => {
    // Simulate user registration
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    localStorage.setItem('users', JSON.stringify([...existingUsers, formData]));
    alert('Registration successful! Please log in.');
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'age' ? parseInt(value, 10) : value,
    }));
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="referralCode"
        placeholder="Referral Code"
        value={formData.referralCode}
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
        <option value="Viewer">Viewer</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;