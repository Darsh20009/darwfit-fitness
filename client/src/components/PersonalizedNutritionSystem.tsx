import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Calculator, Utensils, Target, TrendingUp, Crown, Star, Dumbbell, ChefHat } from "lucide-react";
import { useLocation } from "wouter";
import { useAuthContext } from "@/context/AuthContext";
import { getUserProfile } from "@/data/userProfiles";
import { arabicFoodDatabase, searchFoods, calculateNutrition, type FoodItem } from "@/data/foodDatabase";
import EnhancedCalorieCalculator from "./EnhancedCalorieCalculator";

interface NutritionPlan {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFats: number;
  mealPlan?: any; // سيتم تخصيصه لكل مستخدم
}

interface PersonalizedNutritionProps {
  onBack?: () => void;
}

export default function PersonalizedNutritionSystem({ onBack }: PersonalizedNutritionProps) {
  const [, setLocation] = useLocation();
  const { username } = useAuthContext();
  const [activeTab, setActiveTab] = useState("profile");
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [dailyIntake, setDailyIntake] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  
  // Load today's intake data
  useEffect(() => {
    const savedEntries = localStorage.getItem('dailyFoodEntries');
    if (savedEntries) {
      try {
        const entries = JSON.parse(savedEntries);
        const today = new Date().toDateString();
        const todayEntries = entries.filter((entry: any) => 
          new Date(entry.timestamp).toDateString() === today
        );
        
        const totals = todayEntries.reduce((acc: any, entry: any) => ({
          calories: acc.calories + (entry.nutrition?.calories || 0),
          protein: acc.protein + (entry.nutrition?.protein || 0),
          carbs: acc.carbs + (entry.nutrition?.carbs || 0),
          fats: acc.fats + (entry.nutrition?.fats || 0)
        }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
        
        setDailyIntake(totals);
      } catch (error) {
        console.warn("Error loading saved food entries:", error);
      }
    }
  }, [activeTab]);
  
  const userProfile = getUserProfile(username || "");
  
  useEffect(() => {
    if (username && userProfile) {
      // حساب الاحتياجات الغذائية بناءً على بيانات كل مستخدم
      const plan = calculatePersonalizedNutrition(username);
      setNutritionPlan(plan);
    }
  }, [username, userProfile]);

  const calculatePersonalizedNutrition = (username: string): NutritionPlan => {
    switch (username) {
      case "محمد السهلي":
        return {
          dailyCalories: 2200,
          dailyProtein: 150,
          dailyCarbs: 275,
          dailyFats: 70,
        };
      case "يوسف درويش":
        return {
          dailyCalories: 2800,
          dailyProtein: 180,
          dailyCarbs: 350,
          dailyFats: 85,
        };
      case "خالد عمر":
        return {
          dailyCalories: 2600,
          dailyProtein: 160,
          dailyCarbs: 325,
          dailyFats: 80,
        };
      default:
        return {
          dailyCalories: 2000,
          dailyProtein: 150,
          dailyCarbs: 250,
          dailyFats: 65,
        };
    }
  };

  const getUserIcon = () => {
    switch (username) {
      case "محمد السهلي": return Crown;
      case "يوسف درويش": return Star;
      case "خالد عمر": return Dumbbell;
      default: return User;
    }
  };

  const getUserRecommendedFoods = (username: string) => {
    switch (username) {
      case "محمد السهلي":
        return [
          // أطعمة صحية ومتوازنة للمهندس المحترف
          { category: "المطبخ المصري", food: "فول مدمس", reason: "بروتين عالي وقليل التكلفة" },
          { category: "المطبخ المصري", food: "عدس أصفر", reason: "ألياف وبروتين نباتي ممتاز" },
          { category: "المطبخ المصري", food: "سلطة بلدي", reason: "فيتامينات ومعادن أساسية" },
          { category: "المطبخ الشامي", food: "شيش طاووق", reason: "بروتين قليل الدهون" },
          { category: "المطبخ المصري", food: "بيض بلدي مسلوق", reason: "بروتين كامل وسهل التحضير" }
        ];
      case "يوسف درويش":
        return [
          // أطعمة لبناء العضلات للمدير الطموح
          { category: "المطبخ الشامي", food: "شاورما دجاج", reason: "بروتين عالي وسريع" },
          { category: "المطبخ السعودي والخليجي", food: "كبسة لحم", reason: "بروتين وكاربوهيدرات للطاقة" },
          { category: "المطبخ الشامي", food: "كباب حلبي", reason: "بروتين مركز لبناء العضلات" },
          { category: "المطبخ المصري", food: "كبدة", reason: "بروتين وحديد عاليين" },
          { category: "المطبخ السعودي والخليجي", food: "مندي دجاج", reason: "وجبة كاملة ومشبعة" }
        ];
      case "خالد عمر":
        return [
          // أطعمة اقتصادية ومغذية للطالب الشاب
          { category: "المطبخ المصري", food: "فول مدمس", reason: "رخيص ومغذي وغني بالبروتين" },
          { category: "المطبخ المصري", food: "بيض بلدي مسلوق", reason: "بروتين كامل ورخيص" },
          { category: "المطبخ المصري", food: "عدس أصفر", reason: "بروتين نباتي وألياف" },
          { category: "المطبخ المصري", food: "جبنة قريش", reason: "بروتين وكالسيوم للنمو" },
          { category: "المطبخ المصري", food: "طعمية", reason: "بروتين نباتي ومشبع" }
        ];
      default:
        return [];
    }
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      setLocation("/dashboard");
    }
  };

  if (!userProfile || !nutritionPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
        <div className="max-w-md mx-auto pt-20">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-lg font-bold text-gray-600">جاري تحضير نظامك الغذائي الشخصي...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const UserIcon = getUserIcon();
  const recommendedFoods = getUserRecommendedFoods(username || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50" dir="rtl">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800"
          >
            <ArrowLeft className="h-5 w-5 rotate-180" />
            العودة
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 justify-center">
              <ChefHat className="h-8 w-8 text-emerald-600" />
              نظام التغذية الشخصي
            </h1>
            <div className="flex items-center gap-2 justify-center text-emerald-600 mt-1">
              <UserIcon className="h-5 w-5" />
              <span className="font-semibold">{userProfile.name}</span>
            </div>
          </div>
          <div className="w-20"></div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              الملف الشخصي
            </TabsTrigger>
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              الأطعمة المقترحة
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              حاسبة السعرات
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              التقدم اليومي
            </TabsTrigger>
          </TabsList>

          {/* الملف الشخصي */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-6 w-6 text-emerald-600" />
                    معلومات شخصية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div><strong>العمر:</strong> {userProfile.age} سنة</div>
                  <div><strong>المهنة:</strong> {userProfile.profession}</div>
                  <div><strong>الهدف:</strong> {userProfile.fitnessGoal}</div>
                  <div><strong>مستوى اللياقة:</strong> {userProfile.fitnessLevel}</div>
                  <div><strong>أسلوب التغذية:</strong> {userProfile.dietStyle}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-emerald-600" />
                    أهدافك اليومية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>السعرات الحرارية:</span>
                    <Badge variant="secondary">{nutritionPlan.dailyCalories} سعرة</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>البروتين:</span>
                    <Badge variant="secondary">{nutritionPlan.dailyProtein} جم</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>الكاربوهيدرات:</span>
                    <Badge variant="secondary">{nutritionPlan.dailyCarbs} جم</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>الدهون:</span>
                    <Badge variant="secondary">{nutritionPlan.dailyFats} جم</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>مقولتك التحفيزية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg text-center p-4 bg-emerald-50 rounded-lg italic">
                  "{userProfile.motivationalQuote}"
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الأطعمة المقترحة */}
          <TabsContent value="recommended">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-6 w-6 text-emerald-600" />
                  أطعمة مقترحة خصيصاً لك
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedFoods.map((item, index) => {
                    const foodInfo = arabicFoodDatabase[item.category]?.[item.food];
                    
                    return (
                      <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-emerald-700 mb-2">{item.food}</h3>
                        <p className="text-sm text-gray-600 mb-3">{item.reason}</p>
                        {foodInfo && (
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span>السعرات:</span>
                              <span className="font-semibold">{foodInfo.calories}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>البروتين:</span>
                              <span className="font-semibold">{foodInfo.protein}جم</span>
                            </div>
                            <div className="flex justify-between">
                              <span>الكاربوهيدرات:</span>
                              <span className="font-semibold">{foodInfo.carbs}جم</span>
                            </div>
                            <div className="flex justify-between">
                              <span>الدهون:</span>
                              <span className="font-semibold">{foodInfo.fats || 0}جم</span>
                            </div>
                          </div>
                        )}
                        <Button 
                          size="sm" 
                          className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => {
                            // Add food to today's intake
                            const foodKey = `${item.category}-${item.food}-${Date.now()}`;
                            const currentIntake = JSON.parse(localStorage.getItem('dailyFoodEntries') || '[]');
                            const newEntry = {
                              id: foodKey,
                              category: item.category,
                              food: item.food,
                              quantity: 1,
                              quantityType: 'serving',
                              nutrition: foodInfo,
                              timestamp: new Date().toISOString()
                            };
                            currentIntake.push(newEntry);
                            localStorage.setItem('dailyFoodEntries', JSON.stringify(currentIntake));
                            
                            // Update daily intake state
                            const newIntake = {
                              calories: dailyIntake.calories + (foodInfo?.calories || 0),
                              protein: dailyIntake.protein + (foodInfo?.protein || 0),
                              carbs: dailyIntake.carbs + (foodInfo?.carbs || 0),
                              fats: dailyIntake.fats + (foodInfo?.fats || 0)
                            };
                            setDailyIntake(newIntake);
                            
                            setActiveTab('progress');
                          }}
                        >
                          إضافة لنظامي اليومي
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* حاسبة السعرات */}
          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-emerald-600" />
                  حاسبة السعرات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EnhancedCalorieCalculator
                  initialWeight={username === "خالد عمر" ? 69.9 : username === "يوسف درويش" ? 75 : 80}
                  initialHeight={username === "خالد عمر" ? 182 : username === "يوسف درويش" ? 175 : 170}
                  initialAge={userProfile.age}
                  initialGender={userProfile.age < 18 ? "male" : "male"}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* التقدم اليومي */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                  تقدمك اليومي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>السعرات الحرارية</span>
                      <span>{dailyIntake.calories} / {nutritionPlan.dailyCalories}</span>
                    </div>
                    <Progress 
                      value={(dailyIntake.calories / nutritionPlan.dailyCalories) * 100} 
                      className="h-3"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>البروتين</span>
                      <span>{dailyIntake.protein}جم / {nutritionPlan.dailyProtein}جم</span>
                    </div>
                    <Progress 
                      value={(dailyIntake.protein / nutritionPlan.dailyProtein) * 100} 
                      className="h-3"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>الكاربوهيدرات</span>
                      <span>{dailyIntake.carbs}جم / {nutritionPlan.dailyCarbs}جم</span>
                    </div>
                    <Progress 
                      value={(dailyIntake.carbs / nutritionPlan.dailyCarbs) * 100} 
                      className="h-3"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>الدهون</span>
                      <span>{dailyIntake.fats}جم / {nutritionPlan.dailyFats}جم</span>
                    </div>
                    <Progress 
                      value={(dailyIntake.fats / nutritionPlan.dailyFats) * 100} 
                      className="h-3"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <h3 className="font-bold text-emerald-800 mb-2">نصائح شخصية لك:</h3>
                  <ul className="space-y-1 text-sm text-emerald-700">
                    {username === "محمد السهلي" && (
                      <>
                        <li>• ركز على الأطعمة المتوازنة التي تساعد في التركيز أثناء العمل</li>
                        <li>• تناول وجبات صغيرة متكررة لتجنب الشعور بالثقل</li>
                        <li>• احرص على تناول الخضروات الورقية لتحسين الدورة الدموية</li>
                      </>
                    )}
                    {username === "يوسف درويش" && (
                      <>
                        <li>• زيد من البروتين بعد التمرين لبناء العضلات</li>
                        <li>• تناول وجبات عالية السعرات لدعم نمو العضلات</li>
                        <li>• لا تتردد في تناول الكاربوهيدرات قبل التمرين للطاقة</li>
                      </>
                    )}
                    {username === "خالد عمر" && (
                      <>
                        <li>• ركز على الأطعمة الغنية بالكالسيوم والبروتين للنمو الصحي</li>
                        <li>• تناول وجبات منتظمة لدعم النمو في سن المراهقة</li>
                        <li>• اختر الأطعمة الاقتصادية عالية القيمة الغذائية</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}