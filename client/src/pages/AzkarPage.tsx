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
  Zap,
  Eye,
  EyeOff
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
  const [hideCompleted, setHideCompleted] = useState(false);
  const [counterMode, setCounterMode] = useState<{ zekrId: string; target: number; color: string; text: string } | null>(null);

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
      text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      repetitions: 3,
      category: 'morning',
      source: 'سورة الفلق',
      benefit: 'الحماية من شرور المخلوقات'
    },
    {
      id: 'morning-5',
      text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ',
      repetitions: 3,
      category: 'morning',
      source: 'سورة الناس',
      benefit: 'الحماية من وساوس الشيطان'
    },
    {
      id: 'morning-6',
      text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لا إِلَـهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ',
      repetitions: 1,
      category: 'morning',
      source: 'السنة النبوية',
      benefit: 'طلب الخير والحماية من الشر'
    },
    {
      id: 'morning-7',
      text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
      repetitions: 1,
      category: 'morning',
      source: 'السنة النبوية',
      benefit: 'التوكل على الله'
    },
    {
      id: 'morning-8',
      text: 'اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لا يَغْفِرُ الذُّنُوبَ إِلا أَنْتَ',
      repetitions: 1,
      category: 'morning',
      source: 'سيد الاستغفار',
      benefit: 'من قالها موقناً بها حين يصبح فمات من يومه دخل الجنة'
    },
    {
      id: 'morning-9',
      text: 'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
      repetitions: 4,
      category: 'morning',
      source: 'السنة النبوية',
      benefit: 'من قالها أعتق الله ربعه من النار'
    },
    {
      id: 'morning-10',
      text: 'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
      repetitions: 1,
      category: 'morning',
      source: 'السنة النبوية',
      benefit: 'أداء شكر يوم'
    },
    {
      id: 'morning-11',
      text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      repetitions: 100,
      category: 'morning',
      source: 'صحيح البخاري',
      benefit: 'من قالها مئة مرة حطت خطاياه وإن كانت مثل زبد البحر'
    },
    {
      id: 'morning-12',
      text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      repetitions: 10,
      category: 'morning',
      source: 'صحيح البخاري',
      benefit: 'كانت له عدل عشر رقاب وكتبت له مئة حسنة ومحيت عنه مئة سيئة'
    },
    {
      id: 'morning-13',
      text: 'سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ',
      repetitions: 100,
      category: 'morning',
      source: 'صحيح مسلم',
      benefit: 'غرست له نخلة في الجنة'
    },
    {
      id: 'morning-14',
      text: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ',
      repetitions: 3,
      category: 'morning',
      source: 'سنن أبي داود',
      benefit: 'العافية في البدن والحواس'
    },
    {
      id: 'morning-15',
      text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
      repetitions: 3,
      category: 'morning',
      source: 'سنن ابن ماجه',
      benefit: 'طلب العفو والعافية في الدارين'
    },
    {
      id: 'morning-16',
      text: 'حَسْبِيَ اللَّهُ لا إِلَـهَ إِلا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
      repetitions: 7,
      category: 'morning',
      source: 'السنة النبوية',
      benefit: 'كفاه الله ما أهمه'
    },
    {
      id: 'morning-17',
      text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ رَسُولاً',
      repetitions: 3,
      category: 'morning',
      source: 'سنن أبي داود',
      benefit: 'وجب له رضا الله'
    },
    {
      id: 'morning-18',
      text: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
      repetitions: 100,
      category: 'morning',
      source: 'سنن أبي داود',
      benefit: 'من قالها غُفرت ذنوبه وإن كان فر من الزحف'
    },

    // أذكار المساء
    {
      id: 'evening-1',
      text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
      repetitions: 1,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'الحماية من الشيطان'
    },
    {
      id: 'evening-2',
      text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
      repetitions: 1,
      category: 'evening',
      source: 'آية الكرسي',
      benefit: 'حفظ طوال الليل'
    },
    {
      id: 'evening-3',
      text: 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      repetitions: 3,
      category: 'evening',
      source: 'سورة الإخلاص',
      benefit: 'تعادل ثلث القرآن'
    },
    {
      id: 'evening-4',
      text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      repetitions: 3,
      category: 'evening',
      source: 'سورة الفلق',
      benefit: 'الحماية من شرور المخلوقات'
    },
    {
      id: 'evening-5',
      text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ',
      repetitions: 3,
      category: 'evening',
      source: 'سورة الناس',
      benefit: 'الحماية من وساوس الشيطان'
    },
    {
      id: 'evening-6',
      text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
      repetitions: 1,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'التوكل على الله'
    },
    {
      id: 'evening-7',
      text: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
      repetitions: 7,
      category: 'evening',
      source: 'سنن أبي داود',
      benefit: 'من قالها سبع مرات حين يمسي أجاره الله من النار'
    },
    {
      id: 'evening-8',
      text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      repetitions: 100,
      category: 'evening',
      source: 'صحيح مسلم',
      benefit: 'حطت خطاياه وإن كانت مثل زبد البحر'
    },
    {
      id: 'evening-6',
      text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لا إِلَـهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا',
      repetitions: 1,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'طلب الخير والحماية من الشر'
    },
    {
      id: 'evening-7',
      text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
      repetitions: 1,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'التوكل على الله'
    },
    {
      id: 'evening-8',
      text: 'اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لا يَغْفِرُ الذُّنُوبَ إِلا أَنْتَ',
      repetitions: 1,
      category: 'evening',
      source: 'سيد الاستغفار',
      benefit: 'من قالها موقناً بها حين يمسي فمات من ليلته دخل الجنة'
    },
    {
      id: 'evening-9',
      text: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ',
      repetitions: 4,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'من قالها أعتق الله ربعه من النار'
    },
    {
      id: 'evening-10',
      text: 'اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
      repetitions: 1,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'أداء شكر يوم'
    },
    {
      id: 'evening-11',
      text: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لا إِلَهَ إِلا أَنْتَ',
      repetitions: 3,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'طلب العافية'
    },
    {
      id: 'evening-12',
      text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لا إِلَهَ إِلا أَنْتَ',
      repetitions: 3,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'الحماية من المهلكات'
    },
    {
      id: 'evening-13',
      text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      repetitions: 100,
      category: 'evening',
      source: 'السنة النبوية',
      benefit: 'حطت خطاياه وإن كانت مثل زبد البحر'
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
    {
      id: 'sleep-3',
      text: 'اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ',
      repetitions: 1,
      category: 'sleep',
      source: 'السنة النبوية',
      benefit: 'طلب الحفظ والمغفرة'
    },
    {
      id: 'sleep-4',
      text: 'اللَّهُمَّ رَبَّ السَّمَاوَاتِ وَرَبَّ الأَرْضِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى، وَمُنْزِلَ التَّوْرَاةِ وَالإِنْجِيلِ وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ، اللَّهُمَّ أَنْتَ الأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ',
      repetitions: 1,
      category: 'sleep',
      source: 'السنة النبوية',
      benefit: 'الحماية الشاملة ودفع الهموم'
    },
    {
      id: 'sleep-5',
      text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لا كَافِيَ لَهُ وَلا مُؤْوِيَ',
      repetitions: 1,
      category: 'sleep',
      source: 'السنة النبوية',
      benefit: 'شكر الله على النعم'
    },
    {
      id: 'sleep-6',
      text: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ',
      repetitions: 33,
      category: 'sleep',
      source: 'تسبيح فاطمة عليها السلام',
      benefit: 'خير من خادم'
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
    {
      id: 'waking-2',
      text: 'لا إِلَهَ إِلا اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، الْحَمْدُ لِلَّهِ، وَسُبْحَانَ اللَّهِ، وَلا إِلَهَ إِلا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي',
      repetitions: 1,
      category: 'waking',
      source: 'السنة النبوية',
      benefit: 'غفر له ذنبه'
    },
    {
      id: 'waking-3',
      text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ، فَإِنَّهُ لا يَمْلِكُهَا إِلا أَنْتَ',
      repetitions: 1,
      category: 'waking',
      source: 'السنة النبوية',
      benefit: 'طلب الفضل والرحمة'
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
      text: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا، وَقِنَا عَذَابَ النَّارِ',
      repetitions: 1,
      category: 'eating',
      source: 'السنة النبوية',
      benefit: 'طلب البركة والحماية'
    },
    {
      id: 'eating-3',
      text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
      repetitions: 1,
      category: 'eating',
      source: 'السنة النبوية',
      benefit: 'شكر الله على الطعام والشراب'
    },
    {
      id: 'eating-4',
      text: 'الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ، غَيْرَ مَكْفِيٍّ وَلا مُوَدَّعٍ، وَلا مُسْتَغْنًى عَنْهُ رَبَّنَا',
      repetitions: 1,
      category: 'eating',
      source: 'السنة النبوية',
      benefit: 'حمد الله الكامل'
    },
    {
      id: 'eating-5',
      text: 'اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي، وَاسْقِ مَنْ سَقَانِي',
      repetitions: 1,
      category: 'eating',
      source: 'السنة النبوية',
      benefit: 'الدعاء لمن أطعم'
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
    {
      id: 'daily-3',
      text: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لا إِلَهَ إِلا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
      repetitions: 100,
      category: 'daily',
      source: 'السنة النبوية',
      benefit: 'غفران الذنوب'
    },
    {
      id: 'daily-4',
      text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
      repetitions: 10,
      category: 'daily',
      source: 'السنة النبوية',
      benefit: 'كفاه الله همه'
    },
    {
      id: 'daily-5',
      text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صلى الله عليه وسلم رَسُولاً',
      repetitions: 3,
      category: 'daily',
      source: 'السنة النبوية',
      benefit: 'وجبت له الجنة'
    },
    {
      id: 'daily-6',
      text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي دِينِي كُلَّهُ وَلا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
      repetitions: 3,
      category: 'daily',
      source: 'السنة النبوية',
      benefit: 'إصلاح الدين والدنيا'
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
    },
    {
      id: 'special-3',
      text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
      repetitions: 1,
      category: 'special',
      source: 'السنة النبوية',
      benefit: 'طلب الخصال الحميدة'
    },
    {
      id: 'special-4',
      text: 'اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي، وَاجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ، وَاجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ',
      repetitions: 1,
      category: 'special',
      source: 'السنة النبوية',
      benefit: 'إصلاح الدين والدنيا والآخرة'
    },
    {
      id: 'special-5',
      text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ، وَأَعُوذُ بِكَ مِنَ الشَّرِّ كُلِّهِ عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ',
      repetitions: 1,
      category: 'special',
      source: 'دعاء الاستخارة',
      benefit: 'طلب الخير كله والحماية من الشر'
    },
    {
      id: 'special-6',
      text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ',
      repetitions: 1,
      category: 'special',
      source: 'السنة النبوية',
      benefit: 'الحماية من الهموم والأحزان'
    },
    {
      id: 'special-7',
      text: 'لا حَوْلَ وَلا قُوَّةَ إِلا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
      repetitions: 10,
      category: 'special',
      source: 'السنة النبوية',
      benefit: 'كنز من كنوز الجنة'
    },
    {
      id: 'special-8',
      text: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي، وَوَسِّعْ لِي فِي دَارِي، وَبَارِكْ لِي فِي رِزْقِي',
      repetitions: 1,
      category: 'special',
      source: 'السنة النبوية',
      benefit: 'المغفرة والبركة في الدار والرزق'
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

      // Auto-hide when completed
      if (currentCount + 1 >= zekr.repetitions) {
        setHideCompleted(true);
      }
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

  const openCounter = (zekrId: string, target: number, color: string, text: string) => {
    setCounterMode({ zekrId, target, color, text });
  };

  const closeCounter = () => {
    setCounterMode(null);
  };

  const handleCounterClick = () => {
    if (counterMode) {
      incrementCount(counterMode.zekrId);
      const currentCount = (zekrProgress[counterMode.zekrId] || 0) + 1;
      if (currentCount >= counterMode.target) {
        setTimeout(() => {
          closeCounter();
        }, 500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900 dark:to-green-900">
      {/* العداد الملون البسيط */}
      {counterMode && (
        <div 
          className={`fixed inset-0 z-50 bg-gradient-to-br from-${counterMode.color}-100 via-${counterMode.color}-200 to-${counterMode.color}-300 dark:from-${counterMode.color}-900 dark:via-${counterMode.color}-800 dark:to-${counterMode.color}-700 flex items-center justify-center cursor-pointer transition-all duration-500 backdrop-blur-sm`}
          onClick={handleCounterClick}
        >
          <div className="text-center animate-pulse hover:scale-105 transition-transform duration-300">
            {/* النص */}
            <div className={`text-2xl md:text-4xl font-bold text-${counterMode.color}-800 dark:text-${counterMode.color}-100 mb-8 max-w-4xl px-6 leading-relaxed`}>
              {counterMode.text}
            </div>
            
            {/* العداد الكبير */}
            <div className={`text-8xl md:text-9xl font-black text-${counterMode.color}-600 dark:text-${counterMode.color}-300 mb-6 drop-shadow-2xl`}>
              {(zekrProgress[counterMode.zekrId] || 0)}/{counterMode.target}
            </div>
            
            {/* رسالة التشجيع */}
            <div className={`text-xl md:text-2xl text-${counterMode.color}-700 dark:text-${counterMode.color}-200 mb-4 font-semibold`}>
              اضغط في أي مكان للتسبيح
            </div>
            
            {/* شريط التقدم */}
            <div className="max-w-md mx-auto bg-white/30 rounded-full h-4 overflow-hidden shadow-lg">
              <div 
                className={`h-full bg-${counterMode.color}-500 transition-all duration-500 ease-out rounded-full`}
                style={{ 
                  width: `${((zekrProgress[counterMode.zekrId] || 0) / counterMode.target) * 100}%` 
                }}
              ></div>
            </div>
            
            {/* زر الإغلاق */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeCounter();
              }}
              className={`mt-8 px-6 py-3 bg-${counterMode.color}-500 hover:bg-${counterMode.color}-600 text-white rounded-full font-semibold transition-all duration-300 hover:scale-110 shadow-lg`}
            >
              إغلاق العداد
            </button>
          </div>
        </div>
      )}

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
              <div className="flex justify-center gap-4">
                <Button
                  onClick={resetAllCounts}
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  <RotateCcw className="h-4 w-4 ml-2" />
                  إعادة تعيين الكل
                </Button>
                <Button
                  onClick={() => setHideCompleted(!hideCompleted)}
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  {hideCompleted ? (
                    <>
                      <Eye className="h-4 w-4 ml-2" />
                      إظهار المكتملة
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4 ml-2" />
                      إخفاء المكتملة
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Azkar Categories */}
          <Tabs defaultValue="morning" className="w-full">
            <div className="mb-8 overflow-x-auto">
              <TabsList className="flex lg:grid lg:grid-cols-7 w-full min-w-fit bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm h-auto p-2 rounded-xl border-2 border-emerald-200 dark:border-emerald-700 gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  const completed = getCompletedCount(category.id);
                  const total = getTotalCount(category.id);
                  return (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id} 
                      className="flex flex-col items-center p-3 min-w-[90px] lg:min-w-[120px] h-20 lg:h-24 rounded-lg transition-all duration-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 whitespace-nowrap"
                    >
                      <IconComponent className="h-4 w-4 lg:h-6 lg:w-6 mb-1 lg:mb-2" />
                      <span className="text-center leading-tight font-medium text-[10px] lg:text-sm">
                        {category.name}
                      </span>
                      <Badge className="mt-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200 text-[9px] lg:text-xs border-0 px-1 py-0 data-[state=active]:bg-white data-[state=active]:text-emerald-600">
                        {completed}/{total}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

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
                        .filter(zekr => {
                          const currentCount = zekrProgress[zekr.id] || 0;
                          const isCompleted = currentCount >= zekr.repetitions;
                          return !hideCompleted || !isCompleted;
                        })
                        .sort((a, b) => {
                          const aCount = zekrProgress[a.id] || 0;
                          const bCount = zekrProgress[b.id] || 0;
                          const aCompleted = aCount >= a.repetitions;
                          const bCompleted = bCount >= b.repetitions;

                          // Incomplete items first
                          if (aCompleted && !bCompleted) return 1;
                          if (!aCompleted && bCompleted) return -1;
                          return 0;
                        })
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

                                      {/* العداد البسيط - يفتح صفحة ملونة عند الضغط */}
                                      <div 
                                        className={`px-4 py-2 rounded-lg font-bold text-lg min-w-[80px] text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                          isCompleted 
                                            ? `bg-${category.color}-500 text-white` 
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900'
                                        }`}
                                        onClick={() => {
                                          if (zekr.repetitions > 1) {
                                            openCounter(zekr.id, zekr.repetitions, category.color, zekr.text);
                                          } else {
                                            incrementCount(zekr.id);
                                          }
                                        }}
                                        title={zekr.repetitions > 1 ? "اضغط لفتح العداد" : ""}
                                      >
                                        {currentCount}/{zekr.repetitions}
                                        {zekr.repetitions > 1 && (
                                          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">العداد</div>
                                        )}
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