import React, { useState } from 'react';
import axios from 'axios';

const CustomerLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/customer/login', form);
      localStorage.setItem('customerToken', res.data.token); // <--- THIS IS CORRECT HERE
      alert('Logged in!');
      window.location.href = '/customer/panel';
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)'
    }}>
      <div style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(25,118,210,0.10)',
        minWidth: '340px',
        maxWidth: '90vw'
      }}>
        <h2 style={{ color: '#1976d2', textAlign: 'center', marginBottom: '1.5rem' }}>Customer Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #b6c6e3',
              fontSize: '1rem'
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #b6c6e3',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.95rem' }}>
          Don't have an account?{' '}
          <a href="/customer/register" style={{ color: '#1976d2', textDecoration: 'underline' }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default CustomerLogin;