"use client";
import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, Alert, MenuItem, Select, InputLabel, FormControl, Grid, Card, CardMedia ,CircularProgress} from '@mui/material';
import dynamic from 'next/dynamic';
import { GrLinkNext } from "react-icons/gr";
import imageCompression from 'browser-image-compression';
const MyMap = dynamic(
  () => import('./MapComponent'),
  { 
    loading: () => <p>A map is loading...</p>,  // Fallback UI while loading
    ssr: false  // Disable server-side rendering
  }
);
import { DataContext } from '@/contexts/post';
import { useRouter } from 'next/navigation';

// Fix for default marker icon in Leaflet

const CreatePostForm = React.memo(() => {
  const [formData, setFormData] = useState({
    lat: '',
    lon: '',
    prix: '',
    comment: '',
    adress: '',
    ville: '',
    status: '',
    categoryId: '',
    youtub: '',
    typeId: '',
    img: [],
  });

  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState(null);
  const { category, type ,fetchData} = useContext(DataContext);
  const [imageCount, setImageCount] = useState(0);
  const [loading, setLoading] = useState(false); // New loading state
  const [searchAddress, setSearchAddress] = useState('');
  const [searchCoordinates, setSearchCoordinates] = useState({ lat: null, lon: null }); // 
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'lat' || name === 'lon' || name === 'typeId' ? Number(value) : value,
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const compressedImages = [];
  
    for (const file of files) {
      try {
        // Options for image compression
        const options = {
          maxSizeMB: 2,       // Maximum file size in MB
          maxWidthOrHeight: 1920, // Maximum width or height
          useWebWorker: true, // Use web worker for faster compression
        };
  
        // Compress the image
        const compressedFile = await imageCompression(file, options);
  
        // Convert compressed file to base64 string
        const base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(compressedFile);
        });
  
        compressedImages.push(base64Image);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  
    // Update form data with compressed images
    setImageCount(compressedImages.length);
    setFormData((prevData) => ({
      ...prevData,
      img: compressedImages,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    // Ensure datePost is formatted correctly


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
        setLoading(false); // Stop loading on success
        setErrors(null);
        await fetchData()
        router.push(`/dashboard/detail/${result.id}`);
      } else {
        setErrors(result);
        setLoading(false); // Stop loading on success
      }
    } catch (error) {
      setErrors({ error: 'An error occurred while creating the post' });
      setLoading(false); // Stop loading on success
    }
  }; 
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Post
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
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="unavailable">Unavailable</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid> */}

        <Grid item xs={6}>
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

        <Grid item xs={6} sm={6}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              label="Category"
            >
              {category.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6}>
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
        </Grid>

        <Grid item xs={6}>
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

        <Grid item xs={12}>
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Images
            <input type="file" multiple hidden onChange={handleImageChange} />
          </Button>
          <Typography sx={{ mt: 2 }}>{imageCount} image(s) selected.</Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {formData.img.length > 0 &&
              formData.img.map((image, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={image}
                      alt={`Selected image ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>

  <Button type="submit" fullWidth variant="contained"  disabled={loading} sx={{ mt: 3, mb: 2 ,maxWidth:200}} >
    Next <GrLinkNext fontSize={22}style={{marginLeft:"10px"}}/>
    {loading ? <CircularProgress size={24} /> : ""}
  </Button>

</Box>

    </>
  );
});

export default CreatePostForm;