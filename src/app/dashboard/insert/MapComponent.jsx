"use client"
import React from 'react';
import { MapContainer, TileLayer, Marker, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MyMap = ({ setFormData }) => {
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log(`Clicked on: ${lat}, ${lng}`);
    
    // Update formData with lat and lon
    setFormData(prev => ({
      ...prev,
      lat: lat,
      lon: lng,
    }));
  };

  return (
    <MapContainer
      center={[31.7917, -7.0926]}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
      onClick={handleMapClick} // Add onClick to the MapContainer
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Map View">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <Marker position={[31.7917, -7.0926]} />
      <Marker position={[33.8697, -7.0926]} />
      <Marker position={[31.7917, -5.0926]} />
    </MapContainer>
  );
};

export default MyMap;
