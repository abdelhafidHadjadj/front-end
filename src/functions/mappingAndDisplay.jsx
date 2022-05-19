import PropertyCard from "./propertyCard";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../authContext";
import { useEffect, useState } from "react";

export default function MappingAndDisplay({ propertyList }) {
  // we'll map the property list and display it, we'll send property element to movieCard through props
  console.log(propertyList);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <IoIosArrowBack id="prevArrow" />,
    nextArrow: <IoIosArrowForward id="nextArrow" />,
  };
  const [role, setRole] = useState("");

  const { user } = useAuth();

  return (
    <Slider {...settings} id="properties-content">
      {propertyList.map((prop) => (
        <PropertyCard
          property={prop}
          className="propertyCard"
          classNameBtnContract="btn-contract"
          idBox="box-btn-delete-update"
          classNameBtnDelete="btn-delete"
          classNameBtnUpdate="btn-update"
          role={user?.role}
        />
      ))}
    </Slider>
  );
}
