import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataContext } from '@/contexts/post';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: 40,
  width: 40,
  backgroundColor: theme.palette.primary.main,
}));

const TotalProfitsTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  // Use your desired color here, e.g., color: theme.palette.text.primary
}));

export function TotalCustomers({ sx }) {
  const { order } = React.useContext(DataContext);

  // Sum up the prices of all orders
  const sumOrders = order?.reduce((acc, item) => acc + (item?.price || 0), 0) || 0;
  const formattedSum = sumOrders.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <StyledCard sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">Profits:</Typography>
              <Typography>- {order?.length || 0} Orders</Typography>
              <Typography sx={{ display: 'flex' }}>
                -Profits: <TotalProfitsTypography>{formattedSum}</TotalProfitsTypography>
              </Typography>
            </Stack>
            <StyledAvatar>
              <MonetizationOnIcon />
            </StyledAvatar>
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}
