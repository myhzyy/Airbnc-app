import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PropertyReviews.css";
import CloseButton from "./CloseButton";

export default function PropertyReviews({ setShowReviews }) {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

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

  return (
    <div className="review-section">
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

      <CloseButton onClick={handleClose} label="Close Reviews" />
    </div>
  );
}
