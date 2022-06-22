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
        <Link to="/">
          <img
            src="https://res.cloudinary.com/hafid/image/upload/v1653161724/homePage/modern_house_logo_ol5res.png"
            alt=""
            id="logo"
          />
        </Link>
        <Link to="dashboard" className="sidbarBtn-admin">
          <MdOutlineDashboard size={30} />
          Dashboard
        </Link>
        <Link to="properties" className="sidbarBtn-admin">
          <BiBuildingHouse size={30} />
          Properties
        </Link>
        <Link to="contract/new-contracts" className="sidbarBtn-admin">
          <FaHandshake size={30} />
          Contract
        </Link>
        <Link to="clients/appointments-list" className="sidbarBtn-admin">
          <MdOutlinePersonPin size={30} />
          Client
        </Link>
        <Link to="reports/profits-report" className="sidbarBtn-admin">
          <ImStatsDots size={30} />
          Reports
        </Link>
        <Link to="settings" className="sidbarBtn-admin">
          <FiSettings size={30} />
          Setting
        </Link>
      </aside>
      <Outlet />
    </>
  );
}
