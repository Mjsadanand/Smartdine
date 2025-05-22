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
    axios.get('/api/customer/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProfile(res.data));

    axios.get('/api/customer/scanned-menus', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      // Ensure scannedMenus is always an array
      const data = Array.isArray(res.data) ? res.data : [];
      setScannedMenus(data);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerToken');
    window.location.href = '/customer/login';
  };

  return (
    <div className="register-container">
      <h2>Customer Profile</h2>
      {profile && (
        <div>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
      <h3 style={{ marginTop: '2rem' }}>Scanned Menus</h3>
      <ul>
        {scannedMenus.length === 0 && <li>No scanned menus yet.</li>}
        {scannedMenus.map((scan, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>
            <b>{scan.menuId?.name || 'Menu'}</b> <br />
            <span>Scanned at: {new Date(scan.scannedAt).toLocaleString()}</span>
            {scan.menuId?.qrCode?.redirectUrl && (
              <div>
                <a href={scan.menuId.qrCode.redirectUrl} target="_blank" rel="noopener noreferrer">
                  View Menu
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerPanel;