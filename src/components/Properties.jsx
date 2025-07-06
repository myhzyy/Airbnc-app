import "./Properties.css";
import PropertyCard from "./PropertyCard";
import { useState } from "react";
import { useEffect } from "react";

export default function Properties({ filter, setFilter }) {
  const [properties, setProperties] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      const baseUrl = `${apiUrl}/api/properties`;

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

  return (
    <div className="propertiesCard-container">
      {properties.map((property) => (
        <PropertyCard key={property.property_id} property={property} />
      ))}
    </div>
  );
}
