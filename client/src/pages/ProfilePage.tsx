import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Edit2, Save, Camera, Settings, Zap, TrendingUp } from "lucide-react";

export default function ProfilePage() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: language === "ar" ? "أحمد السعيد" : "Ahmed Al-Saeed",
    email: "ahmed@example.com",
    phone: "+966501234567",
    location: language === "ar" ? "الرياض، السعودية" : "Riyadh, Saudi Arabia",
    age: 28,
    height: 180,
    weight: 75,
    goal: language === "ar" ? "بناء العضلات" : "Build Muscle"
  });

  const [edited, setEdited] = useState(profile);

  const handleSave = () => {
    setProfile(edited);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2">{t.profile.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{language === "ar" ? "أدر حسابك وملفك الشخصي" : "Manage your account and profile"}</p>
          </div>
          <Button
            onClick={() => setLocation("/settings")}
            variant="outline"
            className="gap-2 dark:border-gray-700 dark:text-white"
            data-testid="button-go-settings"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">{t.settings.title}</span>
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="p-6 sm:p-8 mb-8 text-center dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-blue-100 to-green-50">
          <div className="relative mb-6">
            <div className="w-24 sm:w-28 h-24 sm:h-28 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto flex items-center justify-center text-5xl sm:text-6xl text-white shadow-lg">
              👨‍💼
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-1/2 translate-x-14 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all" data-testid="button-change-avatar">
                <Camera className="w-5 h-5 text-blue-600" />
              </button>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">{profile.name}</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-4 h-4" />
            {profile.location}
          </p>
          <div className="flex gap-2 justify-center">
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                data-testid="button-edit-profile-main"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {language === "ar" ? "تعديل" : "Edit"}
              </Button>
            )}
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                {t.profile.contactInfo}
              </h3>

              <div className="space-y-5">
                {[
                  { label: t.profile.email, icon: Mail, value: edited.email, key: "email", type: "email" },
                  { label: t.profile.phone, icon: Phone, value: edited.phone, key: "phone", type: "tel" }
                ].map(item => (
                  <div key={item.key}>
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </label>
                    {isEditing ? (
                      <Input
                        type={item.type}
                        value={item.value}
                        onChange={(e) => setEdited({ ...edited, [item.key]: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600"
                        data-testid={`input-${item.key}`}
                      />
                    ) : (
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-semibold">
                        {item.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 dark:border-green-700/50 text-center">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">{language === "ar" ? "وزنك الحالي" : "Current Weight"}</p>
              <p className="text-3xl font-black text-green-600">{profile.weight}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">kg</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 dark:border-blue-700/50 text-center">
              <User className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">{language === "ar" ? "العمر" : "Age"}</p>
              <p className="text-3xl font-black text-blue-600">{profile.age}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{language === "ar" ? "سنة" : "years"}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 dark:border-purple-700/50 text-center">
              <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">{language === "ar" ? "الطول" : "Height"}</p>
              <p className="text-3xl font-black text-purple-600">{profile.height}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">cm</p>
            </Card>
          </div>
        </div>

        {/* Fitness Info */}
        <Card className="p-6 sm:p-8 mb-8 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            {t.profile.fitnessInfo}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: t.profile.age, value: edited.age, key: "age", unit: language === "ar" ? "سنة" : "years" },
              { label: t.profile.height, value: edited.height, key: "height", unit: "cm" },
              { label: t.profile.weight, value: edited.weight, key: "weight", unit: "kg" },
              { label: t.profile.goal, value: edited.goal, key: "goal", unit: "" }
            ].map(item => (
              <div key={item.key}>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                  {item.label}
                </label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      type={["age", "height", "weight"].includes(item.key) ? "number" : "text"}
                      value={item.value}
                      onChange={(e) => setEdited({ ...edited, [item.key]: ["age", "height", "weight"].includes(item.key) ? Number(e.target.value) : e.target.value })}
                      className="dark:bg-gray-700 dark:border-gray-600 flex-1"
                      data-testid={`input-${item.key}`}
                    />
                    {item.unit && <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold text-sm">{item.unit}</div>}
                  </div>
                ) : (
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-semibold">
                    {item.value} {item.unit}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleSave}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-6"
              data-testid="button-save-profile"
            >
              <Save className="w-5 h-5 mr-2" />
              {t.profile.saveProfile}
            </Button>
            <Button
              onClick={() => {
                setEdited(profile);
                setIsEditing(false);
              }}
              variant="outline"
              className="flex-1 dark:border-gray-700 dark:text-white font-bold py-6"
              data-testid="button-cancel-edit"
            >
              {t.profile.cancelEdit}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
