import { Card, CardContent } from "@/components/ui/card";
import { getDailyMealPlan } from "../../data/mealPlans";
import { getWorkoutByDayIndex, getWorkoutInstructions } from "../../data/workoutPlans";

interface DetailedPlanProps {
  date: Date;
  formattedDate: string;
  dayIndex: number;
}

export default function DetailedPlan({ formattedDate, dayIndex }: DetailedPlanProps) {
  const mealPlan = getDailyMealPlan();
  const workoutPlan = getWorkoutByDayIndex(dayIndex);
  const workoutInstructions = getWorkoutInstructions();
  
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6 text-center">
          تفاصيل برنامج اليوم - {formattedDate}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nutrition Plan */}
          <div>
            <h4 className="text-lg font-bold text-primary border-b border-neutral-200 dark:border-neutral-700 pb-2 mb-4">
              خطة التغذية
            </h4>
            
            <div className="space-y-6">
              <MealSection meal={mealPlan.breakfast} />
              <MealSection meal={mealPlan.morningSnack} />
              <MealSection meal={mealPlan.lunch} />
              <MealSection meal={mealPlan.afternoonSnack} />
              <MealSection meal={mealPlan.dinner} />
              <MealSection meal={mealPlan.nutritionGuide} titleColor="text-red-500" />
            </div>
          </div>
          
          {/* Workout Plan */}
          <div>
            <h4 className="text-lg font-bold text-secondary border-b border-neutral-200 dark:border-neutral-700 pb-2 mb-4">
              خطة التمارين
            </h4>
            
            <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg mb-6">
              <h5 className="font-bold text-secondary mb-2">
                {workoutPlan.title}
              </h5>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                {workoutPlan.description}
              </p>
              
              <div className="space-y-4">
                {Object.entries(workoutPlan.exercises).map(([groupName, exercises]) => (
                  <div key={groupName}>
                    <h6 className="font-bold">{groupName}:</h6>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {exercises.map((exercise, index) => (
                        <li key={index}>
                          <span className="font-medium">{exercise.name}:</span>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            {" "}{exercise.sets} مجموعات × {exercise.reps}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg mb-6">
              <h5 className="font-bold text-red-500 mb-2">تعليمات التمرين:</h5>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {workoutInstructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
              <h5 className="font-bold text-blue-500 mb-2">ملاحظات عامة:</h5>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>التزم بالتغذية بقدر الإمكان لتحقيق أفضل النتائج</li>
                <li>استمر في شرب الماء طوال اليوم</li>
                <li>قم بتسجيل تقدمك في التمارين لزيادة الحماس</li>
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
