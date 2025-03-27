import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import idli from '../assets/idli.jpg';
import dosa from '../assets/dosa.jpg';
import menu1 from '../assets/Menu1.jpg';
import menu2 from '../assets/Menu2.jpg';
import menu3 from '../assets/Menu3.jpg';
import qr from '../assets/QR1.jpg';

const LandingPage = () => {
    return (
        <>
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
            <div className='body'>
                <div className="container">
                    <div className="image-section">
                        <img src={idli} alt="idli" />
                        <img src={dosa} alt="dosa" />
                    </div>
                    <div className="text-section">
                        <h2>SIGNUP WITH OUR SITE</h2>
                        <p>
                            When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <button>Signup</button>
                    </div>
                </div>
            </div>
            <div className="menu-container">
                <div className="menu-text">
                    <h2>ADD YOUR MENU</h2>
                    <p>
                        It has a more-or-less normal distribution of letters, as opposed to
                        using 'Content here, content here', making it look like readable
                        English.
                    </p>
                </div>
                <div className="menu-items">
                    <div className="menu-item">
                        <img src={menu1} alt="Appetizers" />
                        {/* <a href="#">MOUTHWATERING APPETIZERS</a> */}
                    </div>
                    <div className="menu-item">
                        <img src={menu2} alt="Mains" />
                        {/* <a href="#">WHOLESOME MAINS</a> */}
                    </div>
                    <div className="menu-item">
                        <img src={menu3} alt="Desserts" />
                        {/* <a href="#">SWEET ENDINGS</a> */}
                    </div>
                </div>
            </div>
            <div className="qr-container">
                <div className="qr-image">
                    <img src={qr} alt="QR Code with Food" />
                </div>
                <div className="qr-text">
                    <h2>GET YOUR QR</h2>
                    <p>
                        It has a more-or-less normal distribution of letters, as opposed to
                        using 'Content here, content here', making it look like readable
                        English.
                    </p>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
