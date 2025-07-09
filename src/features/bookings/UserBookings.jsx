import { useEffect, useState } from "react";
import "./UserBookings.css";
import { format, isAfter } from "date-fns";
import BackButton from "../../components/BackButton/BackButton";
import { Link } from "react-router-dom";

export default function UserBookings({ bookings }) {
  const [futurePage, setFuturePage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const bookingsPerPage = 5;

  const [propertyDetails, setPropertyDetails] = useState({});
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setFuturePage(1);
    setPastPage(1);
  }, [bookings]);

  useEffect(() => {
    async function fetchData() {
      const uniquePropertyIds = [
        ...new Set(bookings.map((booking) => booking.property_id)),
      ];

      try {
        const fetchedData = await Promise.all(
          uniquePropertyIds.map(async (id) => {
            const url = `${apiUrl}/api/properties/${id}`;
            const res = await fetch(url);
            const data = await res.json();

            return {
              id,
              name: data.propertyId.property_name,
              image: data.propertyId.images,
            };
          })
        );

        const propertyMap = {};
        fetchedData.forEach((prop) => {
          propertyMap[prop.id] = {
            name: prop.name,
            image: prop.image,
          };
        });

        setPropertyDetails(propertyMap);
      } catch (err) {
        console.error("Error fetching property details", err);
      } finally {
      }
    }

    if (bookings.length > 0) fetchData();
  }, [bookings]);

  const now = new Date();

  const futureBookings = bookings
    .filter((booking) => isAfter(new Date(booking.check_in_date), now))
    .sort((a, b) => new Date(a.check_in_date) - new Date(b.check_in_date));

  const pastBookings = bookings
    .filter((booking) => !isAfter(new Date(booking.check_in_date), now))
    .sort((a, b) => new Date(b.check_in_date) - new Date(a.check_in_date));

  const paginatedFuture = futureBookings.slice(
    (futurePage - 1) * bookingsPerPage,
    futurePage * bookingsPerPage
  );

  const paginatedPast = pastBookings.slice(
    (pastPage - 1) * bookingsPerPage,
    pastPage * bookingsPerPage
  );

  const totalFuturePages = Math.ceil(futureBookings.length / bookingsPerPage);
  const totalPastPages = Math.ceil(pastBookings.length / bookingsPerPage);

  const renderBookingCard = (booking) => (
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
            <strong>Check-in:</strong>{" "}
            {format(new Date(booking.check_in_date), "PPP")}
          </p>
          <p>
            <strong>Check-out:</strong>{" "}
            {format(new Date(booking.check_out_date), "PPP")}
          </p>
          <p>
            <strong>BOOKED ON:</strong>{" "}
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
  );

  return (
    <div className="user-bookings-container">
      <BackButton />
      <h1 className="bookings-header">My Bookings</h1>

      <h2 className="bookings-subheading">Upcoming Bookings</h2>
      {paginatedFuture.length > 0 ? (
        paginatedFuture.map(renderBookingCard)
      ) : (
        <p>No upcoming bookings.</p>
      )}

      <div className="pagination-controls">
        {futurePage > 1 && (
          <button
            className="pagination-button"
            onClick={() => setFuturePage(futurePage - 1)}
          >
            ←
          </button>
        )}

        <span className="pagination-page-number">
          Page {futurePage} of {totalFuturePages}
        </span>

        {futurePage < totalFuturePages && (
          <button
            className="pagination-button"
            onClick={() => setFuturePage(futurePage + 1)}
          >
            →
          </button>
        )}
      </div>

      <h2 className="bookings-subheading">Past Bookings</h2>
      {paginatedPast.length > 0 ? (
        paginatedPast.map(renderBookingCard)
      ) : (
        <p>No past bookings.</p>
      )}
    </div>
  );
}
