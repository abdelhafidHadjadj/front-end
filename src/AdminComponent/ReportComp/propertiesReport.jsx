import { useContext, useState, useEffect } from "react";
import { PropertyContext } from "../../PropertiesContext";
import { API_URL } from "../../config";
import BarChart from "../ChartJs/columnBar";
import LineChart from "../ChartJs/columnLine";
import PieChart from "../ChartJs/pie";
import { VscGraph } from "react-icons/vsc";
import { VscGraphLine } from "react-icons/vsc";
const PropertiesReport = () => {
  const [price, setPrice] = useState([]);
  const [date, setDate] = useState([]);

  const { properties } = useContext(PropertyContext);
  const storeList = properties.filter((el) => el.estateType === "Commercials");
  const villaList = properties.filter((el) => el.estateType === "Villa");
  const apartmentList = properties.filter(
    (el) => el.estateType === "Apartment"
  );
  const officeSpaceList = properties.filter(
    (el) => el.estateType === "Office Space"
  );
  const residentialList = properties.filter(
    (el) => el.estateType === "Residentials"
  );
  const typeList = [
    villaList.length,
    apartmentList.length,
    storeList.length,
    officeSpaceList.length,
    residentialList.length,
  ];
  const propList = [
    "Villa",
    "Apartment",
    "Commercials",
    "Office Space",
    "Residential",
  ];
  console.log(typeList);
  console.log(propList);
  function FilterData(list) {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      element.addedDate = new Date(element.addedDate).toDateString();
    }

    function comp(a, b) {
      return b.addedDate - a.addedDate;
    }
    list.sort(comp);

    var result = [];
    var prop = [];
    //index of already added values
    var listOfIndex = [];
    let date = "";
    for (var i = 0; i < list.length; i++) {
      if (listOfIndex.indexOf(i) >= 0) {
        continue;
      }
      var number = list[i].price;
      for (var j = i + 1; j < list.length; j++) {
        if (list[i].addedDate == list[j].addedDate) {
          date = list[j].addedDate;
          number = number + list[j].price;

          listOfIndex.push(j); //push in this list the index of the value that has been added
        }
      }
      result.push(number);
      setPrice(result);
      console.log(result);
      console.log(prop);
    }
    let dateList = list.map(
      (el) => (el.addedDate = new Date(el.addedDate).toDateString())
    );

    let newDateList = new Set(dateList);
    setDate([...newDateList]);
  }

  useEffect(() => {
    FilterData(properties);
  }, [properties]);

  console.log(date);
  console.log(price);
  const [openBar, setOpenBar] = useState(true);
  const [openLine, setOpenLine] = useState(false);
  return (
    <>
      <h1>Properties Reports</h1>
      <article id="report-content">
        <div id="report-inner">
          {openBar && (
            <div className="barGraph">
              <BarChart dataset={price} date={date} height={480} width={2000} />
            </div>
          )}
          {openLine && (
            <div className="lineGraph">
              <LineChart
                dataset={price}
                date={date}
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
        <div id="secondProp-part">
          <div id="pieComp">
            <PieChart width={400} dataset={typeList} date={propList} />
          </div>
          <span className="prop-box">
            <p>The total properties</p>
            <span className="profit-amount">{properties.length}</span>
          </span>
          <span className="prop-box">
            <p>Villa</p>
            <span className="profit-amount">{villaList.length}</span>
          </span>
          <span className="prop-box">
            <p>Apartment</p>
            <span className="profit-amount">{apartmentList.length}</span>
          </span>
          <span className="prop-box">
            <p>Commercials</p>
            <span className="profit-amount">{storeList.length}</span>
          </span>
          <span className="prop-box">
            <p>Office space</p>
            <span className="profit-amount">{officeSpaceList.length}</span>
          </span>
          <span className="prop-box">
            <p>Residenials</p>
            <span className="profit-amount">{residentialList.length}</span>
          </span>
        </div>
      </article>
    </>
  );
};

export default PropertiesReport;
