import loggedInUserImage from "../assets/loggedInUser.png";
import "./LoggedInUser.css";

export default function LoggedInUser({ user }) {
  const loggedInEmail = user?.email;

  return (
    <div className="user-loggedIn-container">
      {/* <p>{`Welcome back ${loggedInEmail}`}</p> */}
      <p>
        <span className="welcome-bold">Welcome back</span> {loggedInEmail}
      </p>

      <img src={loggedInUserImage} alt="logged in user image" />
    </div>
  );
}
