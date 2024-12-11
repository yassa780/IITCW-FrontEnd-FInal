import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../services/api';

/**
 * ConfigurationForm component handles the input form for configuring the system.
 * It validates user input and sends the configuration data to the server.
 *
 * @param {Function} setTickets - Function to update the available tickets.
 * @param {Function} setLogs - Function to update the logs.
 */

const ConfigurationForm = ({ setTickets, setLogs, setConfigurationComplete }) => {
  //State to manage form data
  const [formData, setFormData] = useState({
    eventName: '',
    totalTickets: '',
    ticketReleaseRate: '',
    customerRetrievalRate: '',
    maxTicketCapacity: '',
    numberOfVendors: '', 
    numberOfCustomers: '', 
  });

  //State to validate errors
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // This clears the errors for the current field if valid
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : prevErrors[name],
    }));
  };

  //Validate the form and handle submission
  const handleSubmit = async () => {
    const newErrors = {};

    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });

    // Validate Event Name
    if (formData.eventName && !isNaN(formData.eventName)) {
      newErrors.eventName = 'The event Name cant be integers .';
    }

    // Validate numeric fields
    const numericFields = [
      'totalTickets',
      'ticketReleaseRate',
      'customerRetrievalRate',
      'maxTicketCapacity',
      'numberOfVendors',
      'numberOfCustomers',
    ];

    numericFields.forEach((field) => {
      const value = parseInt(formData[field], 10);
      if (formData[field] && isNaN(value)) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} must be a number.`;
      } else if (value < 0) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} cannot be negative.`;
      }
    });
  

    // Validate total tickets and maxTicketCapacity
    const totalTickets = parseInt(formData.totalTickets, 10);
    const maxTicketCapacity = parseInt(formData.maxTicketCapacity, 10);

    if (!isNaN(totalTickets) && !isNaN(maxTicketCapacity)) {
      if (totalTickets <= maxTicketCapacity) {
        newErrors.totalTickets = 'Total tickets must be greater than maximum capacity.';
      }
    }

    //If there are validation errors, update state and log an error
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLogs((prev) => [...prev, 'Please fix the errors before submitting.']);
      setConfigurationComplete(false);
      return;
    }

    //Proceed to send data to the server
    try {
      const response = await api.configure(formData);
      setLogs((prev) => [...prev, 'System configured successfully.']);
      setTickets(response.ticketsAvailable);
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${error.message}`]);
      setConfigurationComplete(false);
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
