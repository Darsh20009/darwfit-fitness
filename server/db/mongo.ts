import { MongoClient, Db, Collection } from 'mongodb';
import type {
  User,
  UserProfile,
  Food,
  Exercise,
  UserMealPlan,
  UserWorkoutPlan,
  DailyProgress,
  Azkar,
  UserAzkarProgress
} from '../../shared/schema';

let client: MongoClient | null = null;
let db: Db | null = null;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'darwfit';

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    console.log(`📍 Attempting to connect to MongoDB: ${MONGODB_URI}`);
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await client.connect();
    db = client.db(DB_NAME);
    
    console.log(`✅ Connected to MongoDB database: ${DB_NAME}`);
    
    // Create indexes for better performance (non-blocking)
    createIndexes().catch(() => {
      console.log('⚠️ Indexes creation skipped (may require additional permissions)');
    });
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    
    // If in production and MongoDB is not available, provide graceful warning
    if (process.env.NODE_ENV === 'production') {
      console.log('⚠️ MongoDB is not available in production.');
      console.log('📌 To fix this, set MONGODB_URI environment variable on your hosting platform.');
      console.log('💡 Recommended: Use MongoDB Atlas (free tier) - https://mongodb.com/cloud/atlas');
      console.log('📝 Steps:');
      console.log('   1. Create account on MongoDB Atlas');
      console.log('   2. Create a cluster (free tier available)');
      console.log('   3. Get connection string');
      console.log('   4. Add MONGODB_URI to your production environment variables');
    }
    
    throw error;
  }
}

async function createIndexes() {
  if (!db) return;

  try {
    // User indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('userProfiles').createIndex({ userId: 1 });
    
    // Food indexes
    await db.collection('foods').createIndex({ name: 'text', nameEn: 'text' });
    await db.collection('foods').createIndex({ category: 1, region: 1 });
    await db.collection('foods').createIndex({ userId: 1 }, { sparse: true }); // For custom foods
    
    // Exercise indexes
    await db.collection('exercises').createIndex({ name: 'text', nameEn: 'text' });
    await db.collection('exercises').createIndex({ category: 1, difficulty: 1 });
    await db.collection('exercises').createIndex({ userId: 1 }, { sparse: true }); // For custom exercises
    
    // Meal plan indexes
    await db.collection('mealPlans').createIndex({ userId: 1, isActive: 1 });
    await db.collection('mealPlans').createIndex({ startDate: 1 });
    
    // Workout plan indexes
    await db.collection('workoutPlans').createIndex({ userId: 1, isActive: 1 });
    await db.collection('workoutPlans').createIndex({ startDate: 1 });
    
    // Progress indexes
    await db.collection('progress').createIndex({ userId: 1, date: -1 });
    
    // Azkar indexes
    await db.collection('azkar').createIndex({ category: 1, order: 1 });
    await db.collection('azkarProgress').createIndex({ userId: 1, date: -1 });
    
    console.log('✅ Database indexes created');
  } catch (error) {
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('✅ MongoDB connection closed');
  }
}

// Collection getters
export function getDatabase(): Db {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export function getUsersCollection(): Collection<User> {
  return getDatabase().collection<User>('users');
}

export function getUserProfilesCollection(): Collection<UserProfile> {
  return getDatabase().collection<UserProfile>('userProfiles');
}

export function getFoodsCollection(): Collection<Food> {
  return getDatabase().collection<Food>('foods');
}

export function getExercisesCollection(): Collection<Exercise> {
  return getDatabase().collection<Exercise>('exercises');
}

export function getMealPlansCollection(): Collection<UserMealPlan> {
  return getDatabase().collection<UserMealPlan>('mealPlans');
}

export function getWorkoutPlansCollection(): Collection<UserWorkoutPlan> {
  return getDatabase().collection<UserWorkoutPlan>('workoutPlans');
}

export function getProgressCollection(): Collection<DailyProgress> {
  return getDatabase().collection<DailyProgress>('progress');
}

export function getAzkarCollection(): Collection<Azkar> {
  return getDatabase().collection<Azkar>('azkar');
}

export function getAzkarProgressCollection(): Collection<UserAzkarProgress> {
  return getDatabase().collection<UserAzkarProgress>('azkarProgress');
}

// Health check
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    if (!db) {
      await connectToDatabase();
    }
    await db!.admin().ping();
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
