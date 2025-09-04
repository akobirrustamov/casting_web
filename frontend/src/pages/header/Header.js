import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    // Joriy til
    const currentLanguage = i18n.language;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sahifa o'zgarganda mobil menyu yopilsin
    useEffect(() => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
        setIsLanguageOpen(false);
    }, [location.pathname]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsLanguageOpen(false);
    };

    const toggleLanguageMenu = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLanguageOpen(false);
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <div className="logo">
                        <Link to="/">
                            <img src="/logo.jpg" alt="Logo" />
                            <span>{t('header.siteTitle')}</span>
                        </Link>
                    </div>

                    <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
                        <ul>
                            <li>
                                <Link to="/" className="nav-link">
                                    <span>{t('header.home')}</span>
                                    <div className="link-underline"></div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/models" className="nav-link">
                                    <span>{t('header.models')}</span>
                                    <div className="link-underline"></div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/news" className="nav-link">
                                    <span>{t('header.news')}</span>
                                    <div className="link-underline"></div>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="header-right">
                        <div className="language-selector">
                            <button
                                className="language-toggle"
                                onClick={toggleLanguageMenu}
                                aria-label="Change language"
                            >
                                {currentLanguage.toUpperCase()}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {isLanguageOpen && (
                                <div className="language-menu">
                                    <button
                                        className={currentLanguage === 'uz' ? 'active' : ''}
                                        onClick={() => changeLanguage('uz')}
                                    >
                                        O'Z
                                    </button>
                                    <button
                                        className={currentLanguage === 'ru' ? 'active' : ''}
                                        onClick={() => changeLanguage('ru')}
                                    >
                                        RU
                                    </button>
                                    <button
                                        className={currentLanguage === 'en' ? 'active' : ''}
                                        onClick={() => changeLanguage('en')}
                                    >
                                        EN
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="auth-buttons">
                            <Link to="/data-form" className="register-btn">
                                {t('header.register')}
                            </Link>
                        </div>
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