import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';

const SignUpForm = ({ handleBackToMain }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log(response.data);
      handleBackToMain();
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data.message : error.message);
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleBackToMain}>Back</button>
    </div>
  );
};

export default SignUpForm;
