"use client";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { DataContext } from "@/contexts/post";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Card,
  CardMedia,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Alert, AlertTitle } from '@mui/material'; 
import Update from "../Update";

function Page() {
  const { id } = useParams();
  const { detail, data } = useContext(DataContext);

  // Filter details based on postId
  const filteredDetails = detail?.filter((item) => item.postId == id);

  // Filter images from data based on id
  const filteredData = data?.filter((item) => item.id == id);
  const [alert, setAlert] = useState(null);
  // Modal open state and selected detail and data IDs
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false); // State for delete confirmation modal
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [selectedDataId, setSelectedDataId] = useState(null);

  // Handle opening the modal and setting the selected detail and data IDs
  const handleUpdate = (detailId, dataId) => {
    console.log("Update clicked, detailId:", detailId, "dataId:", dataId); // Debug
    setSelectedDetailId(detailId);
    setSelectedDataId(dataId);
    setOpen(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    console.log("Closing modal");
    setOpen(false);
    setSelectedDetailId(null);
    setSelectedDataId(null); // Reset selected IDs
  };

  // Open delete confirmation modal
  const handleOpenDelete = (detailId) => {
    console.log("Open delete modal, detailId:", detailId); // Debug
    setSelectedDetailId(detailId);
    setOpenDelete(true);
  };

  // Close delete confirmation modal
  const handleCloseDelete = () => {
    console.log("Closing delete modal");
    setOpenDelete(false);
    setSelectedDetailId(null);
  };

  // Delete function with API call
  const handleDelete = async () => {
    console.log("Deleting post with ID:", selectedDetailId); // Debug

    try {
      const response = await fetch(`https://immoceanrepo.vercel.app/api/details/${selectedDetailId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Post with ID ${selectedDetailId} deleted successfully.`);
        setOpenDelete(false);

        // Optionally update UI here by removing the deleted item from the detail array
        // ... (your logic to update UI) ...

        // Display success alert using Material UI
        setAlert(
          <Alert>
            <AlertTitle>Success!</AlertTitle>
            Post with ID {selectedDetailId} deleted successfully.
          </Alert>
        );
      } else {
        console.error("Failed to delete the post.");
        setAlert(
          <Alert severity="error">
            <AlertTitle>Error!</AlertTitle>
            Failed to delete the post.
          </Alert>
        );
      }
    } catch (error) {
      console.error("An error occurred while deleting the post:", error);
      setAlert(
        <Alert severity="error">
          <AlertTitle>Error!</AlertTitle>
          An error occurred while deleting the post.
        </Alert>
      );
    }
  };
  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
        {alert && <Alert severity={alert.props.severity}>{alert}</Alert>}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Post Details
          </Typography>
        </Grid>

        {/* Property Details Section */}
    
        {filteredDetails?.length > 0 ? (
          filteredDetails.map((item, key) => (
            <Grid item xs={12} md={6} key={key}>
              <Paper elevation={4} sx={{ padding: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold">
                      Property Details
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Construction Year:</strong> {item.constructionyear}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Surface:</strong> {item.surface} m²
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Rooms:</strong> {item.rooms}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Bedrooms:</strong> {item.bathrooms}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Floor:</strong> {item.floor}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Kitchen:</strong> {item.kitchen}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Furnished:</strong> {item.furnished ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Elevator:</strong> {item.elevator ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Parking:</strong> {item.parking ? "Available" : "Not Available"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Balcony:</strong> {item.balcony ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Pool:</strong> {item.pool ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Facade:</strong> {item.facade}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Documents:</strong> {item.documents}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Action Buttons for each item */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(item.id, id)} // Pass detail.id and data.id to the handleUpdate function
                    sx={{ mr: 2 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenDelete(item.id)} // Pass detail.id to open the delete confirmation
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No details found for this post.</Typography>
          </Grid>
        )}
  {filteredData?.length > 0 ? (
          filteredData.map((item, key) => (
            <Grid item xs={12} key={key}>
              <Paper elevation={4} sx={{ padding: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Images
                </Typography>
                <Grid container spacing={3}>
                  {item.img && item.img.length > 0 ? (
                    item.img.map((imageUrl, imgKey) => (
                      <Grid item xs={12} sm={6} md={4} key={imgKey}>
                        <Card sx={{ boxShadow: 3 }}>
                          <CardMedia
                            component="img"
                            height="400"
                            width="500"
                            image={imageUrl}
                            alt={`Image ${imgKey}`}
                            sx={{ borderRadius: 2 }}
                          />
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body2">No images found.</Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No images found for this post.</Typography>
          </Grid>
        )}
        {/* Update Modal */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Update Details</DialogTitle>
          <DialogContent>
            {/* Passing selectedDetailId and selectedDataId to the Update component */}
            <Update detailId={selectedDetailId} dataId={selectedDataId} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this post?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
}

export default Page;
