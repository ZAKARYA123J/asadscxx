"use client";
import React, { useState, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { TextField, Button, Typography, Container, Box, Alert, MenuItem, Select, InputLabel, FormControl, Grid, Card, CardMedia } from '@mui/material';
import { DataContext } from '@/contexts/post';
const MyMap = dynamic(
  () => import('../../insert/MapComponent'),
  { 
    loading: () => <p>A map is loading...</p>,  // Fallback UI while loading
    ssr: false  // Disable server-side rendering
  }
);

const UpdateALL = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    lat: '',
    lon: '',
    prix: '',
    adress: '',
    ville: '',
    status: '',
    title: '',
    categoryId: '',
    youtub: "",
    typeId: '',
    img: [],
    constructionyear:'',
    surface:"",
    rooms:"",
    bedromms:"",
    livingrooms:"",
    kitchen:"",
    bathrooms:"",
    furnished:"",
    floor:"",
    elevator:"",
    parking:"",
    balcony:"",
    pool:"",
    facade:"",
    documents:"",

    Guard:"",
    id: id
  });

  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState(null);
  const { category, type, data } = useContext(DataContext);
  const [imageCount, setImageCount] = useState(0);
  const [searchCoordinates, setSearchCoordinates] = useState({ lat: null, lon: null }); // 
  // Filter the data to get the item with matching id
  const filteredData = data?.filter((item) => item.id == id)[0];
  useEffect(() => {
    if (filteredData) {
      setFormData({
        ...formData,
        lat: filteredData.lat || '',
        lon: filteredData.lon || '',
        prix: filteredData.prix || '',
        adress: filteredData.adress || '',
        ville: filteredData.ville || '',
        status: filteredData.status || '',
        title: filteredData.title || '',
        categoryId: filteredData.categoryId || '',
        typeId: filteredData.typeId || '',
        youtub: filteredData.youtub || '',
        img: filteredData.img || [],
        constructionyear:filteredData.Detail?.constructionyear,
        surface:filteredData.Detail?.surface,
        rooms:filteredData.Detail?.rooms,
        bedromms:filteredData.Detail?.bedromms,
        furnished:filteredData.Detail?.furnished,
        floor:filteredData.Detail?.floor,
        elevator:filteredData.Detail?.elevator,
        parking:filteredData.Detail?.parking,
        balcony:filteredData.Detail?.balcony,
        pool:filteredData.Detail?.pool,
        facade:filteredData.Detail?.facade,
        documents:filteredData.Detail?.documents,
        Guard:filteredData.Detail?.Guard,
      });
    }
  }, [filteredData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'lat' || name === 'lon' || name === 'typeId' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageCount(files.length);
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

   

    try {
      const response = await fetch(`https://immoceanrepo.vercel.app/api/postsDtails/${id}`, {
        method: 'PUT',
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
      setErrors({ error: 'An error occurred while updating the post' });
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Post
      </Typography>
      {errors && <Alert severity="error">ERROR</Alert>}
      {response && <Alert severity="success">Success</Alert>}
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
  <Grid container spacing={2}>
    {/* Left column for map and search */}
    <Grid item xs={12} sm={6} mt={2}>
      <MyMap
        setFormData={setFormData}
        searchCoordinates={searchCoordinates} // Pass search result coordinates
      />
      <Typography variant="body2" sx={{ mb: 2 }}>
        Click on the map to select a location.
      </Typography>
      {errors && errors.search && (
        <Alert severity="error">{errors.search}</Alert>
      )}
    </Grid>

    {/* Right column for form inputs */}
    <Grid item xs={12} sm={6}>
    <Box sx={{ maxHeight: 450, overflowY: 'auto' }}>

    <Grid container spacing={2}>
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
        <Grid item xs={6}>
          <InputLabel>Status</InputLabel>
          <Select
            margin="normal"
            required
            fullWidth
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="unavailable">Unavailable</MenuItem>
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
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              label="Category"
            >
              {category.map((category) => (
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
              {type.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        </Grid>
        <Grid item xs={6}>
  <TextField
    margin="normal"
    required
    fullWidth
    type="number"
    name="constructionyear"
    label="Construction Year"
    value={formData.constructionyear}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    margin="normal"
    required
    fullWidth
    type="number"
    name="surface"
    label="Surface (m²)"
    value={formData.surface}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    margin="normal"
    required
    fullWidth
    type="number"
    name="rooms"
    label="Number of Rooms"
    value={formData.rooms}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    margin="normal"
    required
    fullWidth
    type="number"
    name="bedrooms"
    label="Number of Bedrooms"
    value={formData.bedrooms}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    margin="normal"
    required
    fullWidth
    type="number"
    name="livingrooms"
    label="Number of Living Rooms"
    value={formData.livingrooms}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    margin="normal"
    required
    fullWidth
    type="number"
    name="kitchen"
    label="Number of Kitchens"
    value={formData.kitchen}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    margin="normal"
    required
    fullWidth
    type="number"
    name="bathrooms"
    label="Number of Bathrooms"
    value={formData.bathrooms}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
  <FormControl fullWidth margin="normal" required>
    <InputLabel>Furnished</InputLabel>
    <Select
      name="furnished"
      value={formData.furnished}
      onChange={handleChange}
      label="Furnished"
    >
       <MenuItem value={"Available"}>Available</MenuItem>
       <MenuItem value={"Not available"}>Not available</MenuItem>
    </Select>
  </FormControl>
</Grid>
<Grid item xs={6}>
  <TextField
    margin="normal"
    required
    fullWidth
    type="number"
    name="floor"
    label="Floor Number"
    value={formData.floor}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
  <FormControl fullWidth margin="normal" required>
    <InputLabel>Elevator</InputLabel>
    <Select
      name="elevator"
      value={formData.elevator}
      onChange={handleChange}
      label="Elevator"
    >
       <MenuItem value={"Available"}>Available</MenuItem>
       <MenuItem value={"Not available"}>Not available</MenuItem>
    </Select>
  </FormControl>
</Grid>
<Grid item xs={6}>
  <FormControl fullWidth margin="normal" required>
    <InputLabel>Parking</InputLabel>
    <Select
      name="parking"
      value={formData.parking}
      onChange={handleChange}
      label="Parking"
    >
    <MenuItem value={"Available"}>Available</MenuItem>
    <MenuItem value={"Not available"}>Not available</MenuItem>
    </Select>
  </FormControl>
</Grid>
<Grid item xs={6}>
  <FormControl fullWidth margin="normal" required>
    <InputLabel>Balcony</InputLabel>
    <Select
      name="balcony"
      value={formData.balcony}
      onChange={handleChange}
      label="Balcony"
    >
      <MenuItem value={"Available"}>Available</MenuItem>
      <MenuItem value={"Not available"}>Not available</MenuItem>
    </Select>
  </FormControl>
</Grid>
<Grid item xs={6}>
  <FormControl fullWidth margin="normal" required>
    <InputLabel>Pool</InputLabel>
    <Select
      name="pool"
      value={formData.pool}
      onChange={handleChange}
      label="Pool"
    >
       <MenuItem value={"Available"}>Available</MenuItem>
       <MenuItem value={"Not available"}>Not available</MenuItem>
    </Select>
  </FormControl>
</Grid>
<Grid item xs={6}>
  <TextField
    margin="normal"
    fullWidth
    name="facade"
    label="Facade Details"
    value={formData.facade}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    margin="normal"
    fullWidth
    name="documents"
    label="Documents"
    value={formData.documents}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={6}>
<FormControl fullWidth margin="normal" required>
    <InputLabel>Guard service</InputLabel>
    <Select
      name="Guard"
      value={formData.Guard}
      onChange={handleChange}
      label="Guard"
    >
       <MenuItem value={"Available"}>Available</MenuItem>
       <MenuItem value={"Not available"}>Not available</MenuItem>
    </Select>
  </FormControl>
</Grid>

        <Grid item xs={6}>
      <Button variant="contained" component="label" >
        Upload Images
        <input type="file" multiple hidden onChange={handleImageChange} />
      </Button>
      <Typography sx={{ mt: 2 }}>{imageCount} image(s) selected.</Typography>
    </Grid>
      </Grid>

    </Box>

     
    </Grid>
  </Grid>

  <Grid container spacing={2} sx={{ mt: 2 }}>
   
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {formData.img.length > 0 &&
        formData.img.map((image, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={image}
                alt={`Selected image ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
    </Grid>
    
  </Grid>

  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 ,maxWidth:200}}>
    Update Post
  </Button>
</Box>
    </>
  );
};

export default UpdateALL;
