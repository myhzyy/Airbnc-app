import "./Header.css";
import headerLogo from "../assets/images.png";
import { useEffect } from "react";

export default function Header() {
  return (
    <div className="header">
      <div className="header-bar">
        <img className="header-logo" src={headerLogo} alt="image" />
        <div className="checkIn-checkOut">
          <p>check in</p>
          <p>check out</p>
        </div>

        <input className="search-bar" type="text" placeholder="search" />
        <input className="search-bar" type="text" placeholder="search button" />
        <p>side button</p>
      </div>
    </div>
  );
}
