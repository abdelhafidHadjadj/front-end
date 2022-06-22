import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../config";
import "../AdminComponent/styleAdmin/transaction.css";
import { MdOutlineHighlightOff } from "react-icons/md";
export default function AddTransaction({
  contractList,
  contractId,
  saleType,
  price,
  amount,
  period,
}) {
  const [amountValue, setAmountvalue] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  console.log(contractList);
  console.log(contractId);
  const propertyId = contractList.find(
    (con) => con.id === contractId
  ).propertyId;
  console.log(propertyId);

  function handleSubmit(e) {
    e.preventDefault();
    const input = {
      contractId: contractId,
      saleType: saleType,
      price: price,
      totalAmount: amount,
      dateSigned: contractList.find((con) => con.id === contractId).dateSigned,
      period: period,
      profitPercentage: e.target.profitPercentage.value,
      profitAmount: amountValue,
      date: new Date().toDateString(),
    };
    console.log(input);
    setLoading(true);
    axios
      .post(`${API_URL}/addTransaction`, input)
      .then((res) => setTransaction(res.data))
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    const changeStatus = {
      status: "Paid",
    };

    axios
      .put(`${API_URL}/updateContract/${contractId}`, changeStatus)
      .then((res) => console.log(res.data.addedDateContract))
      .catch((err) => console.log(err));
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const available = {
      available: false,
    };
    // let data = new FormData();
    // data.append("available", available);
    axios
      .put(`${API_URL}/updateAvailable/${propertyId}`, available)
      .then((res) => res.data)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    navigate("../transaction");
  }

  console.log(transaction);
  console.log(error);
  return (
    <>
      {open && (
        <div className="addTransactionComponent">
          {!loading && (
            <>
              <div id="closeBox" onClick={() => setOpen(false)}>
                <MdOutlineHighlightOff size={25} />
              </div>
              <h1>Confirm a transaction</h1>
              <form onSubmit={handleSubmit} id="formTrans">
                <div id="first-part-trans">
                  <p>Contract Id : {contractId}</p>
                  <p>Sale Type : {saleType}</p>
                  <p>Price : {price}$</p>
                  <p>Period: {period} Months</p>
                  <p>Total Amount: {amount}$</p>
                  <span>
                    <label htmlFor="profitPercentage">Profit percentage:</label>
                    <input
                      type="number"
                      name="profitPercentage"
                      placeholder="0%"
                      onChange={(e) =>
                        setAmountvalue((+e.target.value / 100) * amount)
                      }
                    />
                  </span>
                  <span>
                    <label htmlFor="profitAmount">Profit Amount: </label>
                    <input
                      type="number"
                      id="profitAmount"
                      placeholder="Profit amount"
                      value={amountValue}
                    />
                  </span>
                </div>

                <div id="second-part-trans">
                  <button type="submit">Confirm</button>
                </div>
              </form>
            </>
          )}
          {loading && <p>Loading...</p>}
        </div>
      )}
    </>
  );
}
