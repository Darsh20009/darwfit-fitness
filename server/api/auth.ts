import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { hashPassword, comparePassword, generateToken } from '../auth';
import { loginSchema, registerSchema } from '../../shared/schema';

const router = Router();

// In-memory user storage as fallback
const users: Record<string, any> = {};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    const normalizedEmail = validatedData.email.toLowerCase().trim();
    
    // Check if user already exists
    if (users[normalizedEmail]) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);
    
    // Generate unique MongoDB-compatible userId
    const userId = new ObjectId();
    
    // Create user in memory
    users[normalizedEmail] = {
      userId: userId.toString(),
      email: normalizedEmail,
      password: hashedPassword,
      name: validatedData.name,
      createdAt: new Date(),
    };
    
    // Generate token with userId
    const token = generateToken({ 
      userId: userId.toString(),
      email: normalizedEmail, 
      name: validatedData.name 
    });
    
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        userId: userId.toString(),
        email: normalizedEmail,
        name: validatedData.name,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Error creating account' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    const normalizedEmail = validatedData.email.toLowerCase().trim();
    
    // Find user
    const user = users[normalizedEmail];
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Compare password
    const passwordMatch = await comparePassword(validatedData.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token with userId
    const token = generateToken({ 
      userId: user.userId,
      email: normalizedEmail, 
      name: user.name 
    });
    
    return res.json({
      success: true,
      token,
      user: {
        userId: user.userId,
        email: normalizedEmail,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Error during login' });
  }
});

// Get current user (requires token)
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // In a real app, you'd verify the token here
    // For now, just return a success
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Verification error' });
  }
});

export default router;
