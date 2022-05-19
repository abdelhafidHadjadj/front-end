import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { MdPhone } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import("../Style/contact.css");
export default function Contact() {
  return (
    <section id="contact-section">
      <div className="contact-fist-part">
        <ul className="contact-list">
          <li>
            <FiFacebook className="social-media-icons" />
            <span>GOLDEN_HOUSE_AGENCY</span>
          </li>
          <li>
            <FaInstagram className="social-media-icons" />
            <span>GOLDEN_HOUSE_AGENCY.DZ</span>
          </li>
          <li>
            <FaWhatsapp className="social-media-icons" />
            <span>+213.66.89.75.12</span>
          </li>
        </ul>
      </div>
      <div className="contact-second-part">
        <form>
          <input type="text" placeholder="Give us feedback" name="feedback" />
          <button>
            <FiSend />
          </button>
        </form>
        <p>Copyright 2022. All Rights Reserved.</p>
      </div>
      <div className="contact-third-part">
        <ul className="contact-list">
          <li>
            <SiGmail className="social-media-icons" />{" "}
            <span>Contact@GoldenHouse.com</span>
          </li>
          <li>
            <MdPhone className="social-media-icons" />
            <span>07.81.08.87.59</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
