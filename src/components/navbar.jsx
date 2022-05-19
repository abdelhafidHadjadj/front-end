import "../Style/navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header>
      <nav id="navbar">
        <span id="logoBox">
          <img
            src="https://res.cloudinary.com/hafid/image/upload/v1651316914/homePage/LOGO_v6gq1p.png"
            alt=""
            id="logo"
          />
        </span>
        <ul>
          <li id="list-Items">
            <a href="/">Home</a>
            <a href="/properties">Properties</a>
            <a href="#about-section">About Us</a>
            <a href="Contact">Contact</a>
          </li>
        </ul>
        <span id="loginAndSignUpBox">
          <Link to="/login">
            <button id="btn-login">Login</button>
          </Link>
          <Link to="/Sign-up">
            <button id="btn-signUp">Sign up</button>
          </Link>
        </span>
      </nav>
    </header>
  );
}
