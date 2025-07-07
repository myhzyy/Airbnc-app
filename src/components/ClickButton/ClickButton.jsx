import "./ClickButton.css";

export default function ReviewsButton({ handleClick, label }) {
  return (
    <div className="reviews-button-container">
      <button className="reviews-button" onClick={handleClick}>
        {label}
      </button>
    </div>
  );
}
