import "./Header.css";
import headerLogo from "../assets/images.png";
import signInImage from "../assets/defaultSignInImage.png";
import cabinImage from "../assets/header-cabin-image.png";
import searchbarIcon from "../assets/search-bar-icon2.png";

import { useEffect } from "react";

export default function Header() {
  return (
    <div className="header">
      <div className="header-bar">
        <img className="header-logo" src={headerLogo} alt="image" />

        <div className="stays-container">
          <img
            className="stays-image"
            src={cabinImage}
            alt="header cabin image"
          />
          <p>Stays</p>
        </div>

        <div className="header-searchbar">
          <img
            className="searchbar-icon"
            src={searchbarIcon}
            alt="searchbar icon"
          />
          <input
            className="header-search-bar"
            type="text"
            placeholder="search for your next adventure..."
          />
        </div>

        <div className="logIn">
          <p>Log in</p>
          <img className="signIn-image" src={signInImage} alt="" />
        </div>
      </div>
    </div>
  );
}
