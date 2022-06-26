import "../Style/navbar.css";
import { Link } from "react-router-dom";
import SkeletonElement from "../skeletons/skeletonElement";
import { useEffect, useState, useRef } from "react";
import MenuSidebar from "../options/menuSidebar";
import { FiMenu } from "react-icons/fi";
export default function Navbar() {
  const [displayIcon, setDisplayIcon] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const isSmallScreen = () => {
    if (window.innerWidth <= 600) {
      return setDisplayIcon(true);
    } else {
      return setDisplayIcon(false);
    }
  };
  useEffect(() => {
    isSmallScreen();
  }, []);
  window.addEventListener("resize", isSmallScreen);
  const [isActive, setIsActive] = useState(false);
  let drop = useRef();
  function handleClick(e) {
    setIsActive(!isActive);
  }

  const close = () => setIsActive(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!drop.current.contains(e.target)) close();
    });
    window.removeEventListener("click", close);
  });
  return (
    <>
      <header>
        <nav id="navbar">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/hafid/image/upload/v1653161829/homePage/logo_modern_white_myv5h2.png"
              alt=""
              id="logo"
            />
          </Link>
          {!displayIcon && (
            <ul>
              <li id="list-Items">
                <a href="/">Home</a>

                <Link to="/properties">Properties</Link>

                <a href="#about-section">About Us</a>
                <a href="#contact-section">Contact</a>
              </li>
            </ul>
          )}
          {!displayIcon && (
            <span id="loginAndSignUpBox">
              <Link to="/login">
                <button id="btn-login">Login</button>
              </Link>

              <Link to="/Sign-up">
                <button id="btn-signUp">Sign up</button>
              </Link>
            </span>
          )}
          {displayIcon && (
            <span onClick={handleClick} id="menuIcon" ref={drop}>
              <FiMenu size={33} color="white" />
            </span>
          )}
          {isActive && <MenuSidebar />}
        </nav>
      </header>
    </>
  );
}
