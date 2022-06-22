import { PropertyContext } from "../PropertiesContext";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Aos from "aos";
import Loading from "../functions/loading";
import MappingAndDisplay from "../functions/mappingAndDisplay";
import PropertyCard from "../functions/propertyCard";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import("../Style/properties.css");
export default function BestOfferProperties() {
  // we'll send a property list to MappingAndDisplay through props
  const { properties, load } = useContext(PropertyContext);
  console.log(properties);

  const propertiesAvailable = properties.filter(
    (prop) => prop.available === true
  );

  const [propertyList, setPropertyList] = useState(propertiesAvailable);
  useEffect(() => {
    setPropertyList(propertiesAvailable);
  }, [properties]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  console.log(propertyList);
  if (!load) return <Loading />;
  return (
    <>
      <section id="properties-section">
        <div id="propertiesTitle" data-aos="fade-left">
          <h1>Our Properties</h1>
          <hr />
          <a href="properties" id="discoverAll-box">
            Discover All
            <HiOutlineArrowNarrowRight size={26} />
          </a>
        </div>
        <MappingAndDisplay propertyList={propertyList} />
      </section>
    </>
  );
}
