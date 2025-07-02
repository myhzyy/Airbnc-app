import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./AuthPage.css";
import baseCampLogo from "../assets/baseCampLogo.png";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(() => setShowLogin(true));
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="auth-page-container">
      <div className="auth-page-contents">
        <img
          onClick={handleLogoClick}
          className="baseCampLogo"
          src={baseCampLogo}
          alt="BaseCamp Logo"
        />
        <h1 className="basecamp-header-text">BASECAMP LOGIN</h1>
        <p className="basecamp-signin-text">Sign up below!</p>

        {showLogin ? (
          <Login className="login-form" setUser={setUser} />
        ) : (
          <SignUp className="login-form" setShowLogin={setShowLogin} />
        )}
        {!showLogin && <p onClick={handleLoginClick}>Log in</p>}
      </div>
    </div>
  );
}
