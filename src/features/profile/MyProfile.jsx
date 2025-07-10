import { useEffect, useState } from "react";
import loggedInUser from "../../assets/loggedInUser.png";
import "./MyProfile.css";
import BackButton from "../../components/BackButton/BackButton";
import SignOut from "../../components/SignOut";

export default function UserProfile({ user, setUser }) {
  if (!user) return;

  const profileId = user.auth_user_id;
  const [stats, setStats] = useState(null);
  const [futureBookings, setFutureBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function fetchStats() {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${profileId}/stats`
      );
      const data = await res.json();
      setStats(data);
    }

    async function fetchBookings() {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${profileId}/bookings`
      );
      const data = await res.json();

      const today = new Date();
      const future = data.bookings.filter(
        (b) => new Date(b.check_in_date) >= today
      );
      const past = data.bookings.filter(
        (b) => new Date(b.check_in_date) < today
      );

      setFutureBookings(future);
      setPastBookings(past);
    }

    fetchStats();

    fetchBookings();
  }, [profileId]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }
  if (!stats) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <BackButton />
      <h1>About Me</h1>
      <div className="profile-card">
        <img src={loggedInUser} alt="avatar" />
        <h2>Jordan</h2>
        <p>Manchester, United Kingdom</p>
        <div className="stats">
          <p>
            <strong>{stats.trips}</strong> Trips
          </p>
          <p>
            <strong>{stats.reviews}</strong> Reviews
          </p>
        </div>
      </div>

      <div className="bookings-summary">
        <h3>Future Bookings: {futureBookings.length}</h3>
        <h3>Past Bookings: {pastBookings.length}</h3>
      </div>

      <SignOut setUser={setUser} />
    </div>
  );
}
