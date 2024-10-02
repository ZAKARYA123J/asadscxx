"use client";
import React, { useState,useContext } from "react";
import { useParams } from "next/navigation";
import { DataContext } from '@/contexts/post';
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
  CircularProgress
} from "@mui/material";
import { useRouter } from "next/navigation";
const DetailForm = () => {
  const { id } = useParams();
  const [loiding,setLoding]=useState(false)
  const router=useRouter()
  const {fetchData}=useContext(DataContext)
  const [detail, setDetail] = useState({
    constructionyear: "",
    surface: "",
    rooms: 0,
    bedromms: 0, // Initialize with a number (0)
    livingrooms: "", // Initialize with a number (0)
    kitchen: "",
    bathrooms: 0, // Initialize with a number (0)
    furnished: "",
    floor: "",
    elevator: "",
    parking: "",
    balcony: "",
    pool: "",
    facade: "",
    Guard: "",
    Proprietary: "",
    documents: "",
    postId: Number(id) || 0, // Ensure postId is a number
  });  
 
  // id               Int     @id @default(autoincrement())
  // constructionyear String?
  // surface          String?
  // rooms            String?
  // bedromms         String?
  // livingrooms      String?
  // kitchen          String?
  // bathrooms        String?
  // furnished        String?
  // floor            String?        
  // elevator         String?
  // parking          String?
  // balcony          String?
  // pool             String?
  // facade           String?
  // documents        String?
  // postId           Int     @unique
  // post             Post    @relation(fields: [postId], references: [id])
  // Guard            String?  // New column
  // Proprietary      String?  // New column
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true)
    try {
      const response = await fetch("http://localhost:3001/api/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      });

      if (response.ok) {
        setDetail({
          constructionyear: "",
          surface: "",
          rooms: 0,
          bedromms: 0, // Initialize with a number (0)
          livingrooms: "", // Initialize with a number (0)
          kitchen: "",
          bathrooms: 0, // Initialize with a number (0)
          furnished: "",
          floor: "",
          elevator: "",
          parking: "",
          balcony: "",
          pool: "",
          facade: "",
          Guard:"",
          Proprietary:"",
          documents: "",
          postId: Number(id) || 0,
          
        }
     
      ); 
      setLoding(false)
      await fetchData()
      router.push("/dashboard/posts")
      } else {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        alert("Failed to submit property details: " + errorText);
        setLoding(false)
      }
    } catch (error) {
      console.error("Error submitting property details:", error);
      alert("An error occurred while submitting the property details.");
      setLoding(false)
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
              type="number"
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
               type="number"
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
               type="number"
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Proprietary</InputLabel>
              <Select
                name="Proprietary"
                value={detail.Proprietary}
                onChange={handleChange}
              >
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Not available"}>Not available</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Guard</InputLabel>
              <Select
                name="Guard"
                value={detail.Guard}
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
            <Button variant="contained" color="primary" type="submit" disabled={loiding}>
              {loiding ? <CircularProgress size={24}/> : "Insert"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default DetailForm;
