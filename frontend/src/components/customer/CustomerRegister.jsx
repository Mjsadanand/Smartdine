import React, { useState } from 'react';
import axios from 'axios';

const CustomerRegister = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/customer/register', form);
      alert('Registered! Please login.');
      window.location.href = '/customer/login';
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
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
        <h2 style={{ color: '#1976d2', textAlign: 'center', marginBottom: '1.5rem' }}>Customer Register</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            name="name"
            placeholder="Name"
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
            name="email"
            type="email"
            placeholder="Email"
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <a
          href="http://localhost:5000/api/customer/auth/google"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            border: '1px solid #b6c6e3',
            borderRadius: '8px',
            padding: '0.7rem 1rem',
            marginBottom: '1.2rem',
            fontWeight: 500,
            color: '#444',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(25,118,210,0.06)',
            gap: '0.7rem'
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            style={{ width: 22, height: 22 }}
          />
          Sign up with Google
        </a>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.95rem' }}>
          Already have an account?{' '}
          <a href="/customer/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default CustomerRegister;