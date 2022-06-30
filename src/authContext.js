import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "./config";
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loadUser, setLoadUser] = useState(false);
  const [isLoggedin, setLoggedin] = useState(false);

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
        setLoggedin(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedin]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoggedin, setLoggedin, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
