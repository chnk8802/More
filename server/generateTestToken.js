import jwt from 'jsonwebtoken';

// Generate a test token using the secret from .env
const generateTestToken = () => {
  // Test user data (matches the static user in AuthContext)
  const testUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'admin'
  };

  // JWT secret from .env file
  const secret = 'supersecretkeyMrmApp123!';

  // Generate token with 7 days expiration
  const token = jwt.sign({ id: testUser.id, role: testUser.role }, secret, {
    expiresIn: '7d'
  });

  console.log('Generated Test Token:', token);
  console.log('Expires in:', '7 days');
  console.log('User Data:', testUser);

  return token;
};

// Generate and log the token
generateTestToken();
