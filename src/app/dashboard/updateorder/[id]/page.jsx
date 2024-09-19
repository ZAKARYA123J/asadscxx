"use client"
import { useParams } from 'next/navigation'
import { useState,useContext,useEffect } from 'react'
import { TextField, Button, Container, Grid, Typography } from '@mui/material'
import {  useRouter} from 'next/navigation'
import { DataContext } from '@/contexts/post'
export default function MyComponent() {
  const params = useParams();
  const {order}=useContext(DataContext)
  const [inputData, setInputData] = useState({
    dateDebut: '',
    dateFine: '',
    fullName: '',
    price: '',
    CIN: ''
  });
  const filteredData = order?.filter((item) => item.id == params.id)[0];

  useEffect(() => {
    if (filteredData) {
      setInputData({
        ...inputData,
        dateDebut: filteredData.dateDebut ? new Date(filteredData.dateDebut).toISOString().split('T')[0] : '',
        dateFine: filteredData.dateFine ? new Date(filteredData.dateFine).toISOString().split('T')[0] : '',
        fullName: filteredData.fullName || '',
        price: filteredData.price || '',
        CIN: filteredData.CIN || '',
      });
    }
  }, [filteredData]);
const router=useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/DateReserve/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Update successful:', result);
      router.push("/dashboard/orders")
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Update Order
      </Typography>
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
              type='number'
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
