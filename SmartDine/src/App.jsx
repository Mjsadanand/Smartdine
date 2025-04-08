import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx';
import Menu from './Components/HotelList.jsx';
import Auth from './Components/Auth.jsx';
import Speech from './Components/Speech.jsx';
import VendorPanel from './Components/VendorPanel.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/hotel" element={<Menu />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route path="/speech" element={<Speech />} />
                <Route path="/panel/:vendorid" element={<VendorPanel />} />
            </Routes>
        </Router>
    );
};

export default App;
