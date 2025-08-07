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
import ImageSlider from "../../components/ImageSlider";

export default function PropertyPage({ user }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchPropertyAndImages() {
      try {
        const [propertyRes, imagesRes] = await Promise.all([
          fetch(`${apiUrl}/api/properties/${id}`),
          fetch(`${apiUrl}/api/properties/${id}/images`),
        ]);

        const propertyData = await propertyRes.json();
        const imagesData = await imagesRes.json();

        setProperty(propertyData.propertyId);
        setImages(imagesData.images);
      } catch (error) {
        console.error("Failed to fetch property or images:", error);
      }
    }

    fetchPropertyAndImages();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <>
      <Header user={user} />
      <div className="property-page-container">
        {isLoggedIn && (
          <ToastLogIn message="Oops!... looks like you're not logged in" />
        )}

        {images.length > 0 && <ImageSlider images={images} />}

        <div className="property-info-section">
          <h1 className="property-info-header">{property.property_name}</h1>
          <h2>{property.description}</h2>
          <h3>{property.location}</h3>
          <p>£{property.price_per_night}</p>
        </div>
      </div>

      <hr className="section-divider" />

      <div className="host-and-amenities">
        {/* <HostedBy /> */}
        <PropertyAmenities />
      </div>

      <div className="reviews-and-calendar">
        <PropertyReviews />

        <hr className="section-divider" />

        <div className="calendar-center-wrapper">
          <BookingCalendar
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setShowCalendar={() => {}}
            propertyId={property.property_id}
          />
        </div>
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
