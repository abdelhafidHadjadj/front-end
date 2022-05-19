import { useContext } from "react";
import { PropertyContext } from "../PropertiesContext";
import Radial from "./ChartJs/radial";
import "./styleAdmin/dashboard.css";
export default function Dashboard() {
  const { properties, setProperties } = useContext(PropertyContext);
  const numberOfProperties = properties.length;
  const listPrice = properties.map((prop) => prop.price);
  const totalBuy = listPrice.reduce((part, a) => part + a, 0);
  const propertiesSold = properties.filter(
    (prop) => prop.dealType === "buy"
  ).length;
  const propertiesRent = properties.filter(
    (prop) => prop.dealType === "rent"
  ).length;

  return (
    <section id="dashboard-section">
      <h1>dashboard</h1>
      <div id="radialBox">
        <Radial dataset={numberOfProperties} label="Total Listings" />
        <Radial dataset={propertiesSold} label="Properties sold" />
        <Radial dataset={propertiesRent} label="Properties rent" />
      </div>
    </section>
  );
}
