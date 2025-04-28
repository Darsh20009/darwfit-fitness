import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ArrowLeft, CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SubscriptionPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await apiRequest('POST', '/api/subscription', data);
      
      // Show success modal
      const event = new CustomEvent('subscription-success');
      window.dispatchEvent(event);
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "خطأ في إرسال البيانات",
        description: "حدث خطأ أثناء إرسال الاستبيان، يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-70px)]">
      {/* Subscription Info Card */}
      <Card className="max-w-3xl mx-auto mb-6 border-2 border-primary">
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl md:text-2xl text-primary flex items-center">
              <Info className="h-5 w-5 ml-2" />
              معلومات الاشتراك
            </CardTitle>
            <Badge className="bg-primary text-white px-4 py-1 text-sm">
              5000 ريال سعودي
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-primary">
                <CheckCircle className="h-4 w-4 ml-2" />
                <span className="font-medium">مدة الاشتراك: 3 أشهر</span>
              </div>
              <div className="flex items-center text-primary">
                <CheckCircle className="h-4 w-4 ml-2" />
                <span className="font-medium">برنامج غذائي مخصص</span>
              </div>
              <div className="flex items-center text-primary">
                <CheckCircle className="h-4 w-4 ml-2" />
                <span className="font-medium">برنامج تدريبي متكامل</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-primary">
                <CheckCircle className="h-4 w-4 ml-2" />
                <span className="font-medium">متابعة مستمرة من المدرب</span>
              </div>
              <div className="flex items-center text-primary">
                <CheckCircle className="h-4 w-4 ml-2" />
                <span className="font-medium">تعديلات أسبوعية على البرنامج</span>
              </div>
              <div className="flex items-center text-primary">
                <CheckCircle className="h-4 w-4 ml-2" />
                <span className="font-medium">دعم فني على مدار الساعة</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-secondary/10 text-secondary rounded-md">
            <p className="text-sm">
              * سيتم التواصل معك خلال 24 ساعة بعد تقديم الاستبيان لإكمال عملية الدفع وتفعيل الاشتراك
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Subscription Form Card */}
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl text-center">استبيان الاشتراك الجديد</CardTitle>
          <CardDescription className="text-center">
            يرجى تعبئة المعلومات التالية بدقة لنتمكن من تصميم برنامج يناسب احتياجاتك
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form id="subscriptionForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input id="name" name="name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">العمر</Label>
                <Input id="age" name="age" type="number" min="15" max="80" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">الجنس</Label>
                <Select name="gender" required>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="اختر الجنس" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">الوزن (كجم)</Label>
                <Input 
                  id="weight" 
                  name="weight" 
                  type="number" 
                  step="0.1" 
                  min="30" 
                  max="200" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">الطول (سم)</Label>
                <Input 
                  id="height" 
                  name="height" 
                  type="number" 
                  step="1" 
                  min="100" 
                  max="220" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الجوال</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  dir="ltr" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal">الهدف</Label>
              <Select name="goal" required>
                <SelectTrigger id="goal">
                  <SelectValue placeholder="اختر هدفك" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose_weight">خسارة الوزن</SelectItem>
                  <SelectItem value="gain_muscle">بناء العضلات</SelectItem>
                  <SelectItem value="maintain">المحافظة على الوزن الحالي</SelectItem>
                  <SelectItem value="improve_fitness">تحسين اللياقة البدنية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="food_details">تفاصيل الأكل اليومية</Label>
              <Textarea 
                id="food_details" 
                name="food_details" 
                rows={3} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exercise_details">تفاصيل التمرين</Label>
              <Textarea 
                id="exercise_details" 
                name="exercise_details" 
                rows={3} 
                required 
              />
            </div>
          
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
                className="bg-primary hover:bg-primary-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال الاستبيان"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
