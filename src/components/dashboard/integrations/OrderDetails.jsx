import React, { useContext } from 'react';
import { DataContext } from '@/contexts/post';
import { Box, Typography, Paper, Grid, Chip } from '@mui/material';

const OrderDetails = ({ orderId }) => {
  const { order } = useContext(DataContext);

  // Filter the orders based on the passed orderId
  const filteredOrder = order?.filter((item) => item.id === orderId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }); // Format as HH:mm
    return `${formattedDate} ${formattedTime}`;
  };

  // Calculate remaining days from dateFin
  const calculateTotalDuration = (dateDebut, dateFin) => {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const timeDiff = endDate - startDate;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Total duration in days
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Order ID: {orderId}
      </Typography>

      {/* Display the filtered order details */}
      {filteredOrder && filteredOrder.length > 0 ? (
        filteredOrder.map((item) => (
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }} key={item.id}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Order Created:</strong> {formatDate(item.createdAt)}
                </Typography>
                <Typography variant="body1">
                  <strong>Order Updated:</strong> {formatDate(item.updatedAt)}
                </Typography>
                <Typography>
                  <strong>CIN: </strong>{item.CIN}
                </Typography>
                <Typography>
                  <strong>Price: </strong>{item.price}
                </Typography>
              </Grid>

              {item.post && (
                <>
                  {item.post.title && (
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Post Title:</strong> {item.post.title}
                      </Typography>
                    </Grid>
                  )}
                  {item.post.title && (
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Post id:</strong> {item.post.id}
                      </Typography>
                    </Grid>
                  )}
                  {item.post.status && (
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Post Status:</strong> {item.post.status}
                      </Typography>
                    </Grid>
                  )}
                  {item.post.address && (
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Post Address:</strong> {item.post.address}
                      </Typography>
                    </Grid>
                  )}
                  {item.post.categoryId && (
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Post Category:</strong>
                        {item.post?.categoryId === 1 ? (
                          <Chip label="Vente" color="primary" />
                        ) : item.post?.categoryId === 2 ? (
                          <Chip label="Location" color="secondary" />
                        ) : (
                          <Chip label="Other" />
                        )}
                      </Typography>
                    </Grid>
                  )}
                  {/* Display dateDebut and dateFin */}
                  {item.dateDebut && (
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>Start Date:</strong> {formatDate(item.dateDebut)}
                      </Typography>
                    </Grid>
                  )}
                  {item.dateFine && (  // Fixed typo from dateFine to dateFin
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <strong>End Date:</strong> {formatDate(item.dateFine)}
                      </Typography>
                      <Typography variant="body1" color="error">
                        <strong>Remaining Days:</strong> {calculateTotalDuration(item.dateDebut, item.dateFine)} days
                      </Typography>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No order found with this ID.
        </Typography>
      )}
    </Box>
  );
};

export default OrderDetails;
