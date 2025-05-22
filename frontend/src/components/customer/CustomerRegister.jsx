import React, { useState } from 'react';
import axios from 'axios';

const CustomerRegister = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customer/register', form);
      alert('Registered! Please login.');
      window.location.href = '/customer/login';
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Customer Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/customer/login">Login</a>
      </p>
    </div>
  );
};

export default CustomerRegister;