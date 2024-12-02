import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../services/api';

const ConfigurationForm = ({ setTickets, setLogs }) => {
  const [formData, setFormData] = useState({
    totalTickets: '',
    ticketReleaseRate: '',
    customerRetrievalRate: '',
    maxTicketCapacity: '',
    numberOfVendors: '', 
    numberOfCustomers: '', 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.configure(formData);
      setLogs((prev) => [...prev, 'System configured successfully.']);
      setTickets(response.ticketsAvailable);
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${error.message}`]);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Configuration</Typography>
      <TextField
        label="Total Tickets"
        name="totalTickets"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.totalTickets}
        onChange={handleChange}
      />
      <TextField
        label="Ticket Release Rate"
        name="ticketReleaseRate"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.ticketReleaseRate}
        onChange={handleChange}
      />
      <TextField
        label="Customer Retrieval Rate"
        name="customerRetrievalRate"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.customerRetrievalRate}
        onChange={handleChange}
      />
      <TextField
        label="Max Ticket Capacity"
        name="maxTicketCapacity"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.maxTicketCapacity}
        onChange={handleChange}
      />
      <TextField
        label="Number of Vendors" // New field
        name="numberOfVendors"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.numberOfVendors}
        onChange={handleChange}
      />
      <TextField
        label="Number of Customers" // New field
        name="numberOfCustomers"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.numberOfCustomers}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Configure
      </Button>
    </Box>
  );
};

export default ConfigurationForm;
