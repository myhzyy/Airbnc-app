import { useEffect, useState } from "react";
import { eachDayOfInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./FormattedBookingsCalendar.css";

export default function BookingCalendar({
  propertyId,
  setShowCalendar,
  user,
  setIsLoggedIn,
}) {
  const [bookedDates, setBookedDates] = useState([]);
  const [range, setRange] = useState({ from: undefined, to: undefined }); // ⬅️ no default selection
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleConfirmBooking = async () => {
    if (!user) {
      setIsLoggedIn(true);
      return;
    }
    if (!range?.from || !range?.to) {
      alert("Please pick your check‑in and check‑out dates.");
      return;
    }

    const payload = {
      guest_id: user.auth_user_id,
      check_in_date: range.from.toISOString().split("T")[0],
      check_out_date: range.to.toISOString().split("T")[0],
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

        const disabledDates = data.bookings.rows.flatMap((b) =>
          eachDayOfInterval({
            start: new Date(b.check_in_date),
            end: new Date(b.check_out_date),
          }).map((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()))
        );

        setBookedDates(disabledDates);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    }
    fetchBookings();
  }, [propertyId, apiUrl]);

  return (
    <div className="booking-calendar">
      <h2>Check Availability</h2>

      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={new Date()}
        disabled={bookedDates}
        weekStartsOn={1}
        numberOfMonths={1}
        showOutsideDays
        className="bp-calendar"
      />

      <button className="confirm-booking-button" onClick={handleConfirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
}
