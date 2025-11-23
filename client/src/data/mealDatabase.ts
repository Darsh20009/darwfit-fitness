// قاعدة بيانات شاملة جداً من الوجبات والأطعمة
export const mealDatabase: Record<string, { calories: number; protein: number; carbs: number; fat: number; serving: string }> = {
  // الخبز والحبوب
  "خبز أسمر": { calories: 265, protein: 9, carbs: 48, fat: 3, serving: "100g" },
  "خبز أبيض": { calories: 265, protein: 8, carbs: 49, fat: 3, serving: "100g" },
  "خبز برجر": { calories: 290, protein: 8, carbs: 51, fat: 4.5, serving: "واحدة" },
  "خبز توست": { calories: 100, protein: 3, carbs: 18, fat: 1, serving: "شريحة" },
  "خبز صامون": { calories: 280, protein: 9, carbs: 45, fat: 6, serving: "100g" },
  "خبز ذرة": { calories: 280, protein: 8, carbs: 52, fat: 4, serving: "100g" },
  "أرز أبيض": { calories: 206, protein: 4.3, carbs: 45, fat: 0.3, serving: "100g" },
  "أرز بني": { calories: 215, protein: 5, carbs: 45, fat: 1.8, serving: "100g" },
  "أرز بسمتي": { calories: 206, protein: 4, carbs: 46, fat: 0.2, serving: "100g" },
  "أرز ياسمين": { calories: 206, protein: 4.2, carbs: 45, fat: 0.3, serving: "100g" },
  "معكرونة عادية": { calories: 131, protein: 5, carbs: 25, fat: 1.1, serving: "100g" },
  "معكرونة بالدجاج": { calories: 280, protein: 25, carbs: 30, fat: 6, serving: "100g" },
  "معكرونة كاملة القمح": { calories: 140, protein: 6, carbs: 26, fat: 1.5, serving: "100g" },
  "كسكس": { calories: 150, protein: 5, carbs: 32, fat: 0.3, serving: "100g" },
  "ذرة": { calories: 86, protein: 3.2, carbs: 19, fat: 1.2, serving: "100g" },
  "عدس": { calories: 116, protein: 9, carbs: 20, fat: 0.4, serving: "100g" },
  "حمص": { calories: 164, protein: 8.9, carbs: 27, fat: 2.6, serving: "100g" },
  "فاصولياء": { calories: 127, protein: 8, carbs: 23, fat: 0.5, serving: "100g" },
  "فول مدمس": { calories: 290, protein: 12, carbs: 38, fat: 8, serving: "100g" },
  "حنطة": { calories: 340, protein: 14, carbs: 72, fat: 2, serving: "100g" },
  
  // الدواجن
  "دجاج مشوي": { calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  "دجاج مقلي": { calories: 320, protein: 28, carbs: 0, fat: 24, serving: "100g" },
  "صدر دجاج مسلوق": { calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  "فخذ دجاج": { calories: 209, protein: 26, carbs: 0, fat: 11, serving: "100g" },
  "جناح دجاج": { calories: 245, protein: 26, carbs: 0, fat: 14, serving: "100g" },
  "كنتاكي": { calories: 305, protein: 23, carbs: 10, fat: 17, serving: "قطعة" },
  "برجر دجاج": { calories: 290, protein: 18, carbs: 25, fat: 12, serving: "واحدة" },
  "دجاج محشي": { calories: 350, protein: 28, carbs: 15, fat: 20, serving: "100g" },
  "شاورما دجاج": { calories: 380, protein: 28, carbs: 20, fat: 24, serving: "100g" },
  "دجاج برياني": { calories: 420, protein: 25, carbs: 50, fat: 14, serving: "100g" },
  
  // اللحوم
  "لحم بقر": { calories: 250, protein: 26, carbs: 0, fat: 17, serving: "100g" },
  "لحم مفروم": { calories: 217, protein: 23, carbs: 0, fat: 13, serving: "100g" },
  "لحم ضأن": { calories: 294, protein: 25, carbs: 0, fat: 21, serving: "100g" },
  "كبدة البقر": { calories: 135, protein: 26, carbs: 4, fat: 3, serving: "100g" },
  "كبدة الدجاج": { calories: 130, protein: 24, carbs: 1, fat: 3.5, serving: "100g" },
  "كلاوي": { calories: 112, protein: 20, carbs: 1.5, fat: 2.5, serving: "100g" },
  "لحم مسحب": { calories: 160, protein: 28, carbs: 0, fat: 5, serving: "100g" },
  "شاورما لحم": { calories: 360, protein: 25, carbs: 15, fat: 22, serving: "100g" },
  "كفتة لحم": { calories: 320, protein: 22, carbs: 10, fat: 20, serving: "100g" },
  "لحم مفروم مشوي": { calories: 280, protein: 25, carbs: 5, fat: 16, serving: "100g" },
  
  // السمك والمأكولات البحرية
  "سمك مشوي": { calories: 82, protein: 18, carbs: 0, fat: 0.8, serving: "100g" },
  "سلمون": { calories: 208, protein: 20, carbs: 0, fat: 13, serving: "100g" },
  "سمك الفرخ": { calories: 82, protein: 18, carbs: 0, fat: 0.7, serving: "100g" },
  "جمبري": { calories: 99, protein: 24, carbs: 0, fat: 0.3, serving: "100g" },
  "تونة": { calories: 132, protein: 29, carbs: 0, fat: 1.3, serving: "100g" },
  "سمك مقلي": { calories: 280, protein: 25, carbs: 12, fat: 15, serving: "100g" },
  "سمك بالزيت": { calories: 250, protein: 22, carbs: 0, fat: 18, serving: "100g" },
  "سرطان البحر": { calories: 85, protein: 18, carbs: 1, fat: 0.5, serving: "100g" },
  "محار": { calories: 68, protein: 12, carbs: 4, fat: 1, serving: "100g" },
  "أخطبوط": { calories: 82, protein: 15, carbs: 2, fat: 1, serving: "100g" },
  
  // البيض والألبان
  "بيضة مسلوقة": { calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "وحدة" },
  "بيضة مقلية": { calories: 185, protein: 13, carbs: 1, fat: 15, serving: "وحدة" },
  "بيضة مخفوقة": { calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "وحدة" },
  "بياض بيضة": { calories: 17, protein: 3.6, carbs: 0.7, fat: 0, serving: "وحدة" },
  "صفار بيضة": { calories: 322, protein: 16, carbs: 1.1, fat: 28, serving: "وحدة" },
  "زبادي عادي": { calories: 59, protein: 10, carbs: 3.3, fat: 0.4, serving: "100g" },
  "زبادي يوناني": { calories: 100, protein: 17, carbs: 4, fat: 0.5, serving: "100g" },
  "زبادي بالفواكه": { calories: 120, protein: 8, carbs: 18, fat: 2, serving: "100g" },
  "حليب كامل": { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, serving: "100ml" },
  "حليب منزوع الدسم": { calories: 34, protein: 3.4, carbs: 4.8, fat: 0.1, serving: "100ml" },
  "حليب بنصف دسم": { calories: 49, protein: 3.3, carbs: 4.8, fat: 1.6, serving: "100ml" },
  "جبن": { calories: 402, protein: 25, carbs: 1.3, fat: 33, serving: "100g" },
  "جبن أبيض": { calories: 280, protein: 25, carbs: 3, fat: 16, serving: "100g" },
  "جبن شيدر": { calories: 403, protein: 23, carbs: 3, fat: 33, serving: "100g" },
  "قشدة": { calories: 340, protein: 2, carbs: 2.7, fat: 35, serving: "100ml" },
  "حليب مكثف": { calories: 330, protein: 8, carbs: 56, fat: 10, serving: "100ml" },
  
  // الخضار الطازة
  "جزر": { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, serving: "100g" },
  "جزر مسلوق": { calories: 35, protein: 0.8, carbs: 8, fat: 0.2, serving: "100g" },
  "بروكلي": { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: "100g" },
  "قرنبيط": { calories: 25, protein: 1.9, carbs: 5, fat: 0.3, serving: "100g" },
  "سبانخ": { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: "100g" },
  "طماطم": { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, serving: "100g" },
  "خيار": { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, serving: "100g" },
  "بصل": { calories: 40, protein: 1.1, carbs: 9, fat: 0.1, serving: "100g" },
  "ثوم": { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, serving: "100g" },
  "ملفوف": { calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, serving: "100g" },
  "خس": { calories: 15, protein: 1.2, carbs: 2.9, fat: 0.3, serving: "100g" },
  "بطاطس": { calories: 77, protein: 1.7, carbs: 17, fat: 0.1, serving: "100g" },
  "بطاطس حلوة": { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: "100g" },
  "باذنجان": { calories: 25, protein: 1, carbs: 5.9, fat: 0.2, serving: "100g" },
  "فلفل أحمر": { calories: 31, protein: 1, carbs: 6, fat: 0.3, serving: "100g" },
  "فلفل أخضر": { calories: 30, protein: 1, carbs: 7, fat: 0.3, serving: "100g" },
  "كوسة": { calories: 21, protein: 1.4, carbs: 3.5, fat: 0.4, serving: "100g" },
  "بامية": { calories: 33, protein: 1.9, carbs: 7.5, fat: 0.1, serving: "100g" },
  "فجل": { calories: 16, protein: 0.6, carbs: 3.4, fat: 0.1, serving: "100g" },
  "بازلاء": { calories: 81, protein: 5.4, carbs: 14, fat: 0.4, serving: "100g" },
  
  // الفواكه
  "تفاح": { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, serving: "100g" },
  "موز": { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: "100g" },
  "برتقال": { calories: 47, protein: 0.9, carbs: 12, fat: 0.3, serving: "100g" },
  "عنب": { calories: 67, protein: 0.7, carbs: 17, fat: 0.6, serving: "100g" },
  "مانجو": { calories: 60, protein: 0.8, carbs: 15, fat: 0.3, serving: "100g" },
  "إجاص": { calories: 57, protein: 0.4, carbs: 15, fat: 0.1, serving: "100g" },
  "شمام": { calories: 34, protein: 0.8, carbs: 8, fat: 0.2, serving: "100g" },
  "فراولة": { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, serving: "100g" },
  "تمر": { calories: 282, protein: 2.5, carbs: 75, fat: 0.3, serving: "100g" },
  "رطب": { calories: 227, protein: 1.8, carbs: 62, fat: 0.3, serving: "100g" },
  "جوافة": { calories: 68, protein: 2.6, carbs: 14, fat: 0.6, serving: "100g" },
  "رمان": { calories: 83, protein: 1.7, carbs: 19, fat: 0.3, serving: "100g" },
  "أناناس": { calories: 50, protein: 0.5, carbs: 13, fat: 0.1, serving: "100g" },
  "جوز الهند": { calories: 354, protein: 3.3, carbs: 15, fat: 33, serving: "100g" },
  "رمح": { calories: 34, protein: 0.9, carbs: 8, fat: 0.2, serving: "100g" },
  "ليمون": { calories: 29, protein: 1.1, carbs: 9, fat: 0.3, serving: "100g" },
  "ليمة": { calories: 30, protein: 0.7, carbs: 11, fat: 0.2, serving: "100g" },
  "كيوي": { calories: 61, protein: 1.1, carbs: 15, fat: 0.5, serving: "100g" },
  "شمام أصفر": { calories: 34, protein: 0.8, carbs: 8, fat: 0.2, serving: "100g" },
  "كرز": { calories: 63, protein: 1.1, carbs: 16, fat: 0.2, serving: "100g" },
  
  // المكسرات والبذور
  "لوز": { calories: 579, protein: 21, carbs: 22, fat: 50, serving: "100g" },
  "فول سوداني": { calories: 567, protein: 26, carbs: 16, fat: 49, serving: "100g" },
  "جوز": { calories: 654, protein: 15, carbs: 13, fat: 65, serving: "100g" },
  "فستق": { calories: 562, protein: 20, carbs: 28, fat: 45, serving: "100g" },
  "كاجو": { calories: 553, protein: 18, carbs: 30, fat: 44, serving: "100g" },
  "لب دوار الشمس": { calories: 584, protein: 21, carbs: 20, fat: 51, serving: "100g" },
  "لب القرع": { calories: 541, protein: 25, carbs: 19, fat: 46, serving: "100g" },
  "تمر هندي": { calories: 239, protein: 2.8, carbs: 62, fat: 0.6, serving: "100g" },
  "جوز البرازيل": { calories: 656, protein: 14, carbs: 12, fat: 66, serving: "100g" },
  "بندق": { calories: 628, protein: 15, carbs: 17, fat: 61, serving: "100g" },
  
  // الزيوت والدهون
  "زيت زيتون": { calories: 884, protein: 0, carbs: 0, fat: 100, serving: "100ml" },
  "زيت نباتي": { calories: 884, protein: 0, carbs: 0, fat: 100, serving: "100ml" },
  "زيت جوز الهند": { calories: 892, protein: 0, carbs: 0, fat: 99, serving: "100ml" },
  "زبدة": { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, serving: "100g" },
  "مايونيز": { calories: 680, protein: 1, carbs: 0.7, fat: 75, serving: "100ml" },
  "كاتشاب": { calories: 99, protein: 1.7, carbs: 26, fat: 0.3, serving: "100g" },
  "خردل": { calories: 66, protein: 3.6, carbs: 4.1, fat: 3.3, serving: "100g" },
  "صلصة صويا": { calories: 80, protein: 12, carbs: 5, fat: 0.5, serving: "100ml" },
  
  // الوجبات الجاهزة
  "برجر": { calories: 540, protein: 30, carbs: 41, fat: 28, serving: "واحدة" },
  "برجر مزدوج": { calories: 900, protein: 50, carbs: 65, fat: 45, serving: "واحدة" },
  "بيتزا": { calories: 285, protein: 12, carbs: 36, fat: 10, serving: "شريحة" },
  "كبسة": { calories: 450, protein: 28, carbs: 45, fat: 15, serving: "وجبة" },
  "مندي": { calories: 480, protein: 32, carbs: 48, fat: 16, serving: "وجبة" },
  "شاورما": { calories: 360, protein: 25, carbs: 15, fat: 22, serving: "100g" },
  "فلافل": { calories: 330, protein: 13, carbs: 28, fat: 18, serving: "100g" },
  "فلاتة": { calories: 290, protein: 10, carbs: 35, fat: 12, serving: "واحدة" },
  "ساندويتش": { calories: 350, protein: 15, carbs: 40, fat: 14, serving: "واحد" },
  "ساندويتش الدجاج": { calories: 380, protein: 20, carbs: 42, fat: 16, serving: "واحد" },
  "تاكو": { calories: 350, protein: 18, carbs: 35, fat: 14, serving: "واحد" },
  "كنتاكي بوكس": { calories: 800, protein: 50, carbs: 70, fat: 35, serving: "وجبة" },
  "لحم بعجين": { calories: 400, protein: 20, carbs: 45, fat: 15, serving: "واحدة" },
  
  // الحلويات والمشروبات
  "حلويات": { calories: 350, protein: 2, carbs: 80, fat: 3, serving: "100g" },
  "شوكولاتة": { calories: 535, protein: 8, carbs: 57, fat: 30, serving: "100g" },
  "بسكويت": { calories: 437, protein: 6, carbs: 67, fat: 17, serving: "100g" },
  "عسل": { calories: 304, protein: 0.3, carbs: 82, fat: 0, serving: "100g" },
  "سكر": { calories: 387, protein: 0, carbs: 100, fat: 0, serving: "100g" },
  "قهوة سادة": { calories: 2, protein: 0.1, carbs: 0, fat: 0.1, serving: "كوب" },
  "شاي": { calories: 2, protein: 0.3, carbs: 0, fat: 0, serving: "كوب" },
  "عصير برتقال": { calories: 45, protein: 0.7, carbs: 11, fat: 0.2, serving: "100ml" },
  "عصير ليمون": { calories: 29, protein: 0.4, carbs: 9, fat: 0.2, serving: "100ml" },
  "حليب بالشوكولاتة": { calories: 150, protein: 8, carbs: 24, fat: 2.5, serving: "200ml" },
  "مشروب غازي": { calories: 42, protein: 0, carbs: 11, fat: 0, serving: "100ml" },
  "قهوة بالحليب": { calories: 75, protein: 3, carbs: 5, fat: 3, serving: "كوب" },
  "كاكاو": { calories: 120, protein: 3, carbs: 28, fat: 1, serving: "100g" },
  "عصير مانجو": { calories: 60, protein: 0.7, carbs: 14, fat: 0.3, serving: "100ml" },
  "عصير تفاح": { calories: 44, protein: 0.1, carbs: 11, fat: 0.1, serving: "100ml" },
  
  // وجبات خاصة
  "فطور كامل": { calories: 550, protein: 20, carbs: 60, fat: 18, serving: "وجبة" },
  "غداء كامل": { calories: 750, protein: 35, carbs: 80, fat: 25, serving: "وجبة" },
  "عشاء خفيف": { calories: 450, protein: 20, carbs: 50, fat: 15, serving: "وجبة" },
  "وجبة خفيفة": { calories: 200, protein: 8, carbs: 25, fat: 7, serving: "وجبة" },
  
  // أطعمة آسيوية
  "رز بالدجاج": { calories: 380, protein: 25, carbs: 45, fat: 10, serving: "100g" },
  "نودلز": { calories: 380, protein: 13, carbs: 71, fat: 1, serving: "100g" },
  "سوشي": { calories: 140, protein: 6, carbs: 20, fat: 3, serving: "قطعة" },
  "تمبورا": { calories: 300, protein: 15, carbs: 35, fat: 12, serving: "100g" },
  "ساتيه": { calories: 280, protein: 22, carbs: 10, fat: 18, serving: "100g" },
  
  // أطعمة إيطالية
  "لازانيا": { calories: 340, protein: 18, carbs: 38, fat: 12, serving: "100g" },
  "باستا كربونارا": { calories: 400, protein: 20, carbs: 42, fat: 16, serving: "100g" },
  "باستا بولونيز": { calories: 350, protein: 22, carbs: 38, fat: 10, serving: "100g" },
  "ريزوتو": { calories: 280, protein: 12, carbs: 38, fat: 8, serving: "100g" },
  
  // أطعمة هندية
  "كاري": { calories: 280, protein: 20, carbs: 15, fat: 15, serving: "100g" },
  "تندوري": { calories: 280, protein: 30, carbs: 5, fat: 14, serving: "100g" },
  "دال": { calories: 220, protein: 15, carbs: 32, fat: 4, serving: "100g" },
  "سامسا": { calories: 320, protein: 10, carbs: 35, fat: 15, serving: "واحدة" },
  
  // أطعمة مكسيكية
  "بوريتو": { calories: 420, protein: 18, carbs: 48, fat: 14, serving: "واحد" },
  "تشيميتشانجا": { calories: 500, protein: 20, carbs: 52, fat: 22, serving: "واحدة" },
  "ناتشوز": { calories: 350, protein: 12, carbs: 35, fat: 18, serving: "100g" },
  "اينتشيلادا": { calories: 380, protein: 16, carbs: 42, fat: 16, serving: "واحدة" },
  
  // أطعمة تركية
  "دونر كباب": { calories: 380, protein: 28, carbs: 20, fat: 22, serving: "100g" },
  "أدنا كباب": { calories: 350, protein: 30, carbs: 10, fat: 20, serving: "100g" },
  "ملفوف محشي": { calories: 200, protein: 12, carbs: 20, fat: 6, serving: "100g" },
  
  // منتجات البحر الإضافية
  "سرطان البحر المعلب": { calories: 85, protein: 18, carbs: 1, fat: 0.5, serving: "100g" },
  "سمك التونة المعلب": { calories: 200, protein: 29, carbs: 0, fat: 9, serving: "100g" },
  "سردين": { calories: 208, protein: 25, carbs: 0, fat: 12, serving: "100g" },
  
  // الفطر والنباتات
  "فطر": { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, serving: "100g" },
  "فطر محار": { calories: 25, protein: 3, carbs: 3.6, fat: 0.4, serving: "100g" },
  "فطر أبيض": { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, serving: "100g" },
  
  // البقول والحبوب الكاملة
  "شعير": { calories: 354, protein: 12, carbs: 77, fat: 2.3, serving: "100g" },
  "شوفان": { calories: 389, protein: 17, carbs: 66, fat: 7, serving: "100g" },
  "كينوا": { calories: 368, protein: 14, carbs: 64, fat: 6, serving: "100g" },
  "بذور الشيا": { calories: 486, protein: 15, carbs: 42, fat: 31, serving: "100g" },
  
  // الصلصات الإضافية
  "صلصة طماطم": { calories: 32, protein: 1.5, carbs: 7, fat: 0.2, serving: "100g" },
  "صلصة الفلفل الحار": { calories: 50, protein: 1.5, carbs: 10, fat: 0.5, serving: "100g" },
  "صلصة الفطر": { calories: 120, protein: 3, carbs: 15, fat: 5, serving: "100g" },
  "صلصة البيضاء": { calories: 180, protein: 6, carbs: 8, fat: 14, serving: "100g" },
  
  // منتجات اللبن الإضافية
  "كفير": { calories: 60, protein: 11, carbs: 4, fat: 0.5, serving: "100g" },
  "جبنة موتزاريلا": { calories: 280, protein: 28, carbs: 3.1, fat: 17, serving: "100g" },
  "جبنة ريكوتا": { calories: 174, protein: 11, carbs: 3, fat: 13, serving: "100g" },
  "جبنة الماعز": { calories: 364, protein: 22, carbs: 0.6, fat: 30, serving: "100g" },
  
  // الأطعمة المجمدة
  "برجر مجمد": { calories: 300, protein: 20, carbs: 25, fat: 14, serving: "واحد" },
  "كفتة مجمدة": { calories: 280, protein: 18, carbs: 8, fat: 18, serving: "100g" },
  "كروكيت بطاطس": { calories: 320, protein: 8, carbs: 40, fat: 14, serving: "100g" },
  
  // الأطعمة الحمراء
  "شمندر": { calories: 43, protein: 1.6, carbs: 10, fat: 0.2, serving: "100g" },
  "فلفل احمر محمر": { calories: 350, protein: 12, carbs: 30, fat: 20, serving: "100g" },
  
  // الأطعمة البيضاء
  "قنبيط أبيض": { calories: 25, protein: 1.9, carbs: 5, fat: 0.3, serving: "100g" },
  "ثوم مسلوق": { calories: 135, protein: 6.3, carbs: 30, fat: 0.5, serving: "100g" },
  
  // إضافات شهيرة
  "عسل أسود": { calories: 310, protein: 0, carbs: 80, fat: 0, serving: "100g" },
  "دبس التمر": { calories: 280, protein: 0.5, carbs: 75, fat: 0.2, serving: "100g" },
  "دبس الرمان": { calories: 70, protein: 0.5, carbs: 18, fat: 0.2, serving: "100ml" },
  
  // الخبزيات والمخبوزات الإضافية
  "كرواسان": { calories: 406, protein: 9, carbs: 41, fat: 21, serving: "100g" },
  "دونات": { calories: 452, protein: 4.5, carbs: 58, fat: 21, serving: "100g" },
  "كيك الشوكولاتة": { calories: 405, protein: 5, carbs: 52, fat: 20, serving: "100g" },
  "فطائر": { calories: 320, protein: 6, carbs: 48, fat: 10, serving: "100g" },
};
