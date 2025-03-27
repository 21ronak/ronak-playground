import React, { useState, useEffect, useCallback } from "react";
import "../AirbnbDogUI.css";

const API_URL = "https://dog.ceo/api/breeds/image/random";

const AirbnbDogUI: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch dog images
    const fetchImages = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setImages((prev) => [...prev, data.message]);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
        setLoading(false);
    };

    // Optimized scroll handler using useCallback
    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
            fetchImages();
        }
    }, [loading]);

    // Attach debounced event listener
    useEffect(() => {
        const debounce = (func: () => void, delay: number) => {
            let timer: any = null;
            return () => {
                clearTimeout(timer);
                timer = setTimeout(func, delay);
            };
        };

        const debouncedScroll = debounce(handleScroll, 200);
        window.addEventListener("scroll", debouncedScroll);

        return () => window.removeEventListener("scroll", debouncedScroll);
    }, [handleScroll]);

    // Initial load
    useEffect(() => {
        for (let i = 0; i < 10; i++) {
            fetchImages();
        }
    }, []);

    return (
        <div className="container">
            <h1>🐶 Airbnb Dog Gallery</h1>
            <div className="grid-container">
                {images.map((image, index) => (
                    <div key={index} className="image-tile">
                        <img src={image} alt="Dog" />
                    </div>
                ))}
            </div>
            {loading && <p className="loading-text">Loading more images...</p>}
        </div>
    );
};

export default AirbnbDogUI;
