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
    <div style={{
      background: "#f6f8fa",
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <h2 style={{ color: "#1976d2", marginBottom: "2rem" }}>Analytics Dashboard</h2>
      
      {/* Menu Stats Card */}
      <div style={{
        display: "flex",
        gap: "2rem",
        marginBottom: "2rem",
        flexWrap: "wrap"
      }}>
        <div style={{
          background: "#fff",
          border: "2px solid #1976d2",
          borderRadius: "1rem",
          padding: "1.5rem 2rem",
          minWidth: "180px",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(25,118,210,0.04)"
        }}>
          <div style={{ fontSize: "2.2rem", color: "#1976d2", fontWeight: 700 }}>{menuStats.totalMenus}</div>
          <div style={{ color: "#1976d2", fontWeight: 500 }}>Menus</div>
        </div>
        <div style={{
          background: "#fff",
          border: "2px solid #1976d2",
          borderRadius: "1rem",
          padding: "1.5rem 2rem",
          minWidth: "180px",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(25,118,210,0.04)"
        }}>
          <div style={{ fontSize: "2.2rem", color: "#1976d2", fontWeight: 700 }}>{menuStats.totalCategories}</div>
          <div style={{ color: "#1976d2", fontWeight: 500 }}>Categories</div>
        </div>
        <div style={{
          background: "#fff",
          border: "2px solid #1976d2",
          borderRadius: "1rem",
          padding: "1.5rem 2rem",
          minWidth: "180px",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(25,118,210,0.04)"
        }}>
          <div style={{ fontSize: "2.2rem", color: "#1976d2", fontWeight: 700 }}>{menuStats.totalItems}</div>
          <div style={{ color: "#1976d2", fontWeight: 500 }}>Items</div>
        </div>
      </div>

      {/* QR Scan Trends */}
      <section style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#1976d2" }}>QR Scan Trends</h3>
        {qrTrends.length > 0 ? (
          <div style={{ maxWidth: 400, margin: "0 auto" }}>
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
        ) : <div style={{ color: "#888" }}>No data</div>}
      </section>

      {/* Recent Customer Activity */}
      <section>
        <h3 style={{ color: "#1976d2" }}>Recent Customer Activity</h3>
        <div style={{
          overflowX: "auto",
          background: "#fff",
          border: "1.5px solid #1976d2",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(25,118,210,0.04)"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#e3f2fd" }}>
                <th style={{ padding: "0.7rem", color: "#1976d2" }}>Timestamp</th>
                <th style={{ padding: "0.7rem", color: "#1976d2" }}>Name</th>
                <th style={{ padding: "0.7rem", color: "#1976d2" }}>Menu Viewed</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.slice(0, 6).map((row, idx) => (
                <tr key={idx} style={{ borderTop: "1px solid #e3f2fd" }}>
                  <td style={{ padding: "0.75rem" }}>{new Date(row.timestamp).toLocaleString()}</td>
                  <td style={{ padding: "0.75rem" }}>{row.name}</td>
                  <td style={{ padding: "0.75rem" }}>{row.menuViewed}</td>
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