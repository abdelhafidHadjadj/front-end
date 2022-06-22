import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "./config";

export const AdminContext = createContext();
export default function AdminProvider({ children }) {
  const [adminList, setAdminList] = useState([]);
  const [loadAdmin, setLoadAdmin] = useState(false);
  useEffect(() => {
    axios
      .get(`${API_URL}/getAllAdmins`)
      .then((res) => {
        console.log(res.data);
        setAdminList(res.data);
        setLoadAdmin(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <AdminContext.Provider value={{ adminList, setAdminList, loadAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}
