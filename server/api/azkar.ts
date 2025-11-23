import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getAzkarCollection, getAzkarProgressCollection } from '../db/mongo';
import { authenticateToken, optionalAuth, type AuthRequest } from '../auth';

const router = Router();

// Get all azkar (public, no auth required)
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const azkarCollection = getAzkarCollection();
    const { category } = req.query;
    
    const query: any = {};
    if (category) {
      query.category = category;
    }
    
    const azkar = await azkarCollection
      .find(query)
      .sort({ order: 1 })
      .toArray();
    
    res.json({ azkar });
  } catch (error) {
    console.error('Get azkar error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الأذكار' });
  }
});

// Get azkar by ID
router.get('/:id', async (req, res) => {
  try {
    const azkarCollection = getAzkarCollection();
    const dhikr = await azkarCollection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!dhikr) {
      return res.status(404).json({ error: 'الذكر غير موجود' });
    }
    
    res.json(dhikr);
  } catch (error) {
    console.error('Get dhikr error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الذكر' });
  }
});

// Get user's azkar progress for today
router.get('/progress/today', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const azkarProgressCollection = getAzkarProgressCollection();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const progress = await azkarProgressCollection.findOne({
      userId: req.userId,
      date: { $gte: today, $lt: tomorrow },
    });
    
    res.json({ progress: progress || { completed: {}, streak: 0 } });
  } catch (error) {
    console.error('Get azkar progress error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب تقدم الأذكار' });
  }
});

// Update azkar progress
router.post('/progress', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const azkarProgressCollection = getAzkarProgressCollection();
    const { azkarId, completedReps } = req.body;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Find today's progress
    const existingProgress = await azkarProgressCollection.findOne({
      userId: req.userId,
      date: { $gte: today, $lt: tomorrow },
    });
    
    const completedUpdate: any = existingProgress?.completed || {};
    completedUpdate[azkarId] = {
      azkarId: new ObjectId(azkarId),
      completedReps,
      completedAt: new Date(),
    };
    
    const updateData = {
      userId: req.userId!,
      date: today,
      completed: completedUpdate,
      updatedAt: new Date(),
      ...(existingProgress ? {} : { createdAt: new Date(), streak: 0 })
    };
    
    await azkarProgressCollection.updateOne(
      { 
        userId: req.userId,
        date: { $gte: today, $lt: tomorrow },
      },
      { $set: updateData },
      { upsert: true }
    );
    
    const progress = await azkarProgressCollection.findOne({
      userId: req.userId,
      date: { $gte: today, $lt: tomorrow },
    });
    
    res.json({
      success: true,
      message: 'تم تحديث تقدم الأذكار بنجاح',
      progress,
    });
  } catch (error) {
    console.error('Update azkar progress error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث تقدم الأذكار' });
  }
});

// Get user's azkar streak
router.get('/progress/streak', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const azkarProgressCollection = getAzkarProgressCollection();
    
    const progressRecords = await azkarProgressCollection
      .find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(30)
      .toArray();
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < progressRecords.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);
      
      const recordDate = new Date(progressRecords[i].date);
      recordDate.setHours(0, 0, 0, 0);
      
      if (recordDate.getTime() === expectedDate.getTime() && Object.keys(progressRecords[i].completed).length > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    res.json({ streak });
  } catch (error) {
    console.error('Get azkar streak error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب سلسلة الأذكار' });
  }
});

export default router;
