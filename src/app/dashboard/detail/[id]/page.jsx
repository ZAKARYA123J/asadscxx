"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Grid, TextField, Button, Container, Typography } from '@mui/material';

const DetailForm = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    constructionyear: '',
    surface: '',
    rooms: '',
    bedrooms: '',
    livingrooms: '',
    kitchen: '',
    bathrooms: '',
    furnished: '',
    floor: '',
    elevator: '',
    parking: '',
    balcony: '',
    pool: '',
    facade: '',
    documents: '',
    postId: Number(id) || 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail(prevDetail => ({
      ...prevDetail,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://immoceanrepo.vercel.app/api/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detail)
      });
  
      if (response.ok) {
        alert('Property details submitted successfully!');
        setDetail({
          constructionyear: '',
          surface: '',
          rooms: '',
          bedrooms: '',
          livingrooms: '',
          kitchen: '',
          bathrooms: '',
          furnished: '',
          floor: '',
          elevator: '',
          parking: '',
          balcony: '',
          pool: '',
          facade: '',
          documents: '',
          postId: Number(id) || 0
        });
      } else {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        alert('Failed to submit property details: ' + errorText);
      }
    } catch (error) {
      console.error('Error submitting property details:', error);
      alert('An error occurred while submitting the property details.');
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Property Details
      </Typography>
    
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            'constructionyear', 'surface', 'rooms', 'bedrooms', 'livingrooms', 
            'kitchen', 'bathrooms', 'furnished', 'floor', 'elevator', 
            'parking', 'balcony', 'pool', 'facade', 'documents'
          ].map(field => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                label={capitalizeFirstLetter(field)}
                name={field}
                value={detail[field]}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(/([A-Z])/g, ' $1');
};

export default DetailForm;
