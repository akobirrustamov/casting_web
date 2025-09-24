// src/pages/models/ModelCard.js
import React, { useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import useOnScreen from "./useOnScreen";
// если хук в отдельном файле
// или можно прямо в этом файле вставить сам хук

function ModelCard({ model, openModal, t, getFirstName, SmartImage, open }) {
    const cardRef = useRef(null);
    const isVisible = useOnScreen(cardRef);

    return (
        <div
            className="card"
            ref={cardRef}
            role="button"
            onClick={() => openModal(model)}
        >
            <div className="card-photo">
                {model.photoUrls && model.photoUrls.length > 0 ? (
                    <Carousel
                        indicators={model.photoUrls.length > 1}
                        controls={model.photoUrls.length > 1}
                        interval={!open && isVisible ? 2500 : null}
                        className="card-carousel"
                    >
                        {model.photoUrls.map((photoUrl, index) => (
                            <Carousel.Item key={index}>
                                <SmartImage
                                    src={photoUrl}
                                    alt={`${model.name} ${index + 1}`}
                                    className="card-image"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <img
                        src="https://via.placeholder.com/600x800?text=No+Photo"
                        alt={model.name}
                        loading="lazy"
                        className="card-placeholder"
                    />
                )}
            </div>

            <div className="card-body">
                <div className="card-center">
                    <div className="card-name">{getFirstName(model.name)}</div>
                    <div className="card-age">{t("units.years", { count: model.age ?? 0 })}</div>
                </div>
                <div className="card-id">ID: {model.id}</div>
            </div>
        </div>
    );
}

export default ModelCard;
