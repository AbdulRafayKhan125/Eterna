import axios from 'axios';

async function testMockLogin() {
  console.log('Testing login with mock admin credentials...');
  
  try {
    const response = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'eternabyayman@eterna.com',
      password: 'eterna@123!'
    });
    
    console.log('✅ Login successful!');
    console.log('Response:', response.data);
    
    // Test token verification
    if (response.data.token) {
      console.log('\nTesting token verification...');
      try {
        const verifyResponse = await axios.get('http://localhost:3001/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${response.data.token}`
          }
        });
        
        console.log('✅ Token verification successful!');
        console.log('Verify Response:', verifyResponse.data);
      } catch (verifyError) {
        console.error('❌ Token verification failed:', verifyError.response?.data || verifyError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    
    // Try old credentials as fallback
    console.log('\nTrying old credentials as fallback...');
    try {
      const oldResponse = await axios.post('http://localhost:3001/api/auth/login', {
        email: 'admin@eterna.com',
        password: 'admin123'
      });
      
      console.log('✅ Old credentials work:', oldResponse.data);
    } catch (oldError) {
      console.error('❌ Old credentials also failed:', oldError.response?.data || oldError.message);
    }
  }
}

testMockLogin();