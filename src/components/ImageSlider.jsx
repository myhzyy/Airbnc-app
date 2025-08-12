import { useState } from "react";
import "./ImageSlider.css";

export default function ImageSlider({ images = [] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return null;

  const src = images[idx]?.image_url || images[idx]?.url || images[idx] || "";
  const alt = images[idx]?.alt_tag || "Property photo";

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="slider-outer">
      <div className="slider-frame">
        <button className="slider-button left" onClick={prev} aria-label="Prev">
          ‹
        </button>

        <div className="image-wrapper">
          <img src={src} alt={alt} />
        </div>

        <button
          className="slider-button right"
          onClick={next}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
