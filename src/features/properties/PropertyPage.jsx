import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyPage.css";
import Header from "../../components/Header";
import PropertyReviews from "../../components/PropertyReviews";
import ClickButton from "../../components/ClickButton/ClickButton";
import PropertyAmenities from "./PropertyAmenities";
import BookingCalendar from "../bookings/FormattedBookingsCalendar";

export default function PropertyPage({ user }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchProperty() {
      const response = await fetch(`${apiUrl}/api/properties/${id}`);

      const data = await response.json();
      setProperty(data.propertyId);
    }

    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <>
      <Header user={user} />
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
          user={user}
          setShowCalendar={setShowCalendar}
          propertyId={property.property_id}
        />
      )}
    </>
  );
}
