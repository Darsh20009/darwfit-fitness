import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getUsersCollection, getUserProfilesCollection } from '../db/mongo';
import { hashPassword, comparePassword, generateToken, authenticateToken, type AuthRequest } from '../auth';
import { loginSchema, registerSchema, calculateBMR, calculateTDEE, calculateTargetCalories, calculateMacros } from '../../shared/schema';

const router = Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);
    
    const usersCollection = getUsersCollection();
    const profilesCollection = getUserProfilesCollection();
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ error: 'البريد الإلكتروني مستخدم بالفعل' });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);
    
    // Create user
    const userResult = await usersCollection.insertOne({
      email: validatedData.email,
      password: hashedPassword,
      name: validatedData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    const userId = userResult.insertedId;
    
    // Calculate nutritional metrics
    const bmr = calculateBMR(validatedData.weight, validatedData.height, validatedData.age, validatedData.gender);
    const tdee = calculateTDEE(bmr, validatedData.activityLevel);
    const targetCalories = calculateTargetCalories(tdee, validatedData.primaryGoal);
    const macros = calculateMacros(targetCalories, validatedData.primaryGoal);
    
    // Create user profile
    await profilesCollection.insertOne({
      userId,
      age: validatedData.age,
      gender: validatedData.gender,
      height: validatedData.height,
      weight: validatedData.weight,
      primaryGoal: validatedData.primaryGoal,
      activityLevel: validatedData.activityLevel,
      budget: validatedData.budget,
      
      // Default values
      timeFrame: 90,
      sleepHours: 8,
      experienceLevel: 'beginner',
      workoutPreference: 'home',
      dailyExerciseTime: 30,
      exerciseFrequency: 5,
      mealFrequency: 3,
      cookingSkill: 'beginner',
      cookingTime: 30,
      preferredFoods: [],
      dislikedFoods: [],
      allergies: [],
      injuries: [],
      region: 'saudi',
      culture: 'arabic',
      religion: 'islam',
      ramadanMode: false,
      
      // Calculated metrics
      bmr,
      tdee,
      targetCalories,
      targetProtein: macros.protein,
      targetCarbs: macros.carbs,
      targetFat: macros.fat,
      
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Generate JWT token
    const token = generateToken({
      userId: userId.toString(),
      email: validatedData.email,
    });
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      token,
      user: {
        id: userId,
        email: validatedData.email,
        name: validatedData.name,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'بيانات غير صحيحة', details: error.errors });
    }
    
    res.status(500).json({ error: 'حدث خطأ أثناء إنشاء الحساب' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);
    
    const usersCollection = getUsersCollection();
    
    // Find user
    const user = await usersCollection.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    
    // Check password
    const isPasswordValid = await comparePassword(validatedData.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id!.toString(),
      email: user.email,
    });
    
    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'بيانات غير صحيحة', details: error.errors });
    }
    
    res.status(500).json({ error: 'حدث خطأ أثناء تسجيل الدخول' });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const usersCollection = getUsersCollection();
    const profilesCollection = getUserProfilesCollection();
    
    const user = await usersCollection.findOne(
      { _id: req.userId },
      { projection: { password: 0 } } // Exclude password
    );
    
    if (!user) {
      return res.status(404).json({ error: 'المستخدم غير موجود' });
    }
    
    const profile = await profilesCollection.findOne({ userId: req.userId });
    
    res.json({
      user,
      profile,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب بيانات المستخدم' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const profilesCollection = getUserProfilesCollection();
    
    const updates = { ...req.body };
    delete updates._id;
    delete updates.userId;
    
    // Recalculate metrics if relevant fields changed
    if (updates.weight || updates.height || updates.age || updates.gender || 
        updates.activityLevel || updates.primaryGoal) {
      
      const currentProfile = await profilesCollection.findOne({ userId: req.userId });
      if (currentProfile) {
        const weight = updates.weight || currentProfile.weight;
        const height = updates.height || currentProfile.height;
        const age = updates.age || currentProfile.age;
        const gender = updates.gender || currentProfile.gender;
        const activityLevel = updates.activityLevel || currentProfile.activityLevel;
        const primaryGoal = updates.primaryGoal || currentProfile.primaryGoal;
        
        const bmr = calculateBMR(weight, height, age, gender);
        const tdee = calculateTDEE(bmr, activityLevel);
        const targetCalories = calculateTargetCalories(tdee, primaryGoal);
        const macros = calculateMacros(targetCalories, primaryGoal);
        
        updates.bmr = bmr;
        updates.tdee = tdee;
        updates.targetCalories = targetCalories;
        updates.targetProtein = macros.protein;
        updates.targetCarbs = macros.carbs;
        updates.targetFat = macros.fat;
      }
    }
    
    updates.updatedAt = new Date();
    
    const result = await profilesCollection.updateOne(
      { userId: req.userId },
      { $set: updates }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'الملف الشخصي غير موجود' });
    }
    
    const updatedProfile = await profilesCollection.findOne({ userId: req.userId });
    
    res.json({
      success: true,
      message: 'تم تحديث الملف الشخصي بنجاح',
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث الملف الشخصي' });
  }
});

export default router;
