import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataContext } from '@/contexts/post';
import OrderDetails from './dashboard/integrations/OrderDetails'; // Adjust the path if necessary
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';

interface OrderActionsProps {
  orderId: number;
  onDeleteSuccess: () => void; // Callback to refresh list after delete
}

export function OrderActions({ orderId, onDeleteSuccess }: OrderActionsProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { fetchOrders } = useContext(DataContext);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const router = useRouter();

  const handleView = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`https://immoceanrepo.vercel.app/api/DateReserve/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await fetchOrders();
      onDeleteSuccess(); // Call the callback to refresh the list if necessary
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setIsDeleting(false);
      setConfirmDeleteOpen(false);
    }
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmDeleteOpen(false);
  };

  const handleUpdate = () => {
    router.push(`/dashboard/updateorder/${orderId}`);
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleView}>
        <VisibilityIcon />
      </IconButton>
      <IconButton 
        color="secondary" 
        onClick={handleDeleteClick} 
        disabled={isDeleting}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton color="info" onClick={handleUpdate}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <OrderDetails orderId={orderId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this order?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
