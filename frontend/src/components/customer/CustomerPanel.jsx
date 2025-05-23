import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerPanel = () => {
  const [profile, setProfile] = useState(null);
  const [scannedMenus, setScannedMenus] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('customerToken');
    if (!token) {
      window.location.href = '/customer/login';
      return;
    }
    axios.get('http://localhost:5000/api/customer/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setProfile(res.data);
      console.log('Profile:', res.data);
    });

    axios.get('http://localhost:5000/api/customer/scanned-menus', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const data = Array.isArray(res.data) ? res.data : [];
      setScannedMenus(data);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerToken');
    window.location.href = '/customer/login';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 32px rgba(25,118,210,0.12)',
        padding: '2.5rem 2rem',
        minWidth: '350px',
        maxWidth: '95vw',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ color: '#1976d2', textAlign: 'center', marginBottom: '1.5rem' }}>Customer Profile</h2>
        {profile && (
          <div>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            background: '#e53935',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6rem 1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '2rem',
            float: 'right'
          }}
        >
          Logout
        </button>
        <div style={{ clear: 'both' }}></div>
        <h3 style={{ marginTop: '2rem', color: '#1976d2', textAlign: 'center' }}>Scanned Menus</h3>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          marginTop: '1rem'
        }}>
          {scannedMenus.length === 0 && (
            <div style={{
              background: '#f8fafd',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              color: '#888'
            }}>
              No scanned menus yet.
            </div>
          )}
          {scannedMenus.map((scan, i) => (
            <div key={i} style={{
              background: '#f5faff',
              borderRadius: '10px',
              padding: '1rem 1.5rem',
              boxShadow: '0 1px 6px rgba(25,118,210,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem'
            }}>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1976d2' }}>
                {scan.menuId?.name || 'Menu'}
              </span>
              <span style={{ fontSize: '0.97rem', color: '#555' }}>
                Scanned at: {new Date(scan.scannedAt).toLocaleString()}
              </span>
              {scan.menuId?.qrCode?.redirectUrl && (
                <a
                  href={scan.menuId.qrCode.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: '0.3rem',
                    color: '#1976d2',
                    textDecoration: 'underline',
                    fontWeight: 500
                  }}
                >
                  View Menu
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPanel;