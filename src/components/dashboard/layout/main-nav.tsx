'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies
import { MobileNav } from './mobile-nav';
import { IoLogOutOutline } from "react-icons/io5";
export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const router = useRouter(); // Use Next.js router for page navigation
  const [openLogoutModal, setOpenLogoutModal] = React.useState<boolean>(false);
  const mainContentRef = React.useRef<HTMLDivElement>(null);
  const handleLogout = (): void => {
    Cookies.remove('token'); // Remove the token from cookies
    router.refresh(); // Refresh the page
  };
  const handleOpenLogoutModal = (): void => {
    setOpenLogoutModal(true); // Open the logout confirmation modal
    if (mainContentRef.current) {
      mainContentRef.current.setAttribute('inert', ''); // Apply inert attribute to the main content
    }
  };

  const handleCloseLogoutModal = (): void => {
    setOpenLogoutModal(false); // Close the logout confirmation modal
    if (mainContentRef.current) {
      mainContentRef.current.removeAttribute('inert'); // Remove inert attribute when modal is closed
    }
  };

  const confirmLogout = (): void => {
    handleLogout(); // Call logout logic
    handleCloseLogoutModal(); // Close the modal after logout
  };
  return (
    <React.Fragment>
      <Box
        component="header"
        ref={mainContentRef} 
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton> 
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Avatar sx={{ cursor: 'pointer' }} />
            <Button variant="contained" color="primary" onClick={handleOpenLogoutModal}>
              <IoLogOutOutline fontSize={25}/>
            </Button>
          </Stack>
        </Stack>
      </Box>
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
        <Dialog
        open={openLogoutModal}
        onClose={handleCloseLogoutModal}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} color="primary" variant="contained" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
