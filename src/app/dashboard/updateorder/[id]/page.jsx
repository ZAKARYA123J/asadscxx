"use client"
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { TextField, Button, Container, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Alert, AlertTitle } from '@mui/material'; 

export default function MyComponent() {
  const params = useParams();
  const [alert, setAlert] = useState(null); // Store alert component
  const [inputData, setInputData] = useState({
    dateDebut: '',
    dateFine: '',
    fullName: '',
    price: '',
    CIN: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://immoceanrepo.vercel.app/api/DateReserve/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setAlert(
        <Alert severity="success" onClose={() => setAlert(null)}>
          <AlertTitle>Success</AlertTitle>
          Order with ID {params.id} updated successfully.
        </Alert>
      );

      const result = await response.json();
      console.log('Update successful:', result);
    } catch (error) {
      console.error('Error updating data:', error);
      setAlert(
        <Alert severity="error" onClose={() => setAlert(null)}>
          <AlertTitle>Error</AlertTitle>
          Failed to update the order.
        </Alert>
      );
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Update Order
      </Typography>
      {alert}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              name="dateDebut"
              label="Date Debut"
              value={inputData.dateDebut}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              name="dateFine"
              label="Date Fine"
              value={inputData.dateFine}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={inputData.fullName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="price"
              label="Price"
              value={inputData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="CIN"
              label="CIN"
              value={inputData.CIN}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
