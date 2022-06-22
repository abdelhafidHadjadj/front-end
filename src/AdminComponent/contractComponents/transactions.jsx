import axios from "axios";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";

export default function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [listFilter, setListFilter] = useState(transaction);

  // useEffect(() => {
  //   setListFilter(transaction);
  // }, [transaction]);

  useEffect(() => {
    axios
      .get(`${API_URL}/getAllTransaction`)
      .then((res) => setTransaction(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [isDisplay, setIsDisplay] = useState(true);
  useEffect(() => {
    if (transaction.length === 0) {
      return setIsDisplay(false);
    } else {
      setIsDisplay(true);
    }
  }, [transaction]);
  console.log(isDisplay);

  // function handleChange(e) {
  //   setSearchInput(e.target.value);
  //   console.log(searchInput);
  //   const options = {
  //     includeScore: true,
  //     // Search in `author` and in `tags` array
  //     keys: ["ContractId", "Sale Type"],
  //   };

  //   const fuse = new Fuse(listFilter, options);

  //   const result = fuse.search(searchInput);
  //   console.log(result);
  //   const newList = result.map((result) => result.item);
  //   console.log(newList);
  //   setListFilter(newList);
  // }
  return (
    <section id="contract-list">
      {/* <nav>
        <input type="text" />
      </nav> */}
      <article id="contract-table">
        {isDisplay && (
          <div id="contract-table-nav">
            <span className="column">Contract Id</span>
            <span className="column">Sale Type</span>
            <span className="column">Price</span>
            <span className="column">Profit Percentage</span>
            <span className="column">Profit Amount</span>
            <span className="column">Date</span>
          </div>
        )}
        {!isDisplay && <p>No Transaction</p>}
        {transaction.map((trans) => (
          <div id="contract-table-inner">
            <span className="column-id">{trans.contractId}</span>
            <span className="column">{trans.saleType}</span>
            <span className="column">{trans.price}$</span>
            <span className="column">{trans.profitPercentage} %</span>
            <span className="column">{trans.profitAmount}$</span>
            <span className="column">{trans.date}</span>
          </div>
        ))}
      </article>
    </section>
  );
}
