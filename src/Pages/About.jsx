import { useEffect } from "react";
import Aos from "aos";
import("../Style/about.css");

export default function About() {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);
  return (
    <section id="about-section">
      <div id="first-part-about" data-aos="fade-right">
        <img
          data-aos="fade-up"
          id="aboutUs-image"
          src="https://res.cloudinary.com/hafid/image/upload/v1650030954/homePage/ixv9o299lfv7s6tp9ggr.jpg"
          alt=""
        />
      </div>
      <div id="second-part-about">
        <div id="about-title" data-aos="fade-left">
          <h1>About Us</h1>
          <hr />
        </div>
        <p data-aos="fade-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          recusandae Consectetur deleniti quibusdam molestiae. Deleniti dolores
          hic maiores aliquam, inventore modi exercitationem. Quibusdam, eius.
          nam soluta id deleniti nulla, enim iusto omnis necessitatibus laborum
          error?
        </p>
      </div>
    </section>
  );
}
