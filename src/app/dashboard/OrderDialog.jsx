import React, { useState, useEffect, useContext } from 'react';
import { Select, MenuItem, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button ,CircularProgress} from '@mui/material';
import { DataContext } from '@/contexts/post';

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
  const { data,fetchData ,fetchOrders} = useContext(DataContext);

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

  const handlePostChange = (event) => {
    setNewCustomer({ ...newCustomer, postId: event.target.value });
  };

  const handleSave = async () => {
    setLoading(true); 
    try {
      const response = await fetch('http://localhost:3001/api/DateReserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save the order');
      }

      const result = await response.json();
      console.log('Order saved successfully:', result);
    
      // Fetch updated data after the successful save
     
  
      onClose(); // Close the dialog after successful save
      await fetchData()
      await fetchOrders()
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
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
            <TextField
              margin="dense"
              label="Date Debut"
              name="dateDebut"
              type="date"
              fullWidth
              variant="outlined"
              value={newCustomer.dateDebut}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="Date Fine"
              name="dateFine"
              type="date"
              fullWidth
              variant="outlined"
              value={newCustomer.dateFine}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
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
        <InputLabel style={{ marginLeft: '10px' }}>Select Available Post</InputLabel>
        <Select
          fullWidth
          variant="outlined"
          label="Post"
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
