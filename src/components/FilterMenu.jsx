import "./FilterMenu.css";
import { useState } from "react";

export default function FilterMenu({ setFilterNew }) {
  const [selected, setSelected] = useState(null);

  const handleRadioClick = (value) => {
    setSelected((prev) => (prev === value ? null : value));
    setFilterNew((prev) => (prev === value ? null : value));
  };
  return (
    <div className="menu">
      <h1 className="sort-by-header">SORT BY</h1>

      <div className="filter-options">
        <label>
          <input
            type="radio"
            checked={selected === "low"}
            onChange={() => handleRadioClick("low")}
          />
          Price: Low to High
        </label>
        <label>
          <input
            type="radio"
            checked={selected === "high"}
            onChange={() => handleRadioClick("high")}
          />
          Price: High to Low
        </label>
      </div>
    </div>
  );
}
