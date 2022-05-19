import { PropertyContext } from "../PropertiesContext";

import { useContext, useState } from "react";

import MappingAndDisplay from "../functions/mappingAndDisplay";
import("../Style/properties.css");
export default function BestOfferProperties() {
  // we'll send a property list to MappingAndDisplay through props
  const { properties, setProperties } = useContext(PropertyContext);
  console.log(properties);
  return (
    <div>
      <div id="properties-section">
        <div id="propertiesTitle">
          <h1>Best Offer</h1>
          <hr />
        </div>
        <MappingAndDisplay propertyList={properties} />
      </div>
    </div>
  );
}
