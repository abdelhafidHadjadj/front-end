import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config";
export const PropertyContext = createContext();

export default function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/allProperties`)
      .then((res) => {
        setProperties(res.data);
        setLoad(true);
        console.log("get Data");
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <PropertyContext.Provider value={{ properties, setProperties, load }}>
      {children}
    </PropertyContext.Provider>
  );
}
