import { Link } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiWallet3Line } from "react-icons/ri";
import axios from "axios";
import { API_URL } from "../config";
import { useContext, useEffect, useState } from "react";
import { PropertyContext } from "../PropertiesContext";
export default function PropertyCard({
  property,
  className,
  idBox,
  classNameBtnUpdate,
  classNameBtnDelete,
  classNameBtnContract,
  onClickContractIcon,
  role,
}) {
  // we'll receive a
  const { properties, setProperties } = useContext(PropertyContext);

  // function removeProperty(propertyId) {
  //   console.log(propertyId);
  function removeProperty(propertyId) {
    console.log(propertyId);
    axios
      .delete(`${API_URL}/delete-Property/${propertyId}`)
      .then((res) => {
        console.log(res.data);
        setProperties(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={className}>
      {role == "ADMIN" && (
        <div id={idBox}>
          <span className={classNameBtnUpdate}>
            <MdOutlineModeEditOutline size={22} />
          </span>
          <span
            className={classNameBtnDelete}
            onClick={() => removeProperty(property.id)}
          >
            <RiDeleteBin6Line size={22} />
          </span>
          <span
            className={classNameBtnContract}
            onClick={() => onClickContractIcon(property.id)}
          >
            <RiWallet3Line size={22} />
          </span>
        </div>
      )}
      <Link to={`/property-Detaills/${property.id}`}>
        <div id="imgCard">
          <img src={property.photos[0]} alt="" />
        </div>
        <div id="imgCardContent">
          <p className="property-card-Icon-box">
            <GoLocation />
            {property.adresse}, {property.city}
          </p>
          <div id="firstPartCard">
            <p>{property.estateType}</p>
            {property.numberOfbedrooms && (
              <p className="property-card-Icon-box">
                {property.numberOfbedrooms}
                <FaBed />
              </p>
            )}
            <p>{property.floorSpace}m²</p>
          </div>
          <div id="secondPartCard">
            <Link to="/property-Detaills">See More</Link>

            <p>
              <span>{property.dealType}</span>/{property.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
