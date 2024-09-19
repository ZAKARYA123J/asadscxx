"use client";
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Box, Alert, MenuItem, Select, InputLabel, FormControl, Grid, Card, CardMedia } from '@mui/material';
import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Don't forget to import Leaflet's CSS
import L from 'leaflet'; // Leaflet for custom marker icon
import { DataContext } from '@/contexts/post';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    datePost: '',
    lat: '',
    lon: '',
    prix: '',
    comment:"",
    adress: '',
    ville: '',
    status: '',
    title: '',
    categoryId: '',
    youtub:"",
    typeId: '',
    img: [],
  });

  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState(null);
const {category,type}=useContext(DataContext)
const [imageCount, setImageCount] = useState(0); 
const [searchAddress, setSearchAddress] = useState('');
 const router=useRouter() 
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'lat' || name === 'lon'  || name === 'typeId' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageCount(files.length);
    // Convert each file to a base64 string
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }))
    .then(base64Images => {
      setFormData(prevData => ({
        ...prevData,
        img: base64Images
      }));
    })
    .catch(error => console.error('Error converting images:', error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure datePost is formatted correctly
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.datePost)) {
      setErrors({ datePost: 'Invalid date format. Expected YYYY-MM-DD.' });
      return;
    }

    try {
      const response = await fetch('https://immoceanrepo.vercel.app/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponse(result);
        setErrors(null);
        router.push(`/dashboard/detail/${result.id}`)
      } else {
        setErrors(result);
      }
    } catch (error) {
      setErrors({ error: 'An error occurred while creating the post' });
    }
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
      } else {
        setErrors({ search: 'Address not found' });
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      setErrors({ search: 'Failed to fetch geocoding data' });
    }
  };

  if (typeof window !== "undefined") {
    const LocationMarker = () => {
      const map = useMapEvents({
        click(e) {
          const { lat, lng } = e.latlng;
          setFormData((prevData) => ({
            ...prevData,
            lat,
            lon: lng,
          }));
          map.flyTo(e.latlng, map.getZoom());
        },
      });
  
      return formData.lat !== 0 && formData.lon !== 0 ? (
        <Marker position={[formData.lat, formData.lon]} />
      ) : null;
    };
  }
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Post
      </Typography>
      {errors && <Alert severity="error">ERROR</Alert>}
      {response && <Alert severity="success">Succes</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
      <Grid item xs={12}>
      <MapContainer
  center={[31.7917, -7.0926]} // Coordinates for Morocco
  zoom={6}
  scrollWheelZoom={false}
  style={{ height: '500px', width: '100%' }}
>
  <LayersControl position="topright">
    {/* Default Map Layer */}
    <LayersControl.BaseLayer checked name="Map View">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </LayersControl.BaseLayer>

    {/* Satellite Layer */}
    <LayersControl.BaseLayer name="Satellite View">
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      />
    </LayersControl.BaseLayer>
  </LayersControl>

  <LocationMarker />
</MapContainer>
            <Typography variant="body2">
              Click on the map to select a location.
            </Typography>
          </Grid>
        <Grid item xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          type="date"
          name="datePost"
          label="Date Post"
          value={formData.datePost}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="prix"
          label="Price"
          value={formData.prix}
          onChange={handleChange}
        />
     
        </Grid>
        {/* <Grid item xs={6}>
      
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          name="lat"
          label="Latitude"
          value={formData.lat}
          onChange={handleChange}
        />
        </Grid> */}
        </Grid>
        <Grid container spacing={2}>
          {/* <Grid item xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          name="lon"
          label="Longitude"
          value={formData.lon}
          onChange={handleChange}
        />
        </Grid> */}
        
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="adress"
          label="Address"
          value={formData.adress}
          onChange={handleChange}
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="ville"
          label="City"
          value={formData.ville}
          onChange={handleChange}
        />
        </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
         <InputLabel>Status</InputLabel>
          <Select   margin="normal"
          required
          fullWidth
          name="status"
          value={formData.status}
          onChange={handleChange}
          >
            <MenuItem value="available">available</MenuItem>
            <MenuItem value="unavailable">unavailable</MenuItem>
          </Select>
          </Grid>
          <Grid item xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
        />
        </Grid>
        </Grid>
        <Grid container spacing={2}>
           <Grid item xs={12}>
           <TextField
          margin="normal"
          required
          fullWidth
          name="comment"
          label="Comment"
          value={formData.comment}
          onChange={handleChange}
        />
           </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            label="Category"
          >
            {category.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Type</InputLabel>
          <Select
            name="typeId"
            value={formData.typeId}
            onChange={handleChange}
            label="Type"
          >
            {type.map(type => (
              <MenuItem key={type.id} value={type.id}>
                {type.type}
              </MenuItem>
            ))}
          </Select>
          <TextField
    margin="normal"
    required
    fullWidth
    type="url"
    name="youtub"
    label="YouTube URL"
    value={formData.youtub}
    onChange={handleChange}
/>
        </FormControl>
        </Grid>
        </Grid>
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
        >
          Upload Images
          <input
            type="file"
            multiple
            hidden
            onChange={handleImageChange}
          />

        </Button>
        <Typography sx={{ mt: 2 }}>
          {imageCount} image(s) selected.
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {formData.img.length > 0 &&
            formData.img.map((image, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Card>
                  <CardMedia component="img" height="140" image={image} alt={`Selected image ${index + 1}`} />
                </Card>
              </Grid>
            ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Post
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePostForm;
