"use client";
import React, { useContext, useEffect, useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Button, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle ,TextField
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';
import { DataContext } from '@/contexts/post';
import { useRouter } from 'next/navigation';
import { MdAddCard } from "react-icons/md";
import AddOrderDialog from '../OrderDialog';
import { FcSearch } from "react-icons/fc";
const DataTable = () => {
  const { data, loading, error } = useContext(DataContext);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedPostCategory, setSelectedPostCategory] = useState(""); // Added state for selectedPostCategory
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const uniqueCities = [...new Set(data.map(item => item.ville))];
  const uniqueCategories = [...new Set(data.map(item => item.category?.name))];
  const uniqueStatuses = ['available', 'unavailable', 'taken'];

  useEffect(() => {
    if (mounted) {
      handleSearch();
    } else {
      setMounted(true);
    }
  }, [data, searchQuery, selectedCity, selectedCategory, selectedStatus, mounted]);

  const handleSearch = () => {
    const searchData = data.filter((item) => {
      const matchesSearchTerm =
        item.id.toString().includes(searchQuery) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.adress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity = selectedCity === '' || item.ville === selectedCity;
      const matchesCategory = selectedCategory === '' || item.category?.name === selectedCategory;
      const matchesStatus = selectedStatus === '' || item.status === selectedStatus;

      return matchesSearchTerm && matchesCity && matchesCategory && matchesStatus;
    });

    setFilteredData(searchData);
  };

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://immoceanrepo.vercel.app/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setFilteredData(filteredData.filter(post => post.id !== id));
        setOpen(false);
        alert('Post deleted successfully!');
      } else {
        console.error('Error deleting post:', await response.text());
        alert('Error deleting post. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again later.');
    } finally {
      setOpen(false);
    }
  };

  const handleUpdate = (id) => {
    router.push(`/dashboard/update/${id}`);
  };

  const handleDetail = (id, Detail) => {
    if (Detail) {
      router.push(`/dashboard/show/${id}`);
    } else {
      router.push(`/dashboard/detail/${id}`);
    }
  };

  const handleAddOrder = (postId, category) => {
    setSelectedPostId(postId);
    setSelectedPostCategory(category); // Set selectedPostCategory
    setDialogOpen(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleIcon style={{ color: 'green', marginRight: '5px' }} />
            <span>Available</span>
          </div>
        );
      case 'unavailable':
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <HourglassEmptyIcon style={{ color: 'orange', marginRight: '5px' }} />
            <span>Unavailable</span>
          </div>
        );
      case 'taken':
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CancelIcon style={{ color: 'red', marginRight: '5px' }} />
            <span>Taken</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <div style={{ textAlign: 'right'}}>
        <Link href="/dashboard/insert" passHref>
          <Button variant="contained">Add <FaPlus style={{ marginLeft: "2px" }} /></Button>
        </Link>
      </div>
      <TextField
        label="Search Posts: Id"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
  {/* <TextField 
    label="Search" 
    variant="outlined" 
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)} 
    fullWidth
  /> */}

  <TextField
    select
 
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    SelectProps={{ native: true }}
    variant="outlined"
    fullWidth
  >
    <option value="">All Cities</option>
    {uniqueCities.map(city => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </TextField>

  <TextField
    select
  
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    SelectProps={{ native: true }}
    variant="outlined"
    fullWidth
  >
    <option value="">All Categories</option>
    {uniqueCategories.map(category => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </TextField>

  <TextField
    select
  
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    SelectProps={{ native: true }}
    variant="outlined"
    fullWidth
  >
    <option value="">All Statuses</option>
    {uniqueStatuses.map(status => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </TextField>
  <Button  onClick={handleSearch}style={{border:'1px solid black',marginTop:'2px'}} >
    <FcSearch fontSize={30} />
  </Button>
  
</div>


    
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell> {/* Displaying ID */}
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.adress}</TableCell>
                  <TableCell>{row.ville}</TableCell>
                  <TableCell>{row.category?.name || 'N/A'}</TableCell>
                  <TableCell>{getStatusIcon(row.status)}</TableCell>
                  <TableCell>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    {row.status === "taken" || row.status === "unavailable" ? (
      row.DateReserve ? (
        <span style={{ color: 'black' }}>Ordered</span>
      ) : (
        <span style={{ color: 'red' }}>Taken</span>
      )
    ) : (
      <IconButton onClick={() => handleAddOrder(row.id, row.category?.name)}>
        <MdAddCard fontSize={25} style={{ color: "#1e90ff" }} />
      </IconButton>
    )}
    <div style={{ display: 'flex', alignItems: 'center' }}>
    
      <IconButton onClick={() => handleDetail(row.id, row.Detail)}>
        <InfoIcon />
      </IconButton>
      {row.status === "available" ? (<IconButton onClick={() => handleUpdate(row.id)} color="primary">
        <EditIcon />
      </IconButton>):(
        <p>
          
        </p>
      )}
      
      <IconButton onClick={() => handleClickOpen(row.id)} style={{ color: 'red' }}>
                        <DeleteIcon />
                      </IconButton>
    </div>
  </div>
</TableCell>

                  {/* <TableCell>
                   
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
  Cancel
</Button>
<Button onClick={() => handleDelete(selectedId)} color="secondary" autoFocus>
  Delete
</Button>

        </DialogActions>
      </Dialog>

      <AddOrderDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        category={selectedPostCategory} 
        selectedPostId={selectedPostId || undefined} 
      />
    </>
  );
};

export default DataTable;
