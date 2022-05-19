import { useState } from "react";
import { MdOutlineHighlightOff } from "react-icons/md";
import { useAuth } from "../authContext";
import { DropDown } from "../options/dropdown";
export default function AddContract({ propertyId }) {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();
  const dealType = ["Buy", "Rent"];
  const [selected, setSelected] = useState(dealType[0]);
  console.log(user);
  function handleCreate(e) {
    e.preventDefault();
    let input = {
      estateId: propertyId,
      employeeId: user.id,
      client: "String",
      contractType: selected,
      contractDetails: e.target.contractDetails.value,
      price: e.target.price.value,
      dateSigned: e.target.dateSigned.value,
      endDate: e.target.endDate.value,
    };
    console.log(input);
  }

  return (
    <>
      {open && (
        <div id="addContract-component">
          <div id="closeBox" onClick={() => setOpen(false)}>
            <MdOutlineHighlightOff size={22} />
          </div>
          <h2>Create a contract</h2>
          <form onSubmit={handleCreate}>
            <div className="boxInputContract">
              <p>Property Id : {propertyId}</p>
            </div>
            <div className="boxInputContract">
              <p>Agent Id : {}</p>
            </div>
            <div className="deal-price-box">
              <DropDown
                option={dealType}
                className="estateDropDown"
                selected={selected}
                setSelected={setSelected}
                classNameItems="listItems"
                id="dropBox"
              />

              <span>
                <input type="number" placeholder="Price" name="price" />
              </span>
            </div>
            <div className="boxInputContract">
              <label htmlFor="dateSigned">Date Signed</label>

              <input type="date" name="dateSigned" id="dateSigned" />
            </div>
            <div className="boxInputContract">
              <label htmlFor="endDate">End Date</label>

              <input type="date" name="endDate" />
            </div>
            <div className="boxInputContract">
              <label htmlFor="contractDetails">Contract Detaills</label>
              <textarea
                name="contractDetails"
                id="contractDetails"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </>
  );
}
