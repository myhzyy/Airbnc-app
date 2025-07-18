import { Navigate, useNavigate } from "react-router-dom";

import "./ToastLogin.css";

export default function ToastLogIn({ message }) {
  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="toast">
        <p>{message}</p>
        <button onClick={handleLogInClick}>Log in here</button>
      </div>
    </>
  );
}
