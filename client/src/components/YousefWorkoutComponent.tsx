import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dumbbell, 
  Timer, 
  Target, 
  Trophy, 
  Play, 
  Pause, 
  RotateCcw,
  Flame,
  Heart,
  Zap,
  Star,
  CheckCircle,
  Activity
} from 'lucide-react';
import { 
  getYousefDailyWorkout, 
  getYousefHomeExercises, 
  getYousefWorkoutStats,
  getYousefWorkoutTips,
  type YousefExercise,
  type YousefWorkoutDay 
} from '../data/yousefWorkoutPlans';

interface WorkoutTimerProps {
  exercise: YousefExercise;
  isActive: boolean;
  onComplete: () => void;
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ exercise, isActive, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Extract time from reps if it contains duration
    const timeMatch = exercise.reps.match(/(\d+)\s*دقيقة|(\d+)\s*ثانية/);
    if (timeMatch) {
      const minutes = timeMatch[1] ? parseInt(timeMatch[1]) : 0;
      const seconds = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
      setTimeLeft((minutes * 60) + seconds);
    }
  }, [exercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (timeLeft === 0) return null;

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
      <Timer className="h-4 w-4 text-blue-500 dark:text-blue-400" />
      <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
        {formatTime(timeLeft)}
      </span>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsRunning(!isRunning)}
        className="h-8 w-8 p-0"
      >
        {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setIsRunning(false);
          const timeMatch = exercise.reps.match(/(\d+)\s*دقيقة|(\d+)\s*ثانية/);
          if (timeMatch) {
            const minutes = timeMatch[1] ? parseInt(timeMatch[1]) : 0;
            const seconds = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
            setTimeLeft((minutes * 60) + seconds);
          }
        }}
        className="h-8 w-8 p-0"
      >
        <RotateCcw className="h-3 w-3" />
      </Button>
    </div>
  );
};

interface ExerciseCardProps {
  exercise: YousefExercise;
  index: number;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  index, 
  isCompleted, 
  onToggleComplete 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'مبتدئ': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
      case 'متقدم': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getAnimationClass = (exerciseName: string) => {
    if (exerciseName.includes('🙴')) return 'animate-bicycle';
    if (exerciseName.includes('💪')) return 'animate-pushup';
    if (exerciseName.includes('🏋️‍♂️')) return 'animate-pullup';
    if (exerciseName.includes('🔥')) return 'animate-crunch fire-text';
    if (exerciseName.includes('🦵')) return 'animate-squat';
    if (exerciseName.includes('🏃‍♂️')) return 'animate-running';
    if (exerciseName.includes('🔄')) return 'animate-plank';
    if (exerciseName.includes('🦘')) return 'animate-burpee rocket-boost';
    if (exerciseName.includes('🏄')) return 'animate-mountain-climber lightning-effect';
    if (exerciseName.includes('💎')) return 'animate-pushup diamond-sparkle';
    if (exerciseName.includes('🔄')) return 'animate-plank wave-motion';
    return 'animate-workout-pulse';
  };

  const getExerciseIcon = (exerciseName: string) => {
    if (exerciseName.includes('🙴')) return <Activity className="h-5 w-5 text-white" />;
    if (exerciseName.includes('💪')) return <Dumbbell className="h-5 w-5 text-white" />;
    if (exerciseName.includes('🏋️‍♂️')) return <Dumbbell className="h-5 w-5 text-white" />;
    if (exerciseName.includes('🔥')) return <Flame className="h-5 w-5 text-white" />;
    if (exerciseName.includes('🦵')) return <Dumbbell className="h-5 w-5 text-white" />;
    if (exerciseName.includes('🏃‍♂️')) return <Activity className="h-5 w-5 text-white" />;
    if (exerciseName.includes('🔄')) return <Target className="h-5 w-5 text-white" />;
    if (exerciseName.includes('🦘')) return <Zap className="h-5 w-5 text-white" />;
    if (exerciseName.includes('🏄')) return <Activity className="h-5 w-5 text-white" />;
    if (exerciseName.includes('💎')) return <Star className="h-5 w-5 text-white" />;
    return <Dumbbell className="h-5 w-5 text-white" />;
  };

  return (
    <Card className={`workout-card-hover transition-all duration-500 hover:shadow-lg ${
      isCompleted ? 'bg-green-50 border-green-200 dark:bg-green-900/20 celebrate-completion' : 'hover:shadow-md'
    } ${exercise.difficulty === 'متقدم' ? 'target-focus' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 ${getAnimationClass(exercise.name)}`}>
              {getExerciseIcon(exercise.name)}
            </div>
            <div>
              <CardTitle className={`text-lg font-bold text-right gradient-text ${exercise.name.includes('🔥') ? 'fire-text' : ''}`}>
                {exercise.name}
              </CardTitle>
              <Badge 
                variant="outline" 
                className={`text-xs ${getDifficultyColor(exercise.difficulty)} mt-1`}
              >
                {exercise.difficulty}
              </Badge>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleComplete}
            className={`${isCompleted ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
          >
            {isCompleted ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <div className={`h-4 w-4 border-2 border-gray-400 rounded-full ${getAnimationClass(exercise.icon)}`} />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-right">
          <p className="text-gray-600 dark:text-gray-300 mb-2">{exercise.description}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{exercise.reps}</span>
            </div>
            {exercise.sets && (
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{exercise.sets} مجموعات</span>
              </div>
            )}
          </div>

          <WorkoutTimer 
            exercise={exercise}
            isActive={!isCompleted}
            onComplete={() => {}}
          />
        </div>

        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              العضلات المستهدفة:
            </h4>
            <div className="flex flex-wrap gap-1">
              {exercise.targetMuscles.map((muscle, i) => (
                <Badge key={i} variant="secondary" className="text-xs bg-secondary dark:bg-gray-700 text-secondary-foreground dark:text-gray-300">
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              الفوائد:
            </h4>
            <div className="flex flex-wrap gap-1">
              {exercise.benefits.map((benefit, i) => (
                <Badge key={i} variant="outline" className="text-xs border-border dark:border-gray-600 text-foreground dark:text-gray-300">
                  <Star className="h-3 w-3 mr-1 text-yellow-500 dark:text-yellow-400" />
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function YousefWorkoutComponent() {
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'daily' | 'home'>('daily');
  const [showStats, setShowStats] = useState(false);

  const dailyWorkout = getYousefDailyWorkout();
  const homeExercises = getYousefHomeExercises();
  const stats = getYousefWorkoutStats();
  const tips = getYousefWorkoutTips();

  const toggleExerciseComplete = (index: number) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedExercises(newCompleted);
  };

  const currentExercises = activeTab === 'daily' ? dailyWorkout.exercises : homeExercises;
  const completionPercentage = Math.round((completedExercises.size / currentExercises.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-red-500 to-orange-500 text-white dark:from-red-600 dark:to-orange-600">
        <CardHeader>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full animate-pulse">
                <Star className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold mb-2">
              {dailyWorkout.title}
            </CardTitle>
            <p className="text-white/90 mb-4">{dailyWorkout.description}</p>
            
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                <span>{dailyWorkout.totalDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4" />
                <span>{stats.estimatedCaloriesBurn} سعرة</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>{completionPercentage}% مكتمل</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Bar */}
      <Card className="bg-card dark:bg-gray-800 border border-border dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">تقدم اليوم</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{completedExercises.size} من {currentExercises.length}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'daily' ? 'default' : 'outline'}
          onClick={() => setActiveTab('daily')}
          className="flex-1"
        >
          <Dumbbell className="h-4 w-4 mr-2" />
          البرنامج اليومي
        </Button>
        <Button
          variant={activeTab === 'home' ? 'default' : 'outline'}
          onClick={() => setActiveTab('home')}
          className="flex-1"
        >
          <Heart className="h-4 w-4 mr-2" />
          تمارين بيتية إضافية
        </Button>
      </div>

      {/* Exercises Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            exercise={exercise}
            index={index}
            isCompleted={completedExercises.has(index)}
            onToggleComplete={() => toggleExerciseComplete(index)}
          />
        ))}
      </div>

      {/* Stats Section */}
      <Card className="bg-card dark:bg-gray-800 border border-border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-foreground">
            <span>إحصائيات البرنامج</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStats(!showStats)}
            >
              <Trophy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        {showStats && (
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalExercises}</div>
              <div className="text-sm text-gray-500">إجمالي التمارين</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.estimatedCaloriesBurn}</div>
              <div className="text-sm text-gray-500">سعرة حرارية</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.averageDuration}</div>
              <div className="text-sm text-gray-500">المدة المتوقعة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.weeklyFrequency}</div>
              <div className="text-sm text-gray-500">أسبوعياً</div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Tips Section */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-800/20 border border-border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-300">
            <Zap className="h-5 w-5" />
            نصائح خاصة ليوسف درويش
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-orange-200/50 dark:border-gray-700">
                <div className="p-1 bg-orange-200 dark:bg-orange-900/50 rounded-full mt-1">
                  <Zap className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}