import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const LogDisplay = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch logs from the backend
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:9095/api/logs'); // Adjust the URL as per your backend
      if (!response.ok) {
        throw new Error(`Error fetching logs: ${response.statusText}`);
      }
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Automatically fetch logs on component mount
  useEffect(() => {
    fetchLogs();
    // Optionally refresh logs every 5 seconds
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Logs</Typography>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={fetchLogs} 
        sx={{ mb: 2 }}
      >
        Refresh Logs
      </Button>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
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
  );
};

export default LogDisplay;
