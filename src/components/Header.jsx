import "./Header.css";
import headerLogo from "../assets/images.png";
import signInImage from "../assets/defaultSignInImage.png";
import cabinImage from "../assets/header-cabin-image.png";
import filter from "../assets/filter.png";
import FilterMenu from "./FilterMenu";
import { useState } from "react";

export default function Header() {
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterClick = () => {
    setShowFilter((prev) => !prev);
  };

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
          <img className="searchbar-icon" src={filter} alt="searchbar icon" />
          <button onClick={handleFilterClick} className="filter-button">
            Filter and sort
          </button>
        </div>

        <div className="logIn">
          <p>Log in</p>
          <img className="signIn-image" src={signInImage} alt="" />
        </div>
      </div>

      {showFilter && <FilterMenu />}

      <h2 className="find-a-home-section">Find A Home</h2>
    </div>
  );
}
