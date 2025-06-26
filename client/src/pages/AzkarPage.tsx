import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Bed,
  Clock,
  Utensils,
  Star,
  BookOpen,
  Plus,
  Minus,
  RotateCcw,
  ChevronUp,
  Heart,
  Zap
} from "lucide-react";

interface Zekr {
  id: string;
  text: string;
  repetitions: number;
  category: string;
  source?: string;
  benefit?: string;
}

interface ZekrProgress {
  [key: string]: number;
}

export default function AzkarPage() {
  const [, setLocation] = useLocation();
  const [zekrProgress, setZekrProgress] = useState<ZekrProgress>({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  const azkarData: Zekr[] = [
    // أذكار الصباح
    {
      id: 'morning-1',
      text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
      repetitions: 1,
      category: 'morning',
      source: 'السنة النبوية',
      benefit: 'الحماية من الشيطان'
    },
    {
      id: 'morning-2',
      text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
      repetitions: 1,
      category: 'morning',
      source: 'آية الكرسي',
      benefit: 'حفظ وحماية طوال اليوم'
    },
    {
      id: 'morning-3',
      text: 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      repetitions: 3,
      category: 'morning',
      source: 'سورة الإخلاص',
      benefit: 'تعادل ثلث القرآن'
    },
    {
      id: 'morning-4',
      text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لا إِلَـهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ',
      repetitions: 1,
      category: 'morning',
      source: 'السنة النبوية',
      benefit: 'طلب الخير والحماية من الشر'
    },
    {
      id: 'morning-5',
      text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
      repetitions: 1,
      category: 'morning',
      source: 'السنة النبوية',
      benefit: 'التوكل على الله'
    },
    {
      id: 'morning-6',
      text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      repetitions: 100,
      category: 'morning',
      source: 'السنة النبوية',
      benefit: 'غرس نخلة في الجنة'
    },

    // أذكار المساء
    {
      id: 'evening-1',
      text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لا إِلَـهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا',
      repetitions: 1,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'طلب الخير والحماية من الشر'
    },
    {
      id: 'evening-2',
      text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
      repetitions: 1,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'التوكل على الله'
    },

    // أذكار النوم
    {
      id: 'sleep-1',
      text: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
      repetitions: 1,
      category: 'sleep',
      source: 'السنة النبوية',
      benefit: 'الحفظ والرحمة أثناء النوم'
    },
    {
      id: 'sleep-2',
      text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
      repetitions: 3,
      category: 'sleep',
      source: 'السنة النبوية',
      benefit: 'الحماية من عذاب القبر'
    },

    // أذكار الاستيقاظ
    {
      id: 'waking-1',
      text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      repetitions: 1,
      category: 'waking',
      source: 'السنة النبوية',
      benefit: 'شكر الله على نعمة الحياة'
    },

    // أذكار الطعام
    {
      id: 'eating-1',
      text: 'بِسْمِ اللَّهِ',
      repetitions: 1,
      category: 'eating',
      source: 'السنة النبوية',
      benefit: 'البركة في الطعام'
    },
    {
      id: 'eating-2',
      text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
      repetitions: 1,
      category: 'eating',
      source: 'السنة النبوية',
      benefit: 'شكر الله على الطعام والشراب'
    },

    // أذكار يومية
    {
      id: 'daily-1',
      text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      repetitions: 10,
      category: 'daily',
      source: 'السنة النبوية',
      benefit: 'أجر عتق أربع رقاب'
    },
    {
      id: 'daily-2',
      text: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
      repetitions: 33,
      category: 'daily',
      source: 'السنة النبوية',
      benefit: 'أحب الكلام إلى الله'
    },

    // أذكار خاصة
    {
      id: 'special-1',
      text: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
      repetitions: 1,
      category: 'special',
      source: 'السنة النبوية',
      benefit: 'طلب العون على العبادة'
    },
    {
      id: 'special-2',
      text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      repetitions: 1,
      category: 'special',
      source: 'القرآن الكريم',
      benefit: 'دعاء جامع لخير الدنيا والآخرة'
    }
  ];

  const categories = [
    { id: 'morning', name: 'أذكار الصباح', icon: Sun, color: 'emerald' },
    { id: 'evening', name: 'أذكار المساء', icon: Moon, color: 'green' },
    { id: 'sleep', name: 'أذكار النوم', icon: Bed, color: 'teal' },
    { id: 'waking', name: 'أذكار الاستيقاظ', icon: Clock, color: 'emerald' },
    { id: 'eating', name: 'أذكار الطعام', icon: Utensils, color: 'green' },
    { id: 'daily', name: 'أذكار يومية', icon: Heart, color: 'teal' },
    { id: 'special', name: 'أدعية خاصة', icon: Star, color: 'emerald' }
  ];

  useEffect(() => {
    const savedProgress = localStorage.getItem('azkarProgress');
    if (savedProgress) {
      setZekrProgress(JSON.parse(savedProgress));
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveProgress = (newProgress: ZekrProgress) => {
    setZekrProgress(newProgress);
    localStorage.setItem('azkarProgress', JSON.stringify(newProgress));
  };

  const incrementCount = (zekrId: string) => {
    const zekr = azkarData.find(z => z.id === zekrId);
    if (!zekr) return;

    const currentCount = zekrProgress[zekrId] || 0;
    if (currentCount < zekr.repetitions) {
      const newProgress = { ...zekrProgress, [zekrId]: currentCount + 1 };
      saveProgress(newProgress);
    }
  };

  const decrementCount = (zekrId: string) => {
    const currentCount = zekrProgress[zekrId] || 0;
    if (currentCount > 0) {
      const newProgress = { ...zekrProgress, [zekrId]: currentCount - 1 };
      saveProgress(newProgress);
    }
  };

  const resetCount = (zekrId: string) => {
    const newProgress = { ...zekrProgress, [zekrId]: 0 };
    saveProgress(newProgress);
  };

  const resetAllCounts = () => {
    saveProgress({});
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCompletedCount = (categoryId: string) => {
    const categoryAzkar = azkarData.filter(z => z.category === categoryId);
    return categoryAzkar.filter(z => (zekrProgress[z.id] || 0) >= z.repetitions).length;
  };

  const getTotalCount = (categoryId: string) => {
    return azkarData.filter(z => z.category === categoryId).length;
  };

  const getTotalProgress = () => {
    const totalAzkar = azkarData.length;
    const completedAzkar = azkarData.filter(z => (zekrProgress[z.id] || 0) >= z.repetitions).length;
    return Math.round((completedAzkar / totalAzkar) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900 dark:to-green-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              🕌 أذكار اليوم
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              وَذَكِّرْ فَإِنَّ الذِّكْرَى تَنْفَعُ الْمُؤْمِنِينَ
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              <Badge className="px-4 py-2 bg-emerald-100 text-emerald-700 border-emerald-300">📿 أذكار أصيلة</Badge>
              <Badge className="px-4 py-2 bg-green-100 text-green-700 border-green-300">📊 تتبع التقدم</Badge>
              <Badge className="px-4 py-2 bg-teal-100 text-teal-700 border-teal-300">🏆 إنجاز يومي</Badge>
            </div>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">📈 إجمالي التقدم</CardTitle>
                  <p className="text-emerald-100">تقدمك في الأذكار اليومية</p>
                </div>
                <Badge className="bg-white text-emerald-600 px-4 py-2 text-lg">
                  {getTotalProgress()}% مكتمل
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{azkarData.filter(z => (zekrProgress[z.id] || 0) >= z.repetitions).length}</div>
                  <p className="text-emerald-100">أذكار مكتملة</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{azkarData.length}</div>
                  <p className="text-emerald-100">إجمالي الأذكار</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{Object.values(zekrProgress).reduce((sum, count) => sum + count, 0)}</div>
                  <p className="text-emerald-100">إجمالي التكرارات</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{categories.filter(cat => getCompletedCount(cat.id) === getTotalCount(cat.id) && getTotalCount(cat.id) > 0).length}</div>
                  <p className="text-emerald-100">أقسام مكتملة</p>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={resetAllCounts}
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  <RotateCcw className="h-4 w-4 ml-2" />
                  إعادة تعيين الكل
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Azkar Categories */}
          <Tabs defaultValue="morning" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const completed = getCompletedCount(category.id);
                const total = getTotalCount(category.id);
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex flex-col items-center text-xs p-2">
                    <IconComponent className="h-4 w-4 mb-1" />
                    <span className="hidden lg:block">{category.name}</span>
                    <span className="lg:hidden">{category.name.split(' ')[1]}</span>
                    <Badge className={`mt-1 bg-${category.color}-100 text-${category.color}-700 text-xs`}>
                      {completed}/{total}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-700">
                  <CardHeader className={`bg-gradient-to-r from-${category.color}-50 to-${category.color}-50 dark:from-${category.color}-900/30 dark:to-${category.color}-900/30`}>
                    <CardTitle className={`text-${category.color}-700 dark:text-${category.color}-300 flex items-center`}>
                      <category.icon className="h-6 w-6 ml-2" />
                      {category.name}
                      <Badge className={`mr-4 bg-${category.color}-100 text-${category.color}-700 border-${category.color}-300`}>
                        {getCompletedCount(category.id)}/{getTotalCount(category.id)} مكتمل
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-1 gap-6">
                      {azkarData
                        .filter(zekr => zekr.category === category.id)
                        .map((zekr) => {
                          const currentCount = zekrProgress[zekr.id] || 0;
                          const isCompleted = currentCount >= zekr.repetitions;
                          return (
                            <Card 
                              key={zekr.id} 
                              className={`transition-all duration-300 border-2 ${
                                isCompleted 
                                  ? `border-${category.color}-300 bg-${category.color}-50 dark:bg-${category.color}-900/20` 
                                  : 'border-gray-200 hover:border-emerald-300'
                              }`}
                            >
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <div className={`text-lg leading-relaxed ${
                                    isCompleted ? `text-${category.color}-800 dark:text-${category.color}-200` : 'text-gray-700 dark:text-gray-300'
                                  }`}>
                                    {zekr.text}
                                  </div>
                                  
                                  {zekr.source && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                      <BookOpen className="h-4 w-4" />
                                      <span>المصدر: {zekr.source}</span>
                                    </div>
                                  )}
                                  
                                  {zekr.benefit && (
                                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                                      <Zap className="h-4 w-4" />
                                      <span>الفائدة: {zekr.benefit}</span>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center gap-3">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => decrementCount(zekr.id)}
                                        disabled={currentCount === 0}
                                        className="w-8 h-8 p-0"
                                      >
                                        <Minus className="h-4 w-4" />
                                      </Button>
                                      
                                      <div className={`px-4 py-2 rounded-lg font-bold text-lg min-w-[80px] text-center ${
                                        isCompleted 
                                          ? `bg-${category.color}-500 text-white` 
                                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                      }`}>
                                        {currentCount}/{zekr.repetitions}
                                      </div>
                                      
                                      <Button
                                        size="sm"
                                        onClick={() => incrementCount(zekr.id)}
                                        disabled={isCompleted}
                                        className={`w-8 h-8 p-0 bg-${category.color}-500 hover:bg-${category.color}-600 text-white`}
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      {isCompleted && (
                                        <Badge className={`bg-${category.color}-500 text-white`}>
                                          ✅ مكتمل
                                        </Badge>
                                      )}
                                      
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => resetCount(zekr.id)}
                                        className="text-gray-500 hover:text-red-500"
                                      >
                                        <RotateCcw className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Back to Top Button */}
          {showScrollTop && (
            <Button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg z-50"
              size="sm"
            >
              <ChevronUp className="h-6 w-6" />
            </Button>
          )}

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Button 
              onClick={() => setLocation("/")}
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
            >
              <ArrowLeft className="ml-2 h-5 w-5" />
              العودة للصفحة الرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}