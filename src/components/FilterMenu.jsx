import "./FilterMenu.css";
import { useState } from "react";

export default function FilterMenu() {
  const [selected, setSelected] = useState(null);

  const handleRadioClick = (value) => {
    setSelected((prev) => (prev === value ? null : value));
  };
  return (
    <div className="menu">
      <h1 className="sort-by-header">SORT BY</h1>

      <div className="filter-options">
        <label>
          <input
            checked={selected === "low"}
            onChange={() => handleRadioClick("low")}
            type="radio"
          />{" "}
          Price: Low to High
        </label>
        <label>
          <input
            checked={selected === "high"}
            onChange={() => handleRadioClick("high")}
            type="radio"
          />{" "}
          Price: High to Low
        </label>
      </div>
    </div>
  );
}
