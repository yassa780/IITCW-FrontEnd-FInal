import React, {useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import api from '../services/api';

/**
 * ControlPanel component provides a simple interface to start and stop the system.
 * 
 * @param {Function} setLogs - Function to update logs for user feedback.
 */

const ControlPanel = ({ setLogs, configurationComplete }) => {
  const [systemStarted, setSystemStarted] = useState(false); //State to track if the system is currently started
  
  
  const handleStart = async () => {
    if (!configurationComplete) {
      setLogs((prev) => [...prev, 'Please complete the configuration form before starting the system.']);
      alert('Please complete the configuration form before starting the system.');
      return;
    }


    /**
   * Handles starting the system by calling the API and updating the logs and state.
   */

    try {
      await api.startSystem(); //Calls the API to start the system
      setLogs((prev) => [...prev, 'System started.']); //Log the action
      setSystemStarted(true); //Update state to indicate the system is started
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${error.message}`]);
    }
  };

  /**
   * Handles stopping the system by calling the API and updating the logs and state.
   */
  const handleStop = async () => {
    try {
      await api.stopSystem(); //Calls the API to stop the system
      setLogs((prev) => [...prev, 'System stopped.']); //Logs the action
      setSystemStarted(false); //Update state to indicate the system is stopped
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${error.message}`]); //Log any errors
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
