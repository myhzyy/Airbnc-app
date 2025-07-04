import "./UserBookings.css";

export default function UserBookings({ bookings }) {
  return (
    <div className="booking-card-container">
      {bookings.map((booking) => (
        <div key={booking.booking_id} className="booking-card">
          <p>
            <strong>Booking ID:</strong> {booking.booking_id}
          </p>
          <p>
            <strong>Check-in:</strong> {booking.check_in_date}
          </p>
          <p>
            <strong>Check-out:</strong> {booking.check_out_date}
          </p>
          <p>
            <strong>Created:</strong> {booking.created_at}
          </p>
          <p>
            <strong>Property ID:</strong> {booking.property_id}
          </p>
        </div>
      ))}
    </div>
  );
}
