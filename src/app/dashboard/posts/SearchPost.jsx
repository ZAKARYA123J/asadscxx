"use client"; // Enable client-side rendering

import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const SearchPost = () => {
  const [searchId, setSearchId] = useState('');
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchId) {
      setError('Please enter a valid ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://immoceanrepo.vercel.app/api/posts/?id=${searchId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode:"no-cors"
      });

      // Check if the response is OK and the body is not empty
      if (response.ok) {
        const textResponse = await response.text(); // Get response as text
        if (textResponse) {
          const data = JSON.parse(textResponse); // Parse only if textResponse is not empty
          setPostData(data);
        } else {
          setError('No data returned from the server');
          setPostData(null);
        }
      } else {
        const errorData = await response.text();
        setError(errorData || 'An error occurred');
        setPostData(null);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Search for a Post
      </Typography>

      <TextField
        label="Enter Post ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {error && (
        <Typography color="error" variant="body1" gutterBottom>
          {error}
        </Typography>
      )}

      {postData && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Post Details</Typography>
          <Typography><strong>ID:</strong> {postData.id}</Typography>
          <Typography><strong>Title:</strong> {postData.title}</Typography>
          <Typography><strong>Address:</strong> {postData.adress}</Typography>
          <Typography><strong>City:</strong> {postData.ville}</Typography>
          <Typography><strong>Category:</strong> {postData.category?.name}</Typography>
        </div>
      )}
    </div>
  );
};

export default SearchPost;
