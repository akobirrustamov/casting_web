import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ApiCall, { baseUrl } from '../../config';
import './Models.css';
import Header from '../header/Header';
import Loader from './Loader';
import EmptyState from './EmptyState';

function Models() {
    const { t } = useTranslation();

    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [zoomPhoto, setZoomPhoto] = useState(null);
    const [contactLock, setContactLock] = useState(false);
    // --- Фильтры ---
    const [query, setQuery] = useState('');
    const [gender, setGender] = useState('all');
    const [ctype, setCtype] = useState('all');
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(100);
    const [heightFrom, setHeightFrom] = useState('');

    const TELEGRAM_USERNAME = 'Lazurith2';

    const calcAge = (birthday) => {
        if (!birthday) return null;
        try {
            const b = new Date(birthday);
            const now = new Date();
            let age = now.getFullYear() - b.getFullYear();
            const m = now.getMonth() - b.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
            return age;
        } catch { return null; }
    };

    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => (document.body.style.overflow = '');
    }, [open]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ApiCall('/api/v1/casting-user', 'GET');
                const list = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
                const mapped = list.map((u) => {
                    const photos = Array.isArray(u.photos) ? u.photos : [];
                    const photoUrls = photos.map(p => p?.id).filter(Boolean).map(id => `${baseUrl}/api/v1/file/getFile/${id}`);
                    const ageRaw = u.age ?? calcAge(u.birthday);
                    const ageNum = Number(ageRaw);
                    const age = Number.isFinite(ageNum) ? Math.max(0, Math.min(100, ageNum)) : null;
                    return { ...u, photoUrls, age, castingType: (u.castingType || '').toLowerCase() };
                });
                setItems(mapped);
            } catch (e) {
                console.error('Failed to load cards', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const openModal = (item) => { setCurrent(item); setOpen(true); };
    const closeModal = () => { setOpen(false); setCurrent(null); };
    const fmt = (v) => (v === null || v === undefined || v === '' ? '—' : v);

    const heightOptions = useMemo(() => {
        const list = [];
        for (let h = 145; h <= 220; h += 5) list.push(h);
        return list;
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return items.filter((i) => {
            if (q && !(i.name || '').toLowerCase().includes(q)) return false;
            if (gender !== 'all' && String(i.gender || '').toLowerCase() !== gender) return false;
            if (ctype !== 'all' && String(i.castingType || '').toLowerCase() !== ctype) return false;
            const a = Number(i.age);
            if (Number.isFinite(a)) {
                if (a < Number(minAge)) return false;
                if (a > Number(maxAge)) return false;
            }
            if (heightFrom !== '') {
                const h = Number(i.height);
                if (!Number.isFinite(h) || h < Number(heightFrom)) return false;
            }
            return true;
        });
    }, [items, query, gender, ctype, minAge, maxAge, heightFrom]);

    const rangeMin = 0, rangeMax = 100;
    const clampAge = (v) => Math.max(rangeMin, Math.min(rangeMax, Number(v) || 0));
    const pct = (val) => ((val - rangeMin) * 100) / (rangeMax - rangeMin);
    useEffect(() => {
        const minC = clampAge(minAge), maxC = clampAge(maxAge);
        if (minC !== minAge) setMinAge(minC);
        if (maxC !== maxAge) setMaxAge(maxC);
        if (minC > maxC) setMinAge(maxC);
    }, [maxAge, minAge]); // eslint-disable-line

    const buildContactMessage = (m) => {
        const lblRequest = t('models.contact.requestTitle', 'Заявка на модель');
        const lblId = t('models.contact.id', 'ID');
        const lblName = t('models.contact.name', 'Имя');
        return [lblRequest, `${lblId}: ${m.id}`, `${lblName}: ${(m.name || '').trim()}`].join('\n');
    };

    const DRAFT_FLAG_PREFIX = 'tg_draft_sent'; // ключ в localStorage: tg_draft_sent:<username>:<modelId>

    const handleContact = async () => {
        if (!current || contactLock) return;
        setContactLock(true);

        const msg = buildContactMessage(current);
        const draftKey = `${DRAFT_FLAG_PREFIX}:${TELEGRAM_USERNAME}:${current.id}`;

        try {
            const alreadySent = localStorage.getItem(draftKey) === '1';

            if (!alreadySent) {
                // первый клик по этой модели: откроем с ?text=...
                const encoded = encodeURIComponent(msg);
                window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${encoded}`, '_blank', 'noopener,noreferrer');

                // пометим как «отправлено», чтобы в следующий раз не подставлялось снова
                localStorage.setItem(draftKey, '1');
            } else {
                // последующие клики по этой же модели:
                // открываем чат без ?text=..., чтобы Телеграм не подставлял черновик повторно
                // (на всякий — скопируем текст в буфер, чтобы пользователю было удобно вставить самому)
                if (navigator.clipboard?.writeText) {
                    try { await navigator.clipboard.writeText(msg); } catch { }
                }
                window.open(`https://t.me/${TELEGRAM_USERNAME}`, '_blank', 'noopener,noreferrer');
            }
        } finally {
            setTimeout(() => setContactLock(false), 600);
        }
    };


    const castingTypeOptions = [
        { value: 'all', label: t('filters.castingType.options.all') },
        { value: 'model', label: t('filters.castingType.options.model') },
        { value: 'euromodel', label: t('filters.castingType.options.euromodel') },
        { value: 'bloger', label: t('filters.castingType.options.bloger') },
        { value: 'actor', label: t('filters.castingType.options.actor') },
        { value: 'extra', label: t('filters.castingType.options.extra') },
        { value: 'influencer', label: t('filters.castingType.options.influencer') },
    ];

    return (
        <div className="models-page">
            <Header props="" />
            <section className="container">
                <div className="toolbar">
                    <h1 className="title">{t('models.title', 'Models / Actors')}</h1>

                    <div className="filters">
                        <div className="filter-item">
                            <label>{t('filters.search', 'Поиск')}</label>
                            <input
                                type="text"
                                placeholder={t('filters.searchPlaceholder', 'Имя, фамилия…')}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        <div className="filter-item">
                            <label>{t('filters.gender', 'Пол')}</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="all">{t('filters.genderAny', 'Любой')}</option>
                                <option value="male">{t('filters.genderMale', 'Мужской')}</option>
                                <option value="female">{t('filters.genderFemale', 'Женский')}</option>
                            </select>
                        </div>

                        <div className="filter-item">
                            <label>{t('filters.castingType.label', 'Casting type')}</label>
                            <select value={ctype} onChange={(e) => setCtype(e.target.value)}>
                                {castingTypeOptions.map(o => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-item age-block">
                            <label>{t('filters.age', 'Возраст')}</label>
                            <div className="dual-range">
                                <div
                                    className="dual-range__track"
                                    style={{
                                        background: `linear-gradient(to right,
                      var(--range-bg) 0%,
                      var(--range-bg) ${pct(minAge)}%,
                      var(--range-fill) ${pct(minAge)}%,
                      var(--range-fill) ${pct(maxAge)}%,
                      var(--range-bg) ${pct(maxAge)}%,
                      var(--range-bg) 100%)`,
                                    }}
                                />
                                <input
                                    type="range"
                                    min={rangeMin}
                                    max={rangeMax}
                                    value={minAge}
                                    onChange={(e) => setMinAge(Math.min(clampAge(e.target.value), maxAge))}
                                />
                                <input
                                    type="range"
                                    min={rangeMin}
                                    max={rangeMax}
                                    value={maxAge}
                                    onChange={(e) => setMaxAge(Math.max(clampAge(e.target.value), minAge))}
                                />
                                <span className="dual-range__badge" style={{ left: `calc(${pct(minAge)}% - 12px)` }}>{minAge}</span>
                                <span className="dual-range__badge dual-range__badge--right" style={{ left: `calc(${pct(maxAge)}% - 12px)` }}>{maxAge}</span>
                                <div className="dual-range__ticks">
                                    {[0, 25, 50, 75, 100].map(tick => (
                                        <span key={tick} style={{ left: `${tick}%` }}>{tick}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="filter-item">
                            <label>{t('filters.heightFrom', 'Рост от')}</label>
                            <select value={heightFrom} onChange={(e) => setHeightFrom(e.target.value)}>
                                <option value="">{t('filters.any', 'Любой')}</option>
                                {heightOptions.map(h => (
                                    <option key={h} value={h}>{h} {t('units.cm', 'см')}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-item">
                            <label>&nbsp;</label>
                            <button
                                type="button"
                                className="btn-reset"
                                onClick={() => {
                                    setQuery('');
                                    setGender('all');
                                    setCtype('all');
                                    setMinAge(rangeMin);
                                    setMaxAge(rangeMax);
                                    setHeightFrom('');
                                }}
                            >
                                {t('actions.reset', 'Сбросить')}
                            </button>
                        </div>
                    </div>

                    <div className="result-count">
                        {t('models.found', 'Найдено')}: {filtered.length}
                    </div>
                </div>

                {loading ? (
                    <Loader label={t('common.loading', 'Loading...')} />
                ) : filtered.length === 0 ? (
                    <EmptyState
                        title={t('common.emptyTitle', 'Подходящих моделей не найдено')}
                        subtitle={t('common.emptySubtitle', 'Измените фильтры или попробуйте другой запрос')}
                    />
                ) : (
                    <div className="grid">
                        {filtered.map((m) => {
                            const avatar =
                                (m.photoUrls && m.photoUrls.length > 0 && m.photoUrls[0]) ||
                                'https://via.placeholder.com/600x800?text=No+Photo';
                            return (
                                <div key={m.id} className="card" role="button" onClick={() => openModal(m)}>
                                    <div className="card-photo">
                                        <img src={avatar} alt={m.name} loading="lazy" />
                                    </div>
                                    <div className="card-body">
                                        <div className="card-name">{(m.name || '').trim()}</div>
                                        <div className="card-sub">{t('units.years', { count: m.age ?? 0 })}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {open && current && (
                <div className="cast-backdrop" onClick={closeModal}>
                    <div className="cast-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="cast-modal-close" onClick={closeModal}>✕</button>

                        <div className="cast-modal-body">
                            <div className="profile-photo">
                                <img src={current.photoUrls?.[0] || 'https://via.placeholder.com/400x500?text=No+Photo'} alt={current.name} />
                            </div>
                            <div className="profile-info">
                                <h2 className="profile-name">{fmt(current.name)}</h2>
                                <dl>
                                    <dt>{t('modal.age', 'Возраст')}</dt>
                                    <dd>{t('units.years', { count: current.age ?? 0 })}</dd>
                                    <dt>{t('modal.nationality', 'Гражданство')}</dt>
                                    <dd>{fmt(current.nationality)}</dd>
                                    <dt>{t('modal.region', 'Город проживания')}</dt>
                                    <dd>{fmt(current.region)}</dd>
                                    <dt>{t('modal.height', 'Рост')}</dt>
                                    <dd>{fmt(current.height)} {t('units.cm', 'см')}</dd>
                                    <dt>{t('modal.appearanceType', 'Тип внешности')}</dt>
                                    <dd>{t(`filters.castingType.options.${current.castingType}`, current.castingType || '—')}</dd>
                                    <dt>{t('modal.bodyType', 'Телосложение')}</dt>
                                    <dd>{fmt(current.bodyType) || '—'}</dd>
                                    <dt>{t('modal.hairColor', 'Цвет волос')}</dt>
                                    <dd>{fmt(current.hairColor) || '—'}</dd>
                                    <dt>{t('modal.eyeColor', 'Цвет глаз')}</dt>
                                    <dd>{fmt(current.eyeColor) || '—'}</dd>
                                    <dt>{t('modal.gender', 'Пол')}</dt>
                                    <dd>{fmt(current.gender)}</dd>
                                </dl>
                            </div>
                        </div>

                        <div className="profile-gallery">
                            <h3>{t('models.photos', 'ФОТО')} ({current.photoUrls?.length || 0})</h3>
                            <div className="gallery-row">
                                {(current.photoUrls || []).map((url, idx) => (
                                    <img key={idx} src={url} alt={`${current.name}-${idx}`} onClick={() => setZoomPhoto(url)} />
                                ))}
                            </div>
                            <div className="contact-row">
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={handleContact}
                                    disabled={contactLock}
                                    aria-disabled={contactLock}
                                    title={contactLock ? t('common.loading', 'Loading...') : undefined}
                                >
                                    {t('actions.contact', 'Связаться')}
                                </button>
                                {/* можно оставить небольшой подсказочный текст на десктопе */}
                                {/* <small className="muted">{t('common.willOpenTelegram', 'Откроется Telegram. Текст уже скопирован — вставьте и отправьте.')}</small> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {zoomPhoto && (
                <div className="lightbox" onClick={() => setZoomPhoto(null)}>
                    <img src={zoomPhoto} alt="zoom" />
                </div>
            )}
        </div>
    );
}

export default Models;
