import { useContext, useEffect, useState } from "react";
import "../Style/home.css";
import Navbar from "../components/navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import { DropDown } from "../options/dropdown";
import { API_URL } from "../config";
import BestOfferProperties from "./bestOfferProperties";
import About from "./About";
import Contact from "./contact";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useAuth } from "../authContext";
import SkeletonElement from "../skeletons/skeletonElement";
import { PropertyContext } from "../PropertiesContext";
export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const navigate = useNavigate();
  const { user } = useAuth();

  const { properties } = useContext(PropertyContext);

  const isSmallScreen = () => {
    if (window.innerWidth <= 600) {
    }
  };
  window.addEventListener("resize", isSmallScreen);

  return (
    <>
      <main>
        <Navbar />
        <section id="home-content">
          <div id="home-content-inner">
            <div id="first-content" data-aos="fade-right">
              <div id="sloganContent">
                <h1 id="slogan">
                  Find your perfect Property with
                  <br />
                  Modern House
                </h1>
              </div>

              <Link to="properties" id="btn-discover">
                Discover The Properties
              </Link>
            </div>
            <div id="second-content">
              {!properties && <SkeletonElement type="homePicture" />}

              <img
                data-aos="fade-up"
                src="https://res.cloudinary.com/hafid/image/upload/v1650040618/homePage/pymu2zdztn4ypb0h8psk.jpg"
                alt=""
                id="homeImage"
              />

              {user?.role === "ADMIN" && (
                <span
                  id="accountIcon"
                  onClick={() => navigate("admin-page/dashboard")}
                >
                  <AiOutlineUser size={26} color="white" />
                </span>
              )}
            </div>
          </div>
        </section>
        <div id="sponsorBox">
          <ul id="sponsorBox-inner">
            {!properties && <SkeletonElement type="btn" />}
            {properties && (
              <li>
                <img
                  src="https://res.cloudinary.com/hafid/image/upload/v1653144657/homePage/favpng_znanylekarz-pl-physician-znamylekar-cz-logo-doctor-of-medicine_jb8igz.png"
                  alt=""
                  className="sponsoreLogo"
                />
              </li>
            )}
            {!properties && <SkeletonElement type="btn" />}
            {properties && (
              <li>
                <img
                  src="https://www.docplanner.com/logos/logo-tuotempo.svg"
                  alt=""
                  className="sponsoreLogo"
                />
              </li>
            )}
            {!properties && <SkeletonElement type="btn" />}
            {properties && (
              <li>
                <img
                  src="https://www.docplanner.com/logos/logo-clinicloud.svg"
                  alt=""
                  className="sponsoreLogo"
                />
              </li>
            )}
          </ul>
        </div>
        <BestOfferProperties />
        <About />
        <Contact />
      </main>
    </>
  );
}
