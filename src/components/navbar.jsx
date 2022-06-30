import "../Style/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import SkeletonElement from "../skeletons/skeletonElement";
import { useEffect, useState, useRef } from "react";
import MenuSidebar from "../options/menuSidebar";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "../authContext";
import { RiLogoutCircleRLine } from "react-icons/ri";
import axios from "axios";
import { API_URL } from "../config";
import { MdOutlineEdit } from "react-icons/md";
import Loading from "../functions/loading";
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, loadUser, isLoggedin, setLoggedin } = useAuth();
  const [load, setLoad] = useState(false);
  const [listUsersAdmins, setListUsersAdmins] = useState([]);
  const [openWindow, setOpenWindow] = useState(false);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);

  console.log(user);

  useEffect(() => {
    axios
      .get(`${API_URL}/getAllAdminsUsers`)
      .then((res) => {
        setListUsersAdmins(res.data);
        setLoad(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function handlerLogout() {
    localStorage.removeItem("token");
    setLoggedin(false);
    setOpenWindow(false);
    navigate("/login");
  }

  const [isActive, setIsActive] = useState(false);
  let drop = useRef();
  function handleClick() {
    setIsActive(!isActive);
  }

  const close = () => setIsActive(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!drop.current.contains(e.target)) close();
    });
    window.removeEventListener("click", close);
  });

  let userInfo = listUsersAdmins.find((u) => u.id === user.id);
  console.log(userInfo);
  function handlerOpenWindow() {
    setOpenWindow(!openWindow);
  }

  function uploadPhoto(e) {
    let files = e.target.files;
    setPhoto(files);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("clickme");
    const data = new FormData();

    data.append("username", e.target.username.value);
    data.append("email", e.target.email.value);
    data.append("phone", e.target.phone.value);
    for (let i = 0; i < photo.length; i++) {
      data.append("avatar", photo[i]);
    }
    fetchData(data);
  }

  function fetchData(input) {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    setLoading(true);
    axios
      .put(`${API_URL}/updateAdminInfo/${userInfo.id}`, input, config)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        alert("User Updated");
        setLoading(false);
        setOpenProfile(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setOpenProfile(false);
      });
  }
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
          <ul id="navBarRow">
            <li id="list-Items">
              <a href="/">Home</a>

              <Link to="/properties">Properties</Link>

              <a href="#about-section">About Us</a>
              <a href="#contact-section">Contact</a>
            </li>
          </ul>
          <>
            {isLoggedin && (
              <span id="profile-nav-box">
                {userInfo?.avatar && (
                  <img
                    src={
                      userInfo.avatar.length != 0
                        ? userInfo.avatar[0]
                        : "https://res.cloudinary.com/hafid/image/upload/v1656409582/homePage/blank-profile-picture-g6584d22d3_640_xwvnkv.png"
                    }
                    alt=""
                  />
                )}

                <p
                  id="usernameProfile"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  {userInfo?.username}
                </p>
                {openProfile && (
                  <div id="profileBox">
                    {!loading && (
                      <form onSubmit={handleSubmit}>
                        <span id="profileBox-imgBox">
                          <img
                            src={
                              userInfo.avatar.length != 0
                                ? userInfo.avatar[0]
                                : "https://res.cloudinary.com/hafid/image/upload/v1656409582/homePage/blank-profile-picture-g6584d22d3_640_xwvnkv.png"
                            }
                            alt=""
                          />
                          <MdOutlineEdit
                            size={34}
                            id="editAvatarIcon"
                            onClick={() => setOpenPhoto(!openPhoto)}
                          />
                        </span>
                        {openPhoto && (
                          <>
                            <label htmlFor="">Change Photo</label>
                            <input
                              type="file"
                              multiple
                              onChange={uploadPhoto}
                              name="photo"
                            />
                          </>
                        )}

                        <input
                          type="text"
                          name="username"
                          id=""
                          defaultValue={userInfo?.username}
                        />
                        <input
                          type="tel"
                          name="phone"
                          id=""
                          defaultValue={userInfo?.phone}
                        />
                        <input
                          type="email"
                          name="email"
                          defaultValue={userInfo?.email}
                        />
                        <button type="submit">Edit</button>
                      </form>
                    )}
                  </div>
                )}
                <RiLogoutCircleRLine
                  id="btn-logout"
                  color="red"
                  size={30}
                  onClick={handlerOpenWindow}
                />
              </span>
            )}
            {!isLoggedin && (
              <span id="loginAndSignUpBox">
                <Link to="/login">
                  <button id="btn-login">Login</button>
                </Link>

                <Link to="/Sign-up">
                  <button id="btn-signUp">Sign up</button>
                </Link>
              </span>
            )}

            {openWindow && (
              <div id="window-box-logout">
                <p>Are you sure to logout?</p>
                <span id="box-btn-window">
                  <button id="btn-logout-win" onClick={handlerLogout}>
                    Logout
                  </button>
                  <button id="btn-exit" onClick={() => setOpenWindow(false)}>
                    Cancel
                  </button>
                </span>
              </div>
            )}
          </>
          <span onClick={handleClick} id="menuIcon" ref={drop}>
            <FiMenu size={33} color="white" />
          </span>
          {isActive && <MenuSidebar />}
        </nav>
      </header>
    </>
  );
}
