import "./Properties.css";
import PropertyCard from "./PropertyCard";
import { useState } from "react";
import { useEffect } from "react";

export default function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://airbnc-oxkw.onrender.com/api/properties"
      );

      const { properties } = await response.json();

      setProperties(properties);
    }

    fetchData();
  }, []);

  return (
    <div className="propertiesCard-container">
      {properties.map((property) => (
        <PropertyCard property={property} />
      ))}
    </div>
  );
}
