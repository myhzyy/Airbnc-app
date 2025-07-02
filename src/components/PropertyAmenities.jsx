import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyAmenities.css";

export default function PropertyAmenities() {
  const { id } = useParams();
  const [amenities, setAmenities] = useState([]);

  const iconMap = {
    WiFi: "📶",
    TV: "📺",
    Kitchen: "🍳",
    "Washing Machine": "🧺",
    Parking: "🚗",
    Iron: "🧼",
    "Mini fridge": "🧊",
    "Coffee maker": "☕",
    "Air conditioning": "❄️",
    Dryer: "🔥",
    Fireplace: "🔥",
    Garden: "🌳",
    "Beach access": "🏖️",
    Desk: "🪑",
    BBQ: "🍖",
    "Outdoor seating": "🪴",
    "Infinity pool": "🏊",
    "Ski-in/Ski-out": "🎿",
    "Work desk": "💻",
    Library: "📚",
    "Hot tub": "🛁",
    "Pet-friendly": "🐶",
    default: "✨",
  };

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
        {amenities.map((item, i) => {
          const icon = iconMap[item.amenity] || iconMap.default;
          return (
            <div className="amenity-item" key={i}>
              <span className="amenity-icon">{icon}</span>
              <span className="amenity-label">{item.amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
