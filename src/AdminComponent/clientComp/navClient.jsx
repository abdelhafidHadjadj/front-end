import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import "../styleAdmin/navClient.css";

export default function NavClient() {
  return (
    <>
      <nav id="navClient">
        <Link to="appointments-list">Appointments List</Link>
        <Link to="client-list">Clients List</Link>
      </nav>
      <Outlet />
    </>
  );
}
