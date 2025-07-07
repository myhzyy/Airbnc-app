import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, eachDayOfInterval } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./FormattedBookingsCalendar.css";
import CloseButton from "../../components/CloseButton/CloseButton";
import { useNavigate } from "react-router-dom";

export default function BookingCalendar({ propertyId, setShowCalendar, user }) {
  const [bookedDates, setBookedDates] = useState([]);

  const handleLoginHereButton = () => {
    navigate("/login");
  };

  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleConfirmBooking = async () => {
    const payload = {
      guest_id: user.auth_user_id,
      check_in_date: selection.startDate.toISOString().split("T")[0],
      check_out_date: selection.endDate.toISOString().split("T")[0],
    };

    try {
      const res = await fetch(
        `${apiUrl}/api/properties/${propertyId}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Booking successful!");
        setShowCalendar(false);
      } else {
        alert(`Booking failed: ${data.msg || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong while booking.");
    }
  };

  const handleNotLoggedInCalendarClick = async () => {
    navigate("/login");
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(
          `${apiUrl}/api/properties/${propertyId}/bookings`
        );
        const data = await res.json();

        const disabledDates = data.bookings.rows.flatMap((booking) => {
          const start = new Date(booking.check_in_date);
          const end = new Date(booking.check_out_date);

          const days = eachDayOfInterval({ start, end });

          return days.map((date) => {
            return new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
          });
        });

        // console.log(disabledDates);
        setBookedDates(disabledDates);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    }

    fetchBookings();
  }, [propertyId]);

  return (
    <div className="booking-calendar">
      <h2>Check Availability</h2>
      <DateRange
        months={1}
        direction="vertical"
        showDateDisplay={false}
        ranges={[selection]}
        minDate={new Date()}
        disabledDates={bookedDates}
        onChange={(ranges) => setSelection(ranges.selection)}
      />

      <button
        className="confirm-booking-button"
        onClick={handleConfirmBooking}
        disabled={!user}
      >
        Confirm Booking
      </button>

      {!user && (
        <>
          <div className="login-reminder">
            <p>Please log in to book this property.</p>
            <button
              onClick={handleLoginHereButton}
              className="login-reminder-button"
            >
              Log in here!
            </button>
          </div>
        </>
      )}

      <CloseButton onClick={() => setShowCalendar(false)} label="Close" />
    </div>
  );
}
