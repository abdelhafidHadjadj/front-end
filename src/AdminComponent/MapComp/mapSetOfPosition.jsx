import { useState, useEffect } from "react";
import "./map.css";
import L, { bind } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router";
import { GoLocation } from "react-icons/go";

export default function MapPositions({ mapId = "map", propertiesList }) {
  console.log(propertiesList);

  const navigate = useNavigate();
  var container = L.DomUtil.get(mapId);
  let map;
  if (container != null) {
    container._leaflet_id = null;
  }
  const iconLoc = L.icon({
    iconUrl:
      "https://res.cloudinary.com/hafid/image/upload/v1655457622/homePage/location_1_zg9qqd.png",
  });
  var popupOptions = { className: "customPopup" };
  useEffect(() => {
    let current_lat = 34.71417532798844;
    let current_long = 3.600024033640512;
    let current_zoom = 6;
    let center_lat = current_lat;
    let center_long = current_long;
    let center_zoom = current_zoom;
    map = L.map(mapId, {
      center: [center_lat, center_long],
      zoom: center_zoom,
    });

    propertiesList.map((prop) => {
      var marker = L.marker(
        prop.coordination.toString().split(",").map(Number),
        {
          icon: iconLoc,
        }
      )
        .addTo(map)
        .on("click", function (e) {
          console.log(prop.id);
          navigate(`/property-Detaills/${prop.id}`);
        })
        .on("mouseover", function (e) {
          marker
            .bindPopup(
              `<div class='popup-box'>
              <img src=${prop.photos[0]} width='90px' height='90px' id="imgPopup"/> 
              <span class='box-detaills-popup'>
              <p> ${prop.adresse}</p>
              <p>${prop.estateType}</p>
              <p>${prop.dealType} $${prop.price}</p>

              </span>
              </div>`,
              popupOptions
            )
            .openPopup();
        })
        .on("mouseout", function (e) {
          marker.closePopup();
        });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);
    });
  }, [propertiesList]);
  return (
    <>
      <div id={mapId}></div>
    </>
  );
}
