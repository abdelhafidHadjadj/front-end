import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { MdPhone } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import "bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import("../Style/contact.css");
export default function Contact() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section id="contact-section">
      <div id="contact-first-content">
        <span className="box-agent" data-aos="zoom-in-up">
          <span className="picture1">
            <img
              src="https://res.cloudinary.com/hafid/image/upload/v1655225793/homePage/handsome-corporate-man-real-estate-agent-assistant-smiling-hold-hands-together-how-may-i-help-you-smiling-friendly-polite-assist-customer-white-background_2_mwjxoo.jpg"
              alt=""
              className="pictureAgent"
            />
          </span>
          <span className="agent-disc-box">
            <p className="agent-name">Mark Ramsey</p>
            <p>Showing Assistant</p>
          </span>
        </span>
        <span className="box-agent" data-aos="zoom-in-up">
          <span className="picture2">
            <img
              src="https://res.cloudinary.com/hafid/image/upload/v1655224399/homePage/shipman-northcutt-sgZX15Da8YE-unsplash_kw769a.jpg"
              alt=""
              className="pictureAgent"
            />
          </span>
          <span className="agent-disc-box">
            <p className="agent-name">William Hart</p>
            <p>Administrative Manager</p>
          </span>
        </span>
        <span className="box-agent" data-aos="zoom-in-up">
          <span className="picture3">
            <img
              src="https://res.cloudinary.com/hafid/image/upload/v1655227401/homePage/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash_uqqa3f.jpg"
              alt=""
              className="pictureAgent"
            />
          </span>
          <span className="agent-disc-box">
            <p className="agent-name">Emily Elizbeth</p>
            <p>Marketing Director</p>
          </span>
        </span>
      </div>
      <div id="contact-second-content">
        <div className="contact-fist-part">
          <ul className="contact-list">
            <li>
              <FiFacebook className="social-media-icons" />
              <span>Modern_House_Agency</span>
            </li>
            <li>
              <FaInstagram className="social-media-icons" />
              <span>Modern_House_Agency.DZ</span>
            </li>
            <li>
              <FaWhatsapp className="social-media-icons" />
              <span>+213.66.89.75.12</span>
            </li>
          </ul>
        </div>
        <div className="contact-second-part">
          <p>Copyright 2022. All Rights Reserved.</p>
        </div>
        <div className="contact-third-part">
          <ul className="contact-list">
            <li>
              <SiGmail className="social-media-icons" />{" "}
              <span>Contact@ModernHouse.com</span>
            </li>
            <li>
              <MdPhone className="social-media-icons" />
              <span>07.81.08.87.59</span>
            </li>
            <li>
              <GoLocation className="social-media-icons" />
              <span>Algiers Center -ALGERIA-</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
