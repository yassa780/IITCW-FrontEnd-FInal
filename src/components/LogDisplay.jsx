import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const LogDisplay = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch logs from the backend
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:9095/api/logs'); // URL of the backend for log fetch
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
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Box
        sx={{
          maxHeight: 700, // Fixed height for the scrollable area
          overflow: 'auto', // Enables scrolling within this box
          border: '1px solid #ccc', // Optional: Add a border for clarity
          borderRadius: 2, // Optional: Add rounded corners
          padding: 2, // Add padding for better readability
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for WebKit browsers
          },
          '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer
          'scrollbar-width': 'none', // Hide scrollbar for Firefo
        }}
      >
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
