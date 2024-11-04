import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CurrencyDollarIcon from '@mui/icons-material/AttachMoney';
import type { SxProps } from '@mui/material/styles';
import { DataContext } from '@/contexts/post';

export interface BudgetProps {
  trend: 'up' | 'down';
  sx?: SxProps;
}

const StyledCard = styled(Card)<{ trend: 'up' | 'down' }>(
  ({ theme, trend }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  })
);

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: 40,
  width: 40,
}));

const TotalTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

export function Budget({ trend, sx }: BudgetProps): React.JSX.Element {
  const { data } = React.useContext(DataContext);
  const filteredOrders = data?.filter((item: any) => item?.categoryId === 1) || [];
  const filteredLocation = data?.filter((item: any) => item?.categoryId === 2) || [];

  return (
    <StyledCard trend={trend} sx={sx} >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <TotalTypography variant="h4">Total:</TotalTypography>
              <Typography>{data?.length || 0} Posts</Typography>
              <Typography>{filteredOrders?.length || 0} Vente</Typography>
              <Typography>{filteredLocation?.length || 0} Location</Typography>
            </Stack>
            <StyledAvatar>
              <CurrencyDollarIcon />
            </StyledAvatar>
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}
