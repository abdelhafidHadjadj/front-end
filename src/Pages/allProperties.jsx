import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import { useAuth } from "../authContext";
import { PropertyContext } from "../PropertiesContext";
import PropertyCard from "../functions/propertyCard";
import Navbar from "../components/navbar";
import { DropDown } from "../options/dropdown";

export default function AllProperties() {
  const { properties, setProperties } = useContext(PropertyContext);

  const [listFilter, setListFilter] = useState(properties);
  const [searchInput, setSearchInput] = useState("");

  const search = useLocation().search;
  const name = new URLSearchParams(search);
  const deal = name.get("deal");
  const input = name.get("input");
  const [selectedOne, setSelectedOne] = useState("All Types");
  const [selectedTwo, setSelectedTwo] = useState("All Cities");
  const { user } = useAuth();

  useEffect(() => {
    setListFilter(properties);
  }, [properties]);

  console.log(listFilter);
  // let list = [];
  // if (deal != "" && input != "") {
  //   list = properties
  //     .filter((prop) => prop.dealType === deal)
  //     .filter((prop) => prop.estateType === input);
  //   setProperties(list);
  // } else {
  //   if (deal != "" && input === "") {
  //     list = properties.filter((prop) => prop.dealType === deal);
  //     setProperties(list);
  //     // console.log(newListFilter);
  //   } else {
  //     if (deal === "" && input != "") {
  //       list = properties.filter((prop) => prop.estateType === input);
  //       setProperties(list);
  //     }
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault();
    let type = selectedOne;
    let city = selectedTwo;
    console.log(type);
    console.log(city);
    let minPrice = e.target.MinPrice.value;
    let maxPrice = e.target.MaxPrice.value;

    filterList(properties, type, city);
    if (minPrice != "" && minPrice != "") {
      filterRange(properties, minPrice, maxPrice);
    }
  }
  function filterList(list, type, city) {
    let arr = [];
    if (type != "All Types" && city != "All Cities") {
      arr = list
        .filter((prop) => prop.estateType === type)
        .filter((prop) => prop.city === city);
      console.log(arr);
      return setListFilter(arr);
    } else {
      if (type === "All Types" && city != "All Cities") {
        arr = list.filter((prop) => prop.city == city);
        console.log(arr);
        return setListFilter(arr);
      } else {
        if (type != "All Types" && city === "All Cities") {
          arr = list.filter((prop) => prop.estateType == type);
          console.log(arr);
          return setListFilter(arr);
        } else {
          console.log(list);
          return setListFilter(list);
        }
      }
    }
  }

  const filterRange = (data, a, b) => {
    let arr = data.filter((item) => a <= item.price && item.price <= b);
    console.log(arr);
    return setListFilter(arr);
  };

  function handleChange(e) {
    setSearchInput(e.target.value);
    console.log(searchInput);
    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ["estateType", "city", "estateDescription"],
    };

    const fuse = new Fuse(properties, options);

    const result = fuse.search(searchInput);
    console.log(result);
    const newList = result.map((result) => result.item);
    console.log(newList);
    setListFilter(newList);
  }
  return (
    <>
      <Navbar />
      <section id="allProperties-section">
        <div id="filterBar">
          <input
            type="text"
            placeholder="Search"
            id="searchBarFilter"
            name="search"
            onChange={handleChange}
          />
          <form onSubmit={handleSubmit} id="filterBar">
            <DropDown
              option={types}
              className="estateDropDown"
              selected={selectedOne}
              setSelected={setSelectedOne}
              classNameItems="listItems"
              id="dropBox"
            />
            <DropDown
              option={city}
              className="estateDropDown"
              selected={selectedTwo}
              setSelected={setSelectedTwo}
              classNameItems="listItems"
              id="dropBox"
            />
            <input type="number" placeholder="Min Price" name="MinPrice" />
            <input type="number" placeholder="Max Price" name="MaxPrice" />
            <button type="submit">Filter</button>
          </form>
        </div>
        <div id="allProperties-box">
          {listFilter.map((prop) => (
            <PropertyCard
              property={prop}
              className="propertyCard"
              idBox="box-btn-delete-update"
              classNameBtnDelete="btn-delete"
              classNameBtnUpdate="btn-update"
              classNameBtnContract="btn-contract"
              role={user?.role}
            />
          ))}
        </div>
      </section>
    </>
  );
}

const types = [
  "All Types",
  "Villa",
  "Apartment",
  "Commercials",
  "Office space",
  "Residentails",
];

const city = ["All Cities", "Alger", "Oran", "Bejaia", "Tizi ouzou", "Setif"];
