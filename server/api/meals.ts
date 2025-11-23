import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getMealPlansCollection, getFoodsCollection } from '../db/mongo';
import { authenticateToken, type AuthRequest } from '../auth';

const router = Router();

// Get user's meal plans
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const mealPlansCollection = getMealPlansCollection();
    
    const mealPlans = await mealPlansCollection
      .find({ userId: req.userId })
      .sort({ startDate: -1 })
      .toArray();
    
    res.json({ mealPlans });
  } catch (error) {
    console.error('Get meal plans error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الخطط الغذائية' });
  }
});

// Get specific meal plan
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const mealPlansCollection = getMealPlansCollection();
    const mealPlan = await mealPlansCollection.findOne({
      _id: new ObjectId(req.params.id),
      userId: req.userId,
    });
    
    if (!mealPlan) {
      return res.status(404).json({ error: 'الخطة الغذائية غير موجودة' });
    }
    
    res.json(mealPlan);
  } catch (error) {
    console.error('Get meal plan error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الخطة الغذائية' });
  }
});

// Create new meal plan
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const mealPlansCollection = getMealPlansCollection();
    
    const mealPlan = {
      userId: req.userId!,
      name: req.body.name || 'خطة غذائية جديدة',
      startDate: new Date(req.body.startDate || new Date()),
      duration: req.body.duration || 30,
      dailyPlans: req.body.dailyPlans || {},
      isTemplate: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await mealPlansCollection.insertOne(mealPlan);
    
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الخطة الغذائية بنجاح',
      mealPlanId: result.insertedId,
    });
  } catch (error) {
    console.error('Create meal plan error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء إنشاء الخطة الغذائية' });
  }
});

// Update meal plan
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const mealPlansCollection = getMealPlansCollection();
    const mealPlanId = new ObjectId(req.params.id);
    
    // Check ownership
    const mealPlan = await mealPlansCollection.findOne({
      _id: mealPlanId,
      userId: req.userId,
    });
    
    if (!mealPlan) {
      return res.status(404).json({ error: 'الخطة الغذائية غير موجودة' });
    }
    
    const updates = { ...req.body };
    delete updates._id;
    delete updates.userId;
    updates.updatedAt = new Date();
    
    await mealPlansCollection.updateOne(
      { _id: mealPlanId },
      { $set: updates }
    );
    
    res.json({
      success: true,
      message: 'تم تحديث الخطة الغذائية بنجاح',
    });
  } catch (error) {
    console.error('Update meal plan error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث الخطة الغذائية' });
  }
});

// Delete meal plan
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const mealPlansCollection = getMealPlansCollection();
    const mealPlanId = new ObjectId(req.params.id);
    
    const result = await mealPlansCollection.deleteOne({
      _id: mealPlanId,
      userId: req.userId,
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'الخطة الغذائية غير موجودة' });
    }
    
    res.json({
      success: true,
      message: 'تم حذف الخطة الغذائية بنجاح',
    });
  } catch (error) {
    console.error('Delete meal plan error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء حذف الخطة الغذائية' });
  }
});

// Add meal to specific day
router.post('/:id/day/:dayNumber/meal', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const mealPlansCollection = getMealPlansCollection();
    const foodsCollection = getFoodsCollection();
    const mealPlanId = new ObjectId(req.params.id);
    const dayNumber = parseInt(req.params.dayNumber);
    
    // Check ownership
    const mealPlan = await mealPlansCollection.findOne({
      _id: mealPlanId,
      userId: req.userId,
    });
    
    if (!mealPlan) {
      return res.status(404).json({ error: 'الخطة الغذائية غير موجودة' });
    }
    
    const { mealType, foodId, quantity } = req.body; // mealType: breakfast, lunch, dinner, snacks
    
    // Get food details
    const food = await foodsCollection.findOne({ _id: new ObjectId(foodId) });
    if (!food) {
      return res.status(404).json({ error: 'الطعام غير موجود' });
    }
    
    // Calculate nutritional values for the quantity
    const multiplier = quantity / 100; // food values are per 100g
    const mealItem = {
      foodId: new ObjectId(foodId),
      foodName: food.name,
      quantity,
      calories: food.calories * multiplier,
      protein: food.protein * multiplier,
      carbs: food.carbs * multiplier,
      fat: food.fat * multiplier,
    };
    
    // Initialize daily plan if it doesn't exist
    if (!mealPlan.dailyPlans[dayNumber]) {
      mealPlan.dailyPlans[dayNumber] = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
        totals: { calories: 0, protein: 0, carbs: 0, fat: 0, cost: 0 },
      };
    }
    
    // Add meal item to the appropriate meal type
    const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];
    if (!validMealTypes.includes(mealType)) {
      return res.status(400).json({ error: 'نوع الوجبة غير صحيح' });
    }
    
    if (!mealPlan.dailyPlans[dayNumber][mealType as keyof typeof mealPlan.dailyPlans[typeof dayNumber]]) {
      (mealPlan.dailyPlans[dayNumber] as any)[mealType] = [];
    }
    (mealPlan.dailyPlans[dayNumber] as any)[mealType].push(mealItem);
    
    // Recalculate totals
    const dailyPlan = mealPlan.dailyPlans[dayNumber];
    const allMeals = [
      ...(dailyPlan.breakfast || []),
      ...(dailyPlan.lunch || []),
      ...(dailyPlan.dinner || []),
      ...(dailyPlan.snacks || []),
    ];
    
    dailyPlan.totals = {
      calories: allMeals.reduce((sum, item) => sum + item.calories, 0),
      protein: allMeals.reduce((sum, item) => sum + item.protein, 0),
      carbs: allMeals.reduce((sum, item) => sum + item.carbs, 0),
      fat: allMeals.reduce((sum, item) => sum + item.fat, 0),
      cost: allMeals.reduce((sum, item) => sum + (food.cost * item.quantity / 100), 0),
    };
    
    await mealPlansCollection.updateOne(
      { _id: mealPlanId },
      { 
        $set: { 
          dailyPlans: mealPlan.dailyPlans,
          updatedAt: new Date(),
        }
      }
    );
    
    res.json({
      success: true,
      message: 'تمت إضافة الوجبة بنجاح',
      dailyPlan: mealPlan.dailyPlans[dayNumber],
    });
  } catch (error) {
    console.error('Add meal error:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء إضافة الوجبة' });
  }
});

export default router;
