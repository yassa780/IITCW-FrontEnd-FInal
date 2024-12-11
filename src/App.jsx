import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import ConfigurationForm from './components/ConfigurationForm';
import TicketDisplay from './components/TicketDisplay';
import ControlPanel from './components/ControlPanel';
import LogDisplay from './components/LogDisplay';
import './App.css'; 

const App = () => {
  const [logs, setLogs] = useState([]);
  const [tickets, setTickets] = useState(0);
  const [configurationComplete, setConfigurationComplete] = useState(false);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Real-Time Event Ticketing System
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Configuration Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Configuration
              </Typography>
              <ConfigurationForm 
              setTickets={setTickets} 
              setLogs={setLogs}
              setConfigurationComplete={setConfigurationComplete} 
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Ticket Display Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Ticket Availability
              </Typography>
              <TicketDisplay tickets={tickets} />
            </CardContent>
          </Card>
        </Grid>

        {/* Control Panel Section */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ControlPanel setLogs={setLogs} configurationComplete = {configurationComplete} />
            </CardContent>
          </Card>
        </Grid>

        {/* Logs Section */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Logs
              </Typography>
              <LogDisplay />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
