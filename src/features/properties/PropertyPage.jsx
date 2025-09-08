import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyPage.css";

import Header from "../../components/Header";
import PropertyReviews from "../../components/PropertyReviews";
import PropertyAmenities from "./PropertyAmenities";
import BookingCalendar from "../bookings/FormattedBookingsCalendar";
import ToastLogIn from "../../components/ToastLogIn";
import PropertyMap from "../../components/PropertyMap";
import ImageSlider from "../../components/ImageSlider";
import TetrominosLoader from "../../components/TetrominosLoader";
import HostedBy from "../../components/HostedBy";
import PropertyDescription from "../../components/PropertyDescription";
import AboutThisSpace from "../../components/AboutThisSpace";

export default function PropertyPage({ user }) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState([]);
  const [showAboutThisSpace, setShowAboutThisSpace] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);

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

  if (!property) return <TetrominosLoader />;

  return (
    <>
      <div className={`background-modalblur ${aboutOpen ? "is-blurred" : ""}`}>
        <Header user={user} />
        <div className="property-page-container">
          {isLoggedIn && (
            <ToastLogIn message="Oops!... looks like you're not logged in" />
          )}

          {images.length > 0 && <ImageSlider images={images} />}

          <div className="property-info-section">
            <h1 className="property-info-header">{property.property_name}</h1>
            {/* <h2>{property.description}</h2> */}
            <h3>{property.location}</h3>
            <p>£{property.price_per_night}</p>
          </div>
        </div>

        {/* <div className="about-this-space">
          <AboutThisSpace onOpen={() => setAboutOpen(true)} />
        </div> */}

        <hr className="section-divider" />

        <div className="host-and-amenities">
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

        <div className="hostedBy-wrapper">
          <HostedBy id={id} />
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
      </div>
    </>
  );
}
