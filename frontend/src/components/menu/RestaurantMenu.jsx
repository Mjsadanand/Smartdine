import React, { useEffect, useState } from 'react';
import './restaurantMenu.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantMenu = () => {
  const { menuId } = useParams(); // restaurantId and menuId from URL
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Track theme
  const [showVisitorForm, setShowVisitorForm] = useState(true);
  const [visitor, setVisitor] = useState({ name: '', mobile: '' });
  const [submitting, setSubmitting] = useState(false);

  // Check localStorage to avoid showing the form again in the same session
  useEffect(() => {
    const visited = localStorage.getItem(`visited_menu_${menuId}`);
    const name = localStorage.getItem(`visitor_name_${menuId}`);
    const mobile = localStorage.getItem(`visitor_mobile_${menuId}`);
    if (visited && name && mobile) {
      setShowVisitorForm(false);
      axios.post('https://smartdine.onrender.com/api/store-interaction', {
        name,
        mobile,
        menuId,
      });
    } else {
      setShowVisitorForm(true);
    }
  }, [menuId]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await axios.get(`https://smartdine.onrender.com/api/menu/${menuId}/view`);
        setMenu(menuData.data);
        setSelectedCategory(menuData.data.categories[0]); // Default to the first category
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, [menuId]);

  useEffect(() => {
    const fetchRestaurantByMenuId = async () => {
      try {
        const resData = await axios.get(`https://smartdine.onrender.com/api/menu/${menuId}/restaurant`);
        setRestaurant(resData.data);
      } catch (error) {
        console.error('Error fetching restaurant by menuId:', error);
      }
    };

    fetchRestaurantByMenuId();
  }, [menuId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update the selected category
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle theme
  };
const handleVisitorSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    await axios.post('https://smartdine.onrender.com/api/store-interaction', {
      ...visitor,
      menuId,
    });

    localStorage.setItem(`visited_menu_${menuId}`, 'true');
    localStorage.setItem(`visitor_name_${menuId}`, visitor.name);
    localStorage.setItem(`visitor_mobile_${menuId}`, visitor.mobile);
    setShowVisitorForm(false);

  } catch (err) {
    console.error('Error storing visitor info:', err);
    alert('Failed to submit. Please try again.');
  } finally {
    setSubmitting(false);
  }
};


  if (showVisitorForm) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Welcome! Please enter your details</h2>
          <form onSubmit={handleVisitorSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={visitor.name}
              onChange={e => setVisitor({ ...visitor, name: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={visitor.mobile}
              onChange={e => setVisitor({ ...visitor, mobile: e.target.value })}
              required
              pattern="[0-9]{10}"
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!restaurant || !menu) return <div>Loading...</div>;

  return (
    <div className={`restaurant-container ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️' : '🌑'}
      </button>
      <div
        className="restaurant-header"
        style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
      >
        <div className="restaurant-overlay">
          <h2>{restaurant.name}</h2>
          <p>🌍 {restaurant.location}</p>
          <p>📞 {restaurant.contactNumber}</p>
          <p>🕒 {menu.availableTime}</p>
        </div>
      </div>

      <div className="menu-section">
        {menu && menu.categories && (
          <>
            <h3>{menu.name}</h3>
            <div className="category-navigation">
              {menu.categories.map((category, i) => (
                <button
                  key={i}
                  className={`category-button ${
                    selectedCategory && selectedCategory.name === category.name ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="item-grid">
              {selectedCategory &&
                selectedCategory.items.map((item, j) => (
                  <div
                    key={j}
                    className="menu-item"
                    onClick={() => handleItemClick(item)}
                  >
                    <img src={item.imageUrl} alt={item.name} />
                    <div className="item-details">
                      <h5>{item.name}</h5>
                      <p>{item.description}</p>
                      <span>₹{item.price}</span>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      {/* Popup Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            <img src={selectedItem.imageUrl} alt={selectedItem.name} />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            <span className="price-tag">₹{selectedItem.price}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
