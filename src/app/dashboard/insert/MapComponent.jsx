import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents, Popup } from 'react-leaflet';
import { Grid, TextField, Button } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

const { BaseLayer } = LayersControl;

const MyMap = ({ setFormData, searchCoordinates }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  useEffect(() => {
    if (searchCoordinates.lat && searchCoordinates.lng) {
      setSelectedPoint({ lat: searchCoordinates.lat, lng: searchCoordinates.lng });
    }
  }, [searchCoordinates]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const apiKey = 'af85006391dc49f8b68717cb9c1d0e60'; // Replace with your OpenCage API key
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
      );
      const data = response.data;
      if (data.results.length > 0) {
        const { formatted, components } = data.results[0];
        const city = components.city || components.town || components.village || '';
        const address = formatted || '';

        setFormData((prevData) => ({
          ...prevData,
          adress: address,
          ville: city,
          lat,
          lon: lng,
        }));
      }
    } catch (error) {
      console.error('Error with reverse geocoding:', error);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedPoint({ lat, lng });
        reverseGeocode(lat, lng); // Call reverse geocoding when a point is clicked
      },
    });

    return selectedPoint ? (
      <Marker position={[selectedPoint.lat, selectedPoint.lng]}>
        <Popup>
          Selected Point: ({selectedPoint.lat.toFixed(5)}, {selectedPoint.lng.toFixed(5)})
        </Popup>
      </Marker>
    ) : null;
  };

  const handleSearch = async () => {
    try {
      const apiKey = 'af85006391dc49f8b68717cb9c1d0e60'; // Replace with your OpenCage API key
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchAddress)}&key=${apiKey}`
      );

      const data = response.data;
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setFormData((prevData) => ({
          ...prevData,
          lat,
          lon: lng,
        }));
        setSelectedPoint({ lat, lng }); // Update map position
        setErrors({});
      } else {
        setErrors({ search: 'Address not found' });
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      setErrors({ search: 'Failed to fetch geocoding data' });
    }
  };

  return (
    <div>
      {/* Input for address search */}
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Search by Address"
              fullWidth
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch} sx={{ mt: 2 }}>
              Search
            </Button>
          </Grid>
        </Grid>
        {errors.search && <p style={{ color: 'red' }}>{errors.search}</p>}
      </div>

      {/* Map Component with LayersControl for switching views */}
      <MapContainer
        center={[31.7917, -7.0926]} // Default map center
        zoom={6}
        style={{ height: '400px', width: '100%' }}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </BaseLayer>
          <BaseLayer name="Satellite">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a> contributors'
            />
          </BaseLayer>
        </LayersControl>
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MyMap;
