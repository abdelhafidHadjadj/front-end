import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../UsersContext";
import { PropertyContext } from "../../PropertiesContext";
import PropertyCard from "../../functions/propertyCard";
import AddContract from "../../functions/addContract";
import { useAuth } from "../../authContext";

export default function NewContract() {
  const navigate = useNavigate();
  const [contract, setContract] = useState([]);
  const { properties, setProperties } = useContext(PropertyContext);
  const propertyId = properties.id;
  const [getPropertyId, setGetPropertyId] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { users, setUsers } = useContext(UsersContext);
  console.log(users);
  function handleClick(propertyId) {
    console.log("click");
    console.log(propertyId);
    setGetPropertyId(propertyId);
    setOpen(!open);
  }
  const list = properties.filter((prop) => prop.contract === false);

  console.log(list);
  return (
    <>
      <article id="propertyListAdmin-box">
        {list.map((prop) => (
          <PropertyCard
            property={prop}
            className="propertyCard-admin"
            classNameBtnContract="btn-contract-admin"
            classNameBtnDelete="btn-delete-contract"
            classNameBtnUpdate="btn-update-contract"
            idBox="box-btn-contract-admin"
            onClickContractIcon={handleClick}
            role={user.role}
          />
        ))}

        {open && <AddContract propertyId={getPropertyId} users={users} />}
      </article>
    </>
  );
}
