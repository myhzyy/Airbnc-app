import "./Properties.css";
import PropertyCard from "./PropertyCard";
import PropertySkeleton from "../../components/SkeletonLoader/PropertiesSkeletonLoader";
import { useState, useEffect } from "react";

export default function Properties({ filter, setFilter }) {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
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
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [filter]);

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="tetrominos">
              <div className="tetromino box1"></div>
              <div className="tetromino box2"></div>
              <div className="tetromino box3"></div>
              <div className="tetromino box4"></div>
            </div>
            <p className="loading-text">
              This could take a second... Please wait
            </p>
          </div>
        </div>
      )}

      <div className="propertiesCard-container">
        {isLoading
          ? [...Array(6)].map((_, index) => <PropertySkeleton key={index} />)
          : properties.map((property) => (
              <PropertyCard key={property.property_id} property={property} />
            ))}
      </div>
    </>
  );
}
