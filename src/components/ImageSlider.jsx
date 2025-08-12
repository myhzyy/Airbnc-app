import "./ImageSlider.css";
import { useState } from "react";

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="slider-container">
      <button className="slider-button left" onClick={goToPrev}>
        ‹
      </button>

      <div className="image-wrapper">
        <img
          src={images[currentIndex].image_url}
          alt={images[currentIndex].alt_tag}
          className="slider-image"
        />
      </div>

      <button className="slider-button right" onClick={goToNext}>
        ›
      </button>
    </div>
  );
}
