import { Router } from 'express';
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
      return res.status(400).json({ error: 'البريد الإلكتروني مستخدم بالفعل' });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);
    
    // Create user in memory
    users[normalizedEmail] = {
      email: normalizedEmail,
      password: hashedPassword,
      name: validatedData.name,
      createdAt: new Date(),
    };
    
    // Generate token
    const token = generateToken({ email: normalizedEmail, name: validatedData.name });
    
    return res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      token,
      user: {
        email: normalizedEmail,
        name: validatedData.name,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'حدث خطأ أثناء إنشاء الحساب' });
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
      return res.status(401).json({ error: 'بيانات دخول غير صحيحة' });
    }
    
    // Compare password
    const passwordMatch = await comparePassword(validatedData.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'بيانات دخول غير صحيحة' });
    }
    
    // Generate token
    const token = generateToken({ email: normalizedEmail, name: user.name });
    
    return res.json({
      success: true,
      token,
      user: {
        email: normalizedEmail,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'حدث خطأ أثناء تسجيل الدخول' });
  }
});

// Get current user (requires token)
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'غير مصرح' });
    }
    
    // In a real app, you'd verify the token here
    // For now, just return a success
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'خطأ في التحقق' });
  }
});

export default router;
