import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Edit2, Save, Camera } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "أحمد السعيد",
    email: "ahmed@example.com",
    phone: "+966501234567",
    location: "الرياض، السعودية",
    age: 28,
    height: 180,
    weight: 75,
    goal: "بناء العضلات"
  });

  const [edited, setEdited] = useState(profile);

  const handleSave = () => {
    setProfile(edited);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with Avatar */}
        <Card className="p-8 mb-8 text-center dark:bg-gray-800 dark:border-gray-700 bg-gradient-to-br from-teal-100 to-green-50">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-green-500 rounded-full mx-auto flex items-center justify-center text-5xl text-white">
              👨‍💼
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-1/2 translate-x-12 bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Camera className="w-5 h-5 text-teal-600" />
              </button>
            )}
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{profile.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            {profile.location}
          </p>
        </Card>

        {/* Contact Info */}
        <Card className="p-8 mb-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="w-6 h-6 text-teal-600" />
              معلومات التواصل
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
              data-testid="button-edit-profile"
            >
              <Edit2 className="w-5 h-5 text-teal-600" />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { label: "البريد الإلكتروني", icon: Mail, value: edited.email, key: "email" },
              { label: "رقم الهاتف", icon: Phone, value: edited.phone, key: "phone" }
            ].map(item => (
              <div key={item.key}>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </label>
                {isEditing ? (
                  <Input
                    value={item.value}
                    onChange={(e) => setEdited({ ...edited, [item.key]: e.target.value })}
                    className="dark:bg-gray-700 dark:border-gray-600"
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

        {/* Health Stats */}
        <Card className="p-8 mb-8 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">معلومات اللياقة</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "السن", value: edited.age, key: "age", unit: "سنة" },
              { label: "الطول", value: edited.height, key: "height", unit: "سم" },
              { label: "الوزن الحالي", value: edited.weight, key: "weight", unit: "كجم" },
              { label: "الهدف الرياضي", value: edited.goal, key: "goal", unit: "" }
            ].map(item => (
              <div key={item.key}>
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                  {item.label}
                </label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      type={item.key.includes("age") || item.key.includes("height") || item.key.includes("weight") ? "number" : "text"}
                      value={item.value}
                      onChange={(e) => setEdited({ ...edited, [item.key]: item.key.includes("age") || item.key.includes("height") || item.key.includes("weight") ? Number(e.target.value) : e.target.value })}
                      className="dark:bg-gray-700 dark:border-gray-600 flex-1"
                    />
                    {item.unit && <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold">{item.unit}</div>}
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
          <div className="flex gap-4">
            <Button
              onClick={handleSave}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-6 text-lg"
              data-testid="button-save-profile"
            >
              <Save className="w-5 h-5 mr-2" />
              حفظ التغييرات
            </Button>
            <Button
              onClick={() => {
                setEdited(profile);
                setIsEditing(false);
              }}
              variant="outline"
              className="flex-1 dark:border-gray-700 dark:text-white font-bold py-6 text-lg"
              data-testid="button-cancel-edit"
            >
              إلغاء
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-6 text-lg"
            data-testid="button-edit-profile-main"
          >
            <Edit2 className="w-5 h-5 mr-2" />
            تعديل الملف الشخصي
          </Button>
        )}
      </div>
    </div>
  );
}
