import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyAmenities.css";

export default function PropertyAmenities() {
  const { id } = useParams();
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    async function fetchAmenities() {
      const response = await fetch(
        `https://airbnc-oxkw.onrender.com/api/properties/${id}/amenities`
      );

      const data = await response.json();
      setAmenities(data.amenities);
    }

    fetchAmenities();
  }, []);

  //   console.log(amenities);

  return (
    <div className="amenities-container">
      <h3>Quick facts</h3>
      <div className="amenities-grid">
        {amenities.map((item, i) => (
          <div className="amenity-item" key={i}>
            <span className="amenity-icon">🏠</span>
            <span className="amenity-label">{item.amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
