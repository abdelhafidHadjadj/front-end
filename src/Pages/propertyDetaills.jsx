import "../Style/propertyDetaills.css";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PropertyContext } from "../PropertiesContext";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Icon } from "react-icons-kit";
import { Link } from "react-router-dom";
import { arrowLeft } from "react-icons-kit/fa/arrowLeft";
import { useNavigate } from "react-router";
import AgentCard from "./agentCard";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { MdBalcony } from "react-icons/md";
import { FaVectorSquare } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Navbar from "../components/navbar";
export default function PropertDetaills() {
  const params = useParams();
  const { propertyId } = params;
  console.log(propertyId);
  const { properties, setProperties } = useContext(PropertyContext);
  console.log(properties);
  const property = properties.find((pro) => pro.id == propertyId);
  console.log(property);
  const images = property.photos;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <IoIosArrowBack id="prevArrow-detaills" />,
    nextArrow: <IoIosArrowForward id="nextArrow-detaills" />,
  };
  const navigate = useNavigate();
  return (
    <section id="property-detaills-section">
      <Navbar />
      <div id="return-icon-detaills" onClick={() => navigate(-1)}>
        <Icon icon={arrowLeft} size={30} />
      </div>

      <div id="first-part-detaills">
        <Slider {...settings} className="slick-list-detaills">
          {images.map((img) => (
            <img src={img} alt="" className="detaills-img" />
          ))}
        </Slider>
        <AgentCard />
      </div>
      <div id="second-part-detaills">
        <div id="box-detaills-first-part">
          <span>
            <h2>{property.adresse}</h2>
            <p>{property.city}</p>
          </span>
          <span>
            <p>
              <FaRegHandshake /> {property.dealType}
            </p>
            <h1 className="property-card-Icon-box">
              <AiOutlineDollarCircle /> {property.price}
            </h1>
          </span>
        </div>
        <hr />
        <ul id="list-items-house">
          <span>
            <li>{property.estateType}</li>
            {property.floorSpace && (
              <li>
                <FaVectorSquare /> {property.floorSpace}
              </li>
            )}
          </span>
          <span>
            {property.numberOfbalconies && (
              <li>
                <MdBalcony /> {property.numberOfbalconies}
              </li>
            )}

            {property.numberOfbathrooms && (
              <li>
                <FaBath /> {property.numberOfbathrooms}
              </li>
            )}

            {property.numberOfbedrooms && (
              <li>
                <FaBed /> {property.numberOfbedrooms}
              </li>
            )}
            {property.numberOfGarages && (
              <li>Number of garages: {property.numberOfGarages}</li>
            )}
          </span>
        </ul>
      </div>
      <div id="discriptionBox">
        <div id="discription-title-box">
          <h2>Description</h2>
          <hr />
        </div>
        <p>{property.estateDescription}</p>
      </div>
    </section>
  );
}
