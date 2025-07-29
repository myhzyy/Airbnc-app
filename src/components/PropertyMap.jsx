import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

// 👇 Fix for default marker icons not showing in production (Netlify, Render etc.)
import markerIcon2x from "/leaflet/marker-icon-2x.png";
import markerIcon from "/leaflet/marker-icon.png";
import markerShadow from "/leaflet/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 👇 Helper component to fix map sizing bug on small screens
function ForceMapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);
  return null;
}

export default function PropertyMap({
  latitude = 53.4808,
  longitude = -2.2426,
}) {
  const position = [latitude, longitude];

  return (
    <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <ForceMapResize />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Property Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
