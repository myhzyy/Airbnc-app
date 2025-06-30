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
  const loggedInEmail = user?.email;
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
        <img className="header-logo" src={headerLogo} alt="logo" />

        <div className="stays-container">
          <img className="stays-image" src={cabinImage} alt="stays icon" />
          <p>Stays</p>
        </div>

        <div className="header-searchbar">
          <img className="searchbar-icon" src={filterImage} alt="filter" />
          <button onClick={handleFilterClick} className="filter-button">
            Filter and sort
          </button>
        </div>

        <div className="logIn" onClick={handleLoginClick}>
          {loggedInEmail ? <LoggedInUser user={user} /> : "Log in"}
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
    </div>
  );
}
