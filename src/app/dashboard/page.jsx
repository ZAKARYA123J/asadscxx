"use client";
import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { InfoModal } from '../infomodel';

const CardComponent = ({ title, content, children, onCardClick }) => {
  return (
    <Grid lg={3} sm={6} xs={12} onClick={() => onCardClick(title, content)} sx={{ cursor: 'pointer' }}>
      {children}
    </Grid>
  );
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTitle('');
    setModalContent(null);
  };

  return (
    <Grid container spacing={3}>
      <CardComponent
        title="Budget Details"
        content={<p>Budget: $24k<br />Trend: Up 12%</p>}
        onCardClick={handleCardClick}
      >
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="$24k" />
      </CardComponent>

      <CardComponent
        title="Total Customers Details"
        content={<p>Total Customers: 1.6k<br />Trend: Down 16%</p>}
        onCardClick={handleCardClick}
      >
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="1.6k" />
      </CardComponent>

      <CardComponent
        title="Tasks Progress Details"
        content={<p>Tasks Progress: 75.5%</p>}
        onCardClick={handleCardClick}
      >
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </CardComponent>

      <CardComponent
        title="Total Profit Details"
        content={<p>Total Profit: $15k</p>}
        onCardClick={handleCardClick}
      >
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </CardComponent>

      <InfoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        content={modalContent}
      />

      <Grid lg={12} md={12} xs={12}>
        <LatestOrders />
      </Grid>
    </Grid>
  );
}
