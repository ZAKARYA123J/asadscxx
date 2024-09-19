// MapComponent.js
import React from 'react';
import dynamic from 'next/dynamic';
import { Marker, LayersControl, TileLayer } from 'react-leaflet';

// Dynamically import MapContainer without SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });

const MapComponent = ({ formData, setFormData }) => {
  const LocationMarker = () => {
    return formData.lat && formData.lon ? <Marker position={[formData.lat, formData.lon]} /> : null;
  };

  return (
    <MapContainer center={[31.7917, -7.0926]} zoom={6} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
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
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;
