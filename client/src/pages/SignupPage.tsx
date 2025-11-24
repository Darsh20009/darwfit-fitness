import { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
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
  const { t, language } = useLanguage();

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
    { id: "cardio", label: t.auth.cardioExercise },
    { id: "weights", label: t.auth.weightsExercise },
    { id: "yoga", label: t.auth.yogaExercise },
    { id: "sports", label: t.auth.sportsExercise },
    { id: "home", label: t.auth.homeExercise },
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
        title: t.common.error,
        description: t.auth.fillAllFields,
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: t.common.error,
        description: t.auth.passwordMismatch,
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: t.common.error,
        description: t.auth.passwordMinLength,
        variant: "destructive",
      });
      return;
    }

    if (preferredExercises.length === 0) {
      toast({
        title: t.common.error,
        description: t.auth.chooseExerciseError,
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
          title: t.common.success,
          description: t.auth.signupSuccess,
        });
        
        setTimeout(() => {
          setLocation("/dashboard");
        }, 1000);
      } else {
        const error = await response.json();
        toast({
          title: t.common.error,
          description: error.error || t.auth.signupError,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: t.common.error,
        description: t.auth.signupError,
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
            {t.auth.signup}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t.auth.signupSteps}
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
                  {t.auth.basicInfo}
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  {t.auth.fullName}
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.auth.namePlaceholder}
                  data-testid="input-name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  {t.auth.email}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  data-testid="input-email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  {t.auth.password}
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  data-testid="input-password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  {t.auth.confirmPassword}
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  data-testid="input-confirm-password"
                />
              </div>

              <Button
                onClick={() => setStep("goals")}
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-between"
                data-testid="button-next-goals"
              >
                {t.common.next}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === "goals" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.auth.goalsHealth}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    {t.auth.age}
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
                    {t.auth.gender}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    data-testid="select-gender"
                  >
                    <option value="male">{t.auth.male}</option>
                    <option value="female">{t.auth.female}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-white">
                  {t.auth.primaryGoal}
                </label>
                <div className="space-y-2">
                  {[
                    { id: "lose-weight", label: t.auth.loseWeight },
                    { id: "gain-muscle", label: t.auth.gainMuscle },
                    { id: "maintain", label: t.auth.maintainWeight },
                    { id: "improve-fitness", label: t.auth.improveFitness },
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
                  {t.common.back}
                </Button>
                <Button
                  onClick={() => setStep("details")}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  data-testid="button-next-details"
                >
                  {t.common.next}
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
                  {t.auth.fitnessDetails}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    {t.auth.height}
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
                    {t.auth.currentWeight}
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
                    {t.auth.targetWeight}
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
                    {t.auth.maxWeight}
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
                  {t.auth.activityLevel}
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  data-testid="select-activity"
                >
                  <option value="sedentary">{t.auth.sedentaryActivity}</option>
                  <option value="light">{t.auth.lightActivity}</option>
                  <option value="moderate">{t.auth.moderateActivity}</option>
                  <option value="active">{t.auth.activeActivity}</option>
                  <option value="very-active">{t.auth.veryActiveActivity}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-white">
                  {t.auth.preferredExercises}
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
                  {t.common.back}
                </Button>
                <Button
                  onClick={handleSignup}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  data-testid="button-create-account"
                >
                  {loading ? t.auth.creating : t.auth.createAccount}
                </Button>
              </div>
            </div>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-600 dark:text-gray-400">
              {t.auth.alreadyHaveAccount}{" "}
              <button
                onClick={() => setLocation("/login")}
                className="text-green-600 hover:text-green-700 font-semibold"
                data-testid="link-login"
              >
                {t.auth.login}
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
