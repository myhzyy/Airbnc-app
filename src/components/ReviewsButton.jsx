import "./ReviewsButton.css";

// ReviewsButton.jsx
export default function ReviewsButton({ handleClick }) {
  return (
    <div className="reviews-button-container">
      <button className="reviews-button" onClick={handleClick}>
        See reviews!
      </button>
    </div>
  );
}
