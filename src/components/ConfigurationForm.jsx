import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../services/api';

const ConfigurationForm = ({ setTickets, setLogs }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    totalTickets: '',
    ticketReleaseRate: '',
    customerRetrievalRate: '',
    maxTicketCapacity: '',
    numberOfVendors: '', 
    numberOfCustomers: '', 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors as user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : prevErrors[name],
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });

    // Check for specific field validation
    const totalTickets = parseInt(formData.totalTickets, 10);
    const maxTicketCapacity = parseInt(formData.maxTicketCapacity, 10);

    if (!isNaN(totalTickets) && !isNaN(maxTicketCapacity)) {
      if (totalTickets <= maxTicketCapacity) {
        newErrors.totalTickets = 'Total tickets must be greater than maximum capacity.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLogs((prev) => [...prev, 'Please fix the errors before submitting.']);
      return;
    }

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
        label="Event Name"
        name="eventName"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.eventName}
        onChange={handleChange}
        error={!!errors.eventName}
        helperText={errors.eventName}
      />
      <TextField
        label="Total Tickets"
        name="totalTickets"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.totalTickets}
        onChange={handleChange}
        error={!!errors.totalTickets}
        helperText={errors.totalTickets}
      />
      <TextField
        label="Ticket Release Rate"
        name="ticketReleaseRate"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.ticketReleaseRate}
        onChange={handleChange}
        error={!!errors.ticketReleaseRate}
        helperText={errors.ticketReleaseRate}
      />
      <TextField
        label="Customer Retrieval Rate"
        name="customerRetrievalRate"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.customerRetrievalRate}
        onChange={handleChange}
        error={!!errors.customerRetrievalRate}
        helperText={errors.customerRetrievalRate}
      />
      <TextField
        label="Max Ticket Capacity"
        name="maxTicketCapacity"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.maxTicketCapacity}
        onChange={handleChange}
        error={!!errors.maxTicketCapacity}
        helperText={errors.maxTicketCapacity}
      />
      <TextField
        label="Number of Vendors"
        name="numberOfVendors"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.numberOfVendors}
        onChange={handleChange}
        error={!!errors.numberOfVendors}
        helperText={errors.numberOfVendors}
      />
      <TextField
        label="Number of Customers"
        name="numberOfCustomers"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={formData.numberOfCustomers}
        onChange={handleChange}
        error={!!errors.numberOfCustomers}
        helperText={errors.numberOfCustomers}
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
