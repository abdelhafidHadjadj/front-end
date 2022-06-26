import "../Style/propertyDetaills.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Icon } from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/fa/arrowLeft";
import { useNavigate } from "react-router";
import AgentCard from "./agentCard";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { MdBalcony } from "react-icons/md";
import { FaVectorSquare } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa";
import { MdOutlineGarage } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Navbar from "../components/navbar";
import GetAppointment from "../functions/GetAppointment";
import Map from "../AdminComponent/MapComp/map";
import { useAuth } from "../authContext";
import Loading from "../functions/loading";
import axios from "axios";
import { API_URL } from "../config";
export default function PropertDetaills() {
  const params = useParams();
  const { propertyId } = params;
  const [property, setProperty] = useState({});
  const [openApoint, setOpenApoint] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(propertyId);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    axios
      .get(`${API_URL}/allProperties/${propertyId}`)
      .then((res) => res.data)
      .then((data) => {
        setProperty(data);
        setLoad(true);
      })
      .catch((err) => console.log(err));
  }, []);
  if (!load) return <Loading />;
  let arr = property.coordination.toString();

  const position = arr?.split(",").map(Number);

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

  function handleClickApoint() {
    if (!user) return navigate("/login");
    if (user) return setOpenApoint(!openApoint);
  }

  return (
    <>
      <Navbar />
      <section id="property-detaills-section">
        <div id="return-icon-detaills" onClick={() => navigate(-1)}>
          <Icon icon={arrowLeft} size={30} />
        </div>

        <div id="first-part-detaills">
          <Slider {...settings} className="slick-list-detaills">
            {images.map((img) => (
              <img src={img} alt="" className="detaills-img" />
            ))}
          </Slider>
          <AgentCard
            agentId={property.agentId}
            handleClick={handleClickApoint}
          />
        </div>

        <div id="second-part-detaills">
          <div id="box-detaills-first-part">
            <span>
              <h2>{property.adresse}</h2>
              <p>{property.city}</p>
            </span>
            <span>
              <p className="iconBoxDetaills">
                <FaRegHandshake />{" "}
                {property.dealType.charAt(0).toUpperCase() +
                  property.dealType.slice(1)}
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
                <li className="iconBoxDetaills">
                  <FaVectorSquare /> {property.floorSpace}
                </li>
              )}
            </span>
            <span>
              {property.numberOfbalconies && (
                <li className="iconBoxDetaills">
                  <MdBalcony /> {property.numberOfbalconies}
                </li>
              )}

              {property.numberOfbathrooms && (
                <li className="iconBoxDetaills">
                  <FaBath /> {property.numberOfbathrooms}
                </li>
              )}

              {property.numberOfbedrooms && (
                <li className="iconBoxDetaills">
                  <FaBed /> {property.numberOfbedrooms}
                </li>
              )}
              {property.numberOfGarages && (
                <li className="iconBoxDetaills">
                  <MdOutlineGarage /> {property.numberOfGarages}
                </li>
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
        <div id="mapBox">
          <Map Click={false} position={position} mapId="mapDetaillsProperty" />
        </div>
        {openApoint && (
          <GetAppointment agId={property.agentId} propId={propertyId} />
        )}
      </section>
    </>
  );
}
