import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, eachDayOfInterval } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./FormattedBookingsCalendar.css";
import CloseButton from "./CloseButton";

export default function BookingCalendar({ propertyId, setShowCalendar }) {
  const [bookedDates, setBookedDates] = useState([]);

  const handleClose = () => {
    setShowCalendar(false); // ✅ spelling matches prop name
  };

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch(
        `https://airbnc-oxkw.onrender.com/api/properties/${propertyId}/bookings`
      );
      const data = await res.json();

      const allDates = data.bookings.rows.flatMap((booking) =>
        eachDayOfInterval({
          start: new Date(booking.check_in_date),
          end: new Date(booking.check_out_date),
        })
      );

      setBookedDates(allDates);
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
        disabledDates={bookedDates}
        minDate={new Date()}
      />
      <CloseButton onClick={handleClose} label="Close Availability" />
    </div>
  );
}
