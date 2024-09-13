'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { useSelection } from '@/hooks/use-selection';

// Define a more specific type for DateReserve
export interface DateReserve {
  reservedDate: Date; // Example field, adjust as needed
  // Add more fields as needed
}

export interface Posts {
  id: string;
  img: string[];
  datePost: Date;
  lat: number;
  lon: number;
  prix: number;
  adress: string;
  ville: string;
  status: string;
  title: string;
  categoryId: number;
  typeId: number;
  category: {
    id: number;
    name: string;
  };
  type: {
    id: number;
    type: string;
  };
  Detail: {
    id: number;
    constructionyear: string;
    surface: string;
    rooms: string;
    bedromms: string;
    livingrooms: string;
    kitchen: string;
    bathrooms: string;
    furnished: string;
    floor: string;
    elevator: string;
    parking: string;
    balcony: string;
    pool: string;
    facade: string;
    documents: string;
    postId: number;
  };
  DateReserve: DateReserve[]; // Use the new type here
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Posts[];
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((post) => post.id.toString());
  }, [rows]);

  const { selected } = useSelection(rowIds);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id.toString());

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      {row.img.length > 0 && <Avatar src={row.img[0]} alt={row.title} />}
                      <Typography variant="subtitle2">{row.title}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.prix}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.category.name}</TableCell>
                  <TableCell>{row.type.type}</TableCell>
                  <TableCell>{row.ville}</TableCell>
                  <TableCell>
                    {/* Add any action buttons or links here */}
                    <button>View</button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={() => {}} // Implement pagination logic if needed
        onRowsPerPageChange={() => {}} // Implement rows per page logic if needed
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
