import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { PropertyContext } from "../PropertiesContext";
import PropertyCard from "../functions/propertyCard";
import AddContract from "../functions/addContract";
import "./styleAdmin/propertyList.css";
import "./styleAdmin/contract.css";

export default function Contract() {
  const navigate = useNavigate();
  const [contract, setContract] = useState([]);
  const { properties, setProperties } = useContext(PropertyContext);
  const propertyId = properties.id;
  const [getPropertyId, setGetPropertyId] = useState("");
  const [open, setOpen] = useState(false);

  function handleClick(propertyId) {
    console.log("click");
    console.log(propertyId);
    setGetPropertyId(propertyId);
    setOpen(!open);
  }

  return (
    <section id="contract-section">
      <div>
        <h1>Contract</h1>
        {properties.map((prop) => (
          <PropertyCard
            property={prop}
            className="propertyCard-admin"
            classNameBtnContract="btn-contract-admin"
            classNameBtnDelete="btn-delete-contract"
            classNameBtnUpdate="btn-update-contract"
            idBox="box-btn-contract-admin"
            onClickContractIcon={handleClick}
          />
        ))}
      </div>
      {open && <AddContract propertyId={getPropertyId} />}
    </section>
  );
}
