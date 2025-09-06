// src/pages/home/Home.jsx
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import "react-responsive-modal/styles.css";
import ApiCall, { baseUrl } from "../../config";
import "./home.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation"; // <-- добавлено
import bg from "../../images/bg.jpg";
import ImageWithLightAnimation from "./ImageWithLightAnimation";
import face from "../../images/bashara.png";
import banner from "../../images/banner.jpg";

function Home() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("selectedLanguage") || "uz";
        if (savedLanguage !== i18n.language) i18n.changeLanguage(savedLanguage);

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const goApplicant = () => navigate(`/data-form`);
    const goClient = () => navigate(`/models`);

    // безопасный выбор заголовка/описания по текущему языку (на будущее для новостей)
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
            <Header />
            <ImageWithLightAnimation src={bg} alt="Tog' manzarasi" />

            {/* ===== HERO / FULL-WIDTH ===== */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <TypeAnimation
                            key={`hero-${i18n.language}`}
                            sequence={[
                                t("hero.title"),         // сначала печатаем заголовок
                                1000,                    // ждём 1с
                                () => {
                                    const el = document.querySelector(".hero-subtitle");
                                    if (el) el.style.display = "block"; // показать подзаголовок
                                },
                                t("hero.subtitle"),      // печатаем подзаголовок
                                2000                     // ждём 2с и останавливаемся
                            ]}
                            wrapper="div"
                            cursor={false}             // курсор исчезает после завершения
                            speed={50}
                            repeat={0}                 // только один раз
                        >
                            {(text) => (
                                <>
                                    <h1 className="hero-title">{text.includes(t("hero.title")) ? t("hero.title") : ""}</h1>
                                    <p className="hero-subtitle" style={{ display: "none" }}>
                                        {text.includes(t("hero.subtitle")) ? text : ""}
                                    </p>
                                </>
                            )}
                        </TypeAnimation>
                    </div>


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
                        <img src={face} alt="Sattorov Jasur — Producer / Director" />
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
                    {/* Левая колонка: постер + трейлер */}
                    <div className="showcase-media">
                        <div className="showcase-img">
                            <img src={banner} alt="Maxsus Bo‘lim — poster" />
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

                {/* Центральная стрелка */}
                <span className="circle-center">
                    <FaArrowDown className="arrow-bounce" aria-hidden="true" />
                </span>
            </button>
        </div>
    );
}

export default Home;
