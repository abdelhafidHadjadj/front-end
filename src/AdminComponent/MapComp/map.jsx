import React, { useState, useEffect } from "react";

import "./map.css";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

export default function Map({
  position,
  setPosition,
  Click = true,
  mapId = "map",
}) {
  var container = L.DomUtil.get("map");
  let map;
  if (container != null) {
    container._leaflet_id = null;
  }

  const iconLoc = L.icon({
    iconUrl:
      "https://res.cloudinary.com/hafid/image/upload/v1654599464/homePage/icons8-commande-livr%C3%A9e-60_etauu4.png",
  });

  useEffect(() => {
    let current_lat = position[0];
    let current_long = position[1];
    let current_zoom = 16;
    let center_lat = current_lat;
    let center_long = current_long;
    let center_zoom = current_zoom;

    map = L.map(mapId, {
      center: [center_lat, center_long],
      zoom: center_zoom,
    });
    if (Click) {
      function onMapClick(e) {
        const coord = e.latlng;
        setPosition(Object.values(coord));
        console.log(position);
      }
      map.on("click", onMapClick);
    }

    var marker = L.marker(position, { icon: iconLoc }).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  }, [position]);

  return (
    <>
      <div id={mapId}></div>
    </>
  );
}
