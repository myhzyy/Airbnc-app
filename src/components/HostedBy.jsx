import loggedInUser from "../assets/loggedInUser.png";
import "./HostedBy.css";

export default function HostedBy() {
  return (
    <div className="hostedBy-container">
      <img src={loggedInUser} alt="" />
      <h4>hosted by bob</h4>
    </div>
  );
}
