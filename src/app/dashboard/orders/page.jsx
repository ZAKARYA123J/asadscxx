"use client";
import React, { useState, useContext } from 'react';
import { Button, Stack, Box, Pagination } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { DataContext } from '@/contexts/post';
import { CompaniesFilters } from '@/components/dashboard/integrations/integrations-filters';
import AddOrderDialog from '../OrderDialog';

 const Page=React.memo( function Page() {
  const { createOrder, updateOrder,fetchOrders } = useContext(DataContext);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleRefresh = async () => {
    await fetchOrders(); // Call fetchData to refresh data
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
        
        variant="contained"
        onClick={handleRefresh} // Passing null to indicate new order
        style={{ width: '100px' }}
      >Refresh
        
      </Button>
      <AddOrderDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        order={selectedOrder}
        onSave={handleSaveOrder}
      />

      <CompaniesFilters />

      {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box> */}
    </Stack>
  );
})

export default Page