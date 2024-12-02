import React from 'react';
import { Box, Button } from '@mui/material';
import api from '../services/api';

const ControlPanel = ({ setLogs }) => {
  const handleStart = async () => {
    try {
      await api.startSystem();
      setLogs((prev) => [...prev, 'System started.']);
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${error.message}`]);
    }
  };

  const handleStop = async () => {
    try {
      await api.stopSystem();
      setLogs((prev) => [...prev, 'System stopped.']);
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${error.message}`]);
    }
  };

  return (
    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
      <Button variant="contained" color="success" onClick={handleStart}>
        Start
      </Button>
      <Button variant="contained" color="error" onClick={handleStop}>
        Stop
      </Button>
    </Box>
  );
};

export default ControlPanel;
