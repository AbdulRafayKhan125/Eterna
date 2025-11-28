import axios from 'axios';

async function testLogin() {
  try {
    console.log('Testing login with new credentials...');
    const response = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'eternabyayman@eterna.com',
      password: 'eterna@123!'
    });
    
    console.log('Login Success:', response.data);
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.log('Testing with old credentials to check if admin exists...');
      try {
        const oldResponse = await axios.post('http://localhost:3001/api/auth/login', {
          email: 'admin@eterna.com',
          password: 'admin123'
        });
        console.log('Old credentials still work:', oldResponse.data);
      } catch (oldError) {
        console.error('Old credentials also failed:', oldError.response?.data || oldError.message);
      }
    }
  }
}

testLogin();