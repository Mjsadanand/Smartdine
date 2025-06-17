import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import idli from '../assets/idli.jpg';
import dosa from '../assets/dosa.jpg';
import menu1 from '../assets/Menu1.jpg';
import menu2 from '../assets/Menu2.jpg';
import menu3 from '../assets/Menu3.jpg';
import qr from '../assets/QR1.jpg';
import landingVideo from '../assets/backvideo.mp4';

const LandingPage = () => {
    const navigateToSignup = () => {
        window.location.href = "/register";
    };

    return (
        <>
            {/* Video Background */}
            <div className="landing-root">
                <video
                    className="landing-video-bg"
                    src={landingVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="landing-overlay" />
                <div className="landing-content">
                    <div className="landing-header-bar">
                        <div className="logo">SmartDine</div>
                        <nav>
                            <ul>
                                <li><Link to="/hotel">Hotels</Link></li>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Sign Up</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <header className="landing-main-header">
                        <h1>Welcome to <span>SmartDine</span></h1>
                        <p>Your smart dining experience starts here.</p>
                        <button className="landing-button" onClick={navigateToSignup}>Get Started</button>
                    </header>
                </div>
            </div>
            {/* Existing content below the hero section */}
            <div className='body'>
                <div className="container">
                    <div className="image-section"><img src={idli} alt="idli" /><img src={dosa} alt="dosa" /></div>
                    <div className="text-section">
                        <h2>SIGNUP WITH OUR SITE</h2>
                        <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <button onClick={navigateToSignup}>Signup</button>
                    </div>
                </div>
            </div>
            <div className="menu-container1">
                <div className="menu-text1">
                    <h2>ADD YOUR MENU</h2>
                    <p>It has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                </div>
                <div className="menu-items1">
                    <div className="menu-item1"><img src={menu1} alt="Appetizers" /></div>
                    <div className="menu-item1"><img src={menu2} alt="Mains" /></div>
                    <div className="menu-item1"><img src={menu3} alt="Desserts" /></div>
                </div>
            </div>
            <div className="qr-container">
                <div className="qr-image"><img src={qr} alt="QR Code with Food" /></div>
                <div className="qr-text">
                    <h2>GET YOUR QR</h2>
                    <p>It has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                </div>
            </div>
            <div className="feedback-wrapper">
                <h2 className="section-title">CUSTOMER FEEDBACK</h2>
                <div className="feedback-container">
                    <div className="feedback-card"><div className="quote">❝</div><h3 className="feedback-title">REVOLUTIONARY EXPERIENCE</h3><p className="feedback-text">As a street vendor with no tech knowledge, SmartDine changed my life. I can now update my menu just by speaking—and customers love scanning the QR to order. So simple and efficient!</p><p className="feedback-author">— Ravi, Street Food Vendor</p></div>
                    <div className="feedback-card"><div className="quote">❝</div><h3 className="feedback-title">TRULY USER-FRIENDLY</h3><p className="feedback-text">SmartDine’s interface is so simple! I update my items in seconds, and everything reflects instantly. It’s perfect for small stalls like mine.</p><p className="feedback-author">— Sunita, Canteen Owner</p></div>
                    <div className="feedback-card"><div className="quote">❝</div><h3 className="feedback-title">MODERN DINING EXPERIENCE</h3><p className="feedback-text">Just scanning a QR and seeing the full menu on my phone felt so seamless. No apps, no confusion — it felt smart and modern.</p><p className="feedback-author">— Karthik, Customer</p></div>
                </div>
            </div>
            <div className="contact-wrapper">
                {/* <div className="image-section"></div> */}
                <div className="image-section"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3481.456921695111!2d75.11910207458678!3d15.36916625779964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d0ccd709a737%3A0xa247612556cc78b3!2sKLE%20Technological%20University!5e1!3m2!1sen!2sin!4v1750143793671!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
                <div className="info-section">
                    <h1>SEE YOU SOON</h1>
                    <div className="info-block"><h4>PHONE NUMBER</h4><p>(+91) 90199 94562 | (+91) 99028 95454 </p></div>
                    <div className="info-block"><h4>EMAIL ADDRESS</h4><p>smartdine@gmail.com</p></div>
                    <div className="info-block"><h4>PLACE</h4><p>Kle Tech Hubli, Vidyanagar Hubli.</p></div>
                </div>
            </div>
            <span className="footer-text">© 2025 SmartDine | Privacy Policy | Disclaimer</span>
        </>
    );
};

export default LandingPage;
