import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, AlertTitle } from '@mui/material';
import { useRouter } from 'next/navigation';
import { DataContext } from '@/contexts/post';
 import OrderDetails from './dashboard/integrations/OrderDetails'; // Adjust the path if necessary

interface OrderActionsProps {
  orderId: number;
  onDeleteSuccess: () => void; // Callback to refresh list after delete
}

export function OrderActions({ orderId, onDeleteSuccess }: OrderActionsProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {fetchOrders}=useContext(DataContext)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [alert, setAlert] = useState<React.ReactNode | null>(null); // Store alert component
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
  await fetchOrders()
      
    
    } catch (err) {
      console.log("error")
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
      {alert && (
        <div style={{ marginBottom: '20px' }}>
          {alert}
        </div>
      )}

      <Button variant="contained" color="primary" onClick={handleView}>
        View
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteClick}
        style={{ marginLeft: '10px' }}
        disabled={isDeleting}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={handleUpdate}
        style={{ marginLeft: '10px' }}
      >
        Update
      </Button>

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
