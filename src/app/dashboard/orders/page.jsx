"use client";
import React, { useState, useContext } from 'react';
import { Button, Stack, Box, Pagination } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { DataContext } from '@/contexts/post';
import { CompaniesFilters } from '@/components/dashboard/integrations/integrations-filters';
import AddOrderDialog from '../OrderDialog';

export default function Page() {
  const { createOrder, updateOrder } = useContext(DataContext);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveOrder = async (updatedOrder) => {
    if (selectedOrder) {
      // Update existing order
      await updateOrder(selectedOrder.id, updatedOrder);
    } else {
      // Create new order
      await createOrder(updatedOrder);
    }
    handleCloseDialog();
  };

  return (
    <Stack spacing={3}>
      <Button
        startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
        variant="contained"
        onClick={() => handleOpenDialog(null)} // Passing null to indicate new order
        style={{ width: '100px' }}
      >
        Add
      </Button>
      
      <AddOrderDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        order={selectedOrder}
        onSave={handleSaveOrder}
      />

      <CompaniesFilters />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
}
