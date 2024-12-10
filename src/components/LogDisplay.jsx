import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import api from '../services/api';

/**
 * LogDisplay component fetches and displays logs from the backend.
 * It also provides functionality to clear logs.
 */
const LogDisplay = () => {
  //State to store logs fetched from the backend
  const [logs, setLogs] = useState([]);

  //State to store any error messages
  const [error, setError] = useState(null);
  
  /**
   * Fetches logs from the backend and updates the state.
   * Displays an error if the fetch operation fails.
   */
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:9095/api/logs'); // URL of the backend for log fetch
      if (!response.ok) {
        throw new Error(`Error fetching logs: ${response.statusText}`);
      }
      const data = await response.json();
      setLogs(data);
      setError(null);//Clears the error state after a successful fetch
    } catch (err) {
      setError(err.message);
    }
  };

  //Clear logs from the backend and updates the state
  const clearLogs = async () => {
    try {
      const response = await fetch('http://localhost:9095/api/logs', {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error clearing logs: ${response.statusText}`);
      }
      
      setLogs([]); //Clear logs in the frontend state
      
    } catch (err) {
      setError(err.message); //Set error message in state
    }
  };

  /**
   * Renders the list of logs
   * Displays "No logs found" if the log array is empty */ 
  const renderLogs = () => (
    <List>
      {logs.length > 0? (
        logs.map((log, index) => (
          <ListItem key={index}>
            <ListItemText primary={log} />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No logs found." />
        </ListItem>
      )}
    </List>
  );


// Fetch logs when the component is mounted an set up periodic refresh
  useEffect(() => {
    fetchLogs(); //fetches the logs intially

    // Optionally refresh logs every second
    const interval = setInterval(fetchLogs, 1000); //Refreshes logs ever second
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

      //Clear logs and fetch logs when the component is mounted
      useEffect(() => {
        clearLogs();
        fetchLogs();
      }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Logs</Typography>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Box
        sx={{
          maxHeight: 700, 
          overflow: 'auto', // Enables scrolling within this box
          border: '1px solid #ccc', // Adds a border for clarity
          borderRadius: 2, 
          padding: 2, 
          '&::-webkit-scrollbar': {
            display: 'none', // Hides scrollbar
          }
        }}
      >
        {/* Render the list of logs */}
        <List>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <ListItem key={index}>
                <ListItemText primary={log} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No logs available.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default LogDisplay;
