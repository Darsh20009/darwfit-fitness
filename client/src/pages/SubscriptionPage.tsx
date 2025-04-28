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
      // First, send data to API endpoint
      await apiRequest('POST', '/api/subscription', data);
      
      // Then, open WhatsApp with the form data
      const whatsappMessage = `
🏋️‍♂️ *استبيان اشتراك جديد في داروفت* 🏋️‍♂️

الاسم: ${data.name}
العمر: ${data.age}
الجنس: ${data.gender === 'male' ? 'ذكر' : 'أنثى'}
الوزن: ${data.weight} كجم
الطول: ${data.height} سم
رقم الجوال: ${data.phone}
الهدف: ${getGoalInArabic(data.goal as string)}

تفاصيل الأكل: ${data.food_details}

تفاصيل التمرين: ${data.exercise_details}

سعر الاشتراك: 5000 ريال لمدة 3 أشهر
      `;

      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Open WhatsApp with the prepared message
      window.open(`https://api.whatsapp.com/send/?phone=201155201921&text=${encodedMessage}&type=phone_number&app_absent=0`, '_blank');
      
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
  
  // Helper function to convert goal to Arabic
  const getGoalInArabic = (goal: string): string => {
    switch(goal) {
      case 'lose_weight': 
        return 'خسارة الوزن';
      case 'gain_muscle': 
        return 'بناء العضلات';
      case 'maintain': 
        return 'المحافظة على الوزن الحالي';
      case 'improve_fitness': 
        return 'تحسين اللياقة البدنية';
      default:
        return goal;
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
              باقات الاشتراك
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* 1 Month Plan */}
            <Card className="border-2 hover:border-primary transition-colors duration-300 hover:shadow-md">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg text-center">شهر واحد (30 يوم)</CardTitle>
                <div className="mt-2 text-center">
                  <span className="text-2xl font-bold text-primary">50</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400"> ريال</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>خطة غذائية مخصصة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>برنامج تدريبي</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* 3 Month Plan */}
            <Card className="border-2 border-primary bg-primary/5 hover:shadow-md">
              <div className="bg-primary text-white text-center py-1 text-xs font-bold">
                الأكثر شعبية
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg text-center">3 شهور (90 يوم)</CardTitle>
                <div className="mt-2 text-center">
                  <span className="text-2xl font-bold text-primary">100</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400"> ريال</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>خطة غذائية مخصصة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>برنامج تدريبي متكامل</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>متابعة أسبوعية</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* 6 Month Plan */}
            <Card className="border-2 hover:border-primary transition-colors duration-300 hover:shadow-md">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg text-center">6 شهور (180 يوم)</CardTitle>
                <div className="mt-2 text-center">
                  <span className="text-2xl font-bold text-primary">200</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400"> ريال</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>جميع مزايا الباقة السابقة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>متابعة شهرية مع المدرب</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>خصم 20% على التجديد</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* 12 Month Plan */}
            <Card className="border-2 hover:border-primary transition-colors duration-300 hover:shadow-md">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg text-center">سنة كاملة (365 يوم)</CardTitle>
                <div className="mt-2 text-center">
                  <span className="text-2xl font-bold text-primary">500</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400"> ريال</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>جميع المزايا السابقة</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>تواصل مباشر مع المدرب</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    <span>خصم 30% على التجديد</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-bold text-primary mb-2">مميزات الاشتراك</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-primary">
                  <CheckCircle className="h-4 w-4 ml-2" />
                  <span className="font-medium">برنامج غذائي مخصص</span>
                </div>
                <div className="flex items-center text-primary">
                  <CheckCircle className="h-4 w-4 ml-2" />
                  <span className="font-medium">برنامج تدريبي متكامل</span>
                </div>
                <div className="flex items-center text-primary">
                  <CheckCircle className="h-4 w-4 ml-2" />
                  <span className="font-medium">حاسبة سعرات حرارية</span>
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
          <form id="subscriptionForm" onSubmit={handleSubmit} className="space-y-8">
            {/* القسم الأول: بيانات عامة */}
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">أولاً: بيانات عامة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل (اختياري)</Label>
                  <Input id="name" name="name" />
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
                  <Label htmlFor="weight">الوزن الحالي (كجم)</Label>
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

                <div className="space-y-2">
                  <Label>هدفك الأساسي</Label>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="radio" 
                        id="goal_lose_weight" 
                        name="main_goal" 
                        value="lose_weight"
                        className="ml-2"
                        required
                      />
                      <Label htmlFor="goal_lose_weight" className="font-normal">نزول وزن</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="radio" 
                        id="goal_gain_weight" 
                        name="main_goal" 
                        value="gain_weight"
                        className="ml-2"
                      />
                      <Label htmlFor="goal_gain_weight" className="font-normal">زيادة وزن</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="radio" 
                        id="goal_muscle" 
                        name="main_goal" 
                        value="build_muscle"
                        className="ml-2"
                      />
                      <Label htmlFor="goal_muscle" className="font-normal">بناء عضل</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="radio" 
                        id="goal_fitness" 
                        name="main_goal" 
                        value="fitness"
                        className="ml-2"
                      />
                      <Label htmlFor="goal_fitness" className="font-normal">لياقة وصحة عامة</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            
            {/* القسم الثاني: العادات اليومية الغذائية */}
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">ثانياً: العادات اليومية الغذائية</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="meals_count">كم وجبة رئيسية تتناول يومياً؟</Label>
                  <Select name="meals_count" required>
                    <SelectTrigger id="meals_count">
                      <SelectValue placeholder="اختر عدد الوجبات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5 أو أكثر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="snacks_count">كم وجبة خفيفة (سناك) تتناول؟</Label>
                  <Select name="snacks_count" required>
                    <SelectTrigger id="snacks_count">
                      <SelectValue placeholder="اختر عدد الوجبات الخفيفة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4 أو أكثر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="breakfast_time">متى تتناول وجبة الإفطار عادة؟</Label>
                  <Select name="breakfast_time" required>
                    <SelectTrigger id="breakfast_time">
                      <SelectValue placeholder="اختر الوقت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early">قبل الساعة 7 صباحاً</SelectItem>
                      <SelectItem value="normal">7-9 صباحاً</SelectItem>
                      <SelectItem value="late">9-11 صباحاً</SelectItem>
                      <SelectItem value="very_late">بعد 11 صباحاً</SelectItem>
                      <SelectItem value="skip">لا أتناول وجبة الإفطار</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>هل تتناول وجبة قبل النوم؟</Label>
                  <div className="flex space-x-4 space-x-reverse pt-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="radio" 
                        id="pre_sleep_yes" 
                        name="pre_sleep_meal" 
                        value="yes"
                        className="ml-2"
                        required
                      />
                      <Label htmlFor="pre_sleep_yes" className="font-normal">نعم</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="radio" 
                        id="pre_sleep_no" 
                        name="pre_sleep_meal" 
                        value="no"
                        className="ml-2"
                      />
                      <Label htmlFor="pre_sleep_no" className="font-normal">لا</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="water_count">كم كوب ماء تشرب يومياً تقريباً؟</Label>
                  <Select name="water_count" required>
                    <SelectTrigger id="water_count">
                      <SelectValue placeholder="اختر العدد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2</SelectItem>
                      <SelectItem value="3-4">3-4</SelectItem>
                      <SelectItem value="5-6">5-6</SelectItem>
                      <SelectItem value="7-8">7-8</SelectItem>
                      <SelectItem value="more">أكثر من 8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="breakfast_details">ماذا تتناول عادةً في الإفطار؟</Label>
                  <Textarea 
                    id="breakfast_details" 
                    name="breakfast_details" 
                    placeholder="مثال: بيض - جبنة - فول - خبز أبيض/أسمر - عصير - قهوة - شاي" 
                    rows={2} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lunch_details">ماذا تتناول عادةً في الغداء؟</Label>
                  <Textarea 
                    id="lunch_details" 
                    name="lunch_details" 
                    rows={2} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dinner_details">ماذا تتناول عادةً في العشاء؟</Label>
                  <Textarea 
                    id="dinner_details" 
                    name="dinner_details" 
                    rows={2} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>السناكات المعتادة:</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="checkbox" 
                        id="snack_nuts" 
                        name="snacks_type" 
                        value="nuts"
                        className="ml-2"
                      />
                      <Label htmlFor="snack_nuts" className="font-normal">مكسرات</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="checkbox" 
                        id="snack_chips" 
                        name="snacks_type" 
                        value="chips"
                        className="ml-2"
                      />
                      <Label htmlFor="snack_chips" className="font-normal">شيبس</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="checkbox" 
                        id="snack_fruits" 
                        name="snacks_type" 
                        value="fruits"
                        className="ml-2"
                      />
                      <Label htmlFor="snack_fruits" className="font-normal">فواكه</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="checkbox" 
                        id="snack_chocolate" 
                        name="snacks_type" 
                        value="chocolate"
                        className="ml-2"
                      />
                      <Label htmlFor="snack_chocolate" className="font-normal">شوكولاتة</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="checkbox" 
                        id="snack_other" 
                        name="snacks_type" 
                        value="other"
                        className="ml-2"
                      />
                      <Label htmlFor="snack_other" className="font-normal">أخرى</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="other_snacks">أنواع سناكات أخرى (إذا وجدت)</Label>
                  <Input id="other_snacks" name="other_snacks" />
                </div>
              </div>
            </div>

            <Separator />
          
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
