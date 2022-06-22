import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "./config";
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loadUser, setLoadUser] = useState(false);
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(config);
  useEffect(() => {
    axios
      .get(`${API_URL}/getProfile`, config)
      .then((res) => {
        setUser(res.data);
        setLoadUser(true);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
