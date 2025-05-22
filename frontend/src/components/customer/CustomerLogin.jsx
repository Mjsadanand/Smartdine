import React, { useState } from 'react';
import axios from 'axios';

const CustomerLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/customer/login', form);
      localStorage.setItem('customerToken', res.data.token);
      alert('Logged in!');
      window.location.href = '/customer/panel';
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Customer Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/customer/register">Register</a>
      </p>
    </div>
  );
};

export default CustomerLogin;