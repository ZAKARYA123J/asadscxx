import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import the icon
import { DataContext } from '@/contexts/post';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

const IconContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2), // Space between the icon and text
}));

export function TotalProfit({ sx }) {
  const { order } = React.useContext(DataContext);
  const filteredOrders = order?.filter((item) => item?.post?.categoryId === 1) || [];
  const filteredLocation = order?.filter((item) => item?.post?.categoryId === 2) || [];

  return (
    <StyledCard sx={sx} >
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={2}>
         
          <Stack spacing={1}>
            <Typography variant="h4">Ordres</Typography>
            <Typography variant="h6">{filteredOrders.length} Vente</Typography>
            <Typography variant="h6">{filteredLocation.length} Location</Typography>
          </Stack>
           <IconContainer>
            <ShoppingCartIcon fontSize="large" sx={{ color: 'primary.main' }} /> {/* Icon with a larger size */}
          </IconContainer>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}
