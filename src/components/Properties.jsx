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
      console.log(properties);
    }

    fetchData();
  }, []);

  console.log(properties);

  /// https://airbnc-oxkw.onrender.com/api/properties/sort/price-low-high

  return (
    <div className="propertiesCard-container">
      {properties.map((property) => (
        <PropertyCard key={property.property_id} property={property} />
      ))}
    </div>
  );
}
