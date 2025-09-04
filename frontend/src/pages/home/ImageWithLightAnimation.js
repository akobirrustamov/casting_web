import React, { useState, useEffect } from 'react';

const ImageWithLightAnimation = ({
    src,
    alt = "Image with light animation",
    className = "w-full h-64 object-cover rounded-lg",
    enableAutoAnimation = true,
    animationSpeed = 4000
}) => {
    const [isAnimating, setIsAnimating] = useState(enableAutoAnimation);
    const [animationPhase, setAnimationPhase] = useState(0);

    useEffect(() => {
        if (!isAnimating) {
            setAnimationPhase(0);
            return;
        }

        const interval = setInterval(() => {
            setAnimationPhase(prev => (prev + 1) % 4);
        }, animationSpeed / 4);

        return () => clearInterval(interval);
    }, [isAnimating, animationSpeed]);

    return (
        <div className="relative overflow-hidden rounded-lg shadow-xl bg-gray-900">
            {/* Asosiy rasm */}
            <img
                src={src}
                alt={alt}
                className={`${className} transition-opacity duration-700 ${isAnimating ? 'opacity-90' : 'opacity-100'}`}
            />

            {/* Yorug'lik effektlari */}
            <div className="absolute inset-0">
                {/* Yuqori tomondan yorug'lik */}
                <div
                    className={`absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/60 to-transparent transition-opacity duration-1000 ${isAnimating && animationPhase === 0 ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* O'ng tomondan yorug'lik */}
                <div
                    className={`absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/60 to-transparent transition-opacity duration-1000 ${isAnimating && animationPhase === 1 ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Pastki tomondan yorug'lik */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/60 to-transparent transition-opacity duration-1000 ${isAnimating && animationPhase === 2 ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Chap tomondan yorug'lik */}
                <div
                    className={`absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-white/60 to-transparent transition-opacity duration-1000 ${isAnimating && animationPhase === 3 ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* Animatsiyani boshqarish tugmasi */}
            <button
                className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:bg-black/90 transition-colors z-10"
                onClick={() => setIsAnimating(!isAnimating)}
            >
                {isAnimating ? "Animatsiyani oʻchirish" : "Animatsiyani yoqish"}
            </button>

            {/* Holatni ko'rsatuvchi indikator */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-xs z-10">
                {isAnimating ? "Yorug'lik effektlari yoqilgan" : "Animatsiya o'chirilgan"}
            </div>
        </div>
    );
};

export default ImageWithLightAnimation;