import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx';
import Menu from './Components/MenuPage.jsx';
import Auth from './Components/Auth.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
            </Routes>
        </Router>
    );
};

export default App;
