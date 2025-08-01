import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyPage.css";
import smallerMap from "../../assets/smallerMap.png";

import Header from "../../components/Header";
import PropertyReviews from "../../components/PropertyReviews";
import PropertyAmenities from "./PropertyAmenities";
import BookingCalendar from "../bookings/FormattedBookingsCalendar";
import ToastLogIn from "../../components/ToastLogIn";
import PropertyMap from "../../components/PropertyMap";
import HostedBy from "../../components/HostedBy";

export default function PropertyPage({ user }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch(`${apiUrl}/api/properties/${id}`);
        const data = await response.json();
        setProperty(data.propertyId);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    }

    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <>
      <Header user={user} />
      <div className="property-page-container">
        {isLoggedIn && (
          <ToastLogIn message="Oops!... looks like you're not logged in" />
        )}

        <img src={property.images} alt={property.property_name} />
        <div className="property-info-section">
          <h1 className="property-info-header">{property.property_name}</h1>
          <h2>{property.description}</h2>
          <h3>{property.location}</h3>
          <p>£{property.price_per_night}</p>
        </div>
      </div>

      <HostedBy />
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

      <div className="section-heading">
        <p>Where you'll stay!</p>
        <p className="section-location">{property.location}</p>
      </div>
      <div className="map-container-wrapper">
        <div className="map-container">
          <PropertyMap
            latitude={property.latitude}
            longitude={property.longitude}
          />
        </div>
      </div>

      <div className="section-heading"></div>

      {/* <img className="small-screen-map" src={smallerMap} alt="" /> */}

      <div className="map-fallback-message">
        Map available on larger devices!
      </div>
    </>
  );
}
