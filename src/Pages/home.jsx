import { useEffect, useState } from "react";
import "../Style/home.css";
import Navbar from "../components/navbar";
import { Image } from "cloudinary-react";
import { DropDown } from "../options/dropdown";
import { API_URL } from "../config";
import BestOfferProperties from "./bestOfferProperties";
import About from "./About";
import Contact from "./contact";
import SearchBar from "../options/searchBar";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useAuth } from "../authContext";
export default function Home() {
  const [imageIds, setImagesIds] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  async function getImageIds() {
    try {
      const res = await fetch(`${API_URL}/getImages`);
      const data = await res.json();
      console.log(data);
      setImagesIds(data);
    } catch (error) {
      console.log(error);
      setMessage("Error in the server");
    }
  }
  useEffect(() => getImageIds(), []);
  // console.log(imageIds);
  let imageId =
    "https://res.cloudinary.com/hafid/image/upload/v1650040618/homePage/pymu2zdztn4ypb0h8psk.jpg";

  return (
    <>
      <main>
        <Navbar />
        <div id="home-content">
          <div id="home-content-inner">
            <div id="first-content">
              <div id="sloganContent">
                <h1>Find your perfect home with logo</h1>
              </div>

              <SearchBar />
            </div>
            <div id="second-content">
              {imageIds && (
                <Image
                  id="homeImage"
                  cloudName="hafid"
                  publicId={imageId}
                  width="250"
                  crop="scale"
                />
              )}

              {user?.role === "ADMIN" && (
                <span id="accountIcon" onClick={() => navigate("admin-page")}>
                  <AiOutlineUser size={26} color="white" />
                </span>
              )}
            </div>
          </div>
        </div>
        <div id="sponsorBox">
          <ul id="sponsorBox-inner">
            <li>sp1</li>
            <li>sp2</li>
            <li>sp3</li>
          </ul>
        </div>
        <BestOfferProperties />
        <About />
        <Contact />
      </main>
    </>
  );
}
