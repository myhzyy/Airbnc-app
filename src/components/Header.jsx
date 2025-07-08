import "./Header.css";
import { useNavigate } from "react-router-dom";
import signInImage from "../assets/defaultSignInImage.png";
import FilterMenu from "./FilterMenu";
import menuBarIcon from "../assets/menuBar.png";
import baseCampLogo from "../assets/menubar2.png";
import loggedInUser from "../assets/loggedInUser.png";
import MenuSideBar from "../components/MenuSideBar";
import Filter from "../assets/filter.png";

import { useState } from "react";

export default function Header({ filter, setFilter, user }) {
  const loggedInEmail = user?.email;

  const [showFilter, setShowFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleFilterClick = () => {
    setShowFilter((prev) => !prev);
    onClose();
  };

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLoginClick = () => {
    navigate("/profile");
  };

  const handleNotLogggedInClick = () => {
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
              onClick={handleNotLogggedInClick}
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
