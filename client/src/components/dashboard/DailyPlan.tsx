import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getMealSummary } from "../../data/mealPlans";
import { getWorkoutSummary } from "../../data/workoutPlans";
import { Badge } from "@/components/ui/badge";
import { Calendar, Dumbbell, Utensils, CheckCircle2, ArrowRight, Lock } from "lucide-react";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DailyPlanProps {
  date: Date;
  formattedDate: string;
  workoutType: string;
  dayIndex: number;
}

export default function DailyPlan({ date, formattedDate, workoutType, dayIndex }: DailyPlanProps) {
  const mealSummary = getMealSummary();
  const workoutSummary = getWorkoutSummary(dayIndex);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  // Check if it's a future day
  const isFutureDay = () => {
    const today = new Date();
    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return compareDate > compareToday;
  };
  
  // Determine if we should lock the checkmarks from being functional
  const isLocked = isFutureDay();
  
  return (
    <Card className="mb-8 border-2 border-primary/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="ml-2 h-5 w-5 text-primary" />
            <CardTitle className="text-xl">
              خطة {formattedDate}
            </CardTitle>
          </div>
          <Badge variant="outline" className="bg-secondary/10 border-secondary text-secondary">
            {workoutType}
          </Badge>
        </div>
        <CardDescription>
          الخطة اليومية المخصصة لتحقيق أهدافك بطريقة علمية
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="workout" className="w-full">
          <TabsList className="w-full rounded-none h-12">
            <TabsTrigger value="workout" className="flex-1 h-full data-[state=active]:bg-primary/10">
              <Dumbbell className="ml-2 h-4 w-4" />
              برنامج التمرين
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="flex-1 h-full data-[state=active]:bg-secondary/10">
              <Utensils className="ml-2 h-4 w-4" />
              النظام الغذائي
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="workout" className="mt-0 p-6">
            <div>
              <h3 className="text-xl font-medium mb-4 text-primary flex items-center">
                <Dumbbell className="ml-2 h-5 w-5" />
                {workoutType}
              </h3>
              
              <div className="space-y-3">
                {workoutSummary.map((item, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg transition-all ${
                      hoveredItem === index 
                        ? 'bg-primary/10 shadow-md' 
                        : 'bg-neutral-50 dark:bg-neutral-800'
                    }`}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex items-start">
                      <div className="ml-3 mt-1">
                        {hoveredItem === index ? (
                          <ArrowRight className="h-5 w-5 text-primary" />
                        ) : isLocked ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Lock className="h-5 w-5 text-amber-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>لا يمكن وضع علامة إتمام على يوم مستقبلي</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-primary/70" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">{item.name}</h4>
                        <p className="text-neutral-600 dark:text-neutral-300 text-sm mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-0 p-6">
            <div>
              <h3 className="text-xl font-medium mb-4 text-secondary flex items-center">
                <Utensils className="ml-2 h-5 w-5" />
                خطة الوجبات
              </h3>
              
              <div className="space-y-3">
                {mealSummary.map((meal, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg transition-all ${
                      hoveredItem === index 
                        ? 'bg-secondary/10 shadow-md' 
                        : 'bg-neutral-50 dark:bg-neutral-800'
                    }`}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex items-start">
                      <div className="ml-3 mt-1">
                        {hoveredItem === index ? (
                          <ArrowRight className="h-5 w-5 text-secondary" />
                        ) : isLocked ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Lock className="h-5 w-5 text-amber-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>لا يمكن وضع علامة إتمام على يوم مستقبلي</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-secondary/70" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary">{meal.meal}</h4>
                        <p className="text-neutral-600 dark:text-neutral-300 text-sm mt-1">
                          {meal.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
