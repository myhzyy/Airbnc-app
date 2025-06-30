import "./Header.css";
import { useNavigate } from "react-router-dom";
import headerLogo from "../assets/images.png";
import signInImage from "../assets/defaultSignInImage.png";
import cabinImage from "../assets/header-cabin-image.png";
import filterImage from "../assets/filter.png";
import FilterMenu from "./FilterMenu";
import LoggedInUser from "./LoggedInUser";

import { useState } from "react";

export default function Header({ filter, setFilter, user }) {
  const loggedInEamil = user?.email;

  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const handleFilterClick = () => {
    setShowFilter((prev) => !prev);
  };

  const handleLoginClick = () => {
    navigate("/login");
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
          <img
            className="searchbar-icon"
            src={filterImage}
            alt="searchbar icon"
          />
          <button onClick={handleFilterClick} className="filter-button">
            Filter and sort
          </button>
        </div>

        <div className="logIn" onClick={handleLoginClick}>
          {loggedInEamil ? <LoggedInUser user={user} /> : "Log in"}

          {/* {
            <img
              className="signIn-image"
              src={signInImage}
              alt="sign in logo image"
            />
          } */}
        </div>
      </div>

      {showFilter && (
        <FilterMenu
          filter={filter}
          setFilter={setFilter}
          filterNew={filter}
          setFilterNew={setFilter}
        />
      )}

      <h2 className="find-a-home-section">Find A Home</h2>
    </div>
  );
}
