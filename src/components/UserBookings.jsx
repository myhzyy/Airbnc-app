import { useEffect, useState } from "react";
import "./UserBookings.css";
import { da } from "date-fns/locale";
import { format } from "date-fns";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";

export default function UserBookings({ bookings }) {
  const [propertyDetails, setpropertyDetails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const uniquePropertyIds = [
        ...new Set(bookings.map((booking) => booking.property_id)),
      ];

      try {
        const fetchedData = await Promise.all(
          uniquePropertyIds.map(async (id) => {
            const url = `https://airbnc-oxkw.onrender.com/api/properties/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            return {
              id,
              name: data.propertyId.property_name,
              image: data.propertyId.images,
            };
          })
        );

        const propertyMap = {};
        fetchedData.forEach((properties) => {
          propertyMap[properties.id] = {
            name: properties.name,
            image: properties.image,
          };
        });

        setpropertyDetails(propertyMap);
      } catch (err) {
        console.error("Error fetching property details", err);
      }
    }

    if (bookings.length > 0) fetchData();
  }, [bookings]);

  //   console.log(propertyDetails);

  return (
    <div className="user-bookings-container">
      <BackButton />
      <h1 className="bookings-header">My Bookings</h1>

      {bookings.map((booking) => (
        <Link
          to={`/property/${booking.property_id}`}
          key={booking.booking_id}
          className="booking-card-link"
        >
          <div className="booking-card">
            <div className="booking-properties-info">
              <h2 className="booking-property-title">
                {propertyDetails[booking.property_id]?.name || "Loading..."}
              </h2>

              <p>
                <strong>Check-in:</strong>
                {format(new Date(booking.check_in_date), "PPP")}
              </p>
              <p>
                <strong>Check-out:</strong>
                {format(new Date(booking.check_out_date), "PPP")}
              </p>
              <p>
                <strong>BOOKED ON:</strong>
                {format(new Date(booking.created_at), "PPP")}
              </p>
            </div>

            <div className="booking-properties-image">
              <img
                src={propertyDetails[booking.property_id]?.image}
                alt={propertyDetails[booking.property_id]?.name}
                className="property-booking-image"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
