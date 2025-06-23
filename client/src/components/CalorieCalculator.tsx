import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  ArrowRight, 
  Activity, 
  Dumbbell, 
  Flame 
} from "lucide-react";
import { LocalStorageManager } from "@/lib/localStorage";

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
type Goal = "lose" | "maintain" | "gain";
type Gender = "male" | "female";

interface CalorieCalculatorProps {
  initialWeight?: number;
  initialHeight?: number;
  initialAge?: number;
  initialGender?: Gender;
}

export default function CalorieCalculator({
  initialWeight,
  initialHeight,
  initialAge,
  initialGender = "male"
}: CalorieCalculatorProps) {
  // Form state
  const [weight, setWeight] = useState(initialWeight || 70);
  const [height, setHeight] = useState(initialHeight || 170);
  const [age, setAge] = useState(initialAge || 30);
  const [gender, setGender] = useState<Gender>(initialGender);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");

  // Results state
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });

  // Load saved data on component mount
  useEffect(() => {
    const savedData = LocalStorageManager.getItem('calorie_form_data');
    if (savedData) {
      setWeight(savedData.weight || "");
      setHeight(savedData.height || "");
      setAge(savedData.age || "");
      setGender(savedData.gender || "");
      setActivityLevel(savedData.activityLevel || "");
      setGoal(savedData.goal || "");
      setBmr(savedData.bmr || 0);
      setTdee(savedData.tdee || 0);
      setTargetCalories(savedData.targetCalories || 0);
      setMacros(savedData.macros || { protein: 0, carbs: 0, fat: 0 });
      setHasCalculated(savedData.hasCalculated || false);
    }
  }, []);

  // Save form data whenever it changes
  useEffect(() => {
    const formData = {
      weight,
      height,
      age,
      gender,
      activityLevel,
      goal,
      bmr,
      tdee,
      targetCalories,
      macros,
      hasCalculated
    };
    LocalStorageManager.setItem('calorie_form_data', formData);
  }, [weight, height, age, gender, activityLevel, goal, bmr, tdee, targetCalories, macros, hasCalculated]);

  // Function to calculate BMR using the Mifflin-St Jeor Equation
  const calculateBMR = () => {
    let calculatedBMR = 0;

    if (gender === "male") {
      calculatedBMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      calculatedBMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    return calculatedBMR;
  };

  // Function to calculate TDEE based on activity level
  const calculateTDEE = (baseBMR: number) => {
    const activityMultipliers = {
      sedentary: 1.2,      // Little or no exercise
      light: 1.375,        // Light exercise 1-3 days/week
      moderate: 1.55,      // Moderate exercise 3-5 days/week
      active: 1.725,       // Heavy exercise 6-7 days/week
      very_active: 1.9     // Very heavy exercise, physical job or training twice a day
    };

    return baseBMR * activityMultipliers[activityLevel];
  };

  // Function to calculate target calories based on goals
  const calculateTargetCalories = (baseTDEE: number) => {
    if (goal === "lose") {
      return baseTDEE - 500; // 500 calorie deficit for weight loss
    } else if (goal === "gain") {
      return baseTDEE + 500; // 500 calorie surplus for weight gain
    } else {
      return baseTDEE; // maintain current weight
    }
  };

  // Function to calculate macronutrients
  const calculateMacros = (calories: number) => {
    let protein = 0, carbs = 0, fat = 0;

    if (goal === "lose") {
      // Higher protein, moderate fat, lower carbs for weight loss
      protein = weight * 2.2; // 2.2g per kg of body weight
      fat = weight * 0.8;   // 0.8g per kg of body weight
      carbs = (calories - (protein * 4 + fat * 9)) / 4;
    } else if (goal === "gain") {
      // Higher protein, higher carbs, moderate fat for muscle gain
      protein = weight * 2; // 2g per kg of body weight
      fat = weight * 0.8;   // 0.8g per kg of body weight
      carbs = (calories - (protein * 4 + fat * 9)) / 4;
    } else {
      // Balanced approach for maintenance
      protein = weight * 1.6; // 1.6g per kg of body weight
      fat = weight * 0.8;     // 0.8g per kg of body weight
      carbs = (calories - (protein * 4 + fat * 9)) / 4;
    }

    return {
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat)
    };
  };

  // Handle calculation
  const handleCalculate = () => {
    const calculatedBMR = calculateBMR();
    const calculatedTDEE = calculateTDEE(calculatedBMR);
    const calculatedTargetCalories = calculateTargetCalories(calculatedTDEE);
    const calculatedMacros = calculateMacros(calculatedTargetCalories);

    setBmr(Math.round(calculatedBMR));
    setTdee(Math.round(calculatedTDEE));
    setTargetCalories(Math.round(calculatedTargetCalories));
    setMacros(calculatedMacros);
    setHasCalculated(true);

    // const calculationResult = {
    //   bmr: Math.round(bmr),
    //   tdee: Math.round(tdee),
    //   goalCalories: Math.round(goalCalories),
    //   protein: Math.round(protein),
    //   carbs: Math.round(carbs),
    //   fats: Math.round(fats)
    // };

    // // حساب النتائج وعرضها
    // setResult(calculationResult);

    // // حفظ النتيجة في التاريخ المحلي
    // LocalStorageManager.saveCalorieCalculation({
    //   input: { weight, height, age, gender, activity, goal },
    //   result: calculationResult
    // });
  };

  // Text utility functions
  const getActivityLevelText = () => {
    const texts = {
      sedentary: "قليل النشاط (مكتبي، قليل الحركة)",
      light: "نشاط خفيف (تمرين 1-3 أيام/أسبوع)",
      moderate: "نشاط متوسط (تمرين 3-5 أيام/أسبوع)",
      active: "نشاط عالي (تمرين 6-7 أيام/أسبوع)",
      very_active: "نشاط مكثف (تمرين مرتين يومياً، عمل بدني)"
    };
    return texts[activityLevel];
  };

  const getGoalText = () => {
    const texts = {
      lose: "خسارة الوزن",
      maintain: "المحافظة على الوزن",
      gain: "زيادة الوزن وبناء العضلات"
    };
    return texts[goal];
  };

  // Reset all values
  const handleReset = () => {
    setWeight(initialWeight || 70);
    setHeight(initialHeight || 170);
    setAge(initialAge || 30);
    setGender(initialGender);
    setActivityLevel("moderate");
    setGoal("maintain");
    setHasCalculated(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl md:text-2xl">حاسبة السعرات الحرارية</CardTitle>
            <CardDescription>
              احسب احتياجاتك اليومية من السعرات والعناصر الغذائية
            </CardDescription>
          </div>
          <Calculator className="h-8 w-8 text-primary" />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">الحاسبة</TabsTrigger>
            <TabsTrigger value="results" disabled={!hasCalculated}>النتائج</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">الوزن (كغم)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="30"
                    max="250"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">الطول (سم)</Label>
                  <Input
                    id="height"
                    type="number"
                    min="100"
                    max="250"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">العمر</Label>
                  <Input
                    id="age"
                    type="number"
                    min="12"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">الجنس</Label>
                  <Select value={gender} onValueChange={(value) => setGender(value as Gender)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="اختر الجنس" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">ذكر</SelectItem>
                      <SelectItem value="female">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity">مستوى النشاط البدني</Label>
                <Select value={activityLevel} onValueChange={(value) => setActivityLevel(value as ActivityLevel)}>
                  <SelectTrigger id="activity">
                    <SelectValue placeholder="اختر مستوى النشاط" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">قليل النشاط (مكتبي، قليل الحركة)</SelectItem>
                    <SelectItem value="light">نشاط خفيف (تمرين 1-3 أيام/أسبوع)</SelectItem>
                    <SelectItem value="moderate">نشاط متوسط (تمرين 3-5 أيام/أسبوع)</SelectItem>
                    <SelectItem value="active">نشاط عالي (تمرين 6-7 أيام/أسبوع)</SelectItem>
                    <SelectItem value="very_active">نشاط مكثف (تمرين مرتين يومياً، عمل بدني)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">الهدف</Label>
                <Select value={goal} onValueChange={(value) => setGoal(value as Goal)}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="اختر هدفك" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">خسارة الوزن</SelectItem>
                    <SelectItem value="maintain">المحافظة على الوزن</SelectItem>
                    <SelectItem value="gain">زيادة الوزن وبناء العضلات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 space-x-reverse pt-4">
                <Button variant="outline" onClick={handleReset}>
                  إعادة تعيين
                </Button>
                <Button className="bg-primary" onClick={handleCalculate}>
                  حساب السعرات
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="pt-4 space-y-4">
            {hasCalculated && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 text-center">
                      <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h3 className="text-sm text-neutral-600 dark:text-neutral-400">معدل الأيض القاعدي</h3>
                      <p className="text-2xl font-bold text-primary">{bmr}</p>
                      <p className="text-xs text-neutral-500">سعرة حرارية / يوم</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary/5 border-secondary/20">
                    <CardContent className="p-4 text-center">
                      <Dumbbell className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <h3 className="text-sm text-neutral-600 dark:text-neutral-400">إجمالي الطاقة اليومية</h3>
                      <p className="text-2xl font-bold text-secondary">{tdee}</p>
                      <p className="text-xs text-neutral-500">سعرة حرارية / يوم</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800">
                    <CardContent className="p-4 text-center">
                      <Flame className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="text-sm text-neutral-600 dark:text-neutral-400">سعراتك المستهدفة</h3>
                      <p className="text-2xl font-bold text-green-600">{targetCalories}</p>
                      <p className="text-xs text-neutral-500">سعرة حرارية / يوم</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">العناصر الغذائية المقترحة</h3>
                    <Badge className="bg-primary">{getGoalText()}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center bg-red-50 dark:bg-red-900/10 p-2 rounded-lg">
                      <h4 className="text-sm text-neutral-600 dark:text-neutral-400">بروتين</h4>
                      <p className="text-xl font-bold text-red-600">{macros.protein}g</p>
                      <p className="text-xs text-neutral-500">{Math.round(macros.protein * 4)} سعرة</p>
                    </div>

                    <div className="text-center bg-amber-50 dark:bg-amber-900/10 p-2 rounded-lg">
                      <h4 className="text-sm text-neutral-600 dark:text-neutral-400">دهون</h4>
                      <p className="text-xl font-bold text-amber-600">{macros.fat}g</p>
                      <p className="text-xs text-neutral-500">{Math.round(macros.fat * 9)} سعرة</p>
                    </div>

                    <div className="text-center bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg">
                      <h4 className="text-sm text-neutral-600 dark:text-neutral-400">كربوهيدرات</h4>
                      <p className="text-xl font-bold text-blue-600">{macros.carbs}g</p>
                      <p className="text-xs text-neutral-500">{Math.round(macros.carbs * 4)} سعرة</p>
                    </div>
                  </div>

                  <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
                    <p>
                      <span className="font-medium">المعلومات الشخصية:</span> {age} سنة، {gender === "male" ? "ذكر" : "أنثى"}، {height} سم، {weight} كجم
                    </p>
                    <p>
                      <span className="font-medium">مستوى النشاط:</span> {getActivityLevelText()}
                    </p>
                    <p>
                      <span className="font-medium">الهدف:</span> {getGoalText()}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-bold mb-2">نصائح غذائية:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>اشرب كمية كافية من الماء (8-10 أكواب يومياً على الأقل)</li>
                    <li>تناول البروتين مع كل وجبة لزيادة الشبع والحفاظ على الكتلة العضلية</li>
                    <li>ركز على الكربوهيدرات المعقدة بدلاً من السكريات البسيطة</li>
                    <li>تناول الدهون الصحية مثل زيت الزيتون والأفوكادو والمكسرات</li>
                  </ul>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}