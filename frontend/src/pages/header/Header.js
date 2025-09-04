import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 🚀 page o‘zgarsa menyu yopilsin
    useEffect(() => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }, [location.pathname]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <div className="logo">
                        <Link to="/">
                            <img src="/logo.jpg" alt="Logo" />
                            <span>Fashion Models</span>
                        </Link>
                    </div>

                    <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
                        <ul>
                            <li>
                                <Link to="/" className="nav-link">
                                    <span>Bosh sahifa</span>
                                    <div className="link-underline"></div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/models" className="nav-link">
                                    <span>Modellar</span>
                                    <div className="link-underline"></div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/news" className="nav-link">
                                    <span>Yangiliklar</span>
                                    <div className="link-underline"></div>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="auth-buttons">
                        <Link to="/data-form" className="register-btn">
                            Ro'yxatdan o'tish
                        </Link>
                    </div>

                    <button
                        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>
            <div className="header-spacer"></div>
        </>
    );
}

export default Header;
