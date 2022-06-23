import { useContext, useEffect, useState } from "react";
import MapPositions from "../AdminComponent/MapComp/mapSetOfPosition";
import Fuse from "fuse.js";
import { useAuth } from "../authContext";
import { PropertyContext } from "../PropertiesContext";
import PropertyCard from "../functions/propertyCard";
import Navbar from "../components/navbar";
import { DropDown } from "../options/dropdown";
import { MdFilterList } from "react-icons/md";
import "../AdminComponent/MapComp/map.css";
export default function AllProperties() {
  const { properties, setProperties } = useContext(PropertyContext);

  const propertiesAvailable = properties.filter(
    (prop) => prop.available === true
  );

  const [listFilter, setListFilter] = useState(propertiesAvailable);
  const [searchInput, setSearchInput] = useState("");

  const [selectedOne, setSelectedOne] = useState("All Types");
  const [selectedTwo, setSelectedTwo] = useState("All Cities");
  const { user } = useAuth();

  useEffect(() => {
    setListFilter(propertiesAvailable);
  }, [properties]);

  console.log(listFilter);

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
    if (e.target.value != "") {
      setSearchInput(e.target.value);
      console.log(searchInput);
      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ["estateType", "city", "dealType"],
      };

      const fuse = new Fuse(properties, options);

      const result = fuse.search(searchInput);
      console.log(result);
      const newList = result.map((result) => result.item);
      console.log(newList);
      setListFilter(newList);
    } else {
      setListFilter(properties);
    }
  }
  // const somePosition = listFilter.map((po) =>
  //   po.coordination.toString().split(",").map(Number)
  // );

  // console.log(somePosition);
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
          <form onSubmit={handleSubmit} id="filterBarAdmin">
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
            <button type="submit">
              <MdFilterList size={20} />
              Filter
            </button>
          </form>
        </div>
        <MapPositions propertiesList={listFilter} mapId="mapClient" />
        <div id="allProperties-box">
          {listFilter.map((prop) => (
            <PropertyCard
              property={prop}
              className="propertyCard"
              idBox="box-btn-delete-update"
              classNameBtnDelete="btn-delete"
              classNameBtnUpdate="btn-update"
              classNameBtnContract="btn-contract"
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

const city = [
  "Alger",
  "Oran",
  "Bejaia",
  "Tizi ouzou",
  "Setif",
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Biskra",
  "Bechar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tebessa",
  "Tlemcen",
  "Tiaret",
  "Djelfa",
  "Jijel",
  "Saida",
  "Skikda",
  "Sidi Bel Abbes",
  "Annaba",
  "Guelma",
  "Constantine",
  "Medea",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdes",
  "Tarf",
  "Tindouf",
  "Tissemsilt",
  "Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Ain Defla",
  "Naama",
  "Ain Temouchent",
  "Ghardaia",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Beni Abbes",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "M'Ghair",
  "El Meniaa",
].sort();
