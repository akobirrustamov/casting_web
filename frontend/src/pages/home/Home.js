// src/pages/home/Home.jsx
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import "react-responsive-modal/styles.css";
import ApiCall, { baseUrl } from "../../config";
import "./home.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Home() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [visibleItems, setVisibleItems] = useState(4);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("selectedLanguage") || "uz";
        if (savedLanguage !== i18n.language) i18n.changeLanguage(savedLanguage);

        checkMobile();
        fetchNews();

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await ApiCall("/api/v1/news", "GET");
            if (response.error) setError(response.data);
            else setNewsList(response.data || []);
        } catch (e) {
            console.error("Error fetching news:", e);
            setError("Failed to fetch news");
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => setVisibleItems((prev) => prev + 4);

    const goApplicant = () => navigate(`/data-form`);
    const goClient = () => navigate(`/hire`);

    // безопасный выбор заголовка/описания по текущему языку
    const getNewsTitle = (n) => {
        const lng = i18n.language;
        if (lng === "ru" && n.titleRu) return n.titleRu;
        if (lng === "en" && n.titleEn) return n.titleEn;
        return n.titleUz || n.titleRu || n.titleEn || "";
    };
    const getNewsDesc = (n) => {
        const lng = i18n.language;
        if (lng === "ru" && n.descriptionRu) return n.descriptionRu;
        if (lng === "en" && n.descriptionEn) return n.descriptionEn;
        return n.descriptionUz || n.descriptionRu || n.descriptionEn || "";
    };

    return (
        <div className="home-container">
            <Header props={""} />

            {/* ===== HERO / FULL-WIDTH ===== */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">{t("hero.title")}</h1>
                    <p className="hero-subtitle">{t("hero.subtitle")}</p>

                    <div className="hero-features">
                        <div className="hf-card">
                            <FaCheckCircle className="hf-icon" />
                            <div>
                                <h4>{t("hero.feature1Title")}</h4>
                                <p>{t("hero.feature1Text")}</p>
                            </div>
                        </div>
                        <div className="hf-card">
                            <FaCheckCircle className="hf-icon" />
                            <div>
                                <h4>{t("hero.feature2Title")}</h4>
                                <p>{t("hero.feature2Text")}</p>
                            </div>
                        </div>
                        <div className="hf-card">
                            <FaCheckCircle className="hf-icon" />
                            <div>
                                <h4>{t("hero.feature3Title")}</h4>
                                <p>{t("hero.feature3Text")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="cta-buttons" role="group" aria-label="Casting choices">
                        <button className="register-btn" onClick={goApplicant}>
                            {t("hero.btnApplicant")}
                        </button>
                        <button className="register-btn" onClick={goClient}>
                            {t("hero.btnClient")}
                        </button>
                    </div>
                </div>
            </section>

            {/* ===== DIRECTOR (ниже hero) ===== */}
            <section className="director">
                <div className="director-card">
                    <div className="director-media">
                        {/* заменишь src на свой backend-URL при необходимости */}
                        <img
                            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=900&auto=format&fit=crop"
                            alt="Sattorov Jasur — Producer / Director"
                        />
                    </div>
                    <div className="director-info">
                        <h2>{t("director.heading")}</h2>
                        <p>{t("director.about")}</p>
                    </div>
                </div>
            </section>

            {/* ===== SHOWCASE: Films ===== */}
            <section className="showcase">
                <div className="showcase-head">
                    <h2>{t("showcase.films.title")}</h2>
                </div>

                <div className="showcase-grid">
                    {/* Левая колонка: постер + трейлер друг под другом */}
                    <div className="showcase-media">
                        <div className="showcase-img">
                            <img
                                src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop"
                                alt="Maxsus Bo‘lim — poster"
                            />
                            <figcaption>{t("showcase.films.posterCaption")}</figcaption>
                        </div>

                        <div className="showcase-video">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/gF6kaevugtk?si=gWYT4VdZw32Cvxlf"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Правая колонка: текст */}
                    <div className="showcase-body">
                        <ul className="showcase-list">
                            <li>
                                <strong>{t("showcase.films.ftitle")}</strong>
                                <br />
                                {t("showcase.films.fname")}
                            </li>
                            <li>
                                <strong>{t("showcase.films.genre")}</strong>
                                <br />
                                {t("showcase.films.genreVal")}
                            </li>
                            <li>
                                <strong>{t("showcase.films.producer")}</strong>
                                <br />
                                {t("showcase.films.producerVal")}
                            </li>
                            <li>
                                <strong>{t("showcase.films.places")}</strong>
                                <br />
                                <span style={{ whiteSpace: "pre-line" }}>
                                    {t("showcase.films.placesVal")}
                                </span>
                            </li>
                            <li>
                                <strong>{t("showcase.films.synopsis")}</strong>
                                <br />
                                {t("showcase.films.synopsisVal")}
                            </li>
                            <li>
                                <strong>{t("showcase.films.facts")}</strong>
                                <br />
                                <span style={{ whiteSpace: "pre-line" }}>
                                    {t("showcase.films.factsVal")}
                                </span>
                            </li>
                            <li>
                                <strong>{t("showcase.films.goal")}</strong>
                                <br />
                                <span style={{ whiteSpace: "pre-line" }}>
                                    {t("showcase.films.goalVal")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <br />
                <hr />
            </section>

            {/* ===== SHOWCASE: Clips ===== */}
            <section className="showcase showcase-clips">
                <div className="showcase-head">
                    <h2>{t("showcase.clips.title")}</h2>
                </div>

                <div className="clips-grid">
                    <div className="clip-item">
                        <iframe
                            src="https://www.youtube.com/embed/G650mrCmNWM?si=BEXo0vfEoU93_n3K"
                            title="YouTube video player 1"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="clip-item">
                        <iframe
                            src="https://www.youtube.com/embed/w_ZOD_y68w0?si=ETVpry5UL02ocOJJ"
                            title="YouTube video player 2"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="clip-item">
                        <iframe
                            src="https://www.youtube.com/embed/6chd2yev_Ug?si=KFRsU4NaMZ4eKq-d"
                            title="YouTube video player 3"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="clip-item">
                        <iframe
                            src="https://www.youtube.com/embed/jGnlnNCW_WA?si=7z0xUgPCqe1uTInb"
                            title="YouTube video player 4"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="clip-item">
                        <iframe
                            src="https://www.youtube.com/embed/_Ns_0M_1F3g?si=2yU5ZJN3Y32QhuwO"
                            title="YouTube video player 5"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="clip-item">
                        <iframe
                            src="https://www.youtube.com/embed/npTIpW3IFHI?si=rSYmZ00uXQ_LTjS_"
                            title="YouTube video player 6"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                <p className="clips-note">{t("showcase.clips.more")}</p>
            </section>

            {/* ===== NEWS (опционально; показывает новости, если есть) ===== */}

            {/* Floating button */}
            <button
                onClick={() => navigate(`/data-form`)}
                className="fixed-navigate-btn circle-marquee"
                aria-label="Ro'yhatdan o'tish"
            >
                {/* Кольцевая бегущая строка */}
                <svg className="marquee-svg" viewBox="0 0 100 100" aria-hidden="true">
                    <defs>
                        <path
                            id="textcircle"
                            d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                        />
                    </defs>
                    <text className="circle-text">
                        <textPath href="#textcircle" startOffset="0%">
                            {"ro'yhatdan o'tish • ro'yhatdan o'tish • ro'yhatdan o'tish • ro'yhatdan o'tish • "}
                        </textPath>
                    </text>
                </svg>

                {/* Центральная стрелка без фона — строго по центру */}
                <span className="circle-center">
                    <FaArrowDown className="arrow-bounce" aria-hidden="true" />
                </span>
            </button>


        </div>
    );
}

export default Home;
