import { useEffect, useState } from "react";
import "./UserBookings.css";
import { da } from "date-fns/locale";
import { format } from "date-fns";

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

            return { id, name: data.propertyId.property_name };
          })
        );

        const propertyMap = {};
        fetchedData.forEach((properties) => {
          propertyMap[properties.id] = properties.name;
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
      <p>back button</p>
      <h1 className="bookings-header">Bookings!</h1>

      {bookings.map((booking) => (
        <div key={booking.booking_id} className="booking-card">
          <h2 className="booking-property-title">
            {propertyDetails[booking.property_id] || "Loading..."}
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
            <strong>BOOKED ON:</strong>{" "}
            {format(new Date(booking.created_at), "PPP")}
          </p>
        </div>
      ))}
    </div>
  );
}
