import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { username } = useParams();
  const [qrTrends, setQrTrends] = useState([]);
  const [menuStats, setMenuStats] = useState({ totalMenus: 0, totalCategories: 0, totalItems: 0 });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    axios.get(`/api/analytics/qr-trends/${username}`).then(res => setQrTrends(res.data));
    axios.get(`/api/analytics/menu-stats/${username}`).then(res => setMenuStats(res.data));
    axios.get(`/api/analytics/recent-activity/${username}`).then(res => setRecentActivity(res.data));
  }, [username]);

  return (
    <div className="dashboard-root">
      <h2 className="dashboard-title">Analytics Dashboard</h2>
      
      {/* Menu Stats Card */}
      <div className="stats-row">
        <div className="stats-card">
          <div className="stats-number">{menuStats.totalMenus}</div>
          <div className="stats-label">Menus</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{menuStats.totalCategories}</div>
          <div className="stats-label">Categories</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{menuStats.totalItems}</div>
          <div className="stats-label">Items</div>
        </div>
      </div>

      {/* QR Scan Trends */}
      <section>
        <h3 className="section-title">QR Scan Trends</h3>
        {qrTrends.length > 0 ? (
          <div className="dashboard-chart-container">
            <Line
              data={{
                labels: qrTrends.map(d => d.date),
                datasets: [{
                  label: 'Scans',
                  data: qrTrends.map(d => d.count),
                  borderColor: '#1976d2',
                  backgroundColor: 'rgba(25,118,210,0.1)'
                }]
              }}
              options={{
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
                elements: { point: { radius: 2 } }
              }}
              height={180}
            />
          </div>
        ) : <div style={{ color: "#888", textAlign: "center" }}>No data</div>}
      </section>

      {/* Recent Customer Activity */}
      <section>
        <h3 className="section-title">Recent Customer Activity</h3>
        <div className="dashboard-table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Name</th>
                <th>Menu Viewed</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.slice(0, 6).map((row, idx) => (
                <tr key={idx}>
                  <td>{new Date(row.timestamp).toLocaleString()}</td>
                  <td>{row.name}</td>
                  <td>{row.menuViewed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;