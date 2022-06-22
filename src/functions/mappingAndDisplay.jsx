import PropertyCard from "./propertyCard";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../authContext";
import { useEffect, useState, useContext } from "react";
import { PropertyContext } from "../PropertiesContext";
export default function MappingAndDisplay({ propertyList }) {
  console.log(propertyList);
  const [execute, setExecute] = useState(false);
  setTimeout(() => {
    setExecute(true);
  }, 1500);
  return (
    <article id="ourProperty-box">
      {/* {propertyList.map((prop) => ( */}
      {execute && (
        <>
          <PropertyCard
            property={propertyList[0]}
            className="propertyCard"
            classNameBtnContract="btn-contract"
            idBox="box-btn-delete-update"
            classNameBtnDelete="btn-delete"
            classNameBtnUpdate="btn-update"
          />
          <PropertyCard
            property={propertyList[1]}
            className="propertyCard"
            classNameBtnContract="btn-contract"
            idBox="box-btn-delete-update"
            classNameBtnDelete="btn-delete"
            classNameBtnUpdate="btn-update"
          />
          <PropertyCard
            property={propertyList[2]}
            className="propertyCard"
            classNameBtnContract="btn-contract"
            idBox="box-btn-delete-update"
            classNameBtnDelete="btn-delete"
            classNameBtnUpdate="btn-update"
          />
        </>
      )}
      {/* ))} */}
    </article>
  );
}
