import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataContext } from '@/contexts/post';
import { color } from '@mui/system';

export function TotalCustomers({ sx }) {
  const { order } = React.useContext(DataContext);

  // Sum up the prices of all orders
  const sumOrders = order?.reduce((acc, item) => acc + (item?.price || 0), 0) || 0;
  const formattedSum = sumOrders.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">Profits :</Typography>
              <Typography variant="h6">-{order?.length || 0} Orders</Typography>
              <Typography variant="h6">-Total Profits: <span style={{ color: formattedSum ? "blue" : "black" }}>{formattedSum}</span>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
