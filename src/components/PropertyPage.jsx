import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyPage.css";

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    async function fetchProperty() {
      const response = await fetch(
        `https://airbnc-oxkw.onrender.com/api/properties/${id}`
      );

      const data = await response.json();
      setProperty(data.propertyId);
    }

    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  console.log(property);

  return (
    <div className="property-page-container">
      <h1>{property.property_name}</h1>
      <img src={property.images} alt="" />
    </div>
  );
}
