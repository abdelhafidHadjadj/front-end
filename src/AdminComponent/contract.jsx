import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UsersContext } from "../UsersContext";
import { PropertyContext } from "../PropertiesContext";
import PropertyCard from "../functions/propertyCard";
import AddContract from "../functions/addContract";
import "./styleAdmin/propertyList.css";
import "./styleAdmin/contract.css";
import { useAuth } from "../authContext";

import NavContract from "./contractComponents/navContract";

export default function Contract() {
  return (
    <>
      <section id="contract-section">
        <NavContract />
      </section>
    </>
  );
}
