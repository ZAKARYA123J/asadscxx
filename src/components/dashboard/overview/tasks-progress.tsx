import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export interface TasksProgressProps {
  sx?: SxProps;
  value: number;
}

export function TasksProgress({ value, sx }: TasksProgressProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                status posts
              </Typography>
              <Typography variant="h4">Status</Typography>
            </Stack>
            {/* <Avatar sx={{ backgroundColor: 'var(--mui-palette-warning-main)', height: '56px', width: '56px' }}>
              <ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar> */}
          </Stack>
          <div>
            <LinearProgress value={value} variant="determinate" />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
