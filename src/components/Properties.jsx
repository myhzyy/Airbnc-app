import "./Properties.css";
import PropertyCard from "./PropertyCard";
import { useState } from "react";
import { useEffect } from "react";

export default function Properties({ filter, setFilter }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const baseUrl = "https://airbnc-oxkw.onrender.com/api/properties";

      const url =
        filter === "low"
          ? `${baseUrl}/sort/price-low-high`
          : filter === "high"
          ? `${baseUrl}/sort/price-high-low`
          : baseUrl;

      const urlResponse = await fetch(url);
      const { properties } = await urlResponse.json();

      setProperties(properties);
    }

    fetchData();
  }, [filter]);

  /// https://airbnc-oxkw.onrender.com/api/properties/sort/price-low-high

  return (
    <div className="propertiesCard-container">
      {properties.map((property) => (
        <PropertyCard key={property.property_id} property={property} />
      ))}
    </div>
  );
}
