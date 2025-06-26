import "./PropertyCard.css";

export default function PropertyCard({ property }) {
  console.log(property);

  return (
    <div className="propertyCard-square">
      <img className="propertyCard-image" src={property.image} alt="" />

      <div className="propertyInfo">
        <h2 className="property-title">{property.property_name}</h2>
        <p className="property-info">{property.location}</p>
        <p className="property-info">£{property.price_per_night}</p>
        <p className="property-info">{property.host}</p>
      </div>
    </div>
  );
}
