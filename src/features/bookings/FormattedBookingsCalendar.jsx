import { useEffect, useState } from "react";
import { eachDayOfInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import "react-day-picker/style.css";
import "./FormattedBookingsCalendar.css";

export default function BookingCalendar({
  propertyId,
  setShowCalendar,
  user,
  setIsLoggedIn,
}) {
  const [bookedDates, setBookedDates] = useState([]);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDates, setSuccessDates] = useState({ from: "", to: "" });

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Lock body scroll when success modal is open
  useEffect(() => {
    if (!showSuccess) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showSuccess]);

  const handleConfirmBooking = async () => {
    if (!user) {
      setIsLoggedIn(true);
      return;
    }
    if (!range?.from || !range?.to) {
      alert("Please pick your check‑in and check‑out dates.");
      return;
    }

    const checkIn = range.from.toISOString().split("T")[0];
    const checkOut = range.to.toISOString().split("T")[0];

    const payload = {
      guest_id: user.auth_user_id,
      check_in_date: checkIn,
      check_out_date: checkOut,
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
        setSuccessDates({ from: checkIn, to: checkOut });
        setShowSuccess(true);
        // Optionally clear selection after success:
        // setRange({ from: undefined, to: undefined });
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
        className="bp-calendar"
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={1}
        weekStartsOn={1}
        showOutsideDays
        disabled={bookedDates}
        defaultMonth={new Date()}
      />

      <button className="confirm-booking-button" onClick={handleConfirmBooking}>
        Confirm Booking
      </button>

      {showSuccess && (
        <div className="bc-modal-overlay" onClick={() => setShowSuccess(false)}>
          <div
            className="bc-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="bc-modal-title">Thanks for your booking! 🎉</h3>
            <p className="bc-modal-text">
              We’ve reserved your stay from <strong>{successDates.from}</strong>{" "}
              to <strong>{successDates.to}</strong>.
            </p>

            <div className="bc-modal-actions">
              <button
                className="bc-btn bc-btn-primary"
                onClick={() => {
                  setShowSuccess(false);
                  setShowCalendar?.(false);
                  // Change to your “My bookings” route if different
                  navigate("/myBookings");
                }}
              >
                View My Bookings
              </button>
              <button
                className="bc-btn bc-btn-ghost"
                onClick={() => setShowSuccess(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
