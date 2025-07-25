import { useEffect, useState } from "react";
import UserBookings from "./UserBookings";
import BookingSkeletonLoader from "../../components/SkeletonLoader/BookingsSkeletonLoader";

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [filterBy, setFilterBy] = useState("check_in");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a[filterBy]);
    const dateB = new Date(b[filterBy]);

    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const signedInUser = user?.auth_user_id;

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!signedInUser) return;

    async function fetchData() {
      try {
        const url = `${apiUrl}/api/users/${signedInUser}/bookings`;
        const res = await fetch(url);
        const data = await res.json();
        setBookings(data.bookings);
      } catch (err) {
        console.error("failed the fetch bookings", err);
      }
    }

    fetchData();
  }, [signedInUser]);

  if (!signedInUser) return <p>Please log in to view your bookings</p>;

  return (
    <div>
      {bookings.length === 0 ? (
        <BookingSkeletonLoader />
      ) : (
        <UserBookings
          bookings={filteredBookings}
          setBookings={setBookings}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      )}
    </div>
  );
}
