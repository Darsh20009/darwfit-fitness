import { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Leaf, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: t.common.error,
        description: t.auth.fillAllFields,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("auth", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        toast({
          title: t.common.success,
          description: t.auth.loginSuccess,
        });
        setLocation("/dashboard");
      } else {
        const error = await response.json();
        toast({
          title: t.common.error,
          description: error.error || t.auth.loginError,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: t.common.error,
        description: t.auth.loginError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-slate-900 dark:from-black dark:to-slate-950">
      <Card className="w-full max-w-md mx-4 p-8 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-center mb-8">
          <Leaf className="w-8 h-8 text-green-600 mr-2" />
          <h1 className="text-3xl font-bold text-green-600">Darwfit</h1>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
          {t.auth.login}
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
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
            <label className="block text-sm font-medium mb-2 text-foreground">
              {t.auth.password}
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.auth.passwordPlaceholder}
                data-testid="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            data-testid="button-login"
          >
            {loading ? t.common.loading : t.auth.login}
          </Button>
        </form>

        <div className="mt-6 space-y-3 text-center">
          <p className="text-muted-foreground text-sm">
            {t.auth.dontHaveAccount}{" "}
            <button
              onClick={() => setLocation("/signup")}
              className="text-green-600 hover:text-green-700 font-semibold"
              data-testid="link-signup"
            >
              {t.auth.signup}
            </button>
          </p>
          
          <button
            onClick={() => setLocation("/")}
            className="flex items-center justify-center w-full text-muted-foreground hover:text-foreground gap-2 text-sm"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.common.back}
          </button>
        </div>
      </Card>
    </div>
  );
}
