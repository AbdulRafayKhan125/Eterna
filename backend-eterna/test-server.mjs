import axios from 'axios';

async function testServer() {
  console.log('Testing server connectivity...');
  
  try {
    // Test basic server connectivity
    const healthResponse = await axios.get('http://localhost:3001');
    console.log('✅ Server is running:', healthResponse.status);
    console.log('Health response:', healthResponse.data);
  } catch (error) {
    console.error('❌ Server connection failed:', error.message);
    
    // Try to get more details about the error
    if (error.code === 'ECONNREFUSED') {
      console.log('Server is not accepting connections on port 3001');
    } else if (error.code === 'ECONNRESET') {
      console.log('Connection was reset - server might be crashing');
    }
  }
  
  // Test login endpoint specifically
  console.log('\nTesting login endpoint...');
  try {
    const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'eternabyayman@eterna.com',
      password: 'eterna@123!'
    }, {
      timeout: 5000 // 5 second timeout
    });
    
    console.log('✅ Login endpoint responded:', loginResponse.status);
    console.log('Login response:', loginResponse.data);
  } catch (error) {
    console.error('❌ Login endpoint failed:', error.message);
    if (error.response) {
      console.log('Error response status:', error.response.status);
      console.log('Error response data:', error.response.data);
    }
  }
}

testServer();