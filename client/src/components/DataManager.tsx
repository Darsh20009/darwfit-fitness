
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { LocalStorageManager } from "@/lib/localStorage";
import { Save, Trash2, History } from "lucide-react";

export default function DataManager() {
  const [personalNotes, setPersonalNotes] = useState("");
  const [calorieHistory, setCalorieHistory] = useState<any[]>([]);
  const [workoutProgress, setWorkoutProgress] = useState<any>({});
  const [mealProgress, setMealProgress] = useState<any>({});

  useEffect(() => {
    // Load saved data
    setPersonalNotes(LocalStorageManager.getPersonalNotes());
    setCalorieHistory(LocalStorageManager.getCalorieHistory());
    setWorkoutProgress(LocalStorageManager.getWorkoutProgress());
    setMealProgress(LocalStorageManager.getMealProgress());
  }, []);

  const saveNotes = () => {
    LocalStorageManager.savePersonalNotes(personalNotes);
    alert("تم حفظ الملاحظات بنجاح!");
  };

  const clearAllData = () => {
    if (confirm("هل أنت متأكد من حذف جميع البيانات المحفوظة؟")) {
      LocalStorageManager.clearAllData();
      setPersonalNotes("");
      setCalorieHistory([]);
      setWorkoutProgress({});
      setMealProgress({});
      alert("تم حذف جميع البيانات!");
    }
  };

  const markWorkoutComplete = (exerciseName: string) => {
    const today = new Date().toISOString().split('T')[0];
    const currentProgress = LocalStorageManager.getWorkoutProgress(today);
    currentProgress[exerciseName] = {
      completed: true,
      completedAt: new Date().toISOString()
    };
    LocalStorageManager.saveWorkoutProgress(currentProgress);
    setWorkoutProgress(currentProgress);
  };

  const markMealComplete = (mealName: string) => {
    const today = new Date().toISOString().split('T')[0];
    const currentProgress = LocalStorageManager.getMealProgress(today);
    currentProgress[mealName] = {
      completed: true,
      completedAt: new Date().toISOString()
    };
    LocalStorageManager.saveMealProgress(currentProgress);
    setMealProgress(currentProgress);
  };

  return (
    <div className="space-y-6">
      {/* Personal Notes */}
      <Card className="card-mobile">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save size={20} />
            الملاحظات الشخصية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={personalNotes}
            onChange={(e) => setPersonalNotes(e.target.value)}
            placeholder="اكتب ملاحظاتك الشخصية هنا..."
            rows={4}
            className="w-full"
          />
          <div className="flex gap-2">
            <Button onClick={saveNotes} className="btn-touch">
              <Save size={16} className="ml-2" />
              حفظ الملاحظات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workout Progress */}
      <Card className="card-mobile">
        <CardHeader>
          <CardTitle>تقدم التمارين اليوم</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(workoutProgress).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(workoutProgress).map(([exercise, data]: [string, any]) => (
                <div key={exercise} className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm mobile-text">{exercise}</span>
                  <Badge variant={data.completed ? "default" : "secondary"}>
                    {data.completed ? "مكتمل" : "غير مكتمل"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">لا توجد تمارين مسجلة اليوم</p>
          )}
        </CardContent>
      </Card>

      {/* Meal Progress */}
      <Card className="card-mobile">
        <CardHeader>
          <CardTitle>تقدم الوجبات اليوم</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(mealProgress).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(mealProgress).map(([meal, data]: [string, any]) => (
                <div key={meal} className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm mobile-text">{meal}</span>
                  <Badge variant={data.completed ? "default" : "secondary"}>
                    {data.completed ? "مكتمل" : "غير مكتمل"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">لا توجد وجبات مسجلة اليوم</p>
          )}
        </CardContent>
      </Card>

      {/* Calorie History */}
      <Card className="card-mobile">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History size={20} />
            تاريخ حاسبة السعرات
          </CardTitle>
        </CardHeader>
        <CardContent>
          {calorieHistory.length > 0 ? (
            <div className="space-y-3">
              {calorieHistory.slice(-3).map((calc, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="text-sm mobile-text">
                    <p><strong>السعرات المطلوبة:</strong> {calc.result.goalCalories}</p>
                    <p><strong>البروتين:</strong> {calc.result.protein}g</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(calc.timestamp).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">لا توجد حسابات محفوظة</p>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="card-mobile">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trash2 size={20} />
            إدارة البيانات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={clearAllData}
            className="w-full btn-touch"
          >
            <Trash2 size={16} className="ml-2" />
            حذف جميع البيانات المحفوظة
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            سيتم حذف جميع الملاحظات والتقدم المحفوظ محلياً
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
