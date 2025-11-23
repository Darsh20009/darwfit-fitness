import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getWorkoutPlansCollection, getExercisesCollection } from '../db/mongo';
import { authenticateToken, type AuthRequest } from '../auth';

const router = Router();

// Get user's workout plans
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const workoutPlansCollection = getWorkoutPlansCollection();
    
    const workoutPlans = await workoutPlansCollection
      .find({ userId: req.userId })
      .sort({ startDate: -1 })
      .toArray();
    
    res.json({ workoutPlans });
  } catch (error) {
    console.error('Get workout plans error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب خطط التمارين' });
  }
});

// Get specific workout plan
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const workoutPlansCollection = getWorkoutPlansCollection();
    const workoutPlan = await workoutPlansCollection.findOne({
      _id: new ObjectId(req.params.id),
      userId: req.userId,
    });
    
    if (!workoutPlan) {
      return res.status(404).json({ error: 'خطة التمرين غير موجودة' });
    }
    
    res.json(workoutPlan);
  } catch (error) {
    console.error('Get workout plan error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب خطة التمرين' });
  }
});

// Create new workout plan
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const workoutPlansCollection = getWorkoutPlansCollection();
    
    const workoutPlan = {
      userId: req.userId!,
      name: req.body.name || 'خطة تمارين جديدة',
      startDate: new Date(req.body.startDate || new Date()),
      duration: req.body.duration || 30,
      weeklySchedule: req.body.weeklySchedule || [],
      isTemplate: false,
      isActive: true,
      difficulty: req.body.difficulty || 'beginner',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await workoutPlansCollection.insertOne(workoutPlan);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء خطة التمارين بنجاح',
      workoutPlanId: result.insertedId,
    });
  } catch (error) {
    console.error('Create workout plan error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء إنشاء خطة التمارين' });
  }
});

// Update workout plan
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const workoutPlansCollection = getWorkoutPlansCollection();
    const workoutPlanId = new ObjectId(req.params.id);
    
    // Check ownership
    const workoutPlan = await workoutPlansCollection.findOne({
      _id: workoutPlanId,
      userId: req.userId,
    });
    
    if (!workoutPlan) {
      return res.status(404).json({ error: 'خطة التمرين غير موجودة' });
    }
    
    const updates = { ...req.body };
    delete updates._id;
    delete updates.userId;
    updates.updatedAt = new Date();
    
    await workoutPlansCollection.updateOne(
      { _id: workoutPlanId },
      { $set: updates }
    );
    
    res.json({
      success: true,
      message: 'تم تحديث خطة التمارين بنجاح',
    });
  } catch (error) {
    console.error('Update workout plan error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث خطة التمارين' });
  }
});

// Delete workout plan
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const workoutPlansCollection = getWorkoutPlansCollection();
    const workoutPlanId = new ObjectId(req.params.id);
    
    const result = await workoutPlansCollection.deleteOne({
      _id: workoutPlanId,
      userId: req.userId,
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'خطة التمرين غير موجودة' });
    }
    
    res.json({
      success: true,
      message: 'تم حذف خطة التمارين بنجاح',
    });
  } catch (error) {
    console.error('Delete workout plan error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء حذف خطة التمارين' });
  }
});

export default router;
