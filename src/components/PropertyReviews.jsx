import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PropertyReviews.css";
import CloseButton from "./CloseButton/CloseButton";

export default function PropertyReviews({ setShowReviews }) {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  const propertyReviewRatings = reviews.map((property) => property.rating);
  const averagePropertyReviewRating =
    reviews.reduce((sum, property) => sum + property.rating, 0) /
    reviews.length;

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleClose = () => {
    setShowReviews(false);
  };

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(`${apiUrl}/api/properties/${id}/reviews`);

      const data = await res.json();
      setReviews(data.reviews);
    }

    fetchReviews();
  }, [id]);

  let ratingMessage;
  switch (Math.round(averagePropertyReviewRating)) {
    case 5:
      ratingMessage = "Great stay!";
      break;
    case 4:
      ratingMessage = "Good stay!";
      break;
    case 3:
      ratingMessage = "Decent stay.";
      break;
    case 2:
      ratingMessage = "Could be better.";
      break;
    case 1:
      ratingMessage = "Poor stay.";
      break;
    default:
      ratingMessage = "No reviews yet.";
  }

  return (
    <div className="review-section">
      <h1 className="user-reviews">Reviews about this property</h1>
      <h2 className="user-reviews-overall">
        {reviews.length
          ? `${averagePropertyReviewRating}/5 ⭐ ${ratingMessage} • ${
              reviews.length
            } Review${reviews.length > 1 ? "s" : ""}`
          : "No reviews yet"}
      </h2>

      {reviews.map((review) => (
        <div className="review-card" key={review.review_id}>
          <img src={review.guest_avatar} alt="review guest" />

          <div className="review-content">
            <h1>{review.guest}</h1>

            <div className="star-section">
              <p className="review-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
                ))}
              </p>
              <p>{new Date(review.created_at).toLocaleDateString()}</p>
            </div>

            <h2>{review.comment}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
