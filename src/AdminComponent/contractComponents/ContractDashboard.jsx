import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../config";
import { AdminContext } from "../../AdminContext";
import { PropertyContext } from "../../PropertiesContext";
import "../styleAdmin/contractDash.css";
export default function ContractsDash() {
  const [contractList, setContractList] = useState([]);
  const { properties } = useContext(PropertyContext);
  const { adminList } = useContext(AdminContext);
  const [propertyList, setPropertyList] = useState(properties);
  const [execute, setExecute] = useState(false);
  console.log(adminList);
  useEffect(() => {
    setPropertyList(properties);
  }, [properties]);

  useEffect(() => {
    axios
      .get(`${API_URL}/getAllContract`)
      .then((res) => res.data)
      .then((data) => {
        setContractList(data);
        setTimeout(() => {
          setExecute(true);
        }, 1500);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(contractList);

  let isDisplay;
  if (contractList.length === 0) {
    return (isDisplay = false);
  } else {
    isDisplay = true;
  }
  console.log(isDisplay);

  for (let i = 0; i < contractList.length; i++) {
    const element = contractList[i];
    element.addedDateContract = new Date(
      element.addedDateContract
    ).toDateString();
  }

  function comp(a, b) {
    return b.addedDateContract - a.addedDateContract;
  }
  console.log(contractList);
  let listOfContracts = [...contractList.sort(comp)].reverse();
  console.log(listOfContracts);
  console.log(propertyList);

  console.log(adminList);
  return (
    <article id="contractDash-table">
      {isDisplay && (
        <div id="contractDash-table-nav">
          <span className="columnDash agent-boxDash">Sales by</span>
          <span className="columnDash">Property</span>
          <span className="columnDash">Client</span>
          <span className="columnDash">Sales Type</span>
          <span className="columnDash">Price</span>
          <span className="columnDash-status">Status</span>
        </div>
      )}
      {!isDisplay && <p>No Contract</p>}
      <div id="contractDash-smallTable">
        {listOfContracts.map((con) => (
          <div id="contractDash-table-inner">
            <span className="columnDash agent-boxDash">
              <img
                id="avatarContractDash"
                src={con.employeeId.avatar[0]}
                alt=""
              />

              {con.employeeId.username}
            </span>
            <span className="columnDash">
              {con.propertyId.city}, {con.propertyId.adresse}
            </span>
            <span className="columnDash">{con.client}</span>
            <span className="columnDash">
              {con.contractType.charAt(0).toUpperCase() +
                con.contractType.slice(1)}
            </span>
            <span className="columnDash">{con.price}$</span>
            <span className="columnDash-status">{con.status}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
