import "./IsLoggedInSideBar.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function IsLoggedInSideBar({ user, onFilter }) {
  const welcomeUser = user.email;

  const navigate = useNavigate();

  const handleContactUsClick = () => {
    navigate("/contactUs");
  };
  const handleMyBookingsClick = () => {
    navigate("/MyBookings");
  };

  return (
    <div className="loggedIn-sidebar">
      <h1 className="sidebar-welcome">Welcome back, {welcomeUser}!</h1>
      <ul className="sidebar-links">
        <li onClick={handleMyBookingsClick}>📅 My Bookings</li>
        <li onClick={onFilter}>⚙️ Filter</li>
        <li onClick={handleContactUsClick}>📩 Contact Us</li>
      </ul>
    </div>
  );
}
