import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Settings, Bell, Lock, Eye, Monitor, Zap, LogOut, Trash2, Save, Eye as EyeIcon, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [savedMessage, setSavedMessage] = useState(false);

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert(t.settings.error);
      return;
    }
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const tabs = [
    { id: "general", label: language === "ar" ? "عام" : "General", icon: "⚙️" },
    { id: "notifications", label: t.settings.notifications, icon: "🔔" },
    { id: "privacy", label: t.settings.privacy, icon: "🔒" },
    { id: "account", label: t.settings.account, icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">{t.settings.title}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{t.settings.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="space-y-2 sticky top-20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full p-3 rounded-lg font-semibold text-left transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  data-testid={`tab-settings-${tab.id}`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 space-y-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <>
                <Card className="p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <span>🌐</span> {t.settings.language}
                  </h2>
                  <div className="space-y-3">
                    {[
                      { code: "ar", label: "العربية" },
                      { code: "en", label: "English" },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as "ar" | "en")}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left font-semibold ${
                          language === lang.code
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300"
                        }`}
                        data-testid={`button-lang-${lang.code}`}
                      >
                        {lang.label}
                        {language === lang.code && <Badge className="ml-auto bg-blue-600">✓ {language === "ar" ? "نشط" : "Active"}</Badge>}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Monitor className="w-5 h-5" /> {t.settings.theme}
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { mode: "light", label: t.settings.light, icon: "☀️" },
                      { mode: "dark", label: t.settings.dark, icon: "🌙" },
                      { mode: "system", label: t.settings.system, icon: "💻" },
                    ].map((themeOption) => (
                      <button
                        key={themeOption.mode}
                        onClick={() => setTheme(themeOption.mode as "light" | "dark" | "system")}
                        className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                          theme === themeOption.mode
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                        data-testid={`button-theme-${themeOption.mode}`}
                      >
                        <div className="text-2xl mb-2">{themeOption.icon}</div>
                        {themeOption.label}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> {t.settings.unitSystem}
                  </h2>
                  <div className="space-y-3">
                    {[
                      { type: "metric", label: t.settings.metric },
                      { type: "imperial", label: t.settings.imperial },
                    ].map((unit) => (
                      <button
                        key={unit.type}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left font-semibold ${
                          true
                            ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            : "border-blue-600 bg-blue-50 dark:bg-blue-900/30"
                        }`}
                        data-testid={`button-unit-${unit.type}`}
                      >
                        {unit.label}
                      </button>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <Card className="p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5" /> {t.settings.dailyReminders}
                </h2>
                <div className="space-y-5">
                  {[
                    { label: t.settings.workoutNotifications, icon: "🏋️" },
                    { label: t.settings.mealNotifications, icon: "🍽️" },
                    { label: t.settings.waterReminders, icon: "💧" },
                    { label: t.settings.azkarReminders, icon: "📿" },
                  ].map((notif, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{notif.icon}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{notif.label}</span>
                      </div>
                      <button
                        className="relative inline-flex h-8 w-14 items-center rounded-full bg-green-600 transition-colors"
                        data-testid={`toggle-notif-${idx}`}
                      >
                        <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform" style={{ marginLeft: "4px" }} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <>
                <Card className="p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Eye className="w-5 h-5" /> {t.settings.dataPrivacy}
                  </h2>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{t.settings.shareData}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{language === "ar" ? "سماح للمتخصصين بتحسين الخدمة" : "Allow specialists to improve the service"}</p>
                      </div>
                      <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300 transition-colors" data-testid="toggle-share-data">
                        <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform" style={{ marginLeft: "4px" }} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{t.settings.backupData}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{language === "ar" ? "نسخ بيانات تلقائية يومية" : "Daily automatic backups"}</p>
                      </div>
                      <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-green-600 transition-colors" data-testid="toggle-backup">
                        <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform" style={{ marginLeft: "4px" }} />
                      </button>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <>
                <Card className="p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5" /> {t.settings.changePassword}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.settings.currentPassword}</label>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600"
                        placeholder="••••••••"
                        data-testid="input-current-password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.settings.newPassword}</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          className="dark:bg-gray-700 dark:border-gray-600"
                          placeholder="••••••••"
                          data-testid="input-new-password"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
                          data-testid="button-toggle-password"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.settings.confirmNewPassword}</label>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        className="dark:bg-gray-700 dark:border-gray-600"
                        placeholder="••••••••"
                        data-testid="input-confirm-password"
                      />
                    </div>
                    {savedMessage && <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-semibold">{t.settings.changeSuccess}</div>}
                    <Button
                      onClick={handlePasswordChange}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4"
                      data-testid="button-change-password"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      {t.settings.changePassword}
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <LogOut className="w-5 h-5" /> {t.settings.logoutAll}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{language === "ar" ? "تسجيل الخروج من جميع الأجهزة الأخرى" : "Log out from all other devices"}</p>
                  <Button
                    variant="outline"
                    className="border-orange-600 dark:border-orange-400 text-orange-600 dark:text-orange-400 font-bold py-4"
                    data-testid="button-logout-all"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    {t.settings.logoutAll}
                  </Button>
                </Card>

                <Card className="p-6 sm:p-8 border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
                  <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" /> {t.settings.deleteAccount}
                  </h2>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">{t.settings.deleteAccountWarning}</p>
                  <Button
                    variant="outline"
                    className="border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold py-4"
                    data-testid="button-delete-account"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    {t.settings.deleteAccount}
                  </Button>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
