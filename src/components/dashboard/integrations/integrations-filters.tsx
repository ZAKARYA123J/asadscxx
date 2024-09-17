import React, { useContext, useState, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DataContext } from '@/contexts/post'; // Adjust the path accordingly
import { OrderActions } from '../../OrderActions'; // Import the OrderActions component

export function CompaniesFilters(): React.JSX.Element {
  const { order, loading, error } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryId, setCategoryId] = useState(''); // State for filtering by category

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<{ value: unknown }>) => {
    setCategoryId(event.target.value as string);
  };

  const handleDeleteSuccess = () => {
    // You can refresh the orders list after a delete
    console.log('Order deleted, refresh list if necessary');
  };

  interface Order {
    id: number;
    fullName: string;
    dateDebut: string;
    dateFine: string;
    CIN: string;
    price: number;
    post: {
      categoryId: number;
    };
  }

  const filteredOrders = order
    .filter((order: Order) =>
      order.id.toString().includes(searchQuery) || 
      order.CIN.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((order: Order) =>
      categoryId === '' || order.post?.categoryId.toString() === categoryId
    );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Search by Order ID or CIN */}
      <TextField
        label="Search Orders: Id CIN"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

      {/* Filter by Category */}
      <Select
        value={categoryId}
        onChange={handleCategoryChange}
        displayEmpty
        fullWidth
        style={{ marginBottom: '20px' }}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        <MenuItem value="1">Vente</MenuItem>
        <MenuItem value="2">Location</MenuItem>
        {/* Add more categories if needed */}
      </Select>

      <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Customer Name</TableCell>
                <TableCell align="right">Date Debut</TableCell>
                <TableCell align="right">Date Fin</TableCell>
                {/* <TableCell align="right">CIN</TableCell> */}
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order: Order) => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="right">{order.fullName}</TableCell>
                  <TableCell align="right">{new Date(order.dateDebut).toLocaleDateString()}</TableCell>
                  <TableCell align="right">{order.dateFine}</TableCell>
                  {/* <TableCell align="right">{order.CIN}</TableCell> */}
                  <TableCell align="right">{order.price} DH</TableCell>
                  <TableCell align="right">
                    <OrderActions orderId={order.id} onDeleteSuccess={handleDeleteSuccess} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
