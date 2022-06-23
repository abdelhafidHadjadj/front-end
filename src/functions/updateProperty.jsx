import Loading from "./loading";
import { useEffect, useState } from "react";
import { MdOutlineHighlightOff } from "react-icons/md";
import { DropDown } from "../options/dropdown";
import axios from "axios";
import { API_URL } from "../config";
import Map from "../AdminComponent/MapComp/map";
export default function UpdateProperty({
  propertyId,
  property,
  setPropertyList,
  propertyList,
}) {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(property.estateType);
  const [selectedCity, setSelectedCity] = useState(property.city);
  const [selectedDeal, setSelectedDeal] = useState(property.dealType);
  const [fetchedData, setFetchedData] = useState([]);
  const [images, setImages] = useState([]);
  let arr = property.coordination.toString();
  const [position, setPosition] = useState(arr.split(",").map(Number));

  function uploadImages(e) {
    let files = e.target.files;
    setImages(files);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("estateName", e.target.estateName.value);
    data.append("estateType", selectedType);
    data.append("city", selectedCity);
    data.append("adresse", e.target.adresse.value);
    data.append("floorSpace", e.target.floorSpace.value);
    data.append("numberOfbalconies", e.target.numberOfbalconies.value);
    data.append("numberOfbathrooms", e.target.numberOfbathrooms.value);
    data.append("numberOfbedrooms", e.target.numberOfbedrooms.value);
    data.append("numberOfGarages", e.target.numberOfGarages.value);
    data.append("estateDescription", e.target.estateDescription.value);
    data.append("dealType", selectedDeal);
    data.append("coordination", position);
    data.append("price", e.target.price.value);
    for (let i = 0; i < images.length; i++) {
      data.append("image", images[i]);
      console.log(data);
    }
    fetchData(data);
  }
  function fetchData(formDataInput) {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    setLoading(true);
    axios
      .put(`${API_URL}/update/${propertyId}`, formDataInput, config)
      .then((da) => {
        setFetchedData(da.data);
        console.log(fetchedData);
        setLoading(false);
        console.log("success");
        console.log(da);
      })
      .catch((err) => {
        alert(`Operation failed, ${err}`);
        setLoading(false);
        console.log(err);
      });

    setPropertyList(...fetchData);
    console.log(propertyList);
  }
  const [open, setOpen] = useState(true);
  function handleClose() {
    setOpen(!open);
  }

  return (
    <>
      {open && (
        <div className="addPropertyComponent">
          <MdOutlineHighlightOff
            id="btn-close"
            onClick={handleClose}
            size={24}
          />
          {loading && <Loading />}
          {!loading && <h2>Update Property</h2>}
          {!loading && (
            <form onSubmit={handleSubmit} className="addProperty-box">
              <div id="addProperty-content">
                <div>
                  <div className="addProperty-box-first">
                    <input
                      type="text"
                      name="estateName"
                      placeholder="Estate Name"
                      defaultValue={property.estateName}
                    />
                    <DropDown
                      option={types}
                      className="updateSelectedDropDown"
                      selected={selectedType}
                      setSelected={setSelectedType}
                      classNameItems="listItemsUpdate"
                      id="dropBox"
                    />
                    <DropDown
                      option={city}
                      className="updateSelectedDropDown"
                      selected={selectedCity}
                      setSelected={setSelectedCity}
                      classNameItems="listItemsUpdate"
                      id="dropBox"
                    />
                    <input
                      type="text"
                      name="adresse"
                      placeholder="Adresse"
                      defaultValue={property.adresse}
                    />
                    <input
                      type="number"
                      name="floorSpace"
                      placeholder="Floor space"
                      defaultValue={property.floorSpace}
                    />
                    <input
                      type="number"
                      name="numberOfbalconies"
                      placeholder="Number Of balconies"
                      defaultValue={property.numberOfbalconies}
                    />
                    <input
                      type="number"
                      name="numberOfbathrooms"
                      placeholder="Number of bathrooms"
                      defaultValue={property.numberOfbathrooms}
                    />
                    <input
                      type="number"
                      name="numberOfbedrooms"
                      placeholder="Number of bedrooms"
                      defaultValue={property.numberOfbedrooms}
                    />
                    <input
                      type="number"
                      name="numberOfGarages"
                      placeholder="Number of garages"
                      defaultValue={property.numberOfGarages}
                    />
                    <DropDown
                      option={deal}
                      className="updateSelectedDropDown"
                      selected={selectedDeal}
                      setSelected={setSelectedDeal}
                      classNameItems="listItemsUpdate"
                      id="dropBox"
                    />{" "}
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      defaultValue={property.price}
                    />
                    <input
                      type="file"
                      onChange={uploadImages}
                      multiple
                      name="photos"
                    />
                  </div>
                  <div className="addProperty-box-second">
                    <textarea
                      placeholder="Estate description"
                      name="estateDescription"
                      id="estateDescrp"
                      cols="20"
                      rows="10"
                      defaultValue={property.estateDescription}
                    ></textarea>
                  </div>
                </div>
                <div>
                  <Map position={position} setPosition={setPosition} />
                </div>
              </div>
              <button type="submit">Update a property</button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

const types = [
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
const deal = ["Rent", "Buy"];
