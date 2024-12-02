import React from 'react';
import { Box, Typography } from '@mui/material';

const TicketDisplay = ({ tickets }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Ticket Availability</Typography>
      <Typography variant="h4" sx={{ mt: 2 }}>
        {tickets}
      </Typography>
    </Box>
  );
};

export default TicketDisplay;
