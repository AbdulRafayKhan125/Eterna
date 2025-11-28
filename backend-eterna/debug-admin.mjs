import axios from 'axios';

async function checkCurrentAdmin() {
  try {
    // First, let's try to create a new admin user directly
    console.log('Attempting to create/update admin user...');
    
    const response = await axios.post('http://localhost:3001/api/setup/update-admin', {
      email: 'eternabyayman@eterna.com',
      password: 'eterna@123!'
    });
    
    console.log('Setup Response:', response.data);
    
    if (response.data.success) {
      console.log('✅ Admin credentials updated successfully!');
      console.log('Testing login with new credentials...');
      
      // Now test the login
      try {
        const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
          email: 'eternabyayman@eterna.com',
          password: 'eterna@123!'
        });
        
        console.log('✅ Login successful:', loginResponse.data);
      } catch (loginError) {
        console.error('❌ Login failed:', loginError.response?.data || loginError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error.response?.data || error.message);
    
    // If setup failed, let's try the old credentials
    console.log('Testing with old credentials...');
    try {
      const oldResponse = await axios.post('http://localhost:3001/api/auth/login', {
        email: 'admin@eterna.com',
        password: 'admin123'
      });
      
      console.log('✅ Old credentials still work:', oldResponse.data);
      console.log('The admin update might not have been applied yet.');
      
    } catch (oldError) {
      console.error('❌ Old credentials also failed:', oldError.response?.data || oldError.message);
      console.log('There might be a database connection issue.');
    }
  }
}

checkCurrentAdmin();