import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loggedInUser from "../assets/loggedInUser.png";
import "./MyProfile.css";

export default function UserProfile({ user }) {
  const profileId = user.auth_user_id;

  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${profileId}/stats`
      );
      const data = await res.json();
      setStats(data);
    }

    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="user-profile">
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
    </div>
  );
}
