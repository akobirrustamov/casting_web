import React, { useState, useEffect } from 'react';
import ApiCall, { baseUrl } from '../../config';
import './Models.css';
import Header from '../header/Header';

function Models() {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [zoomPhoto, setZoomPhoto] = useState(null);


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
                <div className="cast-backdrop" onClick={closeModal}>
                    <div className="cast-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="cast-modal-close" onClick={closeModal}>✕</button>

                        <div className="cast-modal-body">
                            {/* Левая колонка — главное фото */}
                            <div className="profile-photo">
                                <img
                                    src={current.photoUrls?.[0] || 'https://via.placeholder.com/400x500?text=No+Photo'}
                                    alt={current.name}
                                />
                            </div>

                            {/* Правая колонка — данные */}
                            <div className="profile-info">
                                <h2 className="profile-name">{fmt(current.name)}</h2>
                                <p>Пол: {fmt(current.gender)}</p>
                                <dl>
                                    <dt>Возраст</dt><dd>{fmt(current.age)} лет</dd>
                                    <dt>Гражданство</dt><dd>{fmt(current.nationality)}</dd>
                                    <dt>Город проживания</dt><dd>{fmt(current.region)}</dd>
                                    <dt>Рост</dt><dd>{fmt(current.height)} см</dd>
                                    <dt>Вес</dt><dd>{fmt(current.weight) || '—'}</dd>
                                    <dt>Тип внешности</dt><dd>{fmt(current.castingType)}</dd>
                                    <dt>Телосложение</dt><dd>{fmt(current.bodyType) || '—'}</dd>
                                    <dt>Цвет волос</dt><dd>{fmt(current.hairColor) || '—'}</dd>
                                    <dt>Цвет глаз</dt><dd>{fmt(current.eyeColor) || '—'}</dd>
                                </dl>
                            </div>
                        </div>

                        {/* Галерея фото */}
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
