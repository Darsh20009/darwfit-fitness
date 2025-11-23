// قاعدة بيانات شاملة جداً من الوجبات والأطعمة من كل دول العالم
export const mealDatabase: Record<string, { calories: number; protein: number; carbs: number; fat: number; serving: string }> = {
  // ============ الأطعمة العربية ============
  // السعودية
  "كبسة": { calories: 450, protein: 28, carbs: 45, fat: 15, serving: "وجبة" },
  "مندي": { calories: 480, protein: 32, carbs: 48, fat: 16, serving: "وجبة" },
  "جريش": { calories: 320, protein: 15, carbs: 38, fat: 12, serving: "100g" },
  "حنيذ": { calories: 420, protein: 30, carbs: 35, fat: 18, serving: "100g" },
  "تنور": { calories: 350, protein: 25, carbs: 30, fat: 16, serving: "100g" },
  
  // مصر
  "كشري": { calories: 380, protein: 12, carbs: 52, fat: 10, serving: "وجبة" },
  "ملوخية": { calories: 120, protein: 8, carbs: 15, fat: 4, serving: "100g" },
  "فتة": { calories: 450, protein: 20, carbs: 45, fat: 18, serving: "وجبة" },
  "بسبوسة": { calories: 380, protein: 4, carbs: 48, fat: 18, serving: "100g" },
  "كنافة": { calories: 420, protein: 6, carbs: 52, fat: 20, serving: "100g" },
  
  // الشام (سوريا، لبنان، فلسطين)
  "فلافل": { calories: 330, protein: 13, carbs: 28, fat: 18, serving: "100g" },
  "حمص": { calories: 280, protein: 9, carbs: 25, fat: 16, serving: "100g" },
  "متبل": { calories: 180, protein: 6, carbs: 15, fat: 12, serving: "100g" },
  "كبة": { calories: 350, protein: 15, carbs: 20, fat: 22, serving: "100g" },
  "ورق عنب": { calories: 150, protein: 8, carbs: 18, fat: 5, serving: "100g" },
  
  // المغرب
  "طاجين": { calories: 320, protein: 22, carbs: 28, fat: 12, serving: "100g" },
  "كسكس مغربي": { calories: 280, protein: 10, carbs: 42, fat: 6, serving: "100g" },
  "برستة": { calories: 340, protein: 12, carbs: 35, fat: 16, serving: "100g" },
  "حريرة": { calories: 200, protein: 12, carbs: 28, fat: 4, serving: "100g" },
  
  // الخليج
  "شاورما": { calories: 360, protein: 25, carbs: 15, fat: 22, serving: "100g" },
  "دونر كباب": { calories: 380, protein: 28, carbs: 20, fat: 22, serving: "100g" },
  "مشاوي": { calories: 400, protein: 35, carbs: 5, fat: 24, serving: "100g" },
  "فرن": { calories: 420, protein: 32, carbs: 40, fat: 18, serving: "100g" },
  
  // ============ الأطعمة الآسيوية ============
  // الهند
  "بيريانى": { calories: 420, protein: 25, carbs: 50, fat: 14, serving: "100g" },
  "كاري دجاج": { calories: 280, protein: 20, carbs: 15, fat: 15, serving: "100g" },
  "بوري": { calories: 320, protein: 8, carbs: 42, fat: 12, serving: "100g" },
  "ناان": { calories: 270, protein: 8, carbs: 48, fat: 4, serving: "100g" },
  "دال": { calories: 220, protein: 15, carbs: 32, fat: 4, serving: "100g" },
  "تندوري": { calories: 280, protein: 30, carbs: 5, fat: 14, serving: "100g" },
  "سامسا": { calories: 320, protein: 10, carbs: 35, fat: 15, serving: "واحدة" },
  
  // تايلاند
  "باد تاي": { calories: 350, protein: 15, carbs: 42, fat: 12, serving: "100g" },
  "ثم يم": { calories: 200, protein: 18, carbs: 8, fat: 10, serving: "100g" },
  "لارب": { calories: 280, protein: 25, carbs: 12, fat: 14, serving: "100g" },
  "كاري أحمر": { calories: 300, protein: 20, carbs: 18, fat: 16, serving: "100g" },
  "سوب": { calories: 120, protein: 10, carbs: 12, fat: 4, serving: "100g" },
  
  // الصين
  "معكرونة صينية": { calories: 350, protein: 12, carbs: 62, fat: 6, serving: "100g" },
  "دمبلنج": { calories: 280, protein: 10, carbs: 35, fat: 10, serving: "100g" },
  "بكين داك": { calories: 380, protein: 28, carbs: 15, fat: 24, serving: "100g" },
  "مافو تفو": { calories: 240, protein: 18, carbs: 8, fat: 14, serving: "100g" },
  "فراايد رايس": { calories: 350, protein: 10, carbs: 48, fat: 12, serving: "100g" },
  
  // اليابان
  "سوشي": { calories: 140, protein: 6, carbs: 20, fat: 3, serving: "قطعة" },
  "تمبورا": { calories: 300, protein: 15, carbs: 35, fat: 12, serving: "100g" },
  "رامن": { calories: 380, protein: 14, carbs: 52, fat: 12, serving: "100g" },
  "تونكاتسو": { calories: 380, protein: 28, carbs: 25, fat: 18, serving: "100g" },
  "مسو سوب": { calories: 100, protein: 10, carbs: 8, fat: 3, serving: "100g" },
  
  // كوريا
  "بيبيمباب": { calories: 400, protein: 15, carbs: 50, fat: 14, serving: "وجبة" },
  "بولقوجي": { calories: 350, protein: 28, carbs: 18, fat: 18, serving: "100g" },
  "كيمتشي": { calories: 40, protein: 2, carbs: 7, fat: 1, serving: "100g" },
  "جيجاي": { calories: 480, protein: 22, carbs: 52, fat: 18, serving: "وجبة" },
  
  // ============ الأطعمة الأوروبية ============
  // إيطاليا
  "باستا كربونارا": { calories: 400, protein: 20, carbs: 42, fat: 16, serving: "100g" },
  "لازانيا": { calories: 340, protein: 18, carbs: 38, fat: 12, serving: "100g" },
  "بيتزا": { calories: 285, protein: 12, carbs: 36, fat: 10, serving: "شريحة" },
  "ريزوتو": { calories: 280, protein: 12, carbs: 38, fat: 8, serving: "100g" },
  "باستا بولونيز": { calories: 350, protein: 22, carbs: 38, fat: 10, serving: "100g" },
  "أسباجيتي": { calories: 340, protein: 13, carbs: 62, fat: 4, serving: "100g" },
  
  // فرنسا
  "ستيك فرايت": { calories: 520, protein: 38, carbs: 35, fat: 24, serving: "وجبة" },
  "كروسان": { calories: 406, protein: 9, carbs: 41, fat: 21, serving: "100g" },
  "سوفليه": { calories: 280, protein: 12, carbs: 15, fat: 18, serving: "100g" },
  "رايت": { calories: 400, protein: 8, carbs: 45, fat: 20, serving: "100g" },
  "دوك فوا جرا": { calories: 460, protein: 12, carbs: 2, fat: 45, serving: "100g" },
  
  // إسبانيا
  "باييلا": { calories: 380, protein: 18, carbs: 48, fat: 12, serving: "100g" },
  "تاباس": { calories: 250, protein: 12, carbs: 20, fat: 12, serving: "100g" },
  "غاسباتشو": { calories: 80, protein: 2, carbs: 15, fat: 2, serving: "100ml" },
  
  // ألمانيا
  "برتوست": { calories: 400, protein: 25, carbs: 35, fat: 16, serving: "واحد" },
  "شفايتسهاكسي": { calories: 520, protein: 48, carbs: 20, fat: 24, serving: "100g" },
  "بريتسل": { calories: 350, protein: 10, carbs: 65, fat: 5, serving: "100g" },
  
  // بريطانيا
  "فيش أند تشيبس": { calories: 350, protein: 20, carbs: 38, fat: 14, serving: "100g" },
  "شيفرد باي": { calories: 320, protein: 18, carbs: 28, fat: 14, serving: "100g" },
  "بيف ويلنجتون": { calories: 480, protein: 42, carbs: 18, fat: 26, serving: "100g" },
  
  // ============ الأطعمة الأمريكية ============
  // أمريكا
  "برجر": { calories: 540, protein: 30, carbs: 41, fat: 28, serving: "واحدة" },
  "هوت دوج": { calories: 280, protein: 12, carbs: 25, fat: 14, serving: "واحد" },
  "بافالو ويعز": { calories: 300, protein: 35, carbs: 0, fat: 16, serving: "100g" },
  "كورن برد": { calories: 380, protein: 25, carbs: 35, fat: 16, serving: "100g" },
  "جومبو": { calories: 450, protein: 18, carbs: 48, fat: 20, serving: "100g" },
  "ماك أند تشيز": { calories: 380, protein: 15, carbs: 35, fat: 18, serving: "100g" },
  "سيزار ساليد": { calories: 280, protein: 15, carbs: 10, fat: 18, serving: "100g" },
  
  // المكسيك
  "تاكو": { calories: 350, protein: 18, carbs: 35, fat: 14, serving: "واحد" },
  "بوريتو": { calories: 420, protein: 18, carbs: 48, fat: 14, serving: "واحد" },
  "تشيميتشانجا": { calories: 500, protein: 20, carbs: 52, fat: 22, serving: "واحدة" },
  "إنتشيلادا": { calories: 380, protein: 16, carbs: 42, fat: 16, serving: "واحدة" },
  "تلافوتشيب": { calories: 320, protein: 12, carbs: 35, fat: 14, serving: "100g" },
  
  // البرازيل
  "فيجوادا": { calories: 380, protein: 28, carbs: 32, fat: 14, serving: "100g" },
  "بأو دي كويجو": { calories: 360, protein: 18, carbs: 25, fat: 20, serving: "100g" },
  "فروز": { calories: 180, protein: 5, carbs: 35, fat: 2, serving: "100ml" },
  
  // الكندا
  "بوتاتين": { calories: 400, protein: 8, carbs: 52, fat: 16, serving: "100g" },
  
  // ============ الأطعمة الأفريقية ============
  // مصر (إضافي)
  "عيش بلاش": { calories: 350, protein: 12, carbs: 60, fat: 6, serving: "واحد" },
  "فول": { calories: 200, protein: 12, carbs: 28, fat: 4, serving: "100g" },
  "تعمية": { calories: 280, protein: 10, carbs: 35, fat: 10, serving: "100g" },
  
  // نيجيريا
  "جولوف رايس": { calories: 320, protein: 10, carbs: 48, fat: 8, serving: "100g" },
  "إجوسي": { calories: 280, protein: 16, carbs: 15, fat: 16, serving: "100g" },
  
  // جنوب أفريقيا
  "برايي": { calories: 350, protein: 25, carbs: 5, fat: 26, serving: "100g" },
  "بوب": { calories: 180, protein: 12, carbs: 20, fat: 5, serving: "100g" },
  
  // ============ الأطعمة التركية ============
  "دونر": { calories: 380, protein: 28, carbs: 20, fat: 22, serving: "100g" },
  "أدنة كباب": { calories: 350, protein: 30, carbs: 10, fat: 20, serving: "100g" },
  "ملفوف محشي": { calories: 200, protein: 12, carbs: 20, fat: 6, serving: "100g" },
  "كوبا": { calories: 320, protein: 14, carbs: 40, fat: 10, serving: "100g" },
  "بقلاوة": { calories: 420, protein: 6, carbs: 52, fat: 20, serving: "100g" },
  "حلقة": { calories: 350, protein: 8, carbs: 48, fat: 12, serving: "100g" },
  
  // ============ الأطعمة اليونانية ============
  "مقدونيا": { calories: 320, protein: 20, carbs: 35, fat: 10, serving: "100g" },
  "موصاكا": { calories: 380, protein: 18, carbs: 28, fat: 18, serving: "100g" },
  "فيتا تشيز": { calories: 360, protein: 28, carbs: 3, fat: 28, serving: "100g" },
  "سوفلاكي": { calories: 350, protein: 28, carbs: 15, fat: 18, serving: "100g" },
  
  // ============ الأطعمة البرتغالية ============
  "باستيل دي ناتا": { calories: 350, protein: 4, carbs: 42, fat: 18, serving: "واحدة" },
  "فرانغو بيري بيري": { calories: 380, protein: 32, carbs: 8, fat: 24, serving: "100g" },
  
  // ============ الأطعمة الهنغارية ============
  "غولاش": { calories: 320, protein: 22, carbs: 28, fat: 12, serving: "100g" },
  "بابريكاش": { calories: 350, protein: 25, carbs: 20, fat: 16, serving: "100g" },
  
  // ============ الأطعمة البولندية ============
  "بيروجي": { calories: 320, protein: 12, carbs: 42, fat: 10, serving: "100g" },
  "بيغولسكي": { calories: 380, protein: 14, carbs: 48, fat: 14, serving: "100g" },
  
  // ============ الأطعمة الروسية ============
  "بيروشكي": { calories: 380, protein: 10, carbs: 48, fat: 16, serving: "100g" },
  "بورش": { calories: 140, protein: 6, carbs: 20, fat: 3, serving: "100g" },
  "بيف ستروغانوف": { calories: 420, protein: 28, carbs: 18, fat: 24, serving: "100g" },
  
  // ============ الأطعمة الهولندية ============
  "كروكيت": { calories: 380, protein: 8, carbs: 42, fat: 18, serving: "100g" },
  "باناكوك": { calories: 280, protein: 8, carbs: 35, fat: 10, serving: "100g" },
  
  // ============ الأطعمة السويسرية ============
  "فندو": { calories: 360, protein: 28, carbs: 8, fat: 26, serving: "100g" },
  "راكليت": { calories: 420, protein: 30, carbs: 6, fat: 32, serving: "100g" },
  
  // ============ الأطعمة السويدية ============
  "كيوتبول": { calories: 320, protein: 20, carbs: 25, fat: 14, serving: "100g" },
  
  // ============ الأطعمة الفيتنامية ============
  "فو": { calories: 220, protein: 12, carbs: 32, fat: 4, serving: "100g" },
  "بان مي": { calories: 380, protein: 14, carbs: 48, fat: 12, serving: "100g" },
  "سبرينج رول": { calories: 280, protein: 8, carbs: 35, fat: 10, serving: "100g" },
  
  // ============ الأطعمة الإندونيسية ============
  "ناسي جورينج": { calories: 380, protein: 12, carbs: 52, fat: 12, serving: "100g" },
  "ميتابال": { calories: 220, protein: 10, carbs: 28, fat: 8, serving: "100g" },
  "ساتيه": { calories: 280, protein: 22, carbs: 10, fat: 18, serving: "100g" },
  
  // ============ الأطعمة الماليزية ============
  "ناسي لماك": { calories: 400, protein: 14, carbs: 52, fat: 14, serving: "100g" },
  "ميك جورينج": { calories: 360, protein: 12, carbs: 48, fat: 10, serving: "100g" },
  
  // ============ الأطعمة الفلبينية ============
  "أدوبو": { calories: 320, protein: 24, carbs: 18, fat: 16, serving: "100g" },
  "ارول": { calories: 280, protein: 8, carbs: 35, fat: 10, serving: "100g" },
  
  // ============ الأطعمة الباكستانية ============
  "بيريانى باكستانى": { calories: 420, protein: 25, carbs: 50, fat: 14, serving: "100g" },
  "نيهاري": { calories: 380, protein: 28, carbs: 25, fat: 18, serving: "100g" },
  "سموسا": { calories: 320, protein: 8, carbs: 38, fat: 14, serving: "100g" },
  
  // ============ الأطعمة الإيرانية ============
  "تبس": { calories: 380, protein: 28, carbs: 35, fat: 14, serving: "100g" },
  "كباب كوبيده": { calories: 420, protein: 38, carbs: 8, fat: 26, serving: "100g" },
  "خورش": { calories: 320, protein: 22, carbs: 28, fat: 12, serving: "100g" },
  
  // ============ الأطعمة اللبنانية ============
  "فتوش": { calories: 280, protein: 8, carbs: 25, fat: 15, serving: "100g" },
  "تبولة": { calories: 180, protein: 6, carbs: 22, fat: 8, serving: "100g" },
  "حمص بالطحينة": { calories: 280, protein: 9, carbs: 25, fat: 16, serving: "100g" },
  
  // ============ الأطعمة الإسرائيلية ============
  "فلافل إسرائيلي": { calories: 320, protein: 12, carbs: 32, fat: 14, serving: "100g" },
  "فاليفيل": { calories: 220, protein: 10, carbs: 25, fat: 8, serving: "100g" },
  
  // ============ الأطعمة اليمنية ============
  "سلتة": { calories: 400, protein: 16, carbs: 42, fat: 18, serving: "100g" },
  "أسيد": { calories: 380, protein: 14, carbs: 48, fat: 12, serving: "100g" },
  
  // ============ الأطعمة الإمارتية ============
  "حريسة": { calories: 420, protein: 20, carbs: 42, fat: 18, serving: "100g" },
  "بيلاف": { calories: 380, protein: 16, carbs: 50, fat: 10, serving: "100g" },
  
  // ============ الأطعمة الكويتية ============
  "جريش كويتي": { calories: 340, protein: 18, carbs: 40, fat: 12, serving: "100g" },
  
  // ============ الأطعمة الإماراتية ============
  "لقيمات": { calories: 350, protein: 4, carbs: 45, fat: 16, serving: "100g" },
  
  // ============ المأكولات البحرية ============
  "سمك مشوي": { calories: 82, protein: 18, carbs: 0, fat: 0.8, serving: "100g" },
  "سلمون": { calories: 208, protein: 20, carbs: 0, fat: 13, serving: "100g" },
  "جمبري": { calories: 99, protein: 24, carbs: 0, fat: 0.3, serving: "100g" },
  "تونة": { calories: 132, protein: 29, carbs: 0, fat: 1.3, serving: "100g" },
  "سمك قد": { calories: 82, protein: 18, carbs: 0, fat: 0.7, serving: "100g" },
  "محار": { calories: 68, protein: 12, carbs: 4, fat: 1, serving: "100g" },
  
  // ============ الخضار والفواكه الأساسية ============
  "تفاح": { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, serving: "100g" },
  "موز": { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: "100g" },
  "برتقال": { calories: 47, protein: 0.9, carbs: 12, fat: 0.3, serving: "100g" },
  "عنب": { calories: 67, protein: 0.7, carbs: 17, fat: 0.6, serving: "100g" },
  "مانجو": { calories: 60, protein: 0.8, carbs: 15, fat: 0.3, serving: "100g" },
  "جزر": { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, serving: "100g" },
  "بروكلي": { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: "100g" },
  "سبانخ": { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: "100g" },
  "طماطم": { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, serving: "100g" },
  "خيار": { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, serving: "100g" },
  "بطاطس": { calories: 77, protein: 1.7, carbs: 17, fat: 0.1, serving: "100g" },
  "ذرة": { calories: 86, protein: 3.2, carbs: 19, fat: 1.2, serving: "100g" },
  
  // ============ اللحوم والدواجن ============
  "دجاج مشوي": { calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  "لحم بقر": { calories: 250, protein: 26, carbs: 0, fat: 17, serving: "100g" },
  "لحم ضأن": { calories: 294, protein: 25, carbs: 0, fat: 21, serving: "100g" },
  
  // ============ الألبان والبيض ============
  "بيضة مسلوقة": { calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "وحدة" },
  "حليب": { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, serving: "100ml" },
  "جبن": { calories: 402, protein: 25, carbs: 1.3, fat: 33, serving: "100g" },
  "زبادي": { calories: 59, protein: 10, carbs: 3.3, fat: 0.4, serving: "100g" },
  
  // ============ الحبوب والخبز ============
  "خبز أسمر": { calories: 265, protein: 9, carbs: 48, fat: 3, serving: "100g" },
  "خبز أبيض": { calories: 265, protein: 8, carbs: 49, fat: 3, serving: "100g" },
  "أرز": { calories: 206, protein: 4.3, carbs: 45, fat: 0.3, serving: "100g" },
  "معكرونة": { calories: 131, protein: 5, carbs: 25, fat: 1.1, serving: "100g" },
  "شوفان": { calories: 389, protein: 17, carbs: 66, fat: 7, serving: "100g" },
  
  // ============ المكسرات والبذور ============
  "لوز": { calories: 579, protein: 21, carbs: 22, fat: 50, serving: "100g" },
  "فول سوداني": { calories: 567, protein: 26, carbs: 16, fat: 49, serving: "100g" },
  "جوز": { calories: 654, protein: 15, carbs: 13, fat: 65, serving: "100g" },
  "بذور عباد الشمس": { calories: 584, protein: 21, carbs: 20, fat: 51, serving: "100g" },
  
  // ============ الحلويات والمشروبات ============
  "شوكولاتة": { calories: 535, protein: 8, carbs: 57, fat: 30, serving: "100g" },
  "عسل": { calories: 304, protein: 0.3, carbs: 82, fat: 0, serving: "100g" },
  "قهوة": { calories: 2, protein: 0.1, carbs: 0, fat: 0.1, serving: "كوب" },
  "شاي": { calories: 2, protein: 0.3, carbs: 0, fat: 0, serving: "كوب" },
  "عصير": { calories: 45, protein: 0.7, carbs: 11, fat: 0.2, serving: "100ml" },
  "مشروب غازي": { calories: 42, protein: 0, carbs: 11, fat: 0, serving: "100ml" },
  
  // ============ وجبات خفيفة ============
  "فشار": { calories: 387, protein: 12, carbs: 77, fat: 4, serving: "100g" },
  "بسكويت": { calories: 437, protein: 6, carbs: 67, fat: 17, serving: "100g" },
  "رقائق": { calories: 530, protein: 8, carbs: 52, fat: 32, serving: "100g" },
};
