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
import { DataContext } from '@/contexts/post';
import Link from 'next/link';
import { OrderActions } from '@/components/OrderActions';

export function LatestOrders({ sx }) {
  const { order, loading, error } = useContext(DataContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!order || order.length === 0) {
    return <p>No orders available.</p>;
  }

  const handleDeleteSuccess = () => {
    console.log('Order deleted, refresh list if necessary');
  };

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
              <TableCell sx={{ textAlign: 'right',paddingRight:"50px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.slice(0, 5).map((order) => (
              <TableRow hover key={order.id}>
                <TableCell>ORD-{order.id}</TableCell>
                <TableCell>{order.fullName}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {order?.post ? (
                    <>
                      {order.post.categoryId === 1 && (
                        <Chip label="Vente" color="warning" />
                      )}
                      {order.post.categoryId === 2 && (
                        <Chip label="Location" color="success" />
                      )}
                    </>
                  ) : (
                    <span>Post information unavailable</span>
                  )}
                </TableCell>
                <TableCell align="right">
                  <OrderActions
                    orderId={order.id}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link href="/dashboard/orders" passHref>
          <Button
            color="inherit"
            endIcon={<ArrowRightIcon fontSize={20} />}
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
