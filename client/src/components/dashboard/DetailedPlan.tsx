import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDailyMealPlan } from "../../data/mealPlans";
import { getWorkoutByDayIndex, getWorkoutInstructions } from "../../data/workoutPlans";
import { Utensils, Dumbbell, Info, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface DetailedPlanProps {
  date: Date;
  formattedDate: string;
  dayIndex: number;
}

export default function DetailedPlan({ formattedDate, dayIndex }: DetailedPlanProps) {
  const mealPlan = getDailyMealPlan();
  const workoutPlan = getWorkoutByDayIndex(dayIndex);
  const workoutInstructions = getWorkoutInstructions();
  const [completedMeals, setCompletedMeals] = useState<number[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  
  const toggleMealCompletion = (index: number) => {
    setCompletedMeals(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  const toggleExerciseCompletion = (exerciseName: string) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseName) 
        ? prev.filter(name => name !== exerciseName) 
        : [...prev, exerciseName]
    );
  };
  
  return (
    <Card className="mb-8 border-2 border-primary/10">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl md:text-2xl flex items-center">
            <Info className="ml-2 h-5 w-5 text-primary" />
            تفاصيل برنامج يوم {formattedDate}
          </CardTitle>
          <Badge className="bg-secondary text-white">
            {workoutPlan.title}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nutrition Plan */}
          <div>
            <div className="flex items-center mb-4">
              <Utensils className="ml-2 h-5 w-5 text-primary" />
              <h4 className="text-xl font-bold text-primary">
                خطة التغذية
              </h4>
            </div>
            
            <Accordion type="multiple" className="space-y-4">
              <AccordionItem value="breakfast" className="border overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
                <AccordionTrigger className={`p-3 ${completedMeals.includes(0) ? 'bg-green-50 dark:bg-green-900/10' : 'bg-neutral-50 dark:bg-neutral-800'}`}>
                  <div className="flex items-center">
                    <div 
                      className={`ml-2 h-5 w-5 rounded-full flex items-center justify-center border ${
                        completedMeals.includes(0) 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMealCompletion(0);
                      }}
                    >
                      {completedMeals.includes(0) && <CheckCircle className="h-4 w-4" />}
                    </div>
                    <span className="font-bold text-primary">{mealPlan.breakfast.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-3 pt-1 bg-white dark:bg-neutral-800/50">
                  <ul className="space-y-1 text-sm pr-6">
                    {mealPlan.breakfast.items.map((item, i) => (
                      <li key={i} className="list-disc">{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="morningSnack" className="border overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
                <AccordionTrigger className={`p-3 ${completedMeals.includes(1) ? 'bg-green-50 dark:bg-green-900/10' : 'bg-neutral-50 dark:bg-neutral-800'}`}>
                  <div className="flex items-center">
                    <div 
                      className={`ml-2 h-5 w-5 rounded-full flex items-center justify-center border ${
                        completedMeals.includes(1) 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMealCompletion(1);
                      }}
                    >
                      {completedMeals.includes(1) && <CheckCircle className="h-4 w-4" />}
                    </div>
                    <span className="font-bold text-primary">{mealPlan.morningSnack.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-3 pt-1 bg-white dark:bg-neutral-800/50">
                  <ul className="space-y-1 text-sm pr-6">
                    {mealPlan.morningSnack.items.map((item, i) => (
                      <li key={i} className="list-disc">{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="lunch" className="border overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
                <AccordionTrigger className={`p-3 ${completedMeals.includes(2) ? 'bg-green-50 dark:bg-green-900/10' : 'bg-neutral-50 dark:bg-neutral-800'}`}>
                  <div className="flex items-center">
                    <div 
                      className={`ml-2 h-5 w-5 rounded-full flex items-center justify-center border ${
                        completedMeals.includes(2) 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMealCompletion(2);
                      }}
                    >
                      {completedMeals.includes(2) && <CheckCircle className="h-4 w-4" />}
                    </div>
                    <span className="font-bold text-primary">{mealPlan.lunch.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-3 pt-1 bg-white dark:bg-neutral-800/50">
                  <ul className="space-y-1 text-sm pr-6">
                    {mealPlan.lunch.items.map((item, i) => (
                      <li key={i} className="list-disc">{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="afternoonSnack" className="border overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
                <AccordionTrigger className={`p-3 ${completedMeals.includes(3) ? 'bg-green-50 dark:bg-green-900/10' : 'bg-neutral-50 dark:bg-neutral-800'}`}>
                  <div className="flex items-center">
                    <div 
                      className={`ml-2 h-5 w-5 rounded-full flex items-center justify-center border ${
                        completedMeals.includes(3) 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMealCompletion(3);
                      }}
                    >
                      {completedMeals.includes(3) && <CheckCircle className="h-4 w-4" />}
                    </div>
                    <span className="font-bold text-primary">{mealPlan.afternoonSnack.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-3 pt-1 bg-white dark:bg-neutral-800/50">
                  <ul className="space-y-1 text-sm pr-6">
                    {mealPlan.afternoonSnack.items.map((item, i) => (
                      <li key={i} className="list-disc">{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="dinner" className="border overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
                <AccordionTrigger className={`p-3 ${completedMeals.includes(4) ? 'bg-green-50 dark:bg-green-900/10' : 'bg-neutral-50 dark:bg-neutral-800'}`}>
                  <div className="flex items-center">
                    <div 
                      className={`ml-2 h-5 w-5 rounded-full flex items-center justify-center border ${
                        completedMeals.includes(4) 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMealCompletion(4);
                      }}
                    >
                      {completedMeals.includes(4) && <CheckCircle className="h-4 w-4" />}
                    </div>
                    <span className="font-bold text-primary">{mealPlan.dinner.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-3 pt-1 bg-white dark:bg-neutral-800/50">
                  <ul className="space-y-1 text-sm pr-6">
                    {mealPlan.dinner.items.map((item, i) => (
                      <li key={i} className="list-disc">{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg mt-4 border border-orange-200 dark:border-orange-800">
              <h5 className="font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center">
                <AlertCircle className="ml-2 h-4 w-4" />
                إرشادات غذائية مهمة
              </h5>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {mealPlan.nutritionGuide.items.map((item, index) => (
                  <li key={index} className="text-neutral-700 dark:text-neutral-300">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Workout Plan */}
          <div>
            <div className="flex items-center mb-4">
              <Dumbbell className="ml-2 h-5 w-5 text-secondary" />
              <h4 className="text-xl font-bold text-secondary">
                خطة التمارين
              </h4>
            </div>
            
            <div className="bg-secondary/5 dark:bg-secondary/10 p-4 rounded-lg mb-6 border border-secondary/10">
              <h5 className="font-bold text-secondary mb-2 text-lg">
                {workoutPlan.title}
              </h5>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {workoutPlan.description}
              </p>
              
              <div className="space-y-4">
                {Object.entries(workoutPlan.exercises).map(([groupName, exercises]) => (
                  <div key={groupName} className="bg-white dark:bg-neutral-800 rounded-lg p-3 shadow-sm">
                    <h6 className="font-bold text-secondary mb-2">{groupName}:</h6>
                    
                    <div className="space-y-2">
                      {exercises.map((exercise, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between rounded-md p-2 transition-colors ${
                            completedExercises.includes(exercise.name) 
                              ? 'bg-green-50 dark:bg-green-900/10' 
                              : 'bg-neutral-50 dark:bg-neutral-700/50'
                          }`}
                        >
                          <div className="flex items-center">
                            <div 
                              className={`ml-2 h-5 w-5 rounded-full flex items-center justify-center border cursor-pointer ${
                                completedExercises.includes(exercise.name) 
                                ? 'bg-green-500 text-white border-green-500' 
                                : 'border-gray-300'
                              }`}
                              onClick={() => toggleExerciseCompletion(exercise.name)}
                            >
                              {completedExercises.includes(exercise.name) && <CheckCircle className="h-4 w-4" />}
                            </div>
                            <span className="font-medium">{exercise.name}</span>
                          </div>
                          <Badge variant="outline" className="text-secondary border-secondary">
                            {exercise.sets} × {exercise.reps}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg mb-4 border border-blue-200 dark:border-blue-800">
              <h5 className="font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                <Info className="ml-2 h-4 w-4" />
                تعليمات التمرين
              </h5>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {workoutInstructions.map((instruction, index) => (
                  <li key={index} className="text-neutral-700 dark:text-neutral-300">{instruction}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-bold text-green-600 dark:text-green-400 mb-2 flex items-center">
                <Info className="ml-2 h-4 w-4" />
                ملاحظات عامة
              </h5>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li className="text-neutral-700 dark:text-neutral-300">التزم بالتغذية بقدر الإمكان لتحقيق أفضل النتائج</li>
                <li className="text-neutral-700 dark:text-neutral-300">استمر في شرب الماء طوال اليوم</li>
                <li className="text-neutral-700 dark:text-neutral-300">قم بتسجيل تقدمك في التمارين لزيادة الحماس</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MealItemProps {
  meal: {
    title: string;
    items: string[];
  };
  titleColor?: string;
}

function MealSection({ meal, titleColor = "text-primary" }: MealItemProps) {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
      <h5 className={`font-bold ${titleColor} mb-2`}>{meal.title}</h5>
      <ul className="list-disc list-inside space-y-1 text-sm">
        {meal.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
