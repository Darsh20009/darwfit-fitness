// مكتبة لحفظ البيانات في ذاكرة الجهاز المحلية
export class LocalStorageManager {
  // حفظ البيانات
  static setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // استرجاع البيانات
  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue || null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  }

  // حذف البيانات
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  // حفظ تقدم التمارين
  static saveWorkoutProgress(workoutData: any): void {
    const key = `workout_progress_${new Date().toISOString().split('T')[0]}`;
    this.setItem(key, workoutData);
  }

  // استرجاع تقدم التمارين
  static getWorkoutProgress(date?: string): any {
    const dateKey = date || new Date().toISOString().split('T')[0];
    const key = `workout_progress_${dateKey}`;
    return this.getItem(key, {});
  }

  // حفظ تقدم الوجبات
  static saveMealProgress(mealData: any): void {
    const key = `meal_progress_${new Date().toISOString().split('T')[0]}`;
    this.setItem(key, mealData);
  }

  // استرجاع تقدم الوجبات
  static getMealProgress(date?: string): any {
    const dateKey = date || new Date().toISOString().split('T')[0];
    const key = `meal_progress_${dateKey}`;
    return this.getItem(key, {});
  }

  // حفظ الإعدادات الشخصية
  static saveUserSettings(settings: any): void {
    this.setItem('user_settings', settings);
  }

  // استرجاع الإعدادات الشخصية
  static getUserSettings(): any {
    return this.getItem('user_settings', {
      theme: 'light',
      notifications: true,
      language: 'ar'
    });
  }

  // حفظ بيانات حاسبة السعرات
  static saveCalorieCalculation(data: any): void {
    const calculations = this.getItem('calorie_calculations', []);
    calculations.push({
      ...data,
      timestamp: new Date().toISOString()
    });
    this.setItem('calorie_calculations', calculations);
  }

  // استرجاع تاريخ حاسبة السعرات
  static getCalorieHistory(): any[] {
    return this.getItem('calorie_calculations', []);
  }

  // حفظ الملاحظات الشخصية
  static savePersonalNotes(notes: string): void {
    const key = `notes_${new Date().toISOString().split('T')[0]}`;
    this.setItem(key, notes);
  }

  // استرجاع الملاحظات الشخصية
  static getPersonalNotes(date?: string): string {
    const dateKey = date || new Date().toISOString().split('T')[0];
    const key = `notes_${dateKey}`;
    return this.getItem(key, '');
  }

  // مسح كل البيانات المحفوظة
  static clearAllData(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('workout_progress_') || 
            key.startsWith('meal_progress_') || 
            key.startsWith('notes_') ||
            key === 'user_settings' ||
            key === 'calorie_calculations') {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
    // إضافة الدوال المفقودة لأوزان التمارين
    static getExerciseWeights(date: string): Map<string, number> {
      const weights = this.getItem(`exercise_weights_${date}`) || {};
      return new Map(Object.entries(weights).map(([key, value]) => [key, value as number]));
    }
  
    static setExerciseWeight(date: string, exerciseName: string, weight: number) {
      const currentWeights = this.getItem(`exercise_weights_${date}`) || {};
      currentWeights[exerciseName] = weight;
      this.setItem(`exercise_weights_${date}`, currentWeights);
    }
}