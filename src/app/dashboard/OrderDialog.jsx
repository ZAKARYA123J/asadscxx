import React, { useState, useEffect, useContext } from 'react';
import { Select, MenuItem, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress } from '@mui/material';
import { DataContext } from '@/contexts/post';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const { data, fetchData, fetchOrders } = useContext(DataContext);

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
console.log(response)
      if (!response.ok) {
        throw new Error('Failed to save the order');
      }

      const result = await response.json();
      console.log('Order saved successfully:', result);

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

  // Example array of dates to disable
  const excludeDates = [
    new Date('2024-12-25'), // Christmas
    new Date('2024-01-01'), // New Year's Day
    // Add more specific dates here
  ];

  // Alternatively, disable weekends (Saturday and Sunday)
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const filteredData = selectedPostId
    ? data.filter(item => item.id === selectedPostId)
    : data.filter(item => item.status !== 'unavailable' && item.status !== 'taken');

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
          <>
            <InputLabel style={{ marginTop: '10px' }}>Date Debut</InputLabel>
            <DatePicker
              selected={newCustomer.dateDebut}
              onChange={(date) => handleDateChange('dateDebut', date)}
              dateFormat="yyyy-MM-dd"
              filterDate={isWeekday} // Disable weekends
              excludeDates={excludeDates} // Disable specific dates
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
            <InputLabel style={{ marginTop: '10px' }}>Date Fine</InputLabel>
            <DatePicker
              selected={newCustomer.dateFine}
              onChange={(date) => handleDateChange('dateFine', date)}
              dateFormat="yyyy-MM-dd"
              filterDate={isWeekday} // Disable weekends
              excludeDates={excludeDates} // Disable specific dates
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
          </>
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
