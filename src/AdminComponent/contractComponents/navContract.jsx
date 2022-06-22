import { Link, Outlet } from "react-router-dom";
import "../styleAdmin/navContract.css";

export default function NavContract() {
  return (
    <>
      <nav id="navContract">
        <ul>
          <Link to="new-contracts">
            <li>New contracts</li>
          </Link>
          <Link to="contract-list">
            <li>Contracts list</li>
          </Link>
          <Link to="transaction">
            <li>Transactions</li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
