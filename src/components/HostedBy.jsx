import { useEffect, useState } from "react";
import loggedInUser from "../assets/loggedInUser.png";
import "./HostedBy.css";

export default function HostedBy({ id }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [hostedUser, setHostedUser] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl = `${apiUrl}/api/properties`;

        const urlResponse = await fetch(baseUrl);
        const propertiesResponse = await urlResponse.json();
        const propertiesArray = propertiesResponse.properties;

        const findProperty = propertiesArray.find(
          (property) => property.property_id === Number(id)
        );

        setHostedUser(findProperty);
      } catch (err) {
        console.log("Failed to fetch properties", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="hostedBy-container">
      {hostedUser?.image && (
        <>
          <img src={hostedUser.image} alt="logged in user photo" />
          <p>Hosted by {hostedUser?.host}</p>
        </>
      )}
    </div>
  );
}
