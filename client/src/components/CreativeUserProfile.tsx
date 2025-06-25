import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getUserProfile } from "../data/userProfiles";
import { useAuthContext } from "../context/AuthContext";
import { Star, Target, Trophy, Flame, Heart, Zap, Crown, Shield } from "lucide-react";

export default function CreativeUserProfile() {
  const { username } = useAuthContext();
  const profile = getUserProfile(username || "");

  if (!profile) {
    return null;
  }

  const getPersonalityIcon = (type: string) => {
    if (type.includes("منضبط")) return <Shield className="h-5 w-5" />;
    if (type.includes("طموح")) return <Flame className="h-5 w-5" />;
    if (type.includes("متحمس")) return <Zap className="h-5 w-5" />;
    return <Star className="h-5 w-5" />;
  };

  const getFitnessLevelProgress = (level: string) => {
    if (level.includes("مبتدئ")) return 25;
    if (level.includes("متوسط")) return 60;
    if (level.includes("متقدم")) return 90;
    return 50;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Profile Card */}
      <Card 
        className="relative overflow-hidden border-2 shadow-2xl"
        style={{ 
          background: `linear-gradient(135deg, ${profile.backgroundColor}15, ${profile.backgroundColor}25)`,
          borderColor: profile.backgroundColor + "40"
        }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${profile.backgroundColor} 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${profile.backgroundColor} 0%, transparent 50%)`
          }}
        />
        <CardHeader className="relative z-10 text-center pb-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              style={{ backgroundColor: profile.backgroundColor }}
            >
              {profile.name.charAt(0)}
            </div>
            <Crown className="h-8 w-8 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {profile.name}
          </CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {profile.profession} • {profile.age} سنة
          </p>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-6">
          {/* Motivational Quote */}
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
            <p className="text-lg font-semibold italic text-gray-800 dark:text-gray-200">
              "{profile.motivationalQuote}"
            </p>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <Target className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm font-medium text-green-800 dark:text-green-300">الهدف الرئيسي</p>
              <p className="text-xs text-green-600 dark:text-green-400">{profile.fitnessGoal}</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <Heart className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">مستوى اللياقة</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">{profile.fitnessLevel}</p>
            </div>
          </div>

          {/* Fitness Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">تقدم اللياقة البدنية</span>
              <span className="text-sm text-gray-500">{getFitnessLevelProgress(profile.fitnessLevel)}%</span>
            </div>
            <Progress value={getFitnessLevelProgress(profile.fitnessLevel)} className="h-3" />
          </div>

          {/* Personality Type */}
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            {getPersonalityIcon(profile.personalityType)}
            <div>
              <p className="text-sm font-medium text-purple-800 dark:text-purple-300">نوع الشخصية</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">{profile.personalityType}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card className="border-2 border-yellow-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              الإنجازات المحققة
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {profile.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">
                  {achievement}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenges Section */}
      <Card className="border-2 border-red-200 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-red-600" />
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              التحديات الحالية
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profile.challenges.map((challenge, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center mt-1">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 flex-1">
                  {challenge}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Diet & Schedule Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-green-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-400">نمط التغذية</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300">{profile.dietStyle}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-400">جدول التمرين</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300">{profile.weeklySchedule}</p>
          </CardContent>
        </Card>
      </div>

      {/* Special Notes */}
      {profile.specialNotes && (
        <Card className="border-2 border-purple-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-400">ملاحظات خاصة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300">{profile.specialNotes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}