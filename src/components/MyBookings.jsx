import { useEffect, useState } from "react";
import UserBookings from "./UserBookings";

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  const signedInUser = user?.auth_user_id;

  useEffect(() => {
    if (!signedInUser) return;

    async function fetchData() {
      try {
        const url = `https://airbnc-oxkw.onrender.com/api/users/${signedInUser}/bookings`;
        const res = await fetch(url);
        const data = await res.json();
        setBookings(data.bookings);
      } catch (err) {
        console.error("failed the fetch bookings", err);
      }
    }

    fetchData();
  }, [signedInUser]);

  if (!signedInUser) return <p>Please log in to view your bookings.</p>;

  return (
    <div>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <UserBookings bookings={bookings} />
      )}
    </div>
  );
}
