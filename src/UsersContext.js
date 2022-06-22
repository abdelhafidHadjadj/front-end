import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./config";

export const UsersContext = createContext();

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/getUsers`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}
export default UsersProvider;
