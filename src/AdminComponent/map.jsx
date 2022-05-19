import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./styleAdmin/dashboard.css";
import "leaflet/dist/leaflet.css";
export default function Map() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: "350px", width: "350px" }}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
