import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, eachDayOfInterval } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./FormattedBookingsCalendar.css";
import CloseButton from "./CloseButton";
import { useNavigate } from "react-router-dom";

export default function BookingCalendar({ propertyId, setShowCalendar }) {
  const [bookedDates, setBookedDates] = useState([]);

  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  const navigate = useNavigate();

  const handleNotLoggedInCalendarClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(
          `https://airbnc-oxkw.onrender.com/api/properties/${propertyId}/bookings`
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
        ranges={[
          {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
          },
        ]}
        minDate={new Date()}
        disabledDates={bookedDates}
        onChange={handleNotLoggedInCalendarClick}
      />

      <CloseButton onClick={() => setShowCalendar(false)} label="Close" />
    </div>
  );
}
