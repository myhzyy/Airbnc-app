import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./AuthPage.css";
import baseCampLogo from "../../assets/baseCampLogo.png";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setShowLogin((prev) => !prev);
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
        <p className="basecamp-signin-text">
          {showLogin ? "Log in below!" : "Sign up below!"}
        </p>

        {showLogin ? (
          <Login className="login-form" setUser={setUser} />
        ) : (
          <SignUp className="login-form" setShowLogin={setShowLogin} />
        )}

        <div className="toggle-auth-link">
          {showLogin ? (
            <p>
              Don't have an account?{" "}
              <span
                className="sign-up-link"
                onClick={() => setShowLogin(false)}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p onClick={() => setShowLogin(true)}>
              Already have an account?{" "}
              <span className="sign-up-link">Log in</span>
            </p>
          )}
        </div>

        <div className="test-account-info">
          <p className="test-label">
            Test account: <span>(use this)</span>
          </p>
          <p>
            <strong>Email:</strong> test@test.com
          </p>
          <p>
            <strong>Password:</strong> test
          </p>
        </div>
      </div>
    </div>
  );
}
