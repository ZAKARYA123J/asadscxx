"use client";
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { styled } from '@mui/material/styles';

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CardComponent = ({ children }) => {
  return (
    <StyledGrid lg={4} sm={6} xs={12}>
      <div style={{
        backgroundColor: 'white',
        padding: '16px',
        height: '100%',
      }}>
        {children}
      </div>
    </StyledGrid>
  );
};

export default function Page() {
  return (
    <StyledGrid container spacing={3}>
      <CardComponent>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="$24k" />
      </CardComponent>

      <CardComponent>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="1.6k" />
      </CardComponent>

      <CardComponent>
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </CardComponent>

      <StyledGrid xs={12}>
        <LatestOrders />
      </StyledGrid>
    </StyledGrid>
  );
}
