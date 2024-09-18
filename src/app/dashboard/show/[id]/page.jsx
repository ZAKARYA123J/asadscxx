"use client";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { DataContext } from "@/contexts/post";
import { useRouter } from "next/navigation";
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
  DialogContentText
} from "@mui/material";
import Update from "../Update";

function Page() {
  const { id } = useParams();
  const { detail, data } = useContext(DataContext);

  // Filter details based on postId
  const filteredDetails = detail?.filter((item) => item.postId == id);

  // Filter images from data based on id
  const filteredData = data?.filter((item) => item.id == id);

  // Modal open state and selected detail and data IDs
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null); // State for selected delete ID
const router=useRouter()
  // Handle opening the update modal
  const handleUpdate = (detailId, dataId) => {
    setSelectedDetailId(detailId);
    setSelectedDataId(dataId);
    setOpenUpdate(true);
  };

  // Handle closing the update modal
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedDetailId(null);
    setSelectedDataId(null);
  };

  // Handle opening the delete confirmation dialog
  const handleClickOpenDelete = (id) => {
    setSelectedDeleteId(id);
    setOpenDelete(true);
  };

  // Handle closing the delete confirmation dialog
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedDeleteId(null);
  };

  // Handle the delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://immoceanrepo.vercel.app/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Post deleted successfully!');
        setOpenDelete(false);
        router.push("/dashboard/posts")
      } else {
        console.error('Error deleting post:', await response.text());
        alert('Error deleting post. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again later.');
    } finally {
      setOpenDelete(false);
    }
  };

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
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
                      <strong>Furnished:</strong> {item.furnished}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Elevator:</strong> {item.elevator}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Parking:</strong> {item.parking}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Balcony:</strong> {item.balcony}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Pool:</strong> {item.pool}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Guard:</strong> {item.Guard}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Proprietary:</strong> {item.Proprietary}
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
                  <Button variant="outlined" color="error" onClick={() => handleClickOpenDelete(item.id)}>
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

        {/* Images Section */}
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
  <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this Post? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(selectedDeleteId)} // Pass selectedDeleteId to the delete function
              color="secondary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update Modal */}
        <Dialog open={openUpdate} onClose={handleCloseUpdate} maxWidth="sm" fullWidth>
          <DialogTitle>Update Details</DialogTitle>
          <DialogContent>
            {/* Passing selectedDetailId and selectedDataId to the Update component */}
            <Update detailId={selectedDetailId} dataId={selectedDataId} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdate} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
}

export default Page;
