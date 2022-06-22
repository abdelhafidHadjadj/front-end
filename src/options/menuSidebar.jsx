import { Link } from "react-router-dom";
export default function MenuSidebar() {
  return (
    <>
      <aside id="menuSideBar">
        <ul>
          <a href="/">
            <li>Home</li>
          </a>
          <a href="/properties">
            <li>Properties</li>
          </a>
          <a href="#about-section">
            <li>About Us</li>
          </a>
          <a href="Contact">
            <li>Contact</li>
          </a>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/Sign-up">
            <li>Sign up</li>
          </Link>
        </ul>
      </aside>
    </>
  );
}
