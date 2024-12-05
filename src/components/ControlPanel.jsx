import React, {useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import api from '../services/api';

const ControlPanel = ({ setLogs }) => {
  const [systemStarted, setSystemStarted] = useState(false); //State to track if the system is started
  const handleStart = async () => {
    try {
      await api.startSystem();
      setLogs((prev) => [...prev, 'System started.']);
      setSystemStarted(true); //Update state to indicate the system is started
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${error.message}`]);
    }
  };

  const handleStop = async () => {
    try {
      await api.stopSystem();
      setLogs((prev) => [...prev, 'System stopped.']);
      setSystemStarted(false); //Update state to indicate the system is stopped
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${error.message}`]);
    }
  };

  return (
<Box sx={{ mt: 4, textAlign: 'center' }}>
      {/* Add a title */}
      <Typography variant="h5" sx={{ mb: 4, fontWeight:'bold' }}>
        Control Panel
      </Typography>

      {/* Buttons for controlling the system */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: systemStarted ? 'center' : 'space-between' }}>
        {!systemStarted && (
          <Button variant="contained" color="success" onClick={handleStart}>
            Start
          </Button>
        )}
        {systemStarted && (
          <Button variant="contained" color="error" onClick={handleStop}>
            Stop
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ControlPanel;
