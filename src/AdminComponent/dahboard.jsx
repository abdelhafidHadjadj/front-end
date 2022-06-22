import { useContext, useEffect, useState } from "react";
import { PropertyContext } from "../PropertiesContext";
import MapPositions from "./MapComp/mapSetOfPosition";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiProgression } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { MdOutlineHomeWork } from "react-icons/md";
import "./styleAdmin/dashboard.css";
import axios from "axios";
import { API_URL } from "../config";
import { UsersContext } from "../UsersContext";
import ContractsDash from "./contractComponents/ContractDashboard";
export default function Dashboard() {
  const { properties, setProperties } = useContext(PropertyContext);
  const numberOfProperties = properties.length;
  const listPrice = properties.map((prop) => prop.price);
  const totalBuy = listPrice.reduce((part, a) => part + a, 0);
  const propertiesList = properties.filter((el) => el.available == true);

  const propertiesSold = propertiesList.filter(
    (prop) => prop.dealType === "Buy"
  ).length;
  const propertiesRent = propertiesList.filter(
    (prop) => prop.dealType === "Rent"
  ).length;
  const storeList = properties.filter((el) => el.estateType === "Commercials");
  const villaList = properties.filter((el) => el.estateType === "Villa");
  const apartmentList = properties.filter(
    (el) => el.estateType === "Apartment"
  );
  const officeSpaceList = properties.filter(
    (el) => el.estateType === "Office Space"
  );
  const residentialList = properties.filter(
    (el) => el.estateType === "Residentials"
  );
  const typeList = [
    villaList.length,
    apartmentList.length,
    storeList.length,
    officeSpaceList.length,
    residentialList.length,
  ];
  const priceList = [];
  for (let i = 0; i < properties.length; i++) {
    priceList.push(properties[i].price);
  }
  console.log(priceList);

  let totalIncome = priceList.reduce((a, b) => a + b, 0);
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/getAllTransaction`)
      .then((res) => setTransaction(res.data))
      .catch((err) => console.log(err));
  }, []);

  let profitsList = [];
  for (let i = 0; i < transaction.length; i++) {
    profitsList.push(transaction[i].profitAmount);
  }
  const profits = profitsList.reduce((a, b) => a + b, 0);
  const { users } = useContext(UsersContext);

  return (
    <section id="dashboard-section">
      <span id="nav-dash">
        <h1>Dashboard</h1>
        <hr />
      </span>
      <div id="dashboard-section-first-content">
        <div id="dashboard-section-content">
          <div id="first-part-dashboard">
            <div className="first-boxs-dashboard properties-dashboard">
              <MdOutlineHomeWork size={30} />
              Total Properties
              <span>{propertiesList.length}</span>
            </div>
            <div className="first-boxs-dashboard income-dashboard">
              <GiTakeMyMoney size={30} />
              Total Income
              <span>${totalIncome}</span>
            </div>
            <div className="first-boxs-dashboard profits-dashboard">
              <GiProgression size={30} />
              Total Profits
              <span>{profits}</span>
            </div>
            <div className="first-boxs-dashboard users-dashboard">
              <HiUsers size={30} />
              Total Users
              <span>{users.length}</span>
            </div>
          </div>
          <div>
            <ContractsDash />
          </div>
        </div>
        <div id="dashboard-section-second-content">
          <span id="dash-first-part">
            <p>Number of Villa : {villaList.length}</p>
            <p>Number of Apartment : {apartmentList.length}</p>
            <p>Number of Store : {storeList.length}</p>
            <p>Number of Office Space : {officeSpaceList.length}</p>
            <p>Number of Residentials : {residentialList.length}</p>
          </span>
          <MapPositions propertiesList={propertiesList} mapId="mapDash" />
        </div>
      </div>
    </section>
  );
}
