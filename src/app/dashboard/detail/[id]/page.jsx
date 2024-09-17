"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Grid,
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const DetailForm = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    constructionyear: "",
    surface: "",
    rooms: "",
    bedromms: "",
    livingrooms: "",
    kitchen: "",
    bathrooms: "",
    furnished: "",
    floor: "",
    elevator: "",
    parking: "",
    balcony: "",
    pool: "",
    facade: "",
    documents: "",
    postId: Number(id) || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://immoceanrepo.vercel.app/api/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      });

      if (response.ok) {
        alert("Property details submitted successfully!");
        setDetail({
          constructionyear: "",
          surface: "",
          rooms: "",
          bedrooms: "",
          livingrooms: "",
          kitchen: "",
          bathrooms: "",
          furnished: "",
          floor: "",
          elevator: "",
          parking: "",
          balcony: "",
          pool: "",
          facade: "",
          documents: "",
          postId: Number(id) || 0,
        });
      } else {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        alert("Failed to submit property details: " + errorText);
      }
    } catch (error) {
      console.error("Error submitting property details:", error);
      alert("An error occurred while submitting the property details.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Property Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Construction Year"
              name="constructionyear"
              value={detail.constructionyear}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Surface"
              name="surface"
              value={detail.surface}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Rooms"
              name="rooms"
              value={detail.rooms}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bedrooms"
              name="bedromms" // Corrected from 'bedromms'
              value={detail.bedromms}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Floor"
              name="floor"
              value={detail.floor}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Living Rooms"
              name="livingrooms"
              value={detail.livingrooms}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kitchen"
              name="kitchen"
              value={detail.kitchen}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bathrooms"
              name="bathrooms"
              value={detail.bathrooms}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Select input for Furnished */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Furnished</InputLabel>
              <Select
                name="furnished"
                value={detail.furnished}
                onChange={handleChange}
              >
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Not available"}>Not available</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Select input for Elevator */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Elevator</InputLabel>
              <Select
                name="elevator"
                value={detail.elevator}
                onChange={handleChange}
              >
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Not available"}>Not available</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Select input for Parking */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Parking</InputLabel>
              <Select
                name="parking"
                value={detail.parking}
                onChange={handleChange}
              >
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Not available"}>Not available</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Select input for Balcony */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Balcony</InputLabel>
              <Select
                name="balcony"
                value={detail.balcony}
                onChange={handleChange}
              >
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Not available"}>Not available</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Select input for Pool */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Pool</InputLabel>
              <Select
                name="pool"
                value={detail.pool}
                onChange={handleChange}
              >
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Not available"}>Not available</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Facade"
              name="facade"
              value={detail.facade}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Documents"
              name="documents"
              value={detail.documents}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

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

export default DetailForm;
