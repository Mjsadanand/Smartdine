import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import RestaurantPopup from './RestaurantPopup';
import './restaurant.css';
import { FaBell, FaUserCircle, FaPlus, FaChartBar } from 'react-icons/fa';

function showSystemNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

const MyRestaurants = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [loading, setLoading] = useState(false); // For general loading
  const [deletingId, setDeletingId] = useState(null); // For delete button loader

  // Greeting logic
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  const greeting = getGreeting();

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://smartdine.onrender.com/api/restaurant/${username}`, {
          withCredentials: true,
        });
        setRestaurants(res.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [username]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const handleAddRestaurant = (newRestaurant) => {
    setRestaurants([...restaurants, newRestaurant]);
    showSystemNotification("Restaurant Added", "A new restaurant was added!");
  };

  const handleUpdateRestaurant = (updatedRestaurant) => {
    setRestaurants(
      restaurants.map((r) => (r._id === updatedRestaurant._id ? updatedRestaurant : r))
    );
    showSystemNotification("Restaurant Updated", "A restaurant was updated!");
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    setDeletingId(restaurantId);
    try {
      await axios.delete(`https://smartdine.onrender.com/api/restaurant/delete/${restaurantId}`, {
        withCredentials: true,
      });
      setRestaurants(restaurants.filter((r) => r._id !== restaurantId));
      showSystemNotification("Restaurant Deleted", "A restaurant was deleted!");
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (restaurant) => {
    setEditRestaurant(restaurant);
    setShowPopup(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCardClick = (restaurantId) => {
    navigate(`/restaurant/${username}/menu/${restaurantId}`);
  };

  return (
    <div className="restaurant-container">
      /* Header */
      <div className="top-bar">
        <span className="greeting">
          {greeting}, {username.replace(/[0-9_]/g, '')}
        </span>
        <div className="icon-group">
          <FaBell className="icon" title="Notifications" />
          <FaChartBar
            className="icon"
            title="Dashboard"
            style={{ cursor: 'pointer', marginRight: '1rem' }}
            onClick={() => navigate(`/dashboard/${username}`)}
          />
          <div className="profile-dropdown">
            <FaUserCircle
              className="icon"
              title="Profile"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            />
            {showProfileDropdown && (
              <div className="profile-popup-overlay" onClick={() => setShowProfileDropdown(false)}>
                <div
                  className="profile-popup"
                  onClick={e => e.stopPropagation()}
                  style={{
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                    padding: '1.5rem',
                    minWidth: '250px',
                    position: 'absolute',
                    right: 0,
                    top: '2.5rem',
                    zIndex: 1000,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <FaUserCircle size={40} style={{ marginRight: '1rem' }} />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {username.replace(/[0-9_]/g, '')}
                      </div>
                      <div style={{ color: '#888', fontSize: '0.95rem' }}>
                        @{localStorage.getItem('email') || ''}
                      </div>
                    </div>
                  </div>
                  <hr style={{ margin: '0.5rem 0' }} />
                  {/* <div className="dropdown-item" style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
              Profile
            </div> */}
                  <div
                    className="dropdown-item logout"
                    style={{ color: '#d32f2f', cursor: 'pointer' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="divider" />

      {/* Loader */}
      {loading && <div className="loader">Loading restaurants...</div>}

      {/* Restaurant Grid */}
      <div className="restaurant-grid">
        {Array.isArray(restaurants) &&
          restaurants.map((r) => (
            <RestaurantCard
              key={r._id}
              restaurant={r}
              onClick={() => handleCardClick(r._id)}
              onEdit={() => handleEditClick(r)}
              onDelete={() => handleDeleteRestaurant(r._id)}
              deleting={deletingId === r._id} // Pass deleting state to card
            />
          ))}
        <div className="add-restaurant-card" onClick={() => setShowPopup(true)}>
          <FaPlus />
          <span>Add new restaurant</span>
        </div>
      </div>
      {showPopup && (
        <RestaurantPopup
          onClose={() => {
            setShowPopup(false);
            setEditRestaurant(null);
          }}
          onAdd={handleAddRestaurant}
          onUpdate={handleUpdateRestaurant}
          editRestaurant={editRestaurant}
          loading={loading}
        />
      )}
    </div>
  );
};

export default MyRestaurants;
