"use client";
import React, { useState } from "react";
import {  MapContainer,TileLayer, Popup, Marker } from "react-leaflet";

const MyMarker = ({ position }) => {
  return (
    <Marker position={position}>
      <Popup>
        Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
      </Popup>
    </Marker>
  );
};

const MapExample = ({ center, zoom }) => {
  const [currentPos, setCurrentPos] = useState(null);

  const handleClick = (e) => {
    setCurrentPos(e.latlng);
  };

  return (
    <div>
      <MapContainer center={center} zoom={zoom} onClick={handleClick}>
        <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {currentPos && <MyMarker position={currentPos} />}
      </MapContainer>
    </div>
  );
};

export default MapExample;
