import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, eachDayOfInterval } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./FormattedBookingsCalendar.css";
import CloseButton from "../../components/CloseButton/CloseButton";
import { useNavigate } from "react-router-dom";

export default function BookingCalendar({
  propertyId,
  setShowCalendar,
  user,
  setIsLoggedIn,
}) {
  const [bookedDates, setBookedDates] = useState([]);
  const navigate = useNavigate();

  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleConfirmBooking = async () => {
    if (!user) {
      setIsLoggedIn(true);
      // navigate("/login");
      return;
    }

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
          return eachDayOfInterval({ start, end }).map((date) => {
            return new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
          });
        });

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

      <button className="confirm-booking-button" onClick={handleConfirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
}
