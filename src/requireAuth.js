import { Navigate } from "react-router";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="login"></Navigate>;
  }
  return children;
}
