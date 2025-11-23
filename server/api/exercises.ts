import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getExercisesCollection } from '../db/mongo';
import { authenticateToken, optionalAuth, type AuthRequest } from '../auth';
import { exerciseSchema } from '../../shared/schema';

const router = Router();

// Get all exercises (with optional search and filters)
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const exercisesCollection = getExercisesCollection();
    const { search, category, difficulty, location, limit = '50', skip = '0' } = req.query;
    
    const query: any = {};
    
    // Text search
    if (search) {
      query.$text = { $search: search as string };
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Difficulty filter
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    // Location filter
    if (location) {
      query.location = location;
    }
    
    // Include system exercises and user's custom exercises
    if (req.userId) {
      query.$or = [
        { isCustom: false },
        { userId: req.userId }
      ];
    } else {
      query.isCustom = false;
    }
    
    const exercises = await exercisesCollection
      .find(query)
      .limit(parseInt(limit as string))
      .skip(parseInt(skip as string))
      .toArray();
    
    const total = await exercisesCollection.countDocuments(query);
    
    res.json({
      exercises,
      total,
      limit: parseInt(limit as string),
      skip: parseInt(skip as string),
    });
  } catch (error) {
    console.error('Get exercises error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب التمارين' });
  }
});

// Get exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercisesCollection = getExercisesCollection();
    const exercise = await exercisesCollection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!exercise) {
      return res.status(404).json({ error: 'التمرين غير موجود' });
    }
    
    res.json(exercise);
  } catch (error) {
    console.error('Get exercise error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب التمرين' });
  }
});

// Add custom exercise (requires authentication)
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const exercisesCollection = getExercisesCollection();
    
    const exerciseData = {
      ...req.body,
      isCustom: true,
      userId: req.userId,
      createdAt: new Date(),
    };
    
    const validatedExercise = exerciseSchema.parse(exerciseData);
    
    const result = await exercisesCollection.insertOne(validatedExercise as any);
    
    res.status(201).json({
      success: true,
      message: 'تمت إضافة التمرين بنجاح',
      exerciseId: result.insertedId,
    });
  } catch (error: any) {
    console.error('Add exercise error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'بيانات غير صحيحة', details: error.errors });
    }
    
    res.status(500).json({ error: 'حدث خطأ أثناء إضافة التمرين' });
  }
});

// Update custom exercise
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const exercisesCollection = getExercisesCollection();
    const exerciseId = new ObjectId(req.params.id);
    
    // Check if exercise exists and belongs to user
    const exercise = await exercisesCollection.findOne({ _id: exerciseId });
    
    if (!exercise) {
      return res.status(404).json({ error: 'التمرين غير موجود' });
    }
    
    if (!exercise.isCustom || exercise.userId?.toString() !== req.userId?.toString()) {
      return res.status(403).json({ error: 'ليس لديك صلاحية لتعديل هذا التمرين' });
    }
    
    const updates = { ...req.body };
    delete updates._id;
    delete updates.userId;
    delete updates.isCustom;
    
    await exercisesCollection.updateOne(
      { _id: exerciseId },
      { $set: updates }
    );
    
    res.json({
      success: true,
      message: 'تم تحديث التمرين بنجاح',
    });
  } catch (error) {
    console.error('Update exercise error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث التمرين' });
  }
});

// Delete custom exercise
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const exercisesCollection = getExercisesCollection();
    const exerciseId = new ObjectId(req.params.id);
    
    // Check if exercise exists and belongs to user
    const exercise = await exercisesCollection.findOne({ _id: exerciseId });
    
    if (!exercise) {
      return res.status(404).json({ error: 'التمرين غير موجود' });
    }
    
    if (!exercise.isCustom || exercise.userId?.toString() !== req.userId?.toString()) {
      return res.status(403).json({ error: 'ليس لديك صلاحية لحذف هذا التمرين' });
    }
    
    await exercisesCollection.deleteOne({ _id: exerciseId });
    
    res.json({
      success: true,
      message: 'تم حذف التمرين بنجاح',
    });
  } catch (error) {
    console.error('Delete exercise error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء حذف التمرين' });
  }
});

export default router;
