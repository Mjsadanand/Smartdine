import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { username } = useParams();
  const [qrTrends, setQrTrends] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [deviceStats, setDeviceStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    axios.get(`/api/analytics/qr-trends/${username}`).then(res => setQrTrends(res.data));
    axios.get(`/api/analytics/popular-items/${username}`).then(res => setPopularItems(res.data));
    axios.get(`/api/analytics/device-stats/${username}`).then(res => setDeviceStats(res.data));
    axios.get(`/api/analytics/recent-activity/${username}`).then(res => setRecentActivity(res.data));
  }, [username]);

  return (
    <div className="dashboard-container" style={{ background: "#f6f8fa", minHeight: "100vh", padding: "2rem" }}>
      <h2 style={{ color: "#1976d2" }}>Analytics Dashboard</h2>
      {/* QR Scan Trends */}
      <section>
        <h3>QR Scan Trends</h3>
        {qrTrends.length > 0 ? (
          <Line data={{
            labels: qrTrends.map(d => d.date),
            datasets: [{ label: 'Scans', data: qrTrends.map(d => d.count), borderColor: '#1976d2', backgroundColor: 'rgba(25,118,210,0.1)' }]
          }} />
        ) : <div>No data</div>}
      </section>
      {/* Popular Menu Items */}
      <section>
        <h3>Popular Menu Items</h3>
        {popularItems.length > 0 ? (
          <Bar data={{
            labels: popularItems.map(i => i.name),
            datasets: [{ label: 'Views', data: popularItems.map(i => i.views), backgroundColor: '#1976d2' }]
          }} />
        ) : <div>No data</div>}
      </section>
      {/* Customer Device Data */}
      <section>
        <h3>Customer Device Data</h3>
        {deviceStats.length > 0 ? (
          <Pie data={{
            labels: deviceStats.map(d => d.device),
            datasets: [{ data: deviceStats.map(d => d.count), backgroundColor: ['#1976d2', '#64b5f6', '#bbdefb'] }]
          }} />
        ) : <div>No data</div>}
      </section>
      {/* Recent Customer Activity */}
      <section>
        <h3>Recent Customer Activity</h3>
        <table style={{ width: "100%", background: "#fff", border: "1.5px solid #1976d2", borderRadius: "8px" }}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Name</th>
              <th>Items Viewed</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row, idx) => (
              <tr key={idx}>
                <td>{new Date(row.timestamp).toLocaleString()}</td>
                <td>{row.name}</td>
                <td>{row.itemsViewed ? row.itemsViewed.join(', ') : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;