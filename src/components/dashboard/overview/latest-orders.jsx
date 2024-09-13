import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { useContext } from 'react';
import { DataContext } from '@/contexts/post'; // Make sure this is the correct path to your DataContext
import Link from 'next/link';
import { OrderActions } from '@/components/OrderActions';
export function LatestOrders({ sx }) {
  const { order, loading, error } = useContext(DataContext); // Accessing order, loading, and error from context

  if (loading) {
    return <p>Loading...</p>; // Display a loading state if the data is being fetched
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Display an error message if there is an error
  }

  if (!order || order.length === 0) {
    return <p>No orders available.</p>; // Display a message if no orders are found
  }  const handleDeleteSuccess = () => {
    // You can refresh the orders list after a delete
    console.log('Order deleted, refresh list if necessary');
  };
console.log("ewewdss")
  return (
    <Card sx={sx}>
      <CardHeader title="Latest orders" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.slice(0,10).map((order) => { // Assuming `order` is an array of Order objects
              return (
                <TableRow hover key={order.id}>
                  <TableCell>ORD-{order.id}</TableCell>
                  <TableCell>{order.fullName}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>

                  <TableCell>
  {order.post ? ( // Use optional chaining here
    order.post.categoryId === 1 && (
      <Chip label="Vente" color="warning" />
    )
  ) : (
    // Handle the case where order.post is undefined or null
    <span>Post information unavailable</span>
  )}
  {order.post ? (
    order.post.categoryId === 2 && (
      <Chip label="Location" color="success" />
    )
  ) : null}
</TableCell>
<TableCell align="right">
                    <OrderActions orderId={order.id} onDeleteSuccess={handleDeleteSuccess} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link href="/dashboard/orders">
          <Button
            color="inherit"
            endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
