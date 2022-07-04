import { Link } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiWallet3Line } from "react-icons/ri";
import { useEffect } from "react";
import Aos from "aos";

export default function PropertyCard({
  property,
  className,
  idBox,
  classNameBtnUpdate,
  classNameBtnDelete,
  classNameBtnContract,
  onClickContractIcon,
  role,
  onClickPropretyUpdate,
  removeProperty,
}) {
  // function removeProperty(propertyId) {
  //   console.log(propertyId);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className={className} data-aos="zoom-in-up">
      {role == "ADMIN" && (
        <div id={idBox}>
          <span
            className={classNameBtnUpdate}
            onClick={() => onClickPropretyUpdate(property.id)}
          >
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
          <img
            src={property.photos[0]}
            alt={`${property.estateType} for ${property.dealType} in ${property.adresse} street in ${property.city}`}
          />
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
              <span>
                {property.dealType.charAt(0).toUpperCase() +
                  property.dealType.slice(1)}
              </span>
              /{property.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
