// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLng = localStorage.getItem("selectedLanguage") || "uz";

const resources = {
    uz: {
        translation: {
            common: {
                loading: "Yuklanmoqda...",
                error: "Yangiliklar yuklanmadi",
                gallery: "Galereya",
                loadMore: "Ko'proq ko'rish",
            },
            hero: {
                title: "Uzcasting — iste’dod va imkon uchrashadigan joy",
                subtitle:
                    "Kastingni keyingi bosqichga olib chiqamiz: murabbiylik, tayyorgarlik va halol hamkorlik. 80+ klip va reklama, 14 ta davlatda suratga olish tajribasi.",
                feature1Title: "Karyera starti",
                feature1Text: "Yulduzlarni topamiz, sahnaga tayyorlaymiz.",
                feature2Title: "Global hamkorlik",
                feature2Text: "Rossiya, Turkiya, Ozarbayjon va boshqalar.",
                feature3Title: "Murabbiylik",
                feature3Text: "Qimmatli yo‘l-yo‘riq va treninglar.",
                btnApplicant: "Men kastinga keldim",
                btnClient: "Men model qidirmoqdaman",
            },
            director: {
                heading: "Producer va Direktor",
                about:
                    "Sattorov Jasur – 5 yillik tajribaga ega producer, aktyor, casting direktori. Tajriba davomida Moskva, Sankt-Peterburg, Malayziya, Istanbulda faoliyat yurgan. 20–30 ga yaqin kliplar produceri.",
            },
            showcase: {
                films: {
                    title: "Faoliyatimizdan namunalar (Film va serialar)",
                    posterCaption: "«Maxsus Bo‘lim» — detektiv / triller",
                    ftitle: "🎬 Фильм номи:",
                    fname: "Mахсус бўлим (Maxsus Bo‘lim)",
                    genre: "📽 Жанр:",
                    genreVal: "Detektiv, triller, siri to‘la drama",
                    producer: "🎬 Продюсер:",
                    producerVal:
                        "Сатторов Жасур — “Uzcasting” раҳбари, продюсер, шоу-бизнесда “Jas Max Star” номи билан танилган",
                    places: "🌍 Суратга олиш жойлари:",
                    placesVal:
                        "• 🇺🇿 O‘zbekiston (Toshkent, Samarqand)\n• 🇷🇺 Rossiya (Moskva, Sankt-Peterburg)\n• 🇹🇷 Turkiya (Istanbul, Kappadokiya)\n• 🇦🇪 Dubay (BAA)",
                    synopsis: "🧩 Qisqacha mavzusi:",
                    synopsisVal:
                        "Filmda maxsus xizmat agentlari, ikkiyuzlamachilik, siyosiy tuzoqlar va shaxsiy fidoyiliklar orasida kechadigan sirli voqealar tasvirlanadi. Asosiy qahramon — o‘z ortida og‘ir sinovlarni qoldirgan sobiq tergovchi. U yangi topshiriq bilan yashirin “maxsus bo‘lim”ga chaqiriladi va u yerda butun tizimni fosh etuvchi xavfli missiyaga yuz tutadi.",
                    facts: "🎥 Qiziqarli faktlar:",
                    factsVal:
                        "• Rossiyadagi suratga olish jarayonlari texnik va logistika jihatdan eng og‘ir bo‘ldi\n• Filmda haqiqiy maxsus xizmat texnikalari, original maxsus effektlar va xalqaro aktyorlar ishtirok etadi\n• Dubaydagi sahnalarda xalqaro darajadagi ekshn va texnologik yondashuv namoyon bo‘ladi",
                    goal: "🌟 Filmning maqsadi:",
                    goalVal:
                        "• O‘zbekiston kinematografiyasida xalqaro darajadagi detektiv-kriminal yo‘nalishini yuksaltirish\n• Tomoshabinlarga intellektual va dinamik mazmundagi film taqdim etish",
                },
                clips: {
                    title: "Faoliyatimizdan namunalar (Kliplar)",
                    more: "...va boshqa ajoyib kliplar",
                },
            },
        },
    },
    ru: {
        translation: {
            common: {
                loading: "Загрузка...",
                error: "Новости не загружены",
                gallery: "Галерея",
                loadMore: "Показать больше",
            },
            hero: {
                title: "Uzcasting — место, где встречаются талант и шанс",
                subtitle:
                    "Поднимем кастинг на новый уровень: менторство, подготовка и честное партнёрство. 80+ клипов и реклам, опыт съёмок в 14 странах.",
                feature1Title: "Старт карьеры",
                feature1Text: "Находим звёзд и готовим к сцене.",
                feature2Title: "Международно",
                feature2Text: "Россия, Турция, Азербайджан и др.",
                feature3Title: "Наставники",
                feature3Text: "Ценные рекомендации и тренинги.",
                btnApplicant: "Я пришёл на кастинг",
                btnClient: "Я ищу модель",
            },
            director: {
                heading: "Продюсер и Режиссёр",
                about:
                    "Саттаров Жасур — продюсер, актёр, кастинг-директор с 5-летним опытом. Работал в Москве, Санкт-Петербурге, Малайзии, Стамбуле. Продюсер 20–30 клипов.",
            },
            showcase: {
                films: {
                    title: "Из нашей деятельности (Фильмы и сериалы)",
                    posterCaption: "«Maxsus Bo‘lim» — детектив / триллер",
                    ftitle: "🎬 Название фильма:",
                    fname: "Mахсус бўлим (Maxsus Bo‘lim)",
                    genre: "📽 Жанр:",
                    genreVal: "Детектив, триллер, драма с тайной",
                    producer: "🎬 Продюсер:",
                    producerVal:
                        "Саттаров Жасур — руководитель «Uzcasting», продюсер, в шоу-бизнесе известен как «Jas Max Star»",
                    places: "🌍 Локации съёмок:",
                    placesVal:
                        "• 🇺🇿 Узбекистан (Ташкент, Самарканд)\n• 🇷🇺 Россия (Москва, Санкт-Петербург)\n• 🇹🇷 Турция (Стамбул, Каппадокия)\n• 🇦🇪 Дубай (ОАЭ)",
                    synopsis: "🧩 Краткий сюжет:",
                    synopsisVal:
                        "История о спецагентах, двойных играх, политических ловушках и личной самоотдаче. Главный герой — бывший следователь с тяжёлым прошлым — получает секретное задание и оказывается в «особом отделе», где ему предстоит миссия, способная обнажить изнанку всей системы.",
                    facts: "🎥 Интересные факты:",
                    factsVal:
                        "• Российские съёмки оказались самыми сложными технически и логистически\n• В фильме используются реальные спецтехнические средства, оригинальные VFX, снимаются актёры международного уровня\n• Дубайские сцены демонстрируют международный экшен и технологичный подход",
                    goal: "🌟 Цель фильма:",
                    goalVal:
                        "• Продвинуть в узбекском кино международный детективно-криминальный жанр\n• Дать зрителю интеллектуальное и динамичное кино",
                },
                clips: {
                    title: "Из нашей деятельности (Клипы)",
                    more: "...и другие классные клипы",
                },
            },
        },
    },
    en: {
        translation: {
            common: {
                loading: "Loading...",
                error: "Failed to load news",
                gallery: "Gallery",
                loadMore: "Load more",
            },
            hero: {
                title: "Uzcasting — where talent meets opportunity",
                subtitle:
                    "We elevate casting with mentoring, preparation, and fair partnership. 80+ music videos & ads, filming experience across 14 countries.",
                feature1Title: "Career start",
                feature1Text: "We discover stars and prepare them for the stage.",
                feature2Title: "Global partners",
                feature2Text: "Russia, Türkiye, Azerbaijan and more.",
                feature3Title: "Mentorship",
                feature3Text: "Practical guidance and training.",
                btnApplicant: "I came for casting",
                btnClient: "I’m looking for a model",
            },
            director: {
                heading: "Producer & Director",
                about:
                    "Sattorov Jasur — producer, actor, and casting director with 5 years’ experience. Worked in Moscow, St. Petersburg, Malaysia, Istanbul. Producer of ~20–30 music videos.",
            },
            showcase: {
                films: {
                    title: "From our work (Films & Series)",
                    posterCaption: "“Maxsus Bo‘lim” — detective / thriller",
                    ftitle: "🎬 Film title:",
                    fname: "Maxsus bo‘lim (Special Unit)",
                    genre: "📽 Genre:",
                    genreVal: "Detective, thriller, mystery drama",
                    producer: "🎬 Producer:",
                    producerVal:
                        "Sattorov Jasur — head of “Uzcasting”, producer, known as “Jas Max Star” in show business",
                    places: "🌍 Filming locations:",
                    placesVal:
                        "• 🇺🇿 Uzbekistan (Tashkent, Samarkand)\n• 🇷🇺 Russia (Moscow, Saint Petersburg)\n• 🇹🇷 Türkiye (Istanbul, Cappadocia)\n• 🇦🇪 Dubai (UAE)",
                    synopsis: "🧩 Logline:",
                    synopsisVal:
                        "A web of covert operations, duplicity, political traps, and personal sacrifice. A former investigator with a heavy past joins a secret “special unit” for a mission that could expose the entire system.",
                    facts: "🎥 Fun facts:",
                    factsVal:
                        "• Russian shooting schedule was the toughest technically and logistically\n• Real special-service gear, practical & original VFX, and international cast\n• Dubai scenes showcase large-scale action and a tech-driven approach",
                    goal: "🌟 Goal:",
                    goalVal:
                        "• Elevate international-level detective/crime genre in Uzbek cinema\n• Offer viewers an intelligent, dynamic film experience",
                },
                clips: {
                    title: "From our work (Music videos)",
                    more: "...and many other great clips",
                },
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: savedLng,
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
});

export default i18n;
