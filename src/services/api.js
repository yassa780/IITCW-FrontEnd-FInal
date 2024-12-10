//Base URL for all the API requests
const BASE_URL = 'http://localhost:9095/api';

const api = {
  /**
   * Sends a configuration object to the backend to configure the system
   * @param {Object} config - The configuration data to be sent
   * @returns A JSON response from the backend
   */
  configure: async (config) => {
    const response = await fetch(`${BASE_URL}/config`, {
      method: 'POST', //HTTP POST method for configiguration
      headers: {
        'Content-Type': 'application/json', //This inidicates the JSON content
      },
      body: JSON.stringify(config), //Convert config object to JSON String
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`); //Throws an error for non-OK responses
    }
    return response.json(); //Parse and return JSON response
  },

  /**
   * Sends a request to the backend to start the system.
   */
  startSystem: async () => {
    const response = await fetch(`${BASE_URL}/start`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  },

  /**
   * Sends a request to the backend to stop the system.
   */
  stopSystem: async () => {
    const response = await fetch(`${BASE_URL}/stop`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  },

  /**
   * Sends a request to the backend to clear all logs.
   */
  clearLogs: async () => {
    const response = await fetch(`${BASE_URL}/ logs`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  }
};

export default api;

