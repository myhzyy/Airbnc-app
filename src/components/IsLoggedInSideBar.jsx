import "./IsLoggedInSideBar.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function IsLoggedInSideBar({ user }) {
  const welcomeUser = user.email;

  const navigate = useNavigate();

  const handleMyBookingsClick = () => {
    navigate("/MyBookings");
  };

  return (
    <div className="loggedIn-sidebar">
      <h1 className="sidebar-welcome">Welcome back, {welcomeUser}!</h1>
      <ul className="sidebar-links">
        <li onClick={handleMyBookingsClick}>📅 My Bookings</li>
        <li>🏠 My Properties</li>
        <li>📩 Contact Us</li>
      </ul>
    </div>
  );
}
