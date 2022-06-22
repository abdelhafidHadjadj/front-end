import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../config";
import BarChart from "../ChartJs/columnBar";
import LineChart from "../ChartJs/columnLine";
import { VscGraph } from "react-icons/vsc";
import { VscGraphLine } from "react-icons/vsc";
import "../styleAdmin/Report.css";
const ProfitReport = () => {
  const [transList, setTransList] = useState([]);
  const [dataDate, setDataDate] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/getAllTransaction`)
      .then((res) => setTransList(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    for (let i = 0; i < transList.length; i++) {
      const element = transList[i];
      element.dateSigned = new Date(element.dateSigned).toDateString();
    }

    function comp(a, b) {
      return b.dateSigned - a.dateSigned;
    }
    transList.sort(comp);

    var result = [];
    //index of already added values
    var listOfIndex = [];
    let date = "";
    for (var i = 0; i < transList.length; i++) {
      if (listOfIndex.indexOf(i) >= 0) {
        continue;
      }
      var number = transList[i].profitAmount;
      for (var j = i + 1; j < transList.length; j++) {
        if (transList[i].dateSigned == transList[j].dateSigned) {
          date = transList[j].dateSigned;
          number = number + transList[j].profitAmount;
          listOfIndex.push(j); //push in this list the index of the value that has been added
        }
      }
      result.push(number);
      setData(result);
      console.log(result);
    }
    let dateList = transList.map(
      (el) => (el.dateSigned = new Date(el.dateSigned).toDateString())
    );

    let newDateList = new Set(dateList);
    setDataDate([...newDateList]);
  }, [transList]);

  const profitsTotal = data.reduce((a, b) => a + b, 0);
  const [openBar, setOpenBar] = useState(true);
  const [openLine, setOpenLine] = useState(false);

  const filterAmount = (dealType) => {
    const list = transList.filter((el) => el.saleType === dealType);
    console.log(list);
    const arr = [];
    for (let i = 0; i < list.length; i++) {
      arr.push(transList[i].profitAmount);
    }

    console.log(arr);
    const totalAmount = arr.reduce((a, b) => a + b, 0);

    return totalAmount;
  };
  const totalRentProfit = filterAmount("Rent");
  const totalBuyProfit = filterAmount("Buy");
  console.log(totalRentProfit);
  console.log(totalBuyProfit);
  return (
    <>
      <h1>Profit Reports</h1>
      <article id="report-content">
        <div id="report-inner">
          {openBar && (
            <div className="barGraph">
              <BarChart
                dataset={data}
                date={dataDate}
                height={480}
                width={2000}
              />
            </div>
          )}
          {openLine && (
            <div className="lineGraph">
              <LineChart
                dataset={data}
                date={dataDate}
                height={480}
                width={2000}
              />
            </div>
          )}
          <span id="btnGraph-box">
            {openLine && (
              <VscGraph
                className="graphIcon"
                size={34}
                onClick={() => {
                  setOpenBar(!openBar);
                  setOpenLine(!openLine);
                }}
              />
            )}
            {openBar && (
              <VscGraphLine
                className="graphIcon"
                size={34}
                onClick={() => {
                  setOpenLine(!openLine);
                  setOpenBar(!openBar);
                }}
              />
            )}
          </span>
        </div>
        <div id="secondProfits-part">
          <span className="profit-box">
            <p>The profits total</p>
            <span className="profit-amount">{profitsTotal}$</span>
          </span>
          <span className="profit-box">
            <p>The profits from renting</p>
            <span className="profit-amount">{totalRentProfit}$</span>
          </span>
          <span className="profit-box">
            <p>The profits from buying</p>
            <span className="profit-amount">{totalBuyProfit}$</span>
          </span>
        </div>
      </article>
    </>
  );
};

export default ProfitReport;
