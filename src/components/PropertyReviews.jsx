import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PropertyReviews.css";

export default function PropertyReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(
        `https://airbnc-oxkw.onrender.com/api/properties/${id}/reviews`
      );

      const data = await res.json();

      setReviews(data.reviews);
    }

    fetchReviews();
  }, [id]);

  console.log(reviews);

  return (
    <div className="review-section">
      {reviews.map((review) => {
        return (
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
        );
      })}
    </div>
  );
}

/// `https://airbnc-oxkw.onrender.com/api/properties/${id}/reviews`
///
///  <div className="review=content">
/// <h1>{review.guest}</h1>
/// <p>Rating: {review.rating}/5</p>
/// <h2>{review.comment}</h2>
/// </div>
