import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyPage.css";
import Header from "./Header";
import PropertyReviews from "./PropertyReviews";
import ClickButton from "./ClickButton";
import PropertyAmenities from "./PropertyAmenities";
import BookingCalendar from "../components/FormattedBookingsCalendar";

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); // ✅ correct spelling

  useEffect(() => {
    async function fetchProperty() {
      const response = await fetch(
        `https://airbnc-oxkw.onrender.com/api/properties/${id}`
      );

      const data = await response.json();
      setProperty(data.propertyId);
    }

    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="property-page-container">
        <img src={property.images} alt="" />
        <div className="property-info-section">
          <h1 className="property-info-header">{property.property_name}</h1>
          <h2>{property.description}</h2>
          <h3>{property.location}</h3>
          <p>£{property.price_per_night}</p>
        </div>
      </div>
      <PropertyAmenities />

      {!showReviews && !showCalendar && (
        <div className="button-row">
          <ClickButton
            label="See Reviews!"
            handleClick={() => setShowReviews(true)}
          />
          <ClickButton
            label="Show Availability!"
            handleClick={() => setShowCalendar(true)}
          />
        </div>
      )}

      {showReviews && <PropertyReviews setShowReviews={setShowReviews} />}

      {showCalendar && (
        <BookingCalendar
          setShowCalendar={setShowCalendar}
          propertyId={property.property_id}
        />
      )}
    </>
  );
}
