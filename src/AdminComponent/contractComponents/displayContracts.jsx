import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../config";
import { AdminContext } from "../../AdminContext";
import { PropertyContext } from "../../PropertiesContext";
import { BsPencilSquare } from "react-icons/bs";
import AddTransaction from "../../functions/addTransaction";
export default function DisplayContract() {
  const [contractList, setContractList] = useState([]);
  const { properties } = useContext(PropertyContext);
  const { adminList } = useContext(AdminContext);
  const [contractId, setContractId] = useState("");
  const [saleType, setSaleType] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [open, setOpen] = useState(false);
  const [propertyList, setPropertyList] = useState(properties);

  useEffect(() => {
    setPropertyList(properties);
  }, [properties]);

  useEffect(() => {
    axios
      .get(`${API_URL}/getAllContract`)
      .then((res) => res.data)
      .then((data) => {
        setContractList(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(contractList);
  console.log(properties);

  const [isDisplay, setIsDisplay] = useState(true);
  useEffect(() => {
    if (contractList.length === 0) {
      return setIsDisplay(false);
    } else {
      setIsDisplay(true);
    }
  }, [contractList]);
  console.log(isDisplay);

  return (
    <section id="contract-list">
      <article id="contract-table">
        {isDisplay && (
          <div id="contract-table-nav">
            <span className="column">Sales by</span>
            <span className="column">Property Id</span>
            <span className="column">Client</span>
            <span className="column">Sales Type</span>
            <span className="column">Price</span>
            <span className="column">Status</span>
          </div>
        )}
        {!isDisplay && <p>No Contract</p>}
        {contractList.map((con) => (
          <div id="contract-table-inner">
            <span className="column">{con.employeeId.username}</span>
            <span className="column-id">{con.propertyId.id}</span>
            <span className="column">{con.client}</span>
            <span className="column">
              {con.contractType.charAt(0).toUpperCase() +
                con.contractType.slice(1)}
            </span>
            <span className="column">{con.price}$</span>
            <span className="column-status">
              {con.status}
              {con.status == "Pending" && (
                <span
                  id="pendingIcon"
                  onClick={() => {
                    setContractId(con.id);
                    setOpen(!open);
                    setSaleType(
                      con.contractType.charAt(0).toUpperCase() +
                        con.contractType.slice(1)
                    );
                    setAmount(con.totalAmount);
                    setPrice(con.price);
                    setPeriod(con.period);
                  }}
                >
                  <BsPencilSquare size={20} />
                </span>
              )}
            </span>
          </div>
        ))}
      </article>
      {open && (
        <AddTransaction
          contractList={contractList}
          contractId={contractId}
          saleType={saleType}
          amount={amount}
          price={price}
          period={period}
        />
      )}
    </section>
  );
}
