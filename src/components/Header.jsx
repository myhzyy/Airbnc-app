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
import MenuSideBar from "../components/MenuSideBar";

import { useState } from "react";

export default function Header({ filter, setFilter, user }) {
  const loggedInEmail = user?.email;
  const [showFilter, setShowFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleFilterClick = () => {
    setShowFilter((prev) => !prev);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <div className="header-left-side">
          <img
            onClick={handleShowMenu}
            src={menuBarIcon}
            alt="Menu"
            className="header-icon"
          />
        </div>

        <div className="header-center">
          <img
            onClick={handleLogoClick}
            src={baseCampLogo}
            alt="Main logo"
            className="header-logo"
          />
        </div>

        <div className="header-right-side">
          {/* <img
            src={filterImage}
            alt="Filter"
            className="header-icon-filter"
            onClick={handleFilterClick}
            style={{ cursor: "pointer" }}
          /> */}
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

      <MenuSideBar
        user={user}
        setShowFilter={setShowFilter}
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
}
