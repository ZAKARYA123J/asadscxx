"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Select, MenuItem, InputLabel } from "@mui/material";

export default function Update({ detailId, dataId }) {
  const [formData, setFormData] = useState({
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
    postId: Number(dataId),
  });

  console.log("detail", detailId, "data", dataId);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/details/${detailId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        console.log("Update successful");
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2, // Spacing between fields
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <TextField
        label="Construction Year"
        name="constructionyear"
        value={formData.constructionyear}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Surface"
        name="surface"
        value={formData.surface}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Rooms"
        name="rooms"
        value={formData.rooms}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Bedrooms"
        name="bedrooms"
        value={formData.bedromms}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Living Rooms"
        name="livingrooms"
        value={formData.livingrooms}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Kitchen"
        name="kitchen"
        value={formData.kitchen}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Bathrooms"
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
        fullWidth
      />
      <div>
        <InputLabel id="furnished-select-label">Furnished:</InputLabel>
        <Select
          labelId="furnished-select-label"
          name="furnished"
          value={formData.furnished}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={"Available"}>Available</MenuItem>
          <MenuItem value={"Not available"}>Not available</MenuItem>
        </Select>
      </div>
      <TextField
        label="Floor"
        name="floor"
        value={formData.floor}
        onChange={handleChange}
        fullWidth
      />
      <div>
        <InputLabel id="elevator-select-label">Elevator:</InputLabel>
        <Select
          labelId="elevator-select-label"
          name="elevator"
          value={formData.elevator}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={"Available"}>Available</MenuItem>
          <MenuItem value={"Not available"}>Not available</MenuItem>
        </Select>
      </div>
      <div>
      <InputLabel id="elevator-select-label">Parking:</InputLabel>
      <Select
        label="Parking"
        name="parking"
        value={formData.parking}
        onChange={handleChange}
        fullWidth
      >
          <MenuItem value={"Available"}>Available</MenuItem>
          <MenuItem value={"Not available"}>Not available</MenuItem>
      </Select>
      </div>
      <div>
        <InputLabel id="balcony-select-label">Balcony:</InputLabel>
        <Select
          labelId="balcony-select-label"
          name="balcony"
          value={formData.balcony}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={"Available"}>Available</MenuItem>
          <MenuItem value={"Not available"}>Not available</MenuItem>
        </Select>
      </div>
      <div>
        <InputLabel id="pool-select-label">Pool:</InputLabel>
        <Select
          labelId="pool-select-label"
          name="pool"
          value={formData.pool}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={"Available"}>Available</MenuItem>
          <MenuItem value={"Not available"}>Not available</MenuItem>
        </Select>
      </div>
      <TextField
        label="Facade"
        name="facade"
        value={formData.facade}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Documents"
        name="documents"
        value={formData.documents}
        onChange={handleChange}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </Box>
  );
}
