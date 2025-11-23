import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getFoodsCollection } from '../db/mongo';
import { authenticateToken, optionalAuth, type AuthRequest } from '../auth';
import { foodSchema } from '../../shared/schema';

const router = Router();

// Get all foods (with optional search and filters)
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const foodsCollection = getFoodsCollection();
    const { search, category, region, limit = '50', skip = '0' } = req.query;
    
    const query: any = {};
    
    // Text search
    if (search) {
      query.$text = { $search: search as string };
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Region filter
    if (region) {
      query.region = region;
    }
    
    // Include system foods and user's custom foods
    if (req.userId) {
      query.$or = [
        { isCustom: false },
        { userId: req.userId }
      ];
    } else {
      query.isCustom = false;
    }
    
    const foods = await foodsCollection
      .find(query)
      .limit(parseInt(limit as string))
      .skip(parseInt(skip as string))
      .toArray();
    
    const total = await foodsCollection.countDocuments(query);
    
    res.json({
      foods,
      total,
      limit: parseInt(limit as string),
      skip: parseInt(skip as string),
    });
  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الأطعمة' });
  }
});

// Get food by ID
router.get('/:id', async (req, res) => {
  try {
    const foodsCollection = getFoodsCollection();
    const food = await foodsCollection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!food) {
      return res.status(404).json({ error: 'الطعام غير موجود' });
    }
    
    res.json(food);
  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الطعام' });
  }
});

// Add custom food (requires authentication)
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const foodsCollection = getFoodsCollection();
    
    const foodData = {
      ...req.body,
      isCustom: true,
      userId: req.userId,
      createdAt: new Date(),
    };
    
    const validatedFood = foodSchema.parse(foodData);
    
    const result = await foodsCollection.insertOne(validatedFood as any);
    
    res.status(201).json({
      success: true,
      message: 'تمت إضافة الطعام بنجاح',
      foodId: result.insertedId,
    });
  } catch (error: any) {
    console.error('Add food error:', error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'بيانات غير صحيحة', details: error.errors });
    }
    
    res.status(500).json({ error: 'حدث خطأ أثناء إضافة الطعام' });
  }
});

// Update custom food
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const foodsCollection = getFoodsCollection();
    const foodId = new ObjectId(req.params.id);
    
    // Check if food exists and belongs to user
    const food = await foodsCollection.findOne({ _id: foodId });
    
    if (!food) {
      return res.status(404).json({ error: 'الطعام غير موجود' });
    }
    
    if (!food.isCustom || food.userId?.toString() !== req.userId?.toString()) {
      return res.status(403).json({ error: 'ليس لديك صلاحية لتعديل هذا الطعام' });
    }
    
    const updates = { ...req.body };
    delete updates._id;
    delete updates.userId;
    delete updates.isCustom;
    
    const result = await foodsCollection.updateOne(
      { _id: foodId },
      { $set: updates }
    );
    
    res.json({
      success: true,
      message: 'تم تحديث الطعام بنجاح',
    });
  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث الطعام' });
  }
});

// Delete custom food
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const foodsCollection = getFoodsCollection();
    const foodId = new ObjectId(req.params.id);
    
    // Check if food exists and belongs to user
    const food = await foodsCollection.findOne({ _id: foodId });
    
    if (!food) {
      return res.status(404).json({ error: 'الطعام غير موجود' });
    }
    
    if (!food.isCustom || food.userId?.toString() !== req.userId?.toString()) {
      return res.status(403).json({ error: 'ليس لديك صلاحية لحذف هذا الطعام' });
    }
    
    await foodsCollection.deleteOne({ _id: foodId });
    
    res.json({
      success: true,
      message: 'تم حذف الطعام بنجاح',
    });
  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء حذف الطعام' });
  }
});

export default router;
