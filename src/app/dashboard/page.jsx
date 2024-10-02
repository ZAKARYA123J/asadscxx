"use client";
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';


const CardComponent = ({  children }) => {
  return (
    <Grid lg={3} sm={6} xs={12} >
      {children}
    </Grid>
  );
};

export default function Page() {


  // const handleCardClick = (title, content) => {
  //   setModalTitle(title);
  //   setModalContent(content);
  //   setIsModalOpen(true);
  // };

 

  return (
    <Grid container spacing={2}>
      <CardComponent
        title="Budget Details"
        content={<p>Budget: $24k<br />Trend: Up 12%</p>}
      
      >
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="$24k" />
      </CardComponent>

      <CardComponent
        title="Total Customers Details"
        content={<p>Total Customers: 1.6k<br />Trend: Down 16%</p>}
    
      >
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="1.6k" />
      </CardComponent>

      <CardComponent
        title="Tasks Progress Details"
        content={<p>Tasks Progress: 75.5%</p>}
  
      >
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </CardComponent>

      <CardComponent
        title="Total Profit Details"
        content={<p>Total Profit: $15k</p>}
      >
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </CardComponent>

      {/* <InfoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        content={modalContent}
      /> */}

      <Grid lg={12} md={12} xs={12}>
        <LatestOrders />
      </Grid>
    </Grid>
  );
}
