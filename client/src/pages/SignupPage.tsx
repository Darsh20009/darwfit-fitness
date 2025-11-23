import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Leaf, ArrowLeft, ChevronRight } from "lucide-react";

type Step = "basic" | "goals" | "details";

export default function SignupPage() {
  const [step, setStep] = useState<Step>("basic");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Basic Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Goals
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("male");
  const [goal, setGoal] = useState("lose-weight");

  // Details
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("75");
  const [targetWeight, setTargetWeight] = useState("70");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [preferredExercises, setPreferredExercises] = useState<string[]>([]);
  const [maxWeight, setMaxWeight] = useState("20");

  const exerciseOptions = [
    { id: "cardio", label: "تمارين القلب والجري" },
    { id: "weights", label: "رفع الأثقال" },
    { id: "yoga", label: "اليوغا والمرونة" },
    { id: "sports", label: "الرياضات الجماعية" },
    { id: "home", label: "تمارين في البيت" },
  ];

  const toggleExercise = (id: string) => {
    setPreferredExercises(
      preferredExercises.includes(id)
        ? preferredExercises.filter(e => e !== id)
        : [...preferredExercises, id]
    );
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "خطأ",
        description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        variant: "destructive",
      });
      return;
    }

    if (preferredExercises.length === 0) {
      toast({
        title: "خطأ",
        description: "اختر تمارين واحدة على الأقل",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password,
          name,
          age: parseInt(age),
          gender,
          height: parseInt(height),
          weight: parseInt(weight),
          primaryGoal: goal,
          activityLevel,
          budget: 0,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("auth", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Save user preferences
        localStorage.setItem("userProfile", JSON.stringify({
          targetWeight: parseInt(targetWeight),
          experienceLevel,
          preferredExercises,
          maxWeight: parseInt(maxWeight),
        }));

        toast({
          title: "نجاح",
          description: "تم إنشاء حسابك بنجاح! سيتم نقلك للوحة التحكم",
        });
        
        setTimeout(() => {
          setLocation("/dashboard");
        }, 1000);
      } else {
        const error = await response.json();
        toast({
          title: "خطأ",
          description: error.error || "فشل إنشاء الحساب",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-green-600">Darwfit</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            إنشاء حساب جديد
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            خطة 3 خطوات لإنشاء خطتك المخصصة
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          <div
            className={`flex-1 h-2 rounded-full transition-colors ${
              step === "basic" || step === "goals" || step === "details"
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          />
          <div
            className={`flex-1 h-2 rounded-full transition-colors ${
              step === "goals" || step === "details"
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          />
          <div
            className={`flex-1 h-2 rounded-full transition-colors ${
              step === "details" ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        </div>

        <Card className="p-8 dark:bg-gray-900 dark:border-gray-800">
          {/* Step 1: Basic Info */}
          {step === "basic" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  معلومات أساسية
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  الاسم الكامل
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أحمد محمد"
                  data-testid="input-name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  البريد الإلكتروني
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  كلمة المرور
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  تأكيد كلمة المرور
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-confirm-password"
                />
              </div>

              <Button
                onClick={() => setStep("goals")}
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-between"
                data-testid="button-next-goals"
              >
                التالي
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === "goals" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  أهدافك ومعلومات صحتك
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    العمر
                  </label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="15"
                    max="100"
                    data-testid="input-age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    النوع
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    data-testid="select-gender"
                  >
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-white">
                  ما هدفك الرئيسي؟
                </label>
                <div className="space-y-2">
                  {[
                    { id: "lose-weight", label: "فقدان الوزن" },
                    { id: "gain-muscle", label: "بناء العضلات" },
                    { id: "maintain", label: "الحفاظ على الوزن" },
                    { id: "improve-fitness", label: "تحسين اللياقة البدنية" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setGoal(opt.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                        goal === opt.id
                          ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                      data-testid={`goal-${opt.id}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setStep("basic")}
                  variant="outline"
                  className="dark:text-white dark:border-gray-700"
                  data-testid="button-back-basic"
                >
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  رجوع
                </Button>
                <Button
                  onClick={() => setStep("details")}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  data-testid="button-next-details"
                >
                  التالي
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === "details" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  تفاصيل اللياقة البدنية
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    الطول (سم)
                  </label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    data-testid="input-height"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    الوزن الحالي (كجم)
                  </label>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    data-testid="input-weight"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    الوزن المستهدف (كجم)
                  </label>
                  <Input
                    type="number"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                    data-testid="input-target-weight"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    أقصى وزن تشيله (كجم)
                  </label>
                  <Input
                    type="number"
                    value={maxWeight}
                    onChange={(e) => setMaxWeight(e.target.value)}
                    data-testid="input-max-weight"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  مستوى النشاط
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  data-testid="select-activity"
                >
                  <option value="sedentary">قليل جداً (مكتبي)</option>
                  <option value="light">خفيف (1-3 أيام)</option>
                  <option value="moderate">متوسط (3-5 أيام)</option>
                  <option value="active">مرتفع (5-6 أيام)</option>
                  <option value="very-active">جداً مرتفع (يومي)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-white">
                  التمارين المفضلة (اختر واحد على الأقل)
                </label>
                <div className="space-y-2">
                  {exerciseOptions.map((exercise) => (
                    <button
                      key={exercise.id}
                      onClick={() => toggleExercise(exercise.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-colors text-left font-medium ${
                        preferredExercises.includes(exercise.id)
                          ? "border-green-600 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                          : "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                      }`}
                      data-testid={`exercise-${exercise.id}`}
                    >
                      {preferredExercises.includes(exercise.id) && "✓ "}
                      {exercise.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setStep("goals")}
                  variant="outline"
                  className="dark:text-white dark:border-gray-700"
                  data-testid="button-back-goals"
                >
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  رجوع
                </Button>
                <Button
                  onClick={handleSignup}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  data-testid="button-create-account"
                >
                  {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
                </Button>
              </div>
            </div>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-600 dark:text-gray-400">
              لديك حساب بالفعل؟{" "}
              <button
                onClick={() => setLocation("/login")}
                className="text-green-600 hover:text-green-700 font-semibold"
                data-testid="link-login"
              >
                تسجيل الدخول
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
