import React, { useState, useEffect } from 'react';
import './hotel.css';
import Taj from '../assets/Taj.jpg';

const indianHotels = [
  {
    id: 101,
    name: 'Taj Mahal Palace',
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    image: Taj,
  },
  {
    id: 102,
    name: 'The Oberoi Udaivilas',
    location: 'Udaipur, Rajasthan',
    rating: 4.8,
    image: Taj,
  },
  {
    id: 103,
    name: 'ITC Grand Chola',
    location: 'Chennai, Tamil Nadu',
    rating: 4.7,
    image: Taj,
  },
  {
    id: 104,
    name: 'The Leela Palace',
    location: 'New Delhi',
    rating: 4.6,
    image: Taj,
  },
  {
    id: 105,
    name: 'Vivanta Dal View',
    location: 'Srinagar, Jammu & Kashmir',
    rating: 4.5,
    image: Taj,
  },
];

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState('All');

  useEffect(() => {
    setHotels(indianHotels);
    setFilteredHotels(indianHotels);
  }, []);

  useEffect(() => {
    let filtered = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (minRating !== 'All') {
      filtered = filtered.filter(hotel => hotel.rating >= parseFloat(minRating));
    }

    setFilteredHotels(filtered);
  }, [searchTerm, minRating, hotels]);

  const generateQRUrl = (hotelId) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=hotel-${hotelId}`;
  };

  return (
    <div className="hotel-list-container">
      <h1>Choose your Favorite Hotel</h1>

      {/* Search & Filter Controls */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={minRating} onChange={e => setMinRating(e.target.value)}>
          <option value="All">All Ratings</option>
          <option value="4.5">4.5 and above</option>
          <option value="4.6">4.6 and above</option>
          <option value="4.7">4.7 and above</option>
          <option value="4.8">4.8 and above</option>
        </select>
      </div>

      {/* Hotel Grid */}
      <div className="hotel-grid">
        {filteredHotels.length > 0 ? (
          filteredHotels.map(hotel => (
            <div className="hotel-card" key={hotel.id} onClick={() => setSelectedHotel(hotel)}>
              <img src={hotel.image} alt={hotel.name} className="hotel-img" />
              <div className="hotel-details">
                <h2>{hotel.name}</h2>
                <p className="hotel-location">{hotel.location}</p>
                <div className="hotel-rating">
                  <span>{hotel.rating} ★</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels match your search/filter.</p>
        )}
      </div>

      {/* QR Modal */}
      {selectedHotel && (
        <div className="modal-overlay" onClick={() => setSelectedHotel(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedHotel(null)}>×</button>
            <h2>{selectedHotel.name}</h2>
            <p>{selectedHotel.location}</p>
            <img
              src={generateQRUrl(selectedHotel.id)}
              alt="QR Code"
              className="qr-image"
            />
            <p>Scan to check in</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelList;
