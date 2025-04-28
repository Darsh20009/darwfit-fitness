import { Card, CardContent } from "@/components/ui/card";
import { getMealSummary } from "../../data/mealPlans";
import { getWorkoutSummary } from "../../data/workoutPlans";

interface DailyPlanProps {
  date: Date;
  formattedDate: string;
  workoutType: string;
  dayIndex: number;
}

export default function DailyPlan({ formattedDate, workoutType, dayIndex }: DailyPlanProps) {
  const mealSummary = getMealSummary();
  const workoutSummary = getWorkoutSummary(dayIndex);
  
  return (
    <Card className="mb-8 animate-fadeIn">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">{formattedDate}</h3>
          <p className="text-neutral-600 dark:text-neutral-400">{workoutType}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
            <h4 className="text-lg font-bold text-primary mb-2">الوجبات اليوم</h4>
            <ul className="space-y-2">
              {mealSummary.map((meal, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded mt-0.5 ml-2">
                    {meal.meal}
                  </span>
                  <span>{meal.description}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
            <h4 className="text-lg font-bold text-secondary mb-2">التمارين اليوم</h4>
            <ul className="space-y-1 text-sm">
              {workoutSummary.slice(0, 4).map((exercise, index) => (
                <li key={index} className="flex justify-between">
                  <span>{exercise.name}</span>
                  <span>{exercise.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
