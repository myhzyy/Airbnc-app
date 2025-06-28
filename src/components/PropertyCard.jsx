import "./PropertyCard.css";

export default function PropertyCard({ property }) {
  // console.log(property);

  return (
    <div className="propertyCard-square">
      <div className="propertyCard-image-wrapper">
        <img className="propertyCard-image" src={property.image} alt="" />
        <span className="property-info-likes">
          ❤️{property.favourite_count}
        </span>
      </div>

      <div className="propertyInfo">
        <h2 className="property-title">{property.property_name}</h2>
        <p className="property-info">{property.location}</p>
        <p className="property-info">£{property.price_per_night}</p>

        <div className="property-info-favourite-container">
          <p className="property-info">{property.host}</p>
        </div>
      </div>
    </div>
  );
}
