import "./IsLoggedInSideBar.css";

export default function IsLoggedInSideBar({ user }) {
  const welcomeUser = user.email;

  return (
    <div className="loggedIn-sidebar">
      <h1 className="sidebar-welcome">Welcome back, {welcomeUser}!</h1>
      <ul className="sidebar-links">
        <li>📅 My Bookings</li>
        <li>🏠 My Properties</li>
        <li>📩 Contact Us</li>
      </ul>
    </div>
  );
}
