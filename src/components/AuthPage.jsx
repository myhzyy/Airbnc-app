import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./AuthPage.css";
import baseCampLogo from "../assets/baseCampLogo.png";

export default function AuthPage() {
  return (
    <div className="auth-page-container">
      <div className="auth-page-contents">
        <img className="baseCampLogo" src={baseCampLogo} alt="BaseCamp Logo" />
        <h1 className="basecamp-header-text">BASECAMP LOGIN</h1>
        <p className="basecamp-signin-text">Sign up below!</p>
        <SignUp className="login-form" />
      </div>
    </div>
  );
}
