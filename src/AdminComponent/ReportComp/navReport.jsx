import { Link, Outlet } from "react-router-dom";

export default function NavReports() {
  return (
    <>
      <nav id="navContract">
        <ul>
          <Link to="profits-report">Profits Reports</Link>
          <Link to="properties-report">Properties Reports</Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
