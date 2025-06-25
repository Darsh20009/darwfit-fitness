// ملفات المستخدمين الشخصية الإبداعية - DARWFIT

export interface UserProfile {
  name: string;
  age: number;
  profession: string;
  fitnessGoal: string;
  personalityType: string;
  motivationalQuote: string;
  favoriteWorkout: string;
  challenges: string[];
  achievements: string[];
  dietStyle: string;
  fitnessLevel: string;
  weeklySchedule: string;
  specialNotes: string;
  avatar: string; // وصف الصورة الرمزية
  backgroundColor: string;
  textColor: string;
}

// محمد السهلي - المحترف المتوازن
export const mohammedAlSahliProfile: UserProfile = {
  name: "محمد السهلي",
  age: 32,
  profession: "مهندس برمجيات",
  fitnessGoal: "تحسين الصحة العامة والحفاظ على اللياقة",
  personalityType: "منضبط ومتوازن - يحب الثبات والروتين",
  motivationalQuote: "النجاح هو مجموع الجهود الصغيرة المتكررة يوماً بعد يوم",
  favoriteWorkout: "تمارين المقاومة الكاملة مع الكارديو المتوسط",
  challenges: [
    "ضغط العمل والجلوس طويلاً أمام الكمبيوتر",
    "إيجاد التوازن بين العمل والتمرين",
    "المحافظة على الانضباط في النظام الغذائي"
  ],
  achievements: [
    "خسارة 15 كيلو في 8 أشهر",
    "المواظبة على التمرين 5 أيام أسبوعياً لسنة كاملة",
    "تحسن واضح في قوة التحمل والمرونة",
    "اتباع نظام غذائي متوازن بنجاح"
  ],
  dietStyle: "نظام متوازن يركز على البروتين والخضار مع كاربوهيدرات معقدة",
  fitnessLevel: "متوسط إلى متقدم",
  weeklySchedule: "5 أيام تمرين، يومان راحة - يفضل التمرين الصباحي",
  specialNotes: "يحتاج تمارين لتقوية الظهر والرقبة بسبب طبيعة العمل المكتبي",
  avatar: "رجل في الثلاثينات، نظارات، ابتسامة واثقة، يرتدي ملابس رياضية عملية",
  backgroundColor: "#1a365d", // أزرق داكن مهني
  textColor: "#ffffff"
};

// يوسف درويش - الطموح النشط
export const yousefDarwishProfile: UserProfile = {
  name: "يوسف درويش",
  age: 28,
  profession: "مدير مبيعات",
  fitnessGoal: "بناء عضلات واضحة وتحسين الشكل الجسماني",
  personalityType: "طموح ونشط - يحب التحديات والتغيير",
  motivationalQuote: "القوة لا تأتي من القدرة الجسدية، بل من الإرادة التي لا تقهر",
  favoriteWorkout: "تمارين القوة وبناء العضلات مع تحديات جديدة",
  challenges: [
    "جدول عمل متغير ومواعيد كثيرة مع العملاء",
    "الرغبة في نتائج سريعة أحياناً",
    "التوازن بين الحياة الاجتماعية والتمرين"
  ],
  achievements: [
    "زيادة 8 كيلو كتلة عضلية في 6 أشهر",
    "رفع أوزان أثقل بنسبة 40% من البداية",
    "تحسن كبير في شكل الجسم والثقة بالنفس",
    "إلهام أصدقائه للبدء في الرياضة"
  ],
  dietStyle: "نظام عالي البروتين مع وجبات متكررة لدعم نمو العضلات",
  fitnessLevel: "متوسط ومتطور بسرعة",
  weeklySchedule: "6 أيام تمرين، يوم واحد راحة - مرونة في الأوقات",
  specialNotes: "يستجيب جيداً للتحديات الجديدة ويحب تتبع التقدم رقمياً",
  avatar: "رجل شاب في أواخر العشرينات، عضلات واضحة، ابتسامة مشرقة، طاقة عالية",
  backgroundColor: "#c53030", // أحمر قوي للطموح
  textColor: "#ffffff"
};

// خالد عمر سعيد - الشاب الواعد
export const khaledOmarProfile: UserProfile = {
  name: "خالد عمر سعيد",
  age: 15,
  profession: "طالب ثانوي",
  fitnessGoal: "بناء جسم قوي وصحي مع زيادة الكتلة العضلية بطريقة آمنة",
  personalityType: "شاب متحمس ومتعلم - يحب المعرفة والتطبيق العلمي",
  motivationalQuote: "الشباب قوة، والرياضة تصنع الأبطال، والانضباط يحقق الأحلام",
  favoriteWorkout: "تمارين الجسم الكامل مع التركيز على التقنية الصحيحة",
  challenges: [
    "التوازن بين الدراسة والتمرين والراحة",
    "إيجاد نظام غذائي مناسب للعمر وغير مكلف للأسرة",
    "تجنب الإفراط في التمرين في سن النمو"
  ],
  achievements: [
    "بناء عادات رياضية صحيحة منذ سن مبكرة",
    "تعلم التقنيات الصحيحة للتمارين",
    "زيادة الطول والوزن بشكل صحي ومتوازن",
    "إلهام زملائه في المدرسة للاهتمام بالرياضة"
  ],
  dietStyle: "نظام نمو صحي غني بالبروتين والكالسيوم مع مراعاة الميزانية",
  fitnessLevel: "مبتدئ إلى متوسط مع إمكانيات عالية",
  weeklySchedule: "5-6 أيام تمرين، راحة كافية للنمو - أوقات مرنة حسب الدراسة",
  specialNotes: "يحتاج تركيز خاص على النمو الصحي والتغذية المناسبة للمراهقين مع الانتباه للميزانية",
  avatar: "شاب مراهق طويل وقوي، عيون متطلعة، يرتدي ملابس رياضية حديثة",
  backgroundColor: "#38a169", // أخضر للنمو والطموح
  textColor: "#ffffff"
};

export const allUserProfiles = {
  "محمد السهلي": mohammedAlSahliProfile,
  "يوسف درويش": yousefDarwishProfile,
  "خالد عمر": khaledOmarProfile
};

export function getUserProfile(username: string): UserProfile | null {
  return allUserProfiles[username as keyof typeof allUserProfiles] || null;
}

export function getUserMotivation(username: string): string {
  const profile = getUserProfile(username);
  return profile?.motivationalQuote || "اجعل كل يوم خطوة نحو هدفك!";
}

export function getUserChallenges(username: string): string[] {
  const profile = getUserProfile(username);
  return profile?.challenges || [];
}

export function getUserAchievements(username: string): string[] {
  const profile = getUserProfile(username);
  return profile?.achievements || [];
}

export function getUserFitnessStats(username: string) {
  const profile = getUserProfile(username);
  if (!profile) return null;
  
  return {
    level: profile.fitnessLevel,
    goal: profile.fitnessGoal,
    schedule: profile.weeklySchedule,
    dietStyle: profile.dietStyle
  };
}