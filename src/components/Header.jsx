import "./Header.css";
import { useNavigate } from "react-router-dom";
import headerLogo from "../assets/images.png";
import signInImage from "../assets/defaultSignInImage.png";
import cabinImage from "../assets/header-cabin-image.png";
import filterImage from "../assets/filter.png";
import FilterMenu from "./FilterMenu";
import LoggedInUser from "./LoggedInUser";
import menuBarIcon from "../assets/menuBar.png";
import baseCampLogo from "../assets/menuBar2.png";
import loggedInUser from "../assets/loggedInUser.png";

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
    <>
      <div className="header">
        <div className="header-left-side">
          <img src={menuBarIcon} alt="Menu" className="header-icon" />
        </div>

        <div className="header-center">
          <img src={baseCampLogo} alt="Main logo" className="header-logo" />
        </div>

        <div className="header-right-side">
          <img
            src={filterImage}
            alt="Filter"
            className="header-icon-filter"
            onClick={handleFilterClick}
            style={{ cursor: "pointer" }}
          />
          {loggedInEmail ? (
            <img
              src={loggedInUser}
              alt="User"
              className="header-icon"
              onClick={handleLoginClick}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <img
              src={signInImage}
              alt="User"
              className="header-icon"
              onClick={handleLoginClick}
              style={{ cursor: "pointer" }}
            />
          )}
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
    </>
  );
}
