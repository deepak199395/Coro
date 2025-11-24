import React, { useState, useEffect, useRef } from "react";
import img4 from "../../Assets/lon_mangmntprcs.jpg";
import img6 from "../../Assets/loan1.jpeg";
import img8 from "../../Assets/icici.jpeg";
import img9 from "../../Assets/icici.jpeg"
import img10 from "../../Assets/hdfc.png"
import img11 from "../../Assets/ICICI_Bank_Logo.svg.png"
import "../../Styles/CommonStyle/Carosel.css";

const images = [img4,img6,img8,img9,img10,img11];

const Carosel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);

  // Auto-slide every 3s
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const goToPrev = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    startAutoSlide();
  };

  const goToNext = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev + 1) % images.length);
    startAutoSlide();
  };

  // touch support for mobile swipe
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX = 0;
    let deltaX = 0;
    const onTouchStart = (e) => {
      stopAutoSlide();
      startX = e.touches[0].clientX;
    };
    const onTouchMove = (e) => {
      deltaX = e.touches[0].clientX - startX;
    };
    const onTouchEnd = () => {
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) goToPrev();
        else goToNext();
      }
      deltaX = 0;
      startAutoSlide();
    };

    slider.addEventListener("touchstart", onTouchStart, { passive: true });
    slider.addEventListener("touchmove", onTouchMove, { passive: true });
    slider.addEventListener("touchend", onTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchmove", onTouchMove);
      slider.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="carousel-outer">
      <div
        className="carousel-container"
        ref={sliderRef}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        <div
          className="carousel-slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div className="carousel-slide" key={idx}>
              <img src={src} alt={`slide-${idx}`} className="carousel-image" />
            </div>
          ))}
        </div>

        {/* arrows */}
        <button className="carousel-btn left" onClick={goToPrev} aria-label="Previous">
          ❮
        </button>
        <button className="carousel-btn right" onClick={goToNext} aria-label="Next">
          ❯
        </button>

        {/* dots */}
        <div className="carousel-dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => {
                stopAutoSlide();
                setCurrentIndex(idx);
                startAutoSlide();
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carosel;
