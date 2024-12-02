const BASE_URL = 'http://localhost:9095/api';

const api = {
  configure: async (config) => {
    const response = await fetch(`${BASE_URL}/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  },
  startSystem: async () => {
    const response = await fetch(`${BASE_URL}/start`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  },
  stopSystem: async () => {
    const response = await fetch(`${BASE_URL}/stop`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  },
};

export default api;
