import { useNavigate } from "react-router-dom";
import "./SignOut.css";

export default function SignOut({ setUser }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <button onClick={handleSignOut} className="signOut-button">
      Sign out
    </button>
  );
}
