import { Link, Outlet } from "react-router-dom";
import { BiBuildingHouse } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlinePersonPin } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { ImStatsDots } from "react-icons/im";
import { FaHandshake } from "react-icons/fa";
import { MdWeb } from "react-icons/md";
import "../Style/sidebar.css";
export default function SideBar() {
  return (
    <>
      <aside id="sideBar">
        logo
        <Link to="/">
          <MdWeb size={30} />
          Back To Website
        </Link>
        <Link to="dashboard">
          <MdOutlineDashboard size={30} />
          Dashboard
        </Link>
        <Link to="properties">
          <BiBuildingHouse size={30} />
          Properties
        </Link>
        <Link to="contract">
          <FaHandshake size={30} />
          Contract
        </Link>
        <Link to="clients">
          <MdOutlinePersonPin size={30} />
          Client
        </Link>
        <Link to="reports">
          <ImStatsDots size={30} />
          Reports
        </Link>
        <Link to="settings">
          <FiSettings size={30} />
          Setting
        </Link>
      </aside>
      <Outlet />
    </>
  );
}
