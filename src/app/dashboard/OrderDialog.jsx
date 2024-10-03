import React, { useState, useEffect, useContext } from 'react';
import { Select, MenuItem, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { DataContext } from '@/contexts/post';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
const AddOrderDialog = ({ open, onClose, selectedPostId, category }) => {
  const [loading, setLoading] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    fullName: '',
    dateDebut: '',
    dateFine: '',
    price: '',
    CIN: '',
    postId: selectedPostId || ''
  });
  const { data, fetchData, fetchOrders, order } = useContext(DataContext);
const router=useRouter()
  useEffect(() => {
    if (selectedPostId) {
      setNewCustomer(prevState => ({
        ...prevState,
        postId: selectedPostId
      }));
    }
  }, [selectedPostId]);

  const handleChange = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (name, date) => {
    setNewCustomer(prevState => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handlePostChange = (event) => {
    setNewCustomer({ ...newCustomer, postId: event.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formattedCustomer = {
        ...newCustomer,
        dateDebut: newCustomer.dateDebut ? new Date(newCustomer.dateDebut).toISOString() : '',
        dateFine: newCustomer.dateFine ? new Date(newCustomer.dateFine).toISOString() : '',
      };

      const response = await fetch('https://immoceanrepo.vercel.app/api/DateReserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedCustomer),
      });
      if (!response.ok) {
        throw new Error('Failed to save the order');
      }

      const result = await response.json();
      console.log('Order saved successfully:', result);
      router.push("/dashboard/orders")
      // Fetch updated data after the successful save
      await fetchOrders();
      await fetchData();

      onClose(); // Close the dialog after successful save
      
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  // Example array of reserved dates for selected post
  const filterOder = order.filter(item => item.postId === selectedPostId);
  const reservedDates = filterOder.flatMap(item => item.reservedDates.map(date => new Date(date)));

  const filteredData = selectedPostId
    ? data.filter(item => item.id === selectedPostId)
    : data.filter(item => item.status !== 'unavailable' && item.status !== 'taken');
  
  // const isWeekday = (date) => {
  //   const day = date.getDay();
  //   return day !== 0 && day !== 6;
  // };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Order</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="fullName"
          fullWidth
          variant="outlined"
          value={newCustomer.fullName}
          onChange={handleChange}
        />
        {category === "Location" && (
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: '10px',zIndex:"10" }}>
          <div style={{ flex: 1 }}>
            <InputLabel style={{ marginBottom: '5px' }}>Date Debut:</InputLabel>
            <DatePicker
              selected={newCustomer.dateDebut}
              onChange={(date) => handleDateChange('dateDebut', date)}
              dateFormat="yyyy-MM-dd"
              excludeDates={reservedDates} // Disable specific reserved dates
              className="date-picker"
              popperProps={{
                modifiers: [
                  {
                    name: 'zIndex',
                    options: {
                      zIndex: 1050, // Ensure the calendar stays above other elements
                    },
                  },
                ],
              }}
              customInput={
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                  style={{ backgroundColor: '#fff' }} // Set the background color
                />
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputLabel style={{ marginBottom: '5px' }}>Date Fine:</InputLabel>
            <DatePicker
              selected={newCustomer.dateFine}
              onChange={(date) => handleDateChange('dateFine', date)}
              dateFormat="yyyy-MM-dd"
              excludeDates={reservedDates} // Disable specific reserved dates
              className="date-picker"
              customInput={
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              }
            />
          </div>
        </div>        
        )}
        <TextField
          margin="dense"
          label="CIN"
          name="CIN"
          fullWidth
          variant="outlined"
          value={newCustomer.CIN}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Price"
          name="price"
          type="number"
          fullWidth
          variant="outlined"
          value={newCustomer.price}
          onChange={handleChange}
        />
        <InputLabel style={{ marginLeft: '10px', marginTop: '10px' }}>Select Available Post</InputLabel>
        <Select
          fullWidth
          variant="outlined"
          value={newCustomer.postId}
          onChange={handlePostChange}
        >
          {filteredData.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
              <span style={{ color: 'red', marginLeft: '10px' }}>
                {item.status} {item.category.name}
              </span>
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrderDialog;
