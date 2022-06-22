import { useContext, useRef, useState, useEffect } from "react";
import { MdOutlineHighlightOff } from "react-icons/md";
import { useAuth } from "../authContext";
import { DropDown } from "../options/dropdown";
import { PropertyContext } from "../PropertiesContext";
import Fuse from "fuse.js";
import { FiDelete } from "react-icons/fi";
import DatePicker from "react-datepicker";

import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router";
export default function AddContract({ propertyId, users }) {
  const [open, setOpen] = useState(true);
  const { properties, setProperties } = useContext(PropertyContext);
  const { user } = useAuth();
  const [usersList, setUsersList] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [name, setName] = useState("");
  const [newContract, setNewContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateSigned, setDateSigned] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [period, setPeriod] = useState(0);
  const userDrop = useRef();
  const navigate = useNavigate();
  const property = properties.find((prop) => prop.id === propertyId);
  const [amount, setAmount] = useState(property.price);
  const [difMounth, setDifMounth] = useState(0);
  const [difYear, setDifYear] = useState(0);
  function handleCreate(e) {
    e.preventDefault();

    let input = {
      employeeId: user.id,
      propertyId: propertyId,
      client: e.target.username.value,
      contractType: property.dealType,
      contractDetails: e.target.contractDetails.value,
      price: property.price,
      totalAmount: amount,
      period: period,
      dateSigned: dateSigned,
      endDate: endDate,
    };
    console.log(input);
    setLoading(true);
    axios
      .post(`${API_URL}/postContract`, input)
      .then((res) => res.data)
      .then((data) => {
        setNewContract(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    const body = {
      contract: true,
    };

    axios
      .put(`${API_URL}/updateAvailable/${propertyId}`, body)
      .then((res) => res.data)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
      .finally(() => navigate("../contract-list"));
  }

  function handleSelectUser(e) {
    setName(e.target.value);

    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ["username", "id"],
    };

    const fuse = new Fuse(users, options);

    const result = fuse.search(name);
    console.log(result);
    const newListUser = result.map((result) => result.item);
    console.log(newListUser);
    setUsersList(newListUser);
  }

  const close = () => setUsersList(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!userDrop.current.contains(e.target)) close();
    });
    window.removeEventListener("click", close);
  });

  function handleChange(date) {
    setEndDate(date);
    let dateOne = dateSigned.getFullYear();
    let dateTwo = endDate.getFullYear();
    if (dateOne < dateTwo) {
      console.log(dateOne);
      console.log(dateTwo);

      console.log(dateOne);
      console.log(dateTwo);
      setDifYear(dateTwo - dateOne);
      setDifMounth(12 * difYear);
    } else {
      setDifMounth(0);
    }
    console.log(difMounth);
    setPeriod(endDate.getMonth() - dateSigned.getMonth() + difMounth);
    setAmount(property.price * period);
  }
  console.log(period);
  return (
    <>
      {open && (
        <div id="addContract-component">
          <div id="box-title-create-contract">
            <div id="closeBox" onClick={() => setOpen(false)}>
              <MdOutlineHighlightOff size={25} />
            </div>
            <h2>Create a contract</h2>
          </div>
          <form onSubmit={handleCreate}>
            <div id="first-box-create-contract">
              <div>
                <p>Property Id : {propertyId}</p>

                <p>Agent Id : {user.id}</p>
                <p>
                  Client :{"  "}
                  <input
                    type="text"
                    placeholder="Fullname"
                    onChange={handleSelectUser}
                    name="username"
                    value={selectedName || name}
                  />
                  {usersList && (
                    <div id="usersListSearch" ref={userDrop}>
                      <ul>
                        {usersList.map((el) => (
                          <li onClick={() => setSelectedName(el.username)}>
                            {el.username}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </p>
              </div>
              <div>
                <p>
                  Deal type :{" "}
                  {property.dealType.charAt(0).toUpperCase() +
                    property.dealType.slice(1)}
                </p>

                <p>Price : {property.price}</p>
              </div>
            </div>

            <div className="boxInputContractDate">
              <div className="boxInputContract">
                <label htmlFor="dateSigned">Date Signed</label>
                <DatePicker
                  selected={dateSigned}
                  onChange={(date) => setDateSigned(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              {property.dealType === "Rent" && (
                <>
                  <div className="boxInputContract">
                    <label htmlFor="endDate">End Date</label>
                    <DatePicker
                      selected={endDate}
                      onChange={handleChange}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  <div className="boxInputContract">
                    <label htmlFor="period">Contract period</label>
                    <input type="number" id="period" value={period} />
                  </div>
                </>
              )}
              <div className="boxInputContract">
                <label htmlFor="period">Total amount</label>
                <input type="number" id="amount" Value={amount} />
              </div>
            </div>
            <div className="boxInputContract">
              <label htmlFor="contractDetails">Contract Detaills</label>
              <textarea
                name="contractDetails"
                id="contractDetails"
                cols="30"
                rows="4"
              ></textarea>
            </div>

            {loading && <p>loading...</p>}
            {!loading && <button type="submit">Create</button>}
          </form>
        </div>
      )}
    </>
  );
}
