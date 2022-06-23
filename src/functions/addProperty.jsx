import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { MdOutlineHighlightOff } from "react-icons/md";
import { useNavigate } from "react-router";
import { useAuth } from "../authContext";
import Loading from "./loading";
import { DropDown } from "../options/dropdown";
import Map from "../AdminComponent/MapComp/map";

export default function AddProperty({
  parentClass,
  principalClass,
  closeBtn,
  setPropertyList,
  propertyList,
}) {
  const [inputs, setInputs] = useState();
  const [fetchedData, setFetchedData] = useState("");
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedCity, setSelectedCity] = useState(city[0]);
  const [selectedDeal, setSelectedDeal] = useState(deal[0]);
  const [position, setPosition] = useState([36.7753, 3.0601882]);
  function uploadImages(e) {
    let files = e.target.files;
    setImages(files);
  }
  function handleSubmit(e) {
    setLoading(true);

    e.preventDefault();

    let data = new FormData();
    data.append("agentId", user.id);
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
    data.append("price", e.target.price.value);
    data.append("coordination", position);
    for (let i = 0; i < images.length; i++) {
      data.append("image", images[i]);
    }
    console.log(data);
    fetchData(data);
  }
  function fetchData(fromDataInput) {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(`${API_URL}/add-Property`, fromDataInput, config)
      .then((da) => {
        console.log(da.data);
        setLoading(false);
        alert("Property Added");
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(`Failed Operation, ${err}`);

        setError("Failed operation");
      });
  }

  const [open, setOpen] = useState(true);
  function handleClose() {
    setOpen(!open);
  }
  return (
    <>
      {open && (
        <div className={principalClass}>
          <MdOutlineHighlightOff
            id={closeBtn}
            onClick={handleClose}
            size={24}
          />
          {loading && <Loading />}

          {!loading && <h2>Add a property</h2>}
          {!loading && (
            <form onSubmit={handleSubmit} className={parentClass}>
              <div id="addProperty-content">
                <div>
                  <div className="addProperty-box-first">
                    <input
                      type="text"
                      name="estateName"
                      placeholder="Estate Name"
                      required
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
                    />{" "}
                    <input type="text" name="adresse" placeholder="Adresse" />
                    <input
                      type="number"
                      name="floorSpace"
                      placeholder="Floor space"
                    />
                    <input
                      type="number"
                      name="numberOfbalconies"
                      placeholder="Number Of balconies"
                    />
                    <input
                      type="number"
                      name="numberOfbathrooms"
                      placeholder="Number of bathrooms"
                    />
                    <input
                      type="number"
                      name="numberOfbedrooms"
                      placeholder="Number of bedrooms"
                    />
                    <input
                      type="number"
                      name="numberOfGarages"
                      placeholder="Number of garages"
                    />
                    <DropDown
                      option={deal}
                      className="updateSelectedDropDown"
                      selected={selectedDeal}
                      setSelected={setSelectedDeal}
                      classNameItems="listItemsUpdate"
                      id="dropBox"
                    />{" "}
                    <input type="number" name="price" placeholder="Price" />
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
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div>
                  <Map position={position} setPosition={setPosition} />
                </div>
              </div>
              <button type="submit">Add a property</button>
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
  "Office Space",
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
