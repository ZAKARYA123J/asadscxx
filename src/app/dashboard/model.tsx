import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  order: {
    id: string;
    customer: { name: string };
    amount: number;
    status: string;
    createdAt: Date;
  } | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({ open, onClose, order }) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <p>Order ID: {order.id}</p>
        <p>Customer Name: {order.customer.name}</p>
        <p>Amount: ${order.amount}</p>
        <p>Status: {order.status}</p>
        <p>Created At: {order.createdAt.toLocaleString()}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
