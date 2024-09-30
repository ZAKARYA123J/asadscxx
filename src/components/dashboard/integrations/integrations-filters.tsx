import React, { useContext, useState, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DataContext } from '@/contexts/post'; // Adjust the path accordingly
import { OrderActions } from '../../OrderActions'; // Import the OrderActions component
import { Button, SelectChangeEvent } from '@mui/material'; // Import the correct type
export function CompaniesFilters(): React.JSX.Element {
  const { order, loading, error ,fetchOrders} = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryId, setCategoryId] = useState(''); // State for filtering by category
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value);
  };

  const handleDeleteSuccess = () => {
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

  const filteredOrders = order.filter((order: Order) =>
      order.id.toString().includes(searchQuery) || 
      order.CIN.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((order: Order) =>
      categoryId === '' || order.post?.categoryId.toString() === categoryId
    );

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
 
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
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Date Debut</TableCell>
                <TableCell align="right">Date Fin</TableCell>
                <TableCell align="right">CIN</TableCell> 
                <TableCell align="right">Price</TableCell>
                <TableCell sx={{ textAlign: 'right',paddingRight:"50px" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((order: Order) => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="right">{order.fullName}</TableCell>
                  <TableCell align="right">{new Date(order.dateDebut).toLocaleDateString()}</TableCell>
                  <TableCell align="right">{new Date(order.dateFine).toLocaleDateString()}</TableCell>
                   <TableCell align="right">{order.CIN}</TableCell> 
                  <TableCell align="right">{order.price}</TableCell>
                  <TableCell align="right">
                    <OrderActions orderId={order.id} onDeleteSuccess={handleDeleteSuccess} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
          component="div"
          count={filteredOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableContainer>
      </Card>
    </div>
  );
}
