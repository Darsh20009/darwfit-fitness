import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { AlertTriangle } from "lucide-react";

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("اسم المستخدم أو كلمة المرور غير صحيحة");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check login with the correct credentials combo
    if (username === "محمد السهلي") {
      if (password !== "123456" || subscriptionId !== "5001") {
        setError(true);
        setErrorMessage("اسم المستخدم أو كلمة المرور أو رقم الاشتراك غير صحيح");
        return;
      }
    } else if (username === "يوسف درويش") {
      if (password !== "182009" || subscriptionId !== "2009") {
        setError(true);
        setErrorMessage("اسم المستخدم أو كلمة المرور أو رقم الاشتراك غير صحيح");
        return;
      }
    } else {
      // For other users, check credentials
      if (password !== "123456") {
        setError(true);
        setErrorMessage("اسم المستخدم أو كلمة المرور غير صحيحة");
        return;
      }
    }
    
    // Login credentials check
    const isSuccess = login(username, password);
    
    if (isSuccess) {
      navigate("/dashboard");
      setError(false);
    } else {
      setError(true);
      setErrorMessage("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-70px)] flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
          <CardDescription className="text-center">
            قم بتسجيل الدخول للوصول إلى لوحة التحكم
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subscriptionId">رقم الاشتراك</Label>
              <Input 
                id="subscriptionId" 
                placeholder="مثال: 5001" 
                value={subscriptionId}
                onChange={(e) => setSubscriptionId(e.target.value)}
              />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mr-1">
                * يتم استلام رقم الاشتراك بعد إتمام عملية الدفع
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-md flex items-center text-sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {errorMessage}
              </div>
            )}
            
            <CardFooter className="flex justify-between px-0 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="ml-2 h-4 w-4" />
                رجوع
              </Button>
              <Button 
                type="submit" 
                className="bg-secondary hover:bg-secondary-dark"
              >
                تسجيل الدخول
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
