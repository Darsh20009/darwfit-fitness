export interface ClientProfile {
  id: string;
  name: string;
  username: string;
  password: string;
  subscriptionId: string;
  subscriptionEndDate: string;
  workoutPlanId: string;
  mealPlanId: string;
  personalInfo: {
    age?: number;
    gender?: 'male' | 'female';
    weight?: number;
    height?: number;
    goal?: string;
    activityLevel?: string;
  };
}

// قاعدة بيانات العملاء
export const CLIENT_PROFILES: ClientProfile[] = [
  {
    id: "client_001",
    name: "محمد السهلي",
    username: "محمد السهلي",
    password: "123456",
    subscriptionId: "5001",
    subscriptionEndDate: "", // سيتم حسابه ديناميكياً
    workoutPlanId: "beginner_plan",
    mealPlanId: "weight_loss_plan",
    personalInfo: {
      age: 30,
      gender: 'male',
      weight: 85,
      height: 175,
      goal: 'weight_loss',
      activityLevel: 'moderate'
    }
  },
  {
    id: "client_002", 
    name: "أحمد علي",
    username: "أحمد علي",
    password: "789012",
    subscriptionId: "5002",
    subscriptionEndDate: "",
    workoutPlanId: "muscle_building_plan",
    mealPlanId: "muscle_gain_plan",
    personalInfo: {
      age: 25,
      gender: 'male',
      weight: 70,
      height: 180,
      goal: 'muscle_gain',
      activityLevel: 'high'
    }
  },
  {
    id: "client_003",
    name: "فاطمة أحمد", 
    username: "فاطمة أحمد",
    password: "456789",
    subscriptionId: "5003",
    subscriptionEndDate: "",
    workoutPlanId: "women_fitness_plan",
    mealPlanId: "healthy_lifestyle_plan",
    personalInfo: {
      age: 28,
      gender: 'female',
      weight: 65,
      height: 165,
      goal: 'fitness',
      activityLevel: 'moderate'
    }
  }
];

export function getClientByCredentials(username: string, password: string): ClientProfile | null {
  return CLIENT_PROFILES.find(client => 
    client.username === username && client.password === password
  ) || null;
}

export function getClientById(id: string): ClientProfile | null {
  return CLIENT_PROFILES.find(client => client.id === id) || null;
}

export function getClientBySubscriptionId(subscriptionId: string): ClientProfile | null {
  return CLIENT_PROFILES.find(client => client.subscriptionId === subscriptionId) || null;
}