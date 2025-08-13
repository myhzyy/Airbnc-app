import { useRef, useState, useEffect } from "react";
import "./ImageSlider.css";

export default function ImageSlider({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeState, setSwipeState] = useState({
    isSwiping: false,
    startX: 0,
    movedX: 0,
  });
  const sliderFrameRef = useRef(null);

  if (!images.length) return null;

  const goToNext = () => setCurrentIndex((i) => (i + 1) % images.length);
  const goToPrev = () =>
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  const getSliderWidth = () => sliderFrameRef.current?.offsetWidth || 1;
  const swipeOffsetPercent = (swipeState.movedX / getSliderWidth()) * 100;

  const startSwipe = (x) =>
    setSwipeState({ isSwiping: true, startX: x, movedX: 0 });

  const moveSwipe = (x) => {
    if (!swipeState.isSwiping) return;
    let delta = x - swipeState.startX;

    if (
      (currentIndex === 0 && delta > 0) ||
      (currentIndex === images.length - 1 && delta < 0)
    ) {
      delta = delta / 3;
    }
    setSwipeState((prev) => ({ ...prev, movedX: delta }));
  };

  const endSwipe = () => {
    if (!swipeState.isSwiping) return;

    const swipeThreshold = getSliderWidth() * 0.2;
    if (
      swipeState.movedX <= -swipeThreshold &&
      currentIndex < images.length - 1
    ) {
      setCurrentIndex((i) => i + 1);
    } else if (swipeState.movedX >= swipeThreshold && currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }

    setSwipeState({ isSwiping: false, startX: 0, movedX: 0 });
  };

  const handleMouseDown = (e) => startSwipe(e.clientX);
  const handleMouseMove = (e) => moveSwipe(e.clientX);
  const handleMouseUp = endSwipe;

  const handleTouchStart = (e) => startSwipe(e.touches[0].clientX);
  const handleTouchMove = (e) => moveSwipe(e.touches[0].clientX);
  const handleTouchEnd = endSwipe;

  useEffect(() => {
    const cancelSwipe = () => endSwipe();
    window.addEventListener("mouseup", cancelSwipe);
    window.addEventListener("touchend", cancelSwipe);
    return () => {
      window.removeEventListener("mouseup", cancelSwipe);
      window.removeEventListener("touchend", cancelSwipe);
    };
  }, [swipeState.isSwiping, swipeState.movedX, currentIndex]);

  return (
    <div className="slider-outer">
      <div
        className={`slider-frame ${swipeState.isSwiping ? "dragging" : ""}`}
        ref={sliderFrameRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="slider-button left"
          onClick={goToPrev}
          aria-label="Previous image"
        >
          ‹
        </button>

        <div
          className="slider-track"
          style={{
            transform: `translateX(calc(-${
              currentIndex * 100
            }% + ${swipeOffsetPercent}%))`,
            transition: swipeState.isSwiping ? "none" : "transform 300ms ease",
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
          onClick={goToNext}
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      <div className="dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
