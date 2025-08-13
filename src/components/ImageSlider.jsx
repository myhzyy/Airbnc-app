import { useRef, useState, useEffect } from "react";
import "./ImageSlider.css";

export default function ImageSlider({ images = [] }) {
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState({ active: false, startX: 0, deltaX: 0 });
  const frameRef = useRef(null);

  if (!images.length) return null;

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  const getWidth = () => frameRef.current?.offsetWidth || 1;
  const pctOffset = (drag.deltaX / getWidth()) * 100;

  const onPressStart = (x) => setDrag({ active: true, startX: x, deltaX: 0 });

  const onPressMove = (x) => {
    if (!drag.active) return;
    let dx = x - drag.startX;

    if ((idx === 0 && dx > 0) || (idx === images.length - 1 && dx < 0)) {
      dx = dx / 3;
    }
    setDrag((d) => ({ ...d, deltaX: dx }));
  };

  const onPressEnd = () => {
    if (!drag.active) return;
    const width = getWidth();
    const threshold = width * 0.2;

    if (drag.deltaX <= -threshold && idx < images.length - 1) {
      setIdx((i) => i + 1);
    } else if (drag.deltaX >= threshold && idx > 0) {
      setIdx((i) => i - 1);
    }

    setDrag({ active: false, startX: 0, deltaX: 0 });
  };

  const handleMouseDown = (e) => onPressStart(e.clientX);
  const handleMouseMove = (e) => onPressMove(e.clientX);
  const handleMouseUp = onPressEnd;

  const handleTouchStart = (e) => onPressStart(e.touches[0].clientX);
  const handleTouchMove = (e) => onPressMove(e.touches[0].clientX);
  const handleTouchEnd = onPressEnd;

  useEffect(() => {
    const up = () => onPressEnd();
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [drag.active, drag.deltaX, idx]);

  return (
    <div className="slider-outer">
      <div
        className={`slider-frame ${drag.active ? "dragging" : ""}`}
        ref={frameRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="slider-button left" onClick={prev} aria-label="Prev">
          ‹
        </button>

        <div
          className="slider-track"
          style={{
            transform: `translateX(calc(-${idx * 100}% + ${pctOffset}%))`,
            transition: drag.active ? "none" : "transform 300ms ease",
          }}
        >
          {images.map((img, i) => {
            const src = img?.image_url || img?.url || img;
            const alt = img?.alt_tag || `Property photo ${i + 1}`;
            return (
              <div className="image-wrapper" key={i}>
                <img src={src} alt={alt} draggable="false" />
              </div>
            );
          })}
        </div>

        <button
          className="slider-button right"
          onClick={next}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <div className="dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === idx ? "active" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
