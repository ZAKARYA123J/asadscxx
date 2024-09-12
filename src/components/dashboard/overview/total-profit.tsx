import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


export interface TotalProfitProps {
  sx?: SxProps;
  value: string;
}

export function TotalProfit({  sx }: TotalProfitProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
            Rented posts
            </Typography>
            <Typography variant="h4">Rented</Typography>
          </Stack>
          {/* <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '54px', width: '54px' }}>
            <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
          </Avatar> */}
        </Stack>
      </CardContent>
    </Card>
  );
}
