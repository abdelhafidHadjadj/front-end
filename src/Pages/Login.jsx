import axios from "axios";
import { Icon } from "react-icons-kit";

import { arrowLeft } from "react-icons-kit/fa/arrowLeft";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router";
import { API_URL } from "../config";
import { useState } from "react";
import("../Style/loginAndSignUp.css");
export default function Login() {
  const [error, setError] = useState(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const userInput = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(`${API_URL}/login`, userInput)
      .then((res) => res.data)
      .then((userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);
        e.target.reset();
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }

  return (
    <section className="login-signUp-section">
      <div className="first-part-login-signUp">
        <img
          className="login-signUp-image"
          src="https://res.cloudinary.com/hafid/image/upload/v1650927080/homePage/jason-wang-8J49mtYWu7E-unsplash_tuhjjt.jpg"
          alt=""
        />
      </div>
      <div id="second-part-login">
        <Link to="/">
          <div id="return-icon">
            <Icon icon={arrowLeft} size={30} />
          </div>
        </Link>
        <div id="second-part-login-inner">
          <p>Please enter your email and password to login.</p>
          <form id="form-login" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit">
              Login
              <svg
                id="arrow-icon"
                enable-background="new 0 0 150 50"
                viewBox="0 0 150 50"
                version="1.1"
                y="0px"
                x="0px"
              >
                <g>
                  <line
                    y2="24.704"
                    x1="62"
                    x2="130"
                    stroke="#000000"
                    stroke-miterlimit="10"
                    y1="24.704"
                    stroke-width="4"
                    id="line-icon"
                  />
                  <polygon points="124.4 6.284 124.4 44.606 148.35 23.69" />
                </g>
              </svg>
            </button>
          </form>
        </div>
        <div>
          <p>
            Create Your <Link to="/Sign-Up">Account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function getToken() {
  const token = localStorage.getItem("token");
  console.log(token);
  return token;
}
