import axios from "axios";
import { useNavigate } from "react-router";
import { Icon } from "react-icons-kit";
import { API_URL } from "../config";
import { arrowLeft } from "react-icons-kit/fa/arrowLeft";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import { useState } from "react";
export default function Register() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const userInput = {
      username: `${e.target.firstName.value} ${e.target.lastName.value}`,
      email: e.target.email.value,
      phone: +e.target.phone.value,
      password: e.target.password.value,
    };
    console.log(userInput);
    const confirmPwd = e.target.ConfirmPassword.value;
    if (userInput.password == confirmPwd) {
      setLoading(true);
      axios
        .post(`${API_URL}/register`, userInput)
        .then((res) => res.data)
        .then((user) => {
          setUser(user);
          localStorage.setItem("token", user.token);
          e.target.reset();
          console.log(user);
          navigate("/");
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error.response.data);
        })
        .finally(() => setLoading(false));
    } else {
      setError("Password incorrect");
    }

    console.log(user);
  }
  return (
    <section className="login-signUp-section">
      <div className="first-part-login-signUp">
        <img
          src="https://res.cloudinary.com/hafid/image/upload/v1651012324/homePage/sean-pollock-PhYq704ffdA-unsplash_el06gl.jpg"
          alt=""
          className="login-signUp-image"
        />
      </div>

      <div id="second-part-signUp">
        {loading && <p>Loading...</p>}
        <Link to="/">
          <div id="return-icon-signUp">
            <Icon icon={arrowLeft} size={30} />
          </div>
        </Link>
        <div id="second-part-signUp-inner">
          <p>Please enter your personal informations to register</p>
          <form id="signUp-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="FirstName"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="LastName"
              required
            />
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" placeholder="Phone Number" name="phone" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="ConfirmPassword"
              placeholder="Confirm Password"
              required
            />
            {error && <p>{error}</p>}
            <button type="submit">
              Sign Up
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
      </div>
    </section>
  );
}
