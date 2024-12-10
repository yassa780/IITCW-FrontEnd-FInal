import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * TicketDisplay component displays the current number of available tickets.
 *
 * @param {number} tickets - The number of tickets available to be displayed.
 */

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
