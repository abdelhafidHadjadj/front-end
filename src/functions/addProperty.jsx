import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { MdOutlineHighlightOff } from "react-icons/md";
import { useNavigate } from "react-router";
export default function AddProperty({ parentClass, principalClass, closeBtn }) {
  const [inputs, setInputs] = useState();
  const [fetchedData, setFetchedData] = useState("");
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function uploadImages(e) {
    let files = e.target.files;
    setImages(files);
  }
  function handleSubmit(e) {
    setLoading(true);
    let input = {
      estateName: e.target.estateName.value,
      estateType: e.target.estateType.value,
      city: e.target.city.value,
      adresse: e.target.adresse.value,
      numberOfbalconies: e.target.numberOfbalconies.value,
      numberOfbathrooms: e.target.numberOfbathrooms.value,
      numberOfbedrooms: e.target.numberOfbedrooms.value,
      numberOfGarages: e.target.numberOfGarages.value,
      estateDescription: e.target.estateDescription.value,
      dealType: e.target.dealType.value,
      price: e.target.price.value,
      photos: e.target.photos.files,
    };
    e.preventDefault();

    setInputs(input);

    let data = new FormData();

    data.append("estateName", e.target.estateName.value);
    data.append("estateType", e.target.estateType.value);
    data.append("city", e.target.city.value);
    data.append("adresse", e.target.adresse.value);
    data.append("floorSpace", e.target.floorSpace.value);
    data.append("numberOfbalconies", e.target.numberOfbalconies.value);
    data.append("numberOfbathrooms", e.target.numberOfbathrooms.value);
    data.append("numberOfbedrooms", e.target.numberOfbedrooms.value);
    data.append("numberOfGarages", e.target.numberOfGarages.value);
    data.append("estateDescription", e.target.estateDescription.value);
    data.append("dealType", e.target.dealType.value);
    data.append("price", e.target.price.value);

    for (let i = 0; i < images.length; i++) {
      data.append("image", images[i]);

      console.log(data);
    }
    fetchData(data);
  }
  function fetchData(fromDataInput) {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(`${API_URL}/add-Property`, fromDataInput, config)
      .then((da) => {
        setFetchedData(da.data);
        setLoading(false);
        console.log("success");
        console.log(da);
      })
      .catch((err) => console.log(err));
  }

  const [open, setOpen] = useState(true);
  function handleClose() {
    setOpen(!open);
  }

  return (
    <>
      {open && (
        <div className={principalClass}>
          <MdOutlineHighlightOff id={closeBtn} onClick={handleClose} />
          {loading && <p>Loading...</p>}

          <form onSubmit={handleSubmit} className={parentClass}>
            <input type="text" name="estateName" placeholder="Estate Name" />
            <input type="text" name="estateType" placeholder="Estate type" />
            <input type="text" name="city" placeholder="City" />
            <input type="text" name="adresse" placeholder="Adresse" />
            <input type="number" name="floorSpace" placeholder="Floor space" />
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
            <input
              type="text"
              name="estateDescription"
              placeholder="Estate description"
            />
            <input type="text" name="dealType" placeholder="Deal type" />
            <input type="number" name="price" placeholder="Price" />

            <input type="file" onChange={uploadImages} multiple name="photos" />
            <button type="submit">Add</button>
          </form>
        </div>
      )}
    </>
  );
}
