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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-2xl">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">الملف الشخصي غير متاح</h2>
          <p className="text-gray-600 dark:text-gray-400">يرجى تسجيل الدخول للوصول إلى ملفك الشخصي</p>
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Luxury Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl mb-6">
            <div className="text-4xl text-white font-bold">{profile.name.charAt(0)}</div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            الملف الشخصي الإبداعي
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">تجربة مخصصة ومبتكرة لتحقيق أهدافك</p>
        </div>

        {/* Luxury Hero Profile Card */}
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white/80 to-gray-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <CardHeader className="relative z-10 text-center pb-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-2xl animate-pulse">
                  {profile.name.charAt(0)}
                </div>
                <div className="absolute -top-2 -right-2">
                  <Crown className="h-8 w-8 text-amber-500 animate-bounce" />
                </div>
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              {profile.name}
            </CardTitle>
            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
              {profile.profession} • {profile.age} سنة
            </p>
            <div className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full">
              <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">عضو مميز في مجتمع DARWFIT</p>
            </div>
          </CardHeader>
        
          <CardContent className="relative z-10 space-y-8">
            {/* Luxury Motivational Quote */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border border-indigo-200/50 dark:border-indigo-700/50 shadow-lg">
              <div className="absolute top-4 right-4 text-4xl text-indigo-300 dark:text-indigo-600">"</div>
              <div className="absolute bottom-4 left-4 text-4xl text-purple-300 dark:text-purple-600 rotate-180">"</div>
              <p className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200 leading-relaxed relative z-10">
                {profile.motivationalQuote}
              </p>
              <div className="flex justify-center mt-4">
                <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
              </div>
            </div>

            {/* Luxury Key Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute top-4 right-4 p-2 bg-emerald-100 dark:bg-emerald-800/50 rounded-full">
                  <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-2">الهدف الرئيسي</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">{profile.fitnessGoal}</p>
                <div className="mt-3 w-full h-1 bg-emerald-200 dark:bg-emerald-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" style={{width: '85%'}} />
                </div>
              </div>
              
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="absolute top-4 right-4 p-2 bg-blue-100 dark:bg-blue-800/50 rounded-full">
                  <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">مستوى اللياقة</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">{profile.fitnessLevel}</p>
                <div className="mt-3 w-full h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse" style={{width: `${getFitnessLevelProgress(profile.fitnessLevel)}%`}} />
                </div>
              </div>
            </div>

            {/* Luxury Fitness Progress */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200/50 dark:border-violet-700/50 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-100 dark:bg-violet-800/50 rounded-full">
                    <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <span className="text-lg font-bold text-violet-800 dark:text-violet-300">تقدم اللياقة البدنية</span>
                </div>
                <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">{getFitnessLevelProgress(profile.fitnessLevel)}%</span>
              </div>
              <div className="relative">
                <Progress value={getFitnessLevelProgress(profile.fitnessLevel)} className="h-4 bg-violet-100 dark:bg-violet-800" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 rounded-full opacity-75" style={{width: `${getFitnessLevelProgress(profile.fitnessLevel)}%`}} />
              </div>
              <p className="text-sm text-violet-600 dark:text-violet-400 mt-2 text-center">مستوى متميز - استمر في التقدم!</p>
            </div>

            {/* Luxury Personality Type */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-purple-900/20 border border-rose-200/50 dark:border-rose-700/50 shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-200/30 to-transparent rounded-full" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full shadow-lg">
                  {getPersonalityIcon(profile.personalityType)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300 mb-1">نوع الشخصية</h3>
                  <p className="text-sm text-rose-700 dark:text-rose-400 leading-relaxed">{profile.personalityType}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Luxury Achievements Section */}
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-orange-900/20">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  الإنجازات المحققة
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">رحلة النجاح والتميز</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="group relative p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200/50 dark:border-amber-700/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:animate-pulse">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                        {achievement}
                      </p>
                      <div className="mt-2 w-full h-1 bg-amber-100 dark:bg-amber-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse" style={{width: '100%'}} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Luxury Challenges Section */}
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-900/20 dark:via-blue-900/20 dark:to-indigo-900/20">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  التحديات الحالية
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">الطريق نحو التحسن المستمر</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.challenges.map((challenge, index) => (
                <div key={index} className="group relative p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 border border-cyan-200/50 dark:border-cyan-700/50 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                        {challenge}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400">
                        <Zap className="h-3 w-3" />
                        <span>في مرحلة التطوير والتحسين</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Luxury Diet & Schedule Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">نمط التغذية</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative p-4 bg-green-50/50 dark:bg-green-900/30 rounded-xl border border-green-200/50 dark:border-green-700/50">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">{profile.dietStyle}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                  <Flame className="h-3 w-3" />
                  <span>نظام غذائي متوازن ومدروس</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">جدول التمرين</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative p-4 bg-blue-50/50 dark:bg-blue-900/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">{profile.weeklySchedule}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                  <Trophy className="h-3 w-3" />
                  <span>برنامج تدريبي احترافي</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Luxury Special Notes */}
        {profile.specialNotes && (
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-900/20 dark:via-violet-900/20 dark:to-indigo-900/20">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">ملاحظات خاصة</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">إرشادات مخصصة للنجاح</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative p-6 bg-gradient-to-r from-purple-50/50 to-violet-50/50 dark:from-purple-900/30 dark:to-violet-900/30 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                <div className="absolute top-3 right-3 text-2xl text-purple-300 dark:text-purple-600">💡</div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed pr-8">{profile.specialNotes}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                  <Star className="h-3 w-3" />
                  <span>توصيات مخصصة من الخبراء</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Luxury Footer */}
        <div className="text-center py-8">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              شكراً لاختيارك DARWFIT
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              نحن هنا لدعمك في رحلتك نحو تحقيق أهدافك وبناء نمط حياة صحي ومتوازن
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
              <Zap className="h-4 w-4 text-blue-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}