import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  PlusCircle, 
  Apple, 
  Utensils, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Check,
  Trash2,
  Info
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Temporary food database
const foodDatabase = {
  "المطبخ المصري": {
      "كشري": {calories: 350, protein: 8, carbs: 60},
      "فول مدمس": {calories: 132, protein: 7, carbs: 19},
      "طعمية": {calories: 290, protein: 13, carbs: 25},
      "ملوخية": {calories: 95, protein: 6, carbs: 10},
      "بامية": {calories: 85, protein: 5, carbs: 9},
      "مسقعة": {calories: 140, protein: 9, carbs: 12},
      "محشي كرنب": {calories: 165, protein: 7, carbs: 15},
      "رز بالخلطة": {calories: 180, protein: 5, carbs: 35},
      "كبدة اسكندراني": {calories: 180, protein: 25, carbs: 5},
      "حمام محشي": {calories: 300, protein: 28, carbs: 20},
      "رقاق باللحمة": {calories: 385, protein: 22, carbs: 30},
      "سلطة بلدي": {calories: 50, protein: 2, carbs: 8},
      "بابا غنوج": {calories: 70, protein: 3, carbs: 6},
      "طحينة": {calories: 90, protein: 3, carbs: 5},
      "مخلل": {calories: 15, protein: 0, carbs: 3},
      "كوارع": {calories: 400, protein: 35, carbs: 10},
      "ممبار": {calories: 350, protein: 30, carbs: 8},
      "حواوشي": {calories: 280, protein: 18, carbs: 25},
      "فتة": {calories: 450, protein: 15, carbs: 40},
      "كبدة": {calories: 220, protein: 30, carbs: 5},
      "كريب شاورما فراخ": {calories: 480, protein: 28, carbs: 45},
      "كريب شاورما لحم": {calories: 520, protein: 30, carbs: 46},
      "كريب فراخ بالجبنة": {calories: 500, protein: 26, carbs: 48},
      "كريب سوسيس": {calories: 470, protein: 20, carbs: 50},
      "كريب بانيه": {calories: 530, protein: 25, carbs: 52},
      "كريب بسطرمة": {calories: 490, protein: 24, carbs: 46},
      "كريب سلامي": {calories: 480, protein: 22, carbs: 45},
      "كريب ميكس جبن": {calories: 450, protein: 18, carbs: 44},
      "كريب جبنة رومي": {calories: 430, protein: 16, carbs: 42},
      "كريب جبنة موتزاريلا": {calories: 440, protein: 17, carbs: 43},
      "كريب جبنة شيدر": {calories: 450, protein: 18, carbs: 44},
      "كريب جبنة + خضار": {calories: 420, protein: 14, carbs: 40},
      "كريب لحمة مفرومة": {calories: 500, protein: 28, carbs: 46},
      "كريب بطاطس": {calories: 430, protein: 12, carbs: 50},
      "كريب سجق بلدي": {calories: 510, protein: 25, carbs: 48},
      "كريب كبدة اسكندراني": {calories: 490, protein: 27, carbs: 45},
      "كريب جمبري": {calories: 520, protein: 30, carbs: 44},
      "كريب تونة": {calories: 450, protein: 22, carbs: 42},
      "كريب ميكس فراخ + سوسيس": {calories: 530, protein: 28, carbs: 49},
      "كريب كفتة": {calories: 500, protein: 26, carbs: 46},
      "كريب نوتيلا": {calories: 520, protein: 10, carbs: 58},
      "كريب نوتيلا + موز": {calories: 560, protein: 11, carbs: 62},
      "كريب نوتيلا + فراولة": {calories: 570, protein: 11, carbs: 64},
      "كريب نوتيلا + مكسرات": {calories: 600, protein: 12, carbs: 65},
      "كريب بالعسل": {calories: 500, protein: 9, carbs: 60},
      "كريب مربي": {calories: 490, protein: 8, carbs: 55},
      "كريب كراميل": {calories: 510, protein: 9, carbs: 58},
      "كريب زبدة + سكر": {calories: 460, protein: 7, carbs: 52},
      "كريب نوتيلا + مارشميلو": {calories: 590, protein: 10, carbs: 66},
      "أوريو": {calories: 530, protein: 9, carbs: 60},
      "كريب نوتيلا + آيس كريم": {calories: 610, protein: 12, carbs: 68},
      "كريب شوكولاتة بيضاء": {calories: 540, protein: 10, carbs: 62},
      "كريب نوتيلا + كراميل": {calories: 580, protein: 11, carbs: 65},
      "كريب دايت جبنة قريش": {calories: 300, protein: 20, carbs: 28},
      "كريب شوفان + زبادي": {calories: 320, protein: 18, carbs: 30},
      "كريب خضار مشوي": {calories: 340, protein: 10, carbs: 35},
      "كريب سبانخ": {calories: 330, protein: 12, carbs: 34},
      "كريب تونة لايت": {calories: 360, protein: 22, carbs: 32},
      "كريب بزيت الزيتون + جبنة فيتا": {calories: 370, protein: 14, carbs:30},
      "عدس أصفر بشوربة": {calories: 250, protein: 12, carbs: 35},
      "عدس بجبة": {calories: 230, protein: 10, carbs: 32},
      "كشك": {calories: 300, protein: 8, carbs: 40},
      "بيض بلدي مسلوق": {calories: 70, protein: 6, carbs: 1},
      "بيض بالبسطرمة": {calories: 220, protein: 12, carbs: 2},
      "جبنة قديمة": {calories: 110, protein: 6, carbs: 1},
      "جبنة قريش": {calories: 90, protein: 12, carbs: 1},
      "عيش بلدي من الطين": {calories: 160, protein: 4, carbs: 32},
      "طاجن بامية": {calories: 190, protein: 7, carbs: 20},
      "طاجن مسقعة": {calories: 200, protein: 6, carbs: 25},
      "كوسا مطبوخة": {calories: 140, protein: 5, carbs: 18},
      "ملوخية خضرا": {calories: 95, protein: 6, carbs: 10},
      "رز معمر": {calories: 400, protein: 10, carbs: 50},
      "بطاطس في الفرن": {calories: 250, protein: 4, carbs: 30},
      "شوربة لسان عصفور": {calories: 220, protein: 6, carbs: 25},
         // حادق
      "فطير باللحمة المفرومة": {calories: 580, protein: 18, carbs: 40},
      "فطير بالفراخ": {calories: 560, protein: 20, carbs: 42},
      "فطير بالسجق البلدي": {calories: 600, protein: 21, carbs: 41},
      "فطير بالبسطرمة": {calories: 590, protein: 20, carbs: 43},
      "فطير بالكبدة": {calories: 570, protein: 19, carbs: 40},
      "فطير بالتونة": {calories: 540, protein: 18, carbs: 38},
      "فطير بالجبنة الموتزاريلا": {calories: 500, protein: 12, carbs: 37},
      "فطير ميكس جبن": {calories: 530, protein: 15, carbs: 36},
      "فطير جبنة + خضار": {calories: 480, protein: 14, carbs: 35},
      "فطير سبانخ وجبن": {calories: 460, protein: 12, carbs: 34},
      "فطير بطاطس": {calories: 450, protein: 10, carbs: 42},
      "فطير بالبسطرمة والجبنة": {calories: 580, protein: 18, carbs: 39},
        // حلو
      "فطير بالعسل الأبيض": {calories: 500, protein: 7, carbs: 58},
      "فطير بالعسل الأسود": {calories: 510, protein: 8, carbs: 60},
      "فطير بالعسل والطحينة": {calories: 530, protein: 9, carbs: 62},
      "فطير بالسكر البودرة": {calories: 470, protein: 6, carbs: 54},
      "فطير بالمربى": {calories: 490, protein: 7, carbs: 56},
      "فطير بالكاسترد": {calories: 540, protein: 8, carbs: 58},
      "فطير بالشوكولاتة": {calories: 550, protein: 9, carbs: 60},
      "فطير نوتيلا": {calories: 570, protein: 10, carbs: 60},
      "فطير نوتيلا + موز": {calories: 600, protein: 11, carbs: 64},
      "فطير نوتيلا + مكسرات": {calories: 630, protein: 12, carbs: 65},
      "فطير نوتيلا + كراميل": {calories: 640, protein: 12, carbs: 66},
      "فطير زبدة + سكر": {calories: 520, protein: 9, carbs: 57},
          // ميكس / سبيشل
      "فطير ميكس لحوم وجبن": {calories: 640, protein: 25, carbs: 43},
      "فطير سوبر سبيشل (جبن + لحوم + خضار)": {calories: 660, protein: 26, carbs: 45},
      "فطير حادق + حلو (نصفين)": {calories: 700, protein: 28, carbs: 60},
      "فطير شوكولاتة + موز + مكسرات": {calories: 680, protein: 13, carbs: 68},
  },
  "المطبخ السعودي والخليجي": {
      "كبسة لحم": {calories: 320, protein: 25, carbs: 30},
      "مندي دجاج": {calories: 280, protein: 30, carbs: 25},
      "مطبق": {calories: 310, protein: 12, carbs: 35},
      "جريش": {calories: 220, protein: 8, carbs: 30},
      "مرقوق": {calories: 245, protein: 15, carbs: 25},
      "مضغوط": {calories: 290, protein: 22, carbs: 20},
      "معصوب": {calories: 270, protein: 6, carbs: 45},
      "شاكرية": {calories: 190, protein: 5, carbs: 35},
      "مجبوس": {calories: 315, protein: 20, carbs: 30},
      "صالونة": {calories: 225, protein: 18, carbs: 15},
      "تبولة": {calories: 100, protein: 3, carbs: 15},
      "حمص بالطحينة": {calories: 150, protein: 5, carbs: 12},
      "لبنة بالنعناع": {calories: 120, protein: 5, carbs: 8},
      "سليق": {calories: 300, protein: 10, carbs: 40},
      "مفطح": {calories: 500, protein: 40, carbs: 30},
      "قرصان": {calories: 350, protein: 25, carbs: 25},
      "مراصيع": {calories: 280, protein: 18, carbs: 20},
      "فتة تمر": {calories: 200, protein: 3, carbs: 45}
  },
  "المطبخ الشامي": {
     "فتوش": {calories: 120, protein: 3, carbs: 15},
     "تبولة": {calories: 100, protein: 3, carbs: 18},
     "كبة مقلية": {calories: 260, protein: 12, carbs: 20},
     "كبة بالصينية": {calories: 300, protein: 14, carbs: 25},
     "شيش طاووق": {calories: 220, protein: 30, carbs: 5}, 
     "كباب حلبي": {calories: 290, protein: 28, carbs: 6},
     "محشي كوسا": {calories: 190, protein: 7, carbs: 18},
     "مقلوبة": {calories: 280, protein: 10, carbs: 35},
     "يالنجي": {calories: 160, protein: 4, carbs: 22},
     "شاورما دجاج": {calories: 320, protein: 27, carbs: 15},
     "شاورما لحم": {calories: 350, protein: 30, carbs: 12},
     "ورق عنب": {calories: 140, protein: 3, carbs: 20},
     "بابا غنوج": {calories: 80, protein: 3, carbs: 10},
     "حمص باللحمة": {calories: 250, protein: 15, carbs: 18},
      "منسف": {calories: 420, protein: 30, carbs: 35}
  },
  "المطبخ التركي": {
     "إسكندر كباب": {calories: 450, protein: 35, carbs: 30},
     "دونر": {calories: 350, protein: 28, carbs: 25},
     "بوريك": {calories: 320, protein: 10, carbs: 35},
     "كفتة تركية": {calories: 280, protein: 24, carbs: 10},
     "مانتي": {calories: 300, protein: 12, carbs: 35},
     "شوربة عدس": {calories: 150, protein: 7, carbs: 20},
     "سلطة تركية": {calories: 90, protein: 2, carbs: 12},
     "كومبير (بطاطا محشية)": {calories: 400, protein: 10, carbs: 50},
     "سميت": {calories: 260, protein: 6, carbs: 30},
     "كنافة تركية": {calories: 370, protein: 6, carbs: 45},
     "بقلاوة تركية": {calories: 330, protein: 5, carbs: 40},
     "رز بلبن تركي (Sütlaç)": {calories: 220, protein: 6, carbs: 30},
     "عيش باللحم (Lahmacun)": {calories: 280, protein: 14, carbs: 32},
     "بيدا بالجبنة": {calories: 300, protein: 12, carbs: 35},
     "كوشاريك": {calories: 240, protein: 8, carbs: 28}
  },
  "المطبخ الهندي": {
     "برياني دجاج": {calories: 420, protein: 25, carbs: 45},
     "برياني لحم": {calories: 450, protein: 30, carbs: 42},
     "ماسالا دجاج": {calories: 380, protein: 28, carbs: 20},
     "تيكا ماسالا": {calories: 390, protein: 27, carbs: 18},
     "دال (عدس هندي)": {calories: 250, protein: 12, carbs: 30},
     "تشاباتي": {calories: 140, protein: 4, carbs: 20},
     "نان": {calories: 280, protein: 6, carbs: 38},
     "سمبوسة هندية": {calories: 300, protein: 5, carbs: 28},
     "ألو جوبى": {calories: 210, protein: 5, carbs: 25},
     "بالاك بانير": {calories: 330, protein: 12, carbs: 15},
     "كيما": {calories: 360, protein: 22, carbs: 10},
     "كوفتا هندية": {calories: 340, protein: 14, carbs: 20},
     "تشاي ماسالا": {calories: 120, protein: 3, carbs: 15},
     "كاري خضار": {calories: 270, protein: 8, carbs: 22},
     "بانير تيكا": {calories: 300, protein: 15, carbs: 10}
  },
  "المطبخ الصيني": {
     "نودلز بالخضار": {calories: 300, protein: 8, carbs: 40},
     "نودلز بالدجاج": {calories: 350, protein: 18, carbs: 35},
     "أرز مقلي بالخضار": {calories: 320, protein: 10, carbs: 45},
     "أرز مقلي بالدجاج": {calories: 360, protein: 20, carbs: 40},
     "دجاج سويت أند ساور": {calories: 390, protein: 22, carbs: 35},
     "دجاج كونغ باو": {calories: 370, protein: 25, carbs: 30},
     "سبرينغ رول": {calories: 200, protein: 4, carbs: 22},
     "حساء الذرة": {calories: 150, protein: 6, carbs: 18},
     "دامبلينغز": {calories: 280, protein: 10, carbs: 25},
     "توفو بالخضار": {calories: 250, protein: 12, carbs: 20},
     "مانجورين": {calories: 320, protein: 14, carbs: 28},
     "تشاو مين": {calories: 330, protein: 15, carbs: 36},
     "بطة بكين": {calories: 420, protein: 30, carbs: 15},
     "بيف بالخضار": {calories: 370, protein: 28, carbs: 18},
     "فطائر الباو": {calories: 290, protein: 9, carbs: 32}
  },
  "السناكس": {
     "شيبس بطاطس": {calories: 150, protein: 2, carbs: 15},
     "بوشار (فشار)": {calories: 90, protein: 3, carbs: 12},
     "مكسرات مشكلة": {calories: 200, protein: 6, carbs: 8},
     "كوكيز بالشوكولاتة": {calories: 180, protein: 2, carbs: 22},
     "كراكرز مالح": {calories: 120, protein: 3, carbs: 15},
     "باتشيتو": {calories: 140, protein: 2, carbs: 18},
     "سناك جبنة": {calories: 160, protein: 4, carbs: 14},
     "بسكويت شاي": {calories: 100, protein: 1, carbs: 14},
     "مولتو": {calories: 220, protein: 4, carbs: 28},
     "أوريو": {calories: 160, protein: 2, carbs: 20},
     "بسكويت بالتمر": {calories: 130, protein: 2, carbs: 18},
     "برينجلز": {calories: 160, protein: 1, carbs: 17},
     "دوريتوس": {calories: 150, protein: 2, carbs: 16},
     "بسكويت بالزبدة": {calories: 170, protein: 2, carbs: 20},
     "ميني بيتزا سناك": {calories: 210, protein: 5, carbs: 25}
  },
  "المشروبات الطبيعية": {
     "عصير برتقال طازج": {calories: 110, protein: 2, carbs: 25},
     "عصير تفاح طبيعي": {calories: 120, protein: 1, carbs: 28},
     "عصير جوافة": {calories: 140, protein: 2, carbs: 30},
     "عصير مانجو": {calories: 160, protein: 1, carbs: 35},
     "عصير رمان": {calories: 130, protein: 1, carbs: 28},
     "عصير شمام": {calories: 100, protein: 1, carbs: 20},
     "عصير فراولة": {calories: 120, protein: 2, carbs: 25},
     "عصير ليمون": {calories: 90, protein: 1, carbs: 18},
     "كوكتيل فواكه": {calories: 180, protein: 2, carbs: 35},
     "عصير قصب": {calories: 170, protein: 2, carbs: 40},
     "سوبيا طبيعية": {calories: 150, protein: 1, carbs: 35},
     "تمر هندي": {calories: 140, protein: 1, carbs: 30},
     "عرقسوس": {calories: 130, protein: 1, carbs: 28},
     "لبن رايب": {calories: 80, protein: 3, carbs: 10},
     "لبن بالعسل": {calories: 150, protein: 4, carbs: 18}
  },
  "المشروبات الصناعية": {
     "بيبسي": {calories: 150, protein: 0, carbs: 39},
     "كوكاكولا": {calories: 140, protein: 0, carbs: 38},
     "سفن أب": {calories: 140, protein: 0, carbs: 36},
     "ميرندا برتقال": {calories: 160, protein: 0, carbs: 42},
     "فانتا": {calories: 150, protein: 0, carbs: 40},
     "ريد بول": {calories: 110, protein: 1, carbs: 28},
     "مشروب طاقة مونستر": {calories: 120, protein: 0, carbs: 29},
     "عصير معلب مانجو": {calories: 160, protein: 0, carbs: 38},
     "عصير تفاح معلب": {calories: 150, protein: 0, carbs: 36},
     "لبن بنكهات صناعية": {calories: 170, protein: 3, carbs: 28},
     "نسكويك": {calories: 190, protein: 4, carbs: 32},
     "مشروب شوكولاتة بارد": {calories: 210, protein: 5, carbs: 35},
     "شاي مثلج": {calories: 120, protein: 0, carbs: 28},
     "عصير تانج": {calories: 140, protein: 0, carbs: 35},
     "مياه غازية بنكهات": {calories: 100, protein: 0, carbs: 25}
  },
  "المطبخ الياباني": {
     "سوشي": {calories: 300, protein: 15, carbs: 35},
     "رامن": {calories: 450, protein: 18, carbs: 50},
     "ياكيسوبا": {calories: 400, protein: 14, carbs: 45},
     "ترياكي دجاج": {calories: 370, protein: 25, carbs: 25},
     "تمبورا": {calories: 320, protein: 10, carbs: 28},
     "ميسو شوربة": {calories: 80, protein: 3, carbs: 8},
     "اونيغيري": {calories: 180, protein: 4, carbs: 36},
     "تاكوياكي": {calories: 290, protein: 10, carbs: 30},
     "شاشيمي": {calories: 200, protein: 25, carbs: 2},
     "اودون": {calories: 380, protein: 12, carbs: 42},
     "غيوزا": {calories: 240, protein: 10, carbs: 20},
     "شوكو بان": {calories: 220, protein: 5, carbs: 28},
     "موشي": {calories: 170, protein: 3, carbs: 25},
     "كاري ياباني": {calories: 400, protein: 18, carbs: 35},
     "تيبانياكي": {calories: 390, protein: 26, carbs: 15}
  },
  "المطبخ المكسيكي": {
     "تاكو": {calories: 300, protein: 18, carbs: 20},
     "بوريتو": {calories: 500, protein: 30, carbs: 45},
     "كاساديا": {calories: 420, protein: 22, carbs: 35},
     "فاهيتا": {calories: 390, protein: 25, carbs: 30},
     "إنشيلادا": {calories: 400, protein: 20, carbs: 40},
     "تشيميتشانغا": {calories: 450, protein: 22, carbs: 38},
     "غواكامولي": {calories: 150, protein: 2, carbs: 10},
     "ناتشوز بالجبن": {calories: 350, protein: 8, carbs: 35},
     "أرز مكسيكي": {calories: 280, protein: 6, carbs: 45},
     "فاصوليا مكسيكية": {calories: 220, protein: 10, carbs: 25},
     "صوص سالسا": {calories: 50, protein: 1, carbs: 10},
     "سلطة تاكو": {calories: 300, protein: 14, carbs: 20},
     "تشورو": {calories: 270, protein: 3, carbs: 40},
     "تورتيا": {calories: 200, protein: 4, carbs: 30},
     "بيكو دي غايو": {calories: 60, protein: 1, carbs: 8}
  },
  "المطبخ الأمريكي": {
     "ستيك لحم": {calories: 500, protein: 40, carbs: 5},
     "ماك آند تشيز": {calories: 450, protein: 15, carbs: 50},
     "تشكن وينجز": {calories: 390, protein: 25, carbs: 12},
     "كلوب ساندويتش": {calories: 420, protein: 22, carbs: 35},
     "تشيز برجر": {calories: 540, protein: 28, carbs: 38},
     "هوت كيك": {calories: 320, protein: 6, carbs: 40},
     "فرايز بالجبن": {calories: 410, protein: 10, carbs: 42},
     "براونيز": {calories: 360, protein: 5, carbs: 45},
     "كورندوغ": {calories: 310, protein: 12, carbs: 28},
     "سلطة كول سلو": {calories: 180, protein: 2, carbs: 14},
     "دونات أمريكي": {calories: 350, protein: 4, carbs: 50},
     "كورن فليكس بالحليب": {calories: 200, protein: 5, carbs: 30},
     "بطاطا بوريه": {calories: 250, protein: 4, carbs: 35},
     "تشيكن برجر": {calories: 460, protein: 22, carbs: 38},
     "أبل باي": {calories: 370, protein: 3, carbs: 45}
  },
  "أنواع البيتزا": {
    "بيتزا مارجريتا (عجينة إيطالي - بدون أطراف جبن)": {
     calories: 420, protein: 15, carbs: 48
     },
    "بيتزا خضار (عجينة عادية - بدون أطراف جبن)": {
    calories: 450, protein: 14, carbs: 50
   },
     "بيتزا بيبروني (عجينة بان - بأطراف جبن)": {
    calories: 520, protein: 20, carbs: 55
   },
    "بيتزا دجاج باربيكيو (عجينة إيطالي - بأطراف جبن)": {
     calories: 530, protein: 22, carbs: 52
   },
    "بيتزا سي فود (عجينة رقيقة - بدون أطراف جبن)": {
    calories: 480, protein: 24, carbs: 45
   },
    "بيتزا سوبر سوبريم (عجينة بان - بأطراف جبن)": {
    calories: 550, protein: 25, carbs: 58
   },
    "بيتزا جبنة مشكل (عجينة إيطالي - بأطراف جبن)": {
    calories: 500, protein: 21, carbs: 50
   },
    "بيتزا سلامي (عجينة عادية - بدون أطراف جبن)": {
    calories: 470, protein: 19, carbs: 48
   },
    "بيتزا تونة (عجينة رقيقة - بدون أطراف جبن)": {
    calories: 460, protein: 20, carbs: 46
   },
    "بيتزا فاهيتا دجاج (عجينة بان - بأطراف جبن)": {
    calories: 540, protein: 23, carbs: 54
   },
    "بيتزا مشروم (عجينة إيطالي - بدون أطراف جبن)": {
    calories: 430, protein: 16, carbs: 47
   },
    "بيتزا لحم مفروم (عجينة عادية - بأطراف جبن)": {
     calories: 510, protein: 22, carbs: 50
   },
    "بيتزا رانش دجاج (عجينة بان - بأطراف جبن)": {
     calories: 560, protein: 24, carbs: 56
   },
    "بيتزا هاواي (عجينة رقيقة - بدون أطراف جبن)": {
     calories: 490, protein: 18, carbs: 50
   },
    "بيتزا ببروني (عجينة إيطالي - بأطراف جبن)": {
    calories: 530, protein: 22, carbs: 52
   },
  },
  "أنواع البرجر": {
     "برجر لحم كلاسيك (عيش عادي - بدون جبن)": {
      calories: 500, protein: 28, carbs: 35
      },
     "تشيز برجر (عيش عادي - شريحة جبن واحدة)": {
     calories: 540, protein: 30, carbs: 36
     },
     "برجر دبل لحم (عيش بريوش - جبن مزدوج)": {
     calories: 680, protein: 40, carbs: 38
     },
     "برجر دجاج مقلي (عيش عادي - صوص رانش)": {
     calories: 520, protein: 26, carbs: 40
     },
     "برجر دجاج مشوي (عيش توست - بدون صوصات)": {
     calories: 430, protein: 28, carbs: 28
     },
     "سبايسي برجر دجاج (عيش عادي - صوص حار)": {
     calories: 550, protein: 27, carbs: 40
     },
     "برجر مشروم سوس (عيش بريوش - مشروم و جبن)": {
     calories: 600, protein: 32, carbs: 38
     },
     "برجر نباتي (عيش حبوب كاملة - بدون جبن)": {
      calories: 480, protein: 20, carbs: 42
     },
     "برجر بيض وجبن (عيش توست - بيض + شيدر)": {
  calories: 470, protein: 22, carbs: 30
     },
     "برجر ببروني (عيش بريوش - لحم + ببروني)": {
     calories: 620, protein: 35, carbs: 36
     },
     "برجر بجبن موزاريلا (عيش عادي - جبن سايح)": {
      calories: 560, protein: 30, carbs: 35
     },
      "برجر كرسبي (عيش عادي - دجاج مقلي)": {
      calories: 540, protein: 25, carbs: 38
      },
     "برجر تركي (عيش توست - صوص زبادي)": {
      calories: 500, protein: 27, carbs: 33
     },
     "برجر ستيك (عيش بريوش - لحم شرائح)": {
      calories: 620, protein: 38, carbs: 35
     },
     "ميني برجر (صغير الحجم - جبن فقط)": {
     calories: 320, protein: 14, carbs: 28
     },
  },
  "الصوصات": {
     "كاتشب": {calories: 20, protein: 0, carbs: 5},
     "مايونيز": {calories: 90, protein: 0, carbs: 1},
     "مايونيز لايت": {calories: 40, protein: 0, carbs: 1},
     "مستردة": {calories: 10, protein: 0, carbs: 1},
     "صوص باربيكيو": {calories: 40, protein: 0, carbs: 9},
     "صوص رانش": {calories: 70, protein: 1, carbs: 2},
     "صوص ثومية": {calories: 100, protein: 1, carbs: 3},
     "صوص شيدر": {calories: 110, protein: 2, carbs: 3},
     "صوص سويت آند ساور": {calories: 45, protein: 0, carbs: 11},
      "سبايسي مايونيز": {calories: 95, protein: 0, carbs: 2},
     "صوص الفلفل الأسود": {calories: 60, protein: 1, carbs: 4},
     "صوص مشروم": {calories: 90, protein: 2, carbs: 5},
     "صوص بيج تايستي": {calories: 100, protein: 1, carbs: 2},
     "صوص بيج ماك": {calories: 90, protein: 1, carbs: 3},
     "صوص كنتاكي": {calories: 85, protein: 1, carbs: 2},
     "صوص بافلو": {calories: 45, protein: 0, carbs: 1},
     "صوص شطة": {calories: 5, protein: 0, carbs: 1},
     "صوص ترياكي": {calories: 35, protein: 1, carbs: 7},
     "صوص تشيلي": {calories: 40, protein: 0, carbs: 3},
     "صوص البيستو": {calories: 90, protein: 1, carbs: 2},
     "صوص الجبنة الزرقاء": {calories: 120, protein: 2, carbs: 2},
     "صوص كارميل": {calories: 60, protein: 0, carbs: 12},
     "صوص شوكولاتة": {calories: 70, protein: 1, carbs: 10},
     "صوص هوني مسترد": {calories: 60, protein: 0, carbs: 6},
     "صوص فرنسي": {calories: 80, protein: 1, carbs: 4},
     "صوص إيطالي": {calories: 60, protein: 1, carbs: 3},
     "زيت وليمون": {calories: 90, protein: 0, carbs: 1},
     "صوص الزبادي بالنعناع": {calories: 50, protein: 2, carbs: 3},
     "صوص صويا": {calories: 10, protein: 1, carbs: 1},
     "صوص سويت تشيلي": {calories: 60, protein: 0, carbs: 13}
  },
  "الحلويات الغربية": {
     "تشيز كيك": {calories: 350, protein: 6, carbs: 40},
     "براونيز": {calories: 360, protein: 5, carbs: 45},
     "تارت الفواكه": {calories: 330, protein: 4, carbs: 42},
     "موس الشوكولاتة": {calories: 280, protein: 4, carbs: 40},
     "كريب نوتيلا": {calories: 370, protein: 6, carbs: 45},
     "كوكيز أمريكي": {calories: 180, protein: 2, carbs: 24},
     "وافل": {calories: 320, protein: 6, carbs: 45},
     "بان كيك": {calories: 340, protein: 7, carbs: 50},
     "آيس كريم فانيلا": {calories: 210, protein: 3, carbs: 30},
     "كاسترد": {calories: 200, protein: 5, carbs: 35},
     "تيراميسو": {calories: 360, protein: 6, carbs: 38},
     "فروتي بارفيه": {calories: 300, protein: 5, carbs: 40},
     "دونات بالشوكولاتة": {calories: 370, protein: 5, carbs: 48},
     "كعك الزبدة": {calories: 400, protein: 6, carbs: 50},
     "ماربل كيك": {calories: 320, protein: 5, carbs: 38}
  },
  "الحلويات المصرية": {
     "أم علي": {calories: 250, protein: 5, carbs: 35},
     "بسبوسة": {calories: 300, protein: 5, carbs: 45},
     "كنافة": {calories: 350, protein: 6, carbs: 50},
     "بلح الشام": {calories: 280, protein: 4, carbs: 45},
     "قطايف": {calories: 280, protein: 4, carbs: 40},
     "غريبة": {calories: 350, protein: 4, carbs: 50},
     "كحك بالعجوة": {calories: 320, protein: 4, carbs: 40},
     "كحك بالسمن": {calories: 370, protein: 4, carbs: 42},
     "بيتي فور": {calories: 330, protein: 3, carbs: 38},
     "سابليه": {calories: 340, protein: 4, carbs: 36},
     "فطير مشلتت بالعسل": {calories: 420, protein: 6, carbs: 50},
     "زلابية (لقيمات مصرية)": {calories: 300, protein: 3, carbs: 40},
     "أرز باللبن": {calories: 200, protein: 5, carbs: 35},
     "مهلبية": {calories: 180, protein: 4, carbs: 30},
     "سحلب": {calories: 220, protein: 4, carbs: 35}
  },
  "الحلويات اليومية": {
     "كريم كراميل": {calories: 190, protein: 4, carbs: 28},
     "جيلي": {calories: 90, protein: 1, carbs: 20},
     "بودينج شوكولاتة": {calories: 210, protein: 3, carbs: 30},
     "كيكة إسفنجية": {calories: 250, protein: 4, carbs: 35},
     "تشيز كيك": {calories: 350, protein: 6, carbs: 40},
     "بسكويت شاي": {calories: 100, protein: 1, carbs: 14},
     "مولتو": {calories: 220, protein: 4, carbs: 28},
     "وافل محشي شوكولاتة": {calories: 340, protein: 5, carbs: 44},
     "بان كيك بالعسل": {calories: 320, protein: 5, carbs: 38},
     "كريب نوتيلا": {calories: 370, protein: 6, carbs: 45},
     "دونات محشي": {calories: 360, protein: 4, carbs: 46},
     "كوكيز شوكولاتة": {calories: 180, protein: 2, carbs: 24},
     "ماربل كيك": {calories: 320, protein: 5, carbs: 38},
     "كاسترد": {calories: 200, protein: 5, carbs: 35},
     "فروتي بارفيه": {calories: 300, protein: 5, carbs: 40}
  },
  "المخبوزات": {
     "عيش بلدي": {calories: 150, protein: 4, carbs: 30},
     "عيش أبيض": {calories: 140, protein: 4, carbs: 28},
     "عيش توست": {calories: 80, protein: 2, carbs: 15},
     "خبز الشوفان": {calories: 120, protein: 5, carbs: 20},
     "خبز القمح الكامل": {calories: 130, protein: 4, carbs: 24},
     "باتيه بالجبنة": {calories: 240, protein: 6, carbs: 28},
     "كرواسون": {calories: 270, protein: 5, carbs: 30},
     "بيتزا ميني": {calories: 300, protein: 8, carbs: 32},
     "عيش الفينو": {calories: 160, protein: 4, carbs: 30},
     "خبز الباجيت": {calories: 220, protein: 6, carbs: 36},
     "عيش السن": {calories: 110, protein: 6, carbs: 16},
     "خبز التورتيلا": {calories: 150, protein: 4, carbs: 25},
     "خبز الزعتر": {calories: 180, protein: 5, carbs: 22},
     "فطير محشي": {calories: 300, protein: 7, carbs: 35},
     "فطير بالسكر": {calories: 320, protein: 6, carbs: 38}
  },
  "الفواكه": {
     "موز": {calories: 90, protein: 1, carbs: 22},
     "تفاح": {calories: 80, protein: 0, carbs: 20},
     "برتقال": {calories: 60, protein: 1, carbs: 15},
     "عنب": {calories: 70, protein: 0, carbs: 18},
     "جوافة": {calories: 80, protein: 2, carbs: 17},
     "مانجو": {calories: 100, protein: 1, carbs: 25},
     "رمان": {calories: 90, protein: 1, carbs: 20},
     "كمثرى": {calories: 85, protein: 1, carbs: 21},
     "بطيخ": {calories: 30, protein: 1, carbs: 8},
     "شمام": {calories: 35, protein: 1, carbs: 9},
     "فراولة": {calories: 40, protein: 1, carbs: 10},
     "توت": {calories: 50, protein: 1, carbs: 12},
     "أناناس": {calories: 60, protein: 0, carbs: 15},
     "خوخ": {calories: 70, protein: 1, carbs: 18},
     "مشمش": {calories: 50, protein: 1, carbs: 12}
  },
  "السلطات": {
     "سلطة خضراء": {calories: 50, protein: 2, carbs: 8},
     "سلطة زبادي": {calories: 70, protein: 3, carbs: 5},
     "سلطة طحينة": {calories: 90, protein: 3, carbs: 5},
     "سلطة بابا غنوج": {calories: 80, protein: 3, carbs: 6},
     "سلطة يونانية": {calories: 120, protein: 4, carbs: 10},
     "سلطة فتوش": {calories: 100, protein: 2, carbs: 15},
     "سلطة تبولة": {calories: 90, protein: 3, carbs: 14},
     "سلطة سيزر": {calories: 180, protein: 7, carbs: 10},
     "سلطة ملفوف": {calories: 60, protein: 2, carbs: 9},
     "سلطة جرجير": {calories: 40, protein: 2, carbs: 6},
     "سلطة تونة": {calories: 150, protein: 10, carbs: 5},
     "سلطة دجاج مشوي": {calories: 220, protein: 20, carbs: 7},
     "سلطة الشمندر": {calories: 70, protein: 2, carbs: 14},
     "سلطة الحمص": {calories: 160, protein: 6, carbs: 12},
     "سلطة البقوليات": {calories: 180, protein: 8, carbs: 20}
  },
  "أكلات دايت وكيتو": {
     "صدور دجاج مشوي": {calories: 165, protein: 31, carbs: 0},
     "تونة بدون زيت": {calories: 90, protein: 20, carbs: 0},
     "بيض مسلوق": {calories: 70, protein: 6, carbs: 1},
     "سلطة تونة دايت": {calories: 120, protein: 12, carbs: 3},
     "أومليت بيض بالخضار": {calories: 180, protein: 10, carbs: 4},
     "زهره مشوية (قرنبيط)": {calories: 70, protein: 4, carbs: 8},
     "شوربة خضار دايت": {calories: 90, protein: 3, carbs: 12},
     "بروكلي مطهي": {calories: 55, protein: 4, carbs: 6},
     "ستيك لحم خالي من الدهون": {calories: 250, protein: 30, carbs: 0},
     "كوسا محشية دايت": {calories: 160, protein: 10, carbs: 10},
     "كيتو خبز باللوز": {calories: 110, protein: 5, carbs: 2},
     "كيتو بيتزا بالجبنة": {calories: 220, protein: 12, carbs: 4},
     "زبدة الفول السوداني (بدون سكر)": {calories: 190, protein: 8, carbs: 5},
     "بيض مع أفوكادو": {calories: 240, protein: 9, carbs: 3},
     "تشكن رول كيتو": {calories: 300, protein: 25, carbs: 2}
  },
  "الحلويات": {
      "كنافة": {calories: 350, protein: 6, carbs: 50},
      "بقلاوة": {calories: 320, protein: 5, carbs: 45},
      "قطايف": {calories: 280, protein: 4, carbs: 40},
      "أم علي": {calories: 250, protein: 5, carbs: 35},
      "مهلبية": {calories: 180, protein: 4, carbs: 30},
      "أرز باللبن": {calories: 200, protein: 5, carbs: 35},
      "بسبوسة": {calories: 300, protein: 5, carbs: 45},
      "لقيمات": {calories: 250, protein: 3, carbs: 40},
      "بلح الشام": {calories: 280, protein: 4, carbs: 45},
      "غريبة": {calories: 350, protein: 4, carbs: 50},
      "تشيز كيك": {calories: 320, protein: 6, carbs: 40},
      "كيك الشوكولاتة": {calories: 340, protein: 5, carbs: 45},
      "دونات": {calories: 350, protein: 4, carbs: 50},
      "وافل": {calories: 320, protein: 6, carbs: 45},
      "بان كيك": {calories: 340, protein: 7, carbs: 50},
      "آيس كريم": {calories: 210, protein: 3, carbs: 30},
      "مهلبية": {calories: 180, protein: 4, carbs: 30},
      "كاسترد": {calories: 200, protein: 5, carbs: 35},
      "موس الشوكولاتة": {calories: 280, protein: 4, carbs: 40},
      "سحلب": {calories: 220, protein: 4, carbs: 35}
  }
};

// Food weight equivalents
const unitToGramEquivalents: Record<string, number> = {
  'tablespoon': 15,
  'gram': 1,
  'serving': 100,
  'cup': 240,
  'other': 1
};

interface DailyGoal {
  calories: number;
  protein: number;
  carbs: number;
}

interface HistoryItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  timestamp: Date;
  category: string;
  quantity: number;
  unit: string;
}

export default function CaloriesCalculatorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [selectedFoodData, setSelectedFoodData] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState<string>("gram");
  const [calculatedCalories, setCalculatedCalories] = useState<number>(0);
  const [calculatedProtein, setCalculatedProtein] = useState<number>(0);
  const [calculatedCarbs, setCalculatedCarbs] = useState<number>(0);
  const [customFoodMode, setCustomFoodMode] = useState<boolean>(false);
  const [customFoodName, setCustomFoodName] = useState<string>("");
  const [customFoodCalories, setCustomFoodCalories] = useState<number>(0);
  const [customFoodProtein, setCustomFoodProtein] = useState<number>(0);
  const [customFoodCarbs, setCustomFoodCarbs] = useState<number>(0);
  const [dailyHistory, setDailyHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>({ calories: 2000, protein: 150, carbs: 200 });
  const [selectedGoal, setSelectedGoal] = useState<string>("2000");
  
  // Get unique categories
  const categories = [...new Set(foodDatabase.map(food => food.category))];
  
  // Get filtered foods by category
  const getFoodsByCategory = (category: string) => {
    return foodDatabase.filter(food => food.category === category);
  };
  
  // Calculate current daily totals
  const dailyTotals = dailyHistory.reduce((acc, item) => {
    return {
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs
    };
  }, { calories: 0, protein: 0, carbs: 0 });
  
  // Calculate progress percentages
  const caloriesPercentage = Math.min(100, (dailyTotals.calories / dailyGoal.calories) * 100);
  const proteinPercentage = Math.min(100, (dailyTotals.protein / dailyGoal.protein) * 100);
  const carbsPercentage = Math.min(100, (dailyTotals.carbs / dailyGoal.carbs) * 100);
  
  // Handle category change
  useEffect(() => {
    setSelectedFood("");
    setSelectedFoodData(null);
    resetCalculations();
  }, [selectedCategory]);
  
  // Handle food selection
  useEffect(() => {
    if (selectedFood && !customFoodMode) {
      const foodData = foodDatabase.find(food => food.name === selectedFood);
      setSelectedFoodData(foodData);
      calculateNutrition(foodData);
    } else {
      setSelectedFoodData(null);
      resetCalculations();
    }
  }, [selectedFood, quantity, unit]);
  
  // Handle search query
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = foodDatabase.filter(food => 
        food.name.includes(searchQuery)
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);
  
  // Calculate nutrition based on selected food and quantity
  const calculateNutrition = (foodData: any) => {
    if (!foodData) return;
    
    const weightInGrams = quantity * unitToGramEquivalents[unit];
    const scaleFactor = weightInGrams / 100; // Per 100g
    
    setCalculatedCalories(Math.round(foodData.calories * scaleFactor));
    setCalculatedProtein(Math.round(foodData.protein * scaleFactor * 10) / 10);
    setCalculatedCarbs(Math.round(foodData.carbs * scaleFactor * 10) / 10);
  };
  
  // Reset all calculation fields
  const resetCalculations = () => {
    setCalculatedCalories(0);
    setCalculatedProtein(0);
    setCalculatedCarbs(0);
  };
  
  // Handle custom food calculation
  useEffect(() => {
    if (customFoodMode) {
      const weightInGrams = quantity * unitToGramEquivalents[unit];
      const scaleFactor = weightInGrams / 100; // Per 100g
      
      setCalculatedCalories(Math.round(customFoodCalories * scaleFactor));
      setCalculatedProtein(Math.round(customFoodProtein * scaleFactor * 10) / 10);
      setCalculatedCarbs(Math.round(customFoodCarbs * scaleFactor * 10) / 10);
    }
  }, [customFoodMode, customFoodCalories, customFoodProtein, customFoodCarbs, quantity, unit]);
  
  // Add food to daily history
  const addToHistory = () => {
    let newItem: HistoryItem;
    
    if (customFoodMode) {
      if (!customFoodName) {
        alert("الرجاء إدخال اسم الطعام");
        return;
      }
      
      newItem = {
        id: Date.now().toString(),
        name: customFoodName,
        calories: calculatedCalories,
        protein: calculatedProtein,
        carbs: calculatedCarbs,
        timestamp: new Date(),
        category: "مخصص",
        quantity: quantity,
        unit: unit
      };
    } else {
      if (!selectedFoodData) {
        alert("الرجاء اختيار طعام");
        return;
      }
      
      newItem = {
        id: Date.now().toString(),
        name: selectedFoodData.name,
        calories: calculatedCalories,
        protein: calculatedProtein,
        carbs: calculatedCarbs,
        timestamp: new Date(),
        category: selectedFoodData.category,
        quantity: quantity,
        unit: unit
      };
    }
    
    setDailyHistory([...dailyHistory, newItem]);
    
    // Reset form
    setSelectedCategory("");
    setSelectedFood("");
    setCustomFoodMode(false);
    setCustomFoodName("");
    setCustomFoodCalories(0);
    setCustomFoodProtein(0);
    setCustomFoodCarbs(0);
    setQuantity(1);
    resetCalculations();
  };
  
  // Remove item from history
  const removeFromHistory = (id: string) => {
    setDailyHistory(dailyHistory.filter(item => item.id !== id));
  };
  
  // Format units for display
  const formatUnit = (unit: string, quantity: number) => {
    switch(unit) {
      case 'tablespoon':
        return quantity === 1 ? 'ملعقة' : 'ملاعق';
      case 'gram':
        return 'جرام';
      case 'serving':
        return quantity === 1 ? 'حصة' : 'حصص';
      case 'cup':
        return quantity === 1 ? 'كوب' : 'أكواب';
      default:
        return unit;
    }
  };
  
  // Handle goal selection
  const handleGoalChange = (value: string) => {
    setSelectedGoal(value);
    
    switch(value) {
      case "1500":
        setDailyGoal({ calories: 1500, protein: 120, carbs: 170 });
        break;
      case "2000":
        setDailyGoal({ calories: 2000, protein: 150, carbs: 200 });
        break;
      case "2500":
        setDailyGoal({ calories: 2500, protein: 180, carbs: 280 });
        break;
      case "3000":
        setDailyGoal({ calories: 3000, protein: 220, carbs: 350 });
        break;
      default:
        setDailyGoal({ calories: 2000, protein: 150, carbs: 200 });
    }
  };
  
  // Select food from search results
  const selectFromSearch = (food: any) => {
    setSelectedCategory(food.category);
    setSelectedFood(food.name);
    setSelectedFoodData(food);
    calculateNutrition(food);
    setShowSearchResults(false);
    setSearchQuery("");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center">
        <Calculator className="ml-2 h-6 w-6 text-primary" />
        حاسبة السعرات الحرارية
      </h1>
      
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="calculator" className="text-sm md:text-base">
            <Calculator className="ml-2 h-4 w-4" />
            الحاسبة
          </TabsTrigger>
          <TabsTrigger value="history" className="text-sm md:text-base">
            <Utensils className="ml-2 h-4 w-4" />
            سجل اليوم
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Apple className="ml-2 h-5 w-5 text-primary" />
                  إضافة طعام جديد
                </CardTitle>
                <CardDescription>
                  ابحث عن الطعام أو أدخل قيمه الغذائية يدوياً
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Input
                    placeholder="ابحث عن طعام..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-neutral-400" />
                  
                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute w-full z-10 mt-1 bg-white dark:bg-neutral-800 rounded-md shadow-lg max-h-60 overflow-auto">
                      {searchResults.map((food, index) => (
                        <div 
                          key={index}
                          className="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                          onClick={() => selectFromSearch(food)}
                        >
                          <div className="font-medium">{food.name}</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">
                            {food.calories} سعرة | {food.protein}ج بروتين | {food.carbs}ج كربوهيدرات
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {showSearchResults && searchResults.length === 0 && searchQuery.length >= 2 && (
                    <div className="absolute w-full z-10 mt-1 bg-white dark:bg-neutral-800 rounded-md shadow-lg p-4 text-center">
                      لا توجد نتائج. جرب إضافة طعام مخصص.
                    </div>
                  )}
                </div>
                
                {/* Category and Food Selection */}
                {!customFoodMode && (
                  <>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تصنيف الطعام" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedCategory && (
                      <Select value={selectedFood} onValueChange={setSelectedFood}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الطعام" />
                        </SelectTrigger>
                        <SelectContent>
                          {getFoodsByCategory(selectedCategory).map((food) => (
                            <SelectItem key={food.name} value={food.name}>
                              {food.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </>
                )}
                
                {/* Custom Food Inputs */}
                {customFoodMode && (
                  <div className="space-y-3 p-3 border rounded-md bg-neutral-50 dark:bg-neutral-800">
                    <h3 className="font-medium text-primary">إضافة طعام مخصص</h3>
                    <Input
                      placeholder="اسم الطعام"
                      value={customFoodName}
                      onChange={(e) => setCustomFoodName(e.target.value)}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs block mb-1">السعرات</label>
                        <Input
                          type="number"
                          placeholder="السعرات"
                          value={customFoodCalories || ""}
                          onChange={(e) => setCustomFoodCalories(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-xs block mb-1">البروتين</label>
                        <Input
                          type="number"
                          placeholder="البروتين"
                          value={customFoodProtein || ""}
                          onChange={(e) => setCustomFoodProtein(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-xs block mb-1">الكربوهيدرات</label>
                        <Input
                          type="number"
                          placeholder="الكربوهيدرات"
                          value={customFoodCarbs || ""}
                          onChange={(e) => setCustomFoodCarbs(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500">جميع القيم لكل 100 جرام</p>
                  </div>
                )}
                
                {/* Quantity Input */}
                <div className="grid grid-cols-2 gap-3">
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="الوحدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gram">جرام</SelectItem>
                      <SelectItem value="tablespoon">ملعقة</SelectItem>
                      <SelectItem value="cup">كوب</SelectItem>
                      <SelectItem value="serving">حصة</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="number"
                    placeholder="الكمية"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={0}
                    step={0.25}
                  />
                </div>
                
                {/* Results */}
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span>السعرات الحرارية:</span>
                    <span className="font-bold text-primary">{calculatedCalories} سعرة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>البروتين:</span>
                    <span className="font-bold text-green-600">{calculatedProtein} جرام</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الكربوهيدرات:</span>
                    <span className="font-bold text-amber-600">{calculatedCarbs} جرام</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={addToHistory} 
                    className="w-full bg-primary" 
                    disabled={
                      (customFoodMode && (!customFoodName || !customFoodCalories)) ||
                      (!customFoodMode && !selectedFoodData) ||
                      quantity <= 0
                    }
                  >
                    <PlusCircle className="ml-2 h-4 w-4" />
                    إضافة للسجل
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex-none"
                    onClick={() => setCustomFoodMode(!customFoodMode)}
                  >
                    {customFoodMode ? "العودة" : "طعام مخصص"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="ml-2 h-5 w-5 text-secondary" />
                  ملخص اليوم
                </CardTitle>
                <CardDescription>
                  إحصائيات استهلاكك اليومي والأهداف
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Select value={selectedGoal} onValueChange={handleGoalChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر هدفك" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1500">خسارة وزن (1500 سعرة)</SelectItem>
                    <SelectItem value="2000">الحفاظ على الوزن (2000 سعرة)</SelectItem>
                    <SelectItem value="2500">زيادة وزن خفيفة (2500 سعرة)</SelectItem>
                    <SelectItem value="3000">زيادة وزن كبيرة (3000 سعرة)</SelectItem>
                  </SelectContent>
                </Select>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">السعرات الحرارية</span>
                    <span className="text-sm">{dailyTotals.calories} / {dailyGoal.calories}</span>
                  </div>
                  <Progress value={caloriesPercentage} className="h-2.5 mb-3" />
                  
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">البروتين</span>
                    <span className="text-sm">{dailyTotals.protein.toFixed(1)} / {dailyGoal.protein} جرام</span>
                  </div>
                  <Progress value={proteinPercentage} className="h-2.5 mb-3 bg-neutral-200 dark:bg-neutral-700">
                    <div 
                      className="h-full bg-green-600 transition-all" 
                      style={{ width: `${proteinPercentage}%` }}
                    />
                  </Progress>
                  
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">الكربوهيدرات</span>
                    <span className="text-sm">{dailyTotals.carbs.toFixed(1)} / {dailyGoal.carbs} جرام</span>
                  </div>
                  <Progress value={carbsPercentage} className="h-2.5 bg-neutral-200 dark:bg-neutral-700">
                    <div 
                      className="h-full bg-amber-500 transition-all" 
                      style={{ width: `${carbsPercentage}%` }}
                    />
                  </Progress>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-md">
                  <h3 className="font-medium mb-2">السعرات المتبقية</h3>
                  <div className="text-3xl font-bold text-primary">
                    {Math.max(0, dailyGoal.calories - dailyTotals.calories)}
                    <span className="text-base font-normal text-neutral-500 dark:text-neutral-400 mr-1">سعرة</span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-green-600 font-medium">البروتين: </span>
                      <span>{Math.max(0, dailyGoal.protein - dailyTotals.protein).toFixed(1)} جرام</span>
                    </div>
                    <div>
                      <span className="text-amber-600 font-medium">الكربوهيدرات: </span>
                      <span>{Math.max(0, dailyGoal.carbs - dailyTotals.carbs).toFixed(1)} جرام</span>
                    </div>
                  </div>
                </div>
                
                {/* Status Message */}
                {dailyTotals.calories > 0 && (
                  <div className={`p-3 rounded-md ${
                    caloriesPercentage > 100
                      ? 'bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400'
                      : caloriesPercentage > 90
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/10 dark:text-amber-400'
                      : 'bg-green-50 text-green-600 dark:bg-green-900/10 dark:text-green-400'
                  }`}>
                    {caloriesPercentage > 100
                      ? 'تجاوزت هدفك اليومي من السعرات الحرارية'
                      : caloriesPercentage > 90
                      ? 'أنت قريب من تحقيق هدفك اليومي'
                      : caloriesPercentage > 50
                      ? 'أنت في المسار الصحيح لتحقيق هدفك'
                      : 'لديك سعرات حرارية كافية متبقية اليوم'
                    }
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Utensils className="ml-2 h-5 w-5 text-primary" />
                سجل اليوم
              </CardTitle>
              <CardDescription>
                جميع الأطعمة المسجلة اليوم
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {dailyHistory.length === 0 ? (
                <div className="text-center py-6 text-neutral-500 dark:text-neutral-400">
                  <Utensils className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>لم تقم بتسجيل أي أطعمة اليوم</p>
                  <p className="text-sm">استخدم الحاسبة لإضافة طعام</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dailyHistory.map((item) => (
                    <div key={item.id} className="bg-neutral-50 dark:bg-neutral-800 rounded-md p-3 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            {item.quantity} {formatUnit(item.unit, item.quantity)}
                          </div>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium text-primary">{item.calories} سعرة</div>
                          <div className="flex space-x-4 space-x-reverse text-xs mt-1">
                            <span className="text-green-600">{item.protein}ج بروتين</span>
                            <span className="text-amber-600">{item.carbs}ج كربوهيدرات</span>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        className="absolute top-2 left-2 text-red-500 hover:text-red-700"
                        onClick={() => removeFromHistory(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}