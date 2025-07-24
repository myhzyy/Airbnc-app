import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  const handlePropertyClick = () => {
    navigate(`/property/${property.property_id}`);
  };

  return (
    <div className="propertyCard-square" onClick={handlePropertyClick}>
      <div className="propertyCard-image-wrapper">
        <img className="propertyCard-image" src={property.image} alt="" />
      </div>

      <div className="propertyInfo">
        <h2 className="property-title">{property.property_name}</h2>
        <p className="property-info">{property.location}</p>
        <p className="property-info">£{property.price_per_night}</p>
        <p className="property-info host">{property.host}</p>
      </div>
    </div>
  );
}
