import React, { useState, useEffect, useMemo } from 'react';
import ApiCall, { baseUrl } from '../../config';
import './Models.css';
import Header from '../header/Header';

function Models() {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [zoomPhoto, setZoomPhoto] = useState(null);

    // --- Фильтры ---
    const [query, setQuery] = useState('');
    const [gender, setGender] = useState('all'); // all | male | female
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(100);
    const [heightFrom, setHeightFrom] = useState('');

    const calcAge = (birthday) => {
        if (!birthday) return null;
        try {
            const b = new Date(birthday);
            const now = new Date();
            let age = now.getFullYear() - b.getFullYear();
            const m = now.getMonth() - b.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
            return age;
        } catch {
            return null;
        }
    };

    // блокируем скролл боди при открытой модалке
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => (document.body.style.overflow = '');
    }, [open]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ApiCall('/api/v1/casting-user', 'GET');
                console.log(res.data);
                
                const list = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];

                const mapped = list.map((u) => {
                    const photos = Array.isArray(u.photos) ? u.photos : [];
                    const photoUrls = photos
                        .map((p) => p?.id)
                        .filter(Boolean)
                        .map((id) => `${baseUrl}/api/v1/file/getFile/${id}`);

                    const age = u.age ?? calcAge(u.birthday);

                    return { ...u, photoUrls, age };
                });

                setItems(mapped);

                const maxAgeInData = Math.max(...(mapped.map(i => i.age || 0)), 60);
                setMaxAge(isFinite(maxAgeInData) ? maxAgeInData : 60);
            } catch (e) {
                console.error('Failed to load cards', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openModal = (item) => {
        setCurrent(item);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setCurrent(null);
    };

    const fmt = (v) => (v === null || v === undefined || v === '' ? '—' : v);

    const heightOptions = useMemo(() => {
        const minH = 145, maxH = 220;
        const list = [];
        for (let h = minH; h <= maxH; h += 5) list.push(h);
        return list;
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return items.filter((i) => {
            if (q && !(i.name || '').toLowerCase().includes(q)) return false;
            if (gender !== 'all') {
                const g = String(i.gender || '').toLowerCase();
                if (g !== gender) return false;
            }
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
    }, [items, query, gender, minAge, maxAge, heightFrom]);

    const maxAgePossible = useMemo(() => {
        const m = Math.max(...(items.map(i => i.age || 0)), 60);
        return isFinite(m) ? m : 60;
    }, [items]);

    // helpers for dual slider visuals
    const rangeMin = 18;
    const rangeMax = 100;
    const pct = (val) => ((val - rangeMin) * 100) / (rangeMax - rangeMin);

    // ensure minAge <= maxAge
    useEffect(() => {
        if (Number(minAge) > Number(maxAge)) setMinAge(maxAge);
    }, [maxAge, minAge]);

    return (
        <div className="models-page">
            <Header props="" />

            <section className="container">
                <div className="toolbar">
                    <h1 className="title">Models / Actors</h1>

                    <div className="filters">
                        <div className="filter-item">
                            <label>Поиск</label>
                            <input
                                type="text"
                                placeholder="Имя, фамилия…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        <div className="filter-item">
                            <label>Пол</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="all">Любой</option>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>
                        </div>

                        {/* ЕДИНЫЙ ДВУРУЧНЫЙ СЛАЙДЕР ВОЗРАСТА */}
                        <div className="filter-item age-block">
                            <label>Возраст</label>


                            {/* двуручный слайдер */}
                            <div className="dual-range">
                                {/* трек с подсветкой между ручками */}
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
                                {/* левая ручка */}
                                <input
                                    type="range"
                                    min={rangeMin}
                                    max={rangeMax}
                                    value={minAge}
                                    onChange={(e) => setMinAge(Math.min(Number(e.target.value), maxAge))}
                                />
                                {/* правая ручка */}
                                <input
                                    type="range"
                                    min={rangeMin}
                                    max={rangeMax}
                                    value={maxAge}
                                    onChange={(e) => setMaxAge(Math.max(Number(e.target.value), minAge))}
                                />

                                {/* бейджи значений над ручками */}
                                <span className="dual-range__badge" style={{ left: `calc(${pct(minAge)}% - 12px)` }}>
                                    {minAge}
                                </span>
                                <span className="dual-range__badge dual-range__badge--right" style={{ left: `calc(${pct(maxAge)}% - 12px)` }}>
                                    {maxAge}
                                </span>

                                {/* подписи рисок (0—25—50—75—100 условно) можно скрыть/настроить */}
                                <div className="dual-range__ticks">
                                    {[0, 25, 50, 75, 100].map(t => (
                                        <span key={t} style={{ left: `${t}%` }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Рост от … и выше */}
                        <div className="filter-item">
                            <label>Рост от</label>
                            <select
                                value={heightFrom}
                                onChange={(e) => setHeightFrom(e.target.value)}
                            >
                                <option value="">Любой</option>
                                {heightOptions.map((h) => (
                                    <option key={h} value={h}>{h} см</option>
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
                                    setMinAge(rangeMin);
                                    setMaxAge(rangeMax);
                                    setHeightFrom('');
                                }}
                            >
                                Сбросить
                            </button>
                        </div>
                    </div>

                    <div className="result-count">
                        Найдено: {filtered.length}
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Yuklanmoqda...</div>
                ) : (
                    <div className="grid">
                        {filtered.map((m) => {
                            const avatar =
                                (m.photoUrls && m.photoUrls.length > 0 && m.photoUrls[0]) ||
                                'https://via.placeholder.com/600x800?text=No+Photo';

                            return (
                                <div
                                    key={m.id}
                                    className="card"
                                    role="button"
                                    onClick={() => openModal(m)}
                                >
                                    <div className="card-photo">
                                        <img src={avatar} alt={m.name} loading="lazy" />
                                    </div>
                                    <div className="card-body">
                                        <div className="card-name">{(m.name || '').trim()}</div>
                                        <div className="card-sub">{fmt(m.age)} yosh</div>
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
                                <img
                                    src={current.photoUrls?.[0] || 'https://via.placeholder.com/400x500?text=No+Photo'}
                                    alt={current.name}
                                />
                            </div>

                            <div className="profile-info">
                                <h2 className="profile-name">{fmt(current.name)}</h2>
                                <dl>
                                    <dt>Возраст</dt><dd>{fmt(current.age)} лет</dd>
                                    <dt>Гражданство</dt><dd>{fmt(current.nationality)}</dd>
                                    <dt>Город проживания</dt><dd>{fmt(current.region)}</dd>
                                    <dt>Рост</dt><dd>{fmt(current.height)} см</dd>
                                    <dt>Тип внешности</dt><dd>{fmt(current.castingType)}</dd>
                                    <dt>Телосложение</dt><dd>{fmt(current.bodyType) || '—'}</dd>
                                    <dt>Цвет волос</dt><dd>{fmt(current.hairColor) || '—'}</dd>
                                    <dt>Цвет глаз</dt><dd>{fmt(current.eyeColor) || '—'}</dd>
                                    <dt>Пол</dt><dd>{fmt(current.gender)}</dd>
                                </dl>
                            </div>
                        </div>

                        <div className="profile-gallery">
                            <h3>ФОТО ({current.photoUrls?.length || 0})</h3>
                            <div className="gallery-row">
                                {(current.photoUrls || []).map((url, idx) => (
                                    <img
                                        key={idx}
                                        src={url}
                                        alt={`${current.name}-${idx}`}
                                        onClick={() => setZoomPhoto(url)}
                                    />
                                ))}
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
