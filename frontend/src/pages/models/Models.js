import React, { useState, useEffect } from 'react';
import ApiCall from '../../config';
import './Models.css';
import Header from '../header/Header';

function Models() {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(null);
    const [loading, setLoading] = useState(true);

    // строим URL для фото (относительный путь к твоему бэку)
    const buildFileUrl = (id) => `/api/v1/file/download/${id}`;

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Loading cards...');
                const res = await ApiCall('/api/v1/casting-user', 'GET');
                console.log('Fetched models:', res);

                const mapped = (res || []).map((u) => {
                    const photos = Array.isArray(u.photos) ? u.photos : [];
                    const photoUrls = photos
                        .map((p) => (typeof p === 'string' ? p : p?.id))
                        .filter(Boolean)
                        .map((id) => `/api/v1/file/download/${id}`);

                    return {
                        ...u,
                        photoUrls,
                        age: u.age ?? calcAge(u.birthday),
                    };
                });

                setItems(mapped);
            } catch (e) {
                console.error('Failed to load cards', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // ← зависимости пустые


    const openModal = (item) => {
        setCurrent(item);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setCurrent(null);
    };

    const fmt = (v) => (v === null || v === undefined || v === '' ? '—' : v);

    return (
        <div className="models-page">
            <Header props="" />

            <section className="container">
                <h1 className="title">Models / Actors</h1>

                {loading ? (
                    <div className="loading">Yuklanmoqda...</div>
                ) : (
                    <div className="grid">
                        {items.map((m) => {
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
                                        <div className="card-name">{fmt(m.name)}</div>
                                        <div className="card-sub">{fmt(m.age)} yosh</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {open && current && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            ✕
                        </button>

                        <div className="modal-header">
                            <h2>{fmt(current.name)}</h2>
                            <p className="muted">
                                {fmt(current.castingType)} • {fmt(current.gender)} • {fmt(current.age)} yosh
                            </p>
                        </div>

                        {/* Галерея */}
                        <div className="gallery">
                            {(current.photoUrls || []).map((url, idx) => (
                                <div className="gallery-item" key={idx}>
                                    <img src={url} alt={`${current.name}-${idx}`} loading="lazy" />
                                </div>
                            ))}
                            {(!current.photoUrls || current.photoUrls.length === 0) && (
                                <div className="gallery-empty">Foto topilmadi</div>
                            )}
                        </div>

                        {/* Подробная таблица */}
                        <div className="details">
                            <div className="detail-col">
                                <dl>
                                    <dt>Ism familiya</dt>
                                    <dd>{fmt(current.name)}</dd>

                                    <dt>Yosh</dt>
                                    <dd>{fmt(current.age)}</dd>

                                    <dt>Tug‘ilgan sana</dt>
                                    <dd>{fmt(current.birthday)}</dd>

                                    <dt>Jinsi</dt>
                                    <dd>{fmt(current.gender)}</dd>

                                    <dt>Hudud</dt>
                                    <dd>{fmt(current.region)}</dd>

                                    <dt>Millati</dt>
                                    <dd>{fmt(current.nationality)}</dd>

                                    <dt>Soha</dt>
                                    <dd>{fmt(current.castingType)}</dd>

                                    <dt>Holat (status)</dt>
                                    <dd>{fmt(current.status)}</dd>
                                </dl>
                            </div>

                            <div className="detail-col">
                                <dl>
                                    <dt>Bo‘yi</dt>
                                    <dd>{fmt(current.height)}</dd>

                                    <dt>Soch rangi</dt>
                                    <dd>{fmt(current.hairColor)}</dd>

                                    <dt>Ko‘z rangi</dt>
                                    <dd>{fmt(current.eyeColor)}</dd>

                                    <dt>Kiyim o‘lchami</dt>
                                    <dd>{fmt(current.clothSize)}</dd>

                                    <dt>Oyoq о‘lchami</dt>
                                    <dd>{fmt(current.shoeSize)}</dd>

                                    <dt>Narx</dt>
                                    <dd>{fmt(current.price)}</dd>
                                </dl>
                            </div>

                            <div className="detail-col">
                                <dl>
                                    <dt>Email</dt>
                                    <dd>{fmt(current.email)}</dd>

                                    <dt>Telefon</dt>
                                    <dd>{fmt(current.phone)}</dd>

                                    <dt>Telegram</dt>
                                    <dd>{fmt(current.telegram)}</dd>

                                    <dt>Facebook</dt>
                                    <dd>{fmt(current.facebook)}</dd>

                                    <dt>Instagram</dt>
                                    <dd>{fmt(current.instagram)}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Models;
