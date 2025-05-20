import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './restaurant.css';

// System notification helper with debug log
function showSystemNotification(title, body) {
  console.log('Triggering notification:', title, body, Notification.permission);
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  } else {
    console.log('Notification not shown. Permission:', Notification.permission);
  }
}

const RestaurantPopup = ({ onClose, onAdd, onUpdate, editRestaurant }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contactNumber: '',
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editRestaurant) {
      setFormData({
        name: editRestaurant.name || '',
        location: editRestaurant.location || '',
        contactNumber: editRestaurant.contactNumber || '',
        image: null, // reset file field
      });
    }
  }, [editRestaurant]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Optional: validate image file size/type
    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      setSubmitting(false);
      return; // Optionally show a custom error message UI here
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });

    try {
      let response;
      if (editRestaurant) {
        response = await axios.put(
          `https://smartdine.onrender.com/api/restaurant/update/${editRestaurant._id}`,
          data,
          { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
        );
        onUpdate(response.data);
        showSystemNotification('Restaurant Updated', 'Restaurant updated successfully!');
      } else {
        response = await axios.post(
          'https://smartdine.onrender.com/api/restaurant/add',
          data,
          { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
        );
        onAdd(response.data);
        showSystemNotification('Restaurant Added', 'Restaurant added successfully!');
      }
      onClose();
    } catch (err) {
      console.error('Error saving restaurant:', err);
      // Optionally show a custom error message UI here
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="popup">
      <form className="popup-form" onSubmit={handleSubmit}>
        <h2>{editRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}</h2>

        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? (editRestaurant ? 'Updating...' : 'Saving...') : (editRestaurant ? 'Update' : 'Save')}
        </button>
        <button type="button" onClick={onClose} disabled={submitting}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default RestaurantPopup;
