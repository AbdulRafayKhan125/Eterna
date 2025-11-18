const axios = require('axios');

async function updateAdmin() {
  try {
    const response = await axios.post('http://localhost:3001/api/setup/update-admin', {
      email: 'eternabyayman@eterna.com',
      password: 'eterna@123!'
    });
    
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

updateAdmin();