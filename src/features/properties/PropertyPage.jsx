import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyPage.css";
import Header from "../../components/Header";
import PropertyReviews from "../../components/PropertyReviews";
import PropertyAmenities from "./PropertyAmenities";
import BookingCalendar from "../bookings/FormattedBookingsCalendar";
import ToastLogIn from "../../components/ToastLogIn";

export default function PropertyPage({ user }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        {isLoggedIn && (
          <ToastLogIn message={"Oops!... looks like you're not logged in"} />
        )}

        <img src={property.images} alt="" />
        <div className="property-info-section">
          <h1 className="property-info-header">{property.property_name}</h1>
          <h2>{property.description}</h2>
          <h3>{property.location}</h3>
          <p>£{property.price_per_night}</p>
        </div>
      </div>

      <PropertyAmenities />

      <div className="reviews-and-calendar">
        <PropertyReviews />
        <BookingCalendar
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setShowCalendar={() => {}}
          propertyId={property.property_id}
        />
      </div>
    </>
  );
}
