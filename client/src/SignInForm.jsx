import React, { useState } from 'react';
import axios from 'axios';
import './SignInForm.css';

const SignInForm = ({ handleSignIn, handleBackToMain }) => {
  const [formData, setFormData] = useState({
    email: '',
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
      await handleSignIn(formData); // Call handleSignIn function passed from parent component
    } catch (error) {
      console.error('Error signing in:', error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="signin-form">
      <h2>Sign In</h2>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <button onClick={handleBackToMain}>Back</button>
    </div>
  );
};

export default SignInForm;
