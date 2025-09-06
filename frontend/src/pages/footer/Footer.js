import React from "react";
import { useTranslation } from "react-i18next";

/** --- Minimal SVG ikonlar --- **/
const IconTelegram = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M9.032 15.57 8.89 19.3c.318 0 .457-.136.622-.298l2.985-2.85 6.187 4.54c1.135.627 1.946.298 2.254-1.053l4.084-19.14-.001-.001c.363-1.69-.61-2.352-1.722-1.939L1.23 9.01c-1.657.643-1.633 1.565-.282 1.983l6.003 1.873L20.26 5.73c.595-.393 1.134-.175.69.218L9.032 15.57z" />
    </svg>
);

const IconInstagram = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 1 0 0-7Zm6.25-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" />
    </svg>
);

const IconYoutube = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.13C19.44 3.5 12 3.5 12 3.5s-7.44 0-9.38.57A3.02 3.02 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12c0 1.98.2 3.94.5 5.8a3.02 3.02 0 0 0 2.12 2.13C4.56 20.5 12 20.5 12 20.5s7.44 0 9.38-.57A3.02 3.02 0 0 0 23.5 17.8c.33-1.86.5-3.82.5-5.8 0-1.98-.17-3.94-.5-5.8ZM9.75 15.5V8.5l6.5 3.5-6.5 3.5Z" />
    </svg>
);

const IconTiktok = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M21.5 8.1a8.3 8.3 0 0 1-5.3-2v7.46a6.56 6.56 0 1 1-6.56-6.56c.34 0 .67.03 1 .08v3.04a3.53 3.53 0 1 0 2.53 3.39V2.5h2.6a5.64 5.64 0 0 0 5.23 3.62v2Z" />
    </svg>
);

const IconLink = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M10.59 13.41a1 1 0 0 0 1.41 1.41l4.24-4.24a3 3 0 1 0-4.24-4.24L9.66 5.68a1 1 0 1 0 1.41 1.41l2.34-2.34a1 1 0 1 1 1.41 1.41l-4.24 4.24ZM13.41 10.59a1 1 0 0 0-1.41-1.41L7.76 13.41a3 3 0 1 0 4.24 4.24l2.34-2.34a1 1 0 0 0-1.41-1.41l-2.34 2.34a1 1 0 1 1-1.41-1.41l4.24-4.24Z" />
    </svg>
);

const IconArrow = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M12 4a1 1 0 0 1 1 1v10.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5A1 1 0 1 1 7.7 12.3l3.3 3.3V5a1 1 0 0 1 1-1Z" />
    </svg>
);

const IconLocation = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
);

const IconPhone = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
);

const IconMail = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="w-full bg-gradient-to-b from-blue-900 to-blue-800 text-white border-t border-blue-700">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                                <IconArrow className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                                CastingUz
                            </h2>
                        </div>
                        <p className="text-blue-100 mb-6 leading-relaxed">
                            O'zbekistondagi eng yirik kasting platformasi. Aktyorlar, modellar va
                            ijodkorlarni topishning eng zamonaviy usuli.
                        </p>
                        <div className="flex items-center text-sm text-cyan-300">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span className="ml-2">Online 24/7</span>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block text-white">
                            Bog'lanish
                            <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-cyan-400"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <IconLocation className="w-5 h-5 text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-blue-100">Toshkent shahri, Yashnobod tumani</span>
                            </li>
                            <li className="flex items-start">
                                <IconPhone className="w-5 h-5 text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                                <a href="tel:+998901234567" className="text-blue-100 hover:text-cyan-300 transition-colors">
                                    +998 90 123-45-67
                                </a>
                            </li>
                            <li className="flex items-start">
                                <IconMail className="w-5 h-5 text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                                <a href="mailto:info@castinguz.com" className="text-blue-100 hover:text-cyan-300 transition-colors">
                                    info@castinguz.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block text-white">
                            Ijtimoiy tarmoqlar
                            <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-cyan-400"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://t.me/Uzcastinguz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-100 hover:text-cyan-300 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center mr-3 group-hover:bg-cyan-500 transition-colors">
                                        <IconTelegram className="w-5 h-5" />
                                    </div>
                                    <span>Telegram</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/uzcasting"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-100 hover:text-cyan-300 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center mr-3 group-hover:bg-cyan-500 transition-colors">
                                        <IconInstagram className="w-5 h-5" />
                                    </div>
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="http://www.youtube.com/@Jasmaxstar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-100 hover:text-cyan-300 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center mr-3 group-hover:bg-cyan-500 transition-colors">
                                        <IconYoutube className="w-5 h-5" />
                                    </div>
                                    <span>YouTube</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tiktok.com/@jasmaxstar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-100 hover:text-cyan-300 transition-colors group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-blue-800 flex items-center justify-center mr-3 group-hover:bg-cyan-500 transition-colors">
                                        <IconTiktok className="w-5 h-5" />
                                    </div>
                                    <span>TikTok</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative inline-block text-white">
                            Tezkor havolalar
                            <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-cyan-400"></span>
                        </h3>
                        <div className="space-y-4">
                            <a
                                href="https://t.me/JasMaxStar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-3 rounded-xl bg-blue-800 hover:bg-cyan-600 transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center mr-3">
                                    <IconLink className="w-5 h-5 text-cyan-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <div className="font-medium group-hover:text-white">Admin bilan bog'lanish</div>
                                    <div className="text-sm text-blue-200 group-hover:text-white/80">@JasMaxStar</div>
                                </div>
                            </a>

                            <a
                                href="https://t.me/uzcastingbot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-600 hover:to-blue-600 transition-colors group border border-cyan-500/20"
                            >
                                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center mr-3 group-hover:bg-white/10">
                                    <IconTelegram className="w-5 h-5 text-cyan-400 group-hover:text-white" />
                                </div>
                                <div>
                                    <div className="font-medium text-cyan-300 group-hover:text-white">Ro'yxatdan o'tish</div>
                                    <div className="text-sm text-cyan-400/70 group-hover:text-white/80">Telegram bot orqali</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-blue-700 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-blue-300 text-center md:text-left">
                            © {new Date().getFullYear()} CastingUz. Barcha huquqlar himoyalangan.
                        </p>
                        <div className="flex items-center mt-3 md:mt-0">
                            <span className="text-sm text-blue-300 mr-4">Biz bilan hamkorlikda:</span>
                            <div className="flex space-x-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-75"></div>
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for any additional styling */}
            <style jsx>{`
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;