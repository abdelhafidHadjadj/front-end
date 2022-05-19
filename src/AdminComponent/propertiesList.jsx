import AddProperty from "../functions/addProperty";
import { PropertyContext } from "../PropertiesContext";
import { useContext, useEffect, useState } from "react";
import { RiAddFill } from "react-icons/ri";
import "./styleAdmin/propertyList.css";
import PropertyCard from "../functions/propertyCard";
import { useAuth } from "../authContext";
export default function Properties() {
  const { properties } = useContext(PropertyContext);
  const [propertyList, setPropertyList] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  function handleOpen() {
    setOpen(!open);
    console.log(open);
  }

  useEffect(() => {
    setPropertyList(properties);
  }, []);
  return (
    <section id="propertyListAdmin-section">
      <h1>Properties</h1>
      <nav id="nav-properties-admin">
        <span id="btn-add-property" onClick={handleOpen}>
          Add property
          <RiAddFill size={20} />
        </span>
      </nav>
      <div id="propertyListAdmin-inner">
        <article id="propertyListAdmin-box">
          {propertyList.map((prop) => (
            <PropertyCard
              property={prop}
              className="propertyCard-admin"
              classNameBtnDelete="btn-delete"
              classNameBtnUpdate="btn-update"
              classNameBtnContract="btn-contract"
              idBox="box-btn-delete-update-admin"
              role={user?.role}
            />
          ))}
        </article>
        {open && (
          <AddProperty
            parentClass="addProperty-box"
            principalClass="addPropertyComponent"
            closeBtn="btn-close"
          />
        )}
      </div>
    </section>
  );
}
