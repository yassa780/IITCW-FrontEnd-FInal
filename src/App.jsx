import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ConfigurationForm from './components/ConfigurationForm';
import TicketDisplay from './components/TicketDisplay';
import ControlPanel from './components/ControlPanel';
import LogDisplay from './components/LogDisplay';

const App = () => {
  const [logs, setLogs] = useState([]);
  const [tickets, setTickets] = useState(0);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Real-Time Event Ticketing System
        </Typography>
        <ConfigurationForm setTickets={setTickets} setLogs={setLogs} />
        <TicketDisplay tickets={tickets} />
        <ControlPanel setLogs={setLogs} />
        <LogDisplay logs={logs} />
      </Box>
    </Container>
  );
};

export default App;
