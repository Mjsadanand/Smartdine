import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const LandingPage = () => {
    return (
            <div className="landing-container">
                <div className="overlay"></div>
                <div className="logo">SmartDine</div>
                <nav className="landing-navbar">
                    <ul>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>
                </nav>
                <header className="landing-header">
                    <h1>Welcome to <span>SmartDine</span></h1>
                    <p>Your smart dining experience starts here.</p>
                    <button className="landing-button">Get Started</button>
                </header>
            </div>
    );
};

export default LandingPage;
