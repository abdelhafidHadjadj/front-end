import AddProperty from "../functions/addProperty";
import { PropertyContext } from "../PropertiesContext";
import { useContext, useEffect, useState } from "react";
import { RiAddFill } from "react-icons/ri";
import "./styleAdmin/propertyList.css";
import PropertyCard from "../functions/propertyCard";
import { useAuth } from "../authContext";
import UpdateProperty from "../functions/updateProperty";
import Fuse from "fuse.js";
import { DropDown } from "../options/dropdown";
import { MdFilterList } from "react-icons/md";
import { API_URL } from "../config";
import axios from "axios";

export default function Properties() {
  const { properties, setProperties } = useContext(PropertyContext);
  const [propertyList, setPropertyList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedOne, setSelectedOne] = useState("All Types");
  const [selectedTwo, setSelectedTwo] = useState("All Cities");
  const { user } = useAuth();
  const [openUpdateComponent, setOpenUpdateComponent] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [propertyUpdate, setPropertyUpdate] = useState("");
  function handleOpen() {
    setOpen(!open);
    console.log(open);
  }

  useEffect(() => {
    setPropertyList(properties);
  }, [properties]);

  function handleSubmit(e) {
    e.preventDefault();
    let type = selectedOne;
    let city = selectedTwo;
    console.log(type);
    console.log(city);
    let minPrice = e.target.MinPrice.value;
    let maxPrice = e.target.MaxPrice.value;

    filterList(propertyList, type, city);
    if (minPrice != "" && minPrice != "") {
      filterRange(propertyList, minPrice, maxPrice);
    }
  }

  function filterList(list, type, city) {
    let arr = [];
    if (type != "All Types" && city != "All Cities") {
      arr = list
        .filter((prop) => prop.estateType === type)
        .filter((prop) => prop.city === city);
      console.log(arr);
      return setPropertyList(arr);
    } else {
      if (type === "All Types" && city != "All Cities") {
        arr = list.filter((prop) => prop.city == city);
        console.log(arr);
        return setPropertyList(arr);
      } else {
        if (type != "All Types" && city === "All Cities") {
          arr = list.filter((prop) => prop.estateType == type);
          console.log(arr);
          return setPropertyList(arr);
        } else {
          console.log(list);
          return setPropertyList(list);
        }
      }
    }
  }

  const filterRange = (data, a, b) => {
    let arr = data.filter((item) => a <= item.price && item.price <= b);
    console.log(arr);
    return setPropertyList(arr);
  };

  function handleChange(e) {
    if (e.target.value != "") {
      setSearchInput(e.target.value);
      console.log(searchInput);
      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ["estateType", "city", "dealType", "id"],
      };

      const fuse = new Fuse(properties, options);

      const result = fuse.search(searchInput);
      console.log(result);
      const newList = result.map((result) => result.item);
      console.log(newList);
      setPropertyList(newList);
    } else {
      setPropertyList(properties);
    }
  }

  function handleUpdate(Id) {
    setPropertyId(Id);
    setOpenUpdateComponent(!openUpdateComponent);
    const propertyUpdt = propertyList.find((prop) => prop.id === Id);
    setPropertyUpdate(propertyUpdt);
  }
  function removeProperty(propertyId) {
    console.log(propertyId);
    console.log(propertyList);
    axios
      .delete(`${API_URL}/delete-Property/${propertyId}`)
      .then((res) => {
        console.log(res.data);
        const newList = propertyList.filter((prop) => prop.id != propertyId);
        setPropertyList(newList);
      })
      .catch((err) => console.log(err));
    console.log(propertyList);
  }
  useEffect(() => {
    setPropertyList(properties);
  }, [properties]);

  return (
    <section id="propertyListAdmin-section">
      <h1>Properties</h1>
      <nav id="nav-properties-admin">
        <input
          type="text"
          id="searchBarFilter"
          name="search"
          onChange={handleChange}
          placeholder="Search Properties"
        />

        <form onSubmit={handleSubmit} id="filterBarAdmin">
          <DropDown
            option={types}
            className="estateDropDown"
            selected={selectedOne}
            setSelected={setSelectedOne}
            classNameItems="listItemsNavAdd"
            id="dropBox"
          />
          <DropDown
            option={city}
            className="estateDropDownNavAdd"
            selected={selectedTwo}
            setSelected={setSelectedTwo}
            classNameItems="listItemsNavAdd"
            id="dropBox"
          />
          <input type="number" placeholder="Min Price" name="MinPrice" />
          <input type="number" placeholder="Max Price" name="MaxPrice" />
          <button type="submit">
            <MdFilterList size={20} />
            Filter
          </button>
        </form>

        <span id="btn-add-property" onClick={handleOpen}>
          Add property
          <RiAddFill size={20} />
        </span>
      </nav>
      <div id="propertyListAdmin-inner">
        <article id="propertyListAdmin-box">
          {propertyList.map((prop) => (
            <PropertyCard
              property={prop}
              className="propertyCard-admin"
              classNameBtnDelete="btn-delete"
              classNameBtnUpdate="btn-update"
              classNameBtnContract="btn-contract"
              idBox="box-btn-delete-update-admin"
              role={user?.role}
              onClickPropretyUpdate={handleUpdate}
              removeProperty={removeProperty}
            />
          ))}
        </article>
        {open && (
          <AddProperty
            parentClass="addProperty-box"
            principalClass="addPropertyComponent"
            closeBtn="btn-close"
            propertyList={propertyList}
            setPropertyList={setPropertyList}
          />
        )}
      </div>
      {openUpdateComponent && (
        <UpdateProperty
          propertyId={propertyId}
          property={propertyUpdate}
          propertyList={propertyList}
          setPropertyList={setPropertyList}
        />
      )}
    </section>
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
