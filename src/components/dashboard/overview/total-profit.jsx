import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataContext } from '@/contexts/post';

export function TotalProfit({ sx }) {
  const { order } = React.useContext(DataContext);
  const filteredOrders = order?.filter((item) => item?.post?.categoryId === 1) || [];
  const filteredLocatio = order?.filter((item) => item?.post?.categoryId === 2) || [];

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">Category</Typography>
            <Typography variant="h6">{filteredOrders.length} Vente</Typography>
            <Typography variant="h6">{filteredLocatio.length} Location</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
