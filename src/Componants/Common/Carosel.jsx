import React, { useEffect, useState } from 'react'
import img2 from "../../Assets/images.jpeg"
import img3 from "../../Assets/loan-management-software.jpg"
import img4 from "../../Assets/lon_mangmntprcs.jpg"
import img5 from "../../Assets/thumbnail-banner-100-1.png"
import '../../Styles/CommonStyle/Carosel.css'

const images = [ img2, img3, img4, img5];

const Carosel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Auto-slide every 3 seconds
    useEffect(() => {
        const slider = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(slider);

    }, []);
    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };
    return (
        <div className="carousel-container">

      {/* IMAGE */}
      <img src={images[currentIndex]} alt="carousel-img" className="carousel-image" />

      {/* ARROWS */}
      <button className="carousel-btn left" onClick={goToPrev}>❮</button>
      <button className="carousel-btn right" onClick={goToNext}>❯</button>

      {/* DOTS */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`dot ${index === currentIndex ? "active" : ""}`}
          ></span>
        ))}
      </div>

    </div>
    )
}

export default Carosel;
