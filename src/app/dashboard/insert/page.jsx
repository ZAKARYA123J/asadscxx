"use client";
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Box, Alert, MenuItem, Select, InputLabel, FormControl,  Grid, Card, CardMedia } from '@mui/material';
import { DataContext } from '@/contexts/post';
const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    datePost: '',
    lat: '',
    lon: '',
    prix: '',
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
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'lat' || name === 'lon' || name === 'prix' || name === 'typeId' ? Number(value) : value,
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
      } else {
        setErrors(result);
      }
    } catch (error) {
      setErrors({ error: 'An error occurred while creating the post' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Post
      </Typography>
      {errors && <Alert severity="error">ERROR</Alert>}
      {response && <Alert severity="success">Succes</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
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
          type="number"
          name="lat"
          label="Latitude"
          value={formData.lat}
          onChange={handleChange}
        />
        </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          name="prix"
          label="Price"
          value={formData.prix}
          onChange={handleChange}
        />
     
        </Grid>
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
