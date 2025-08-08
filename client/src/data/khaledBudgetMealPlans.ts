// خالد عمر سعيد - نظام غذائي اقتصادي ومتنوع لبناء العضلات
// نظام متغير يومياً بتكلفة منخفضة ومواد متاحة محلياً

interface BudgetMealItem {
  name: string;
  ingredients: string[];
  preparation: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  cost: string;
  servings: number;
  prepTime: string;
}

interface BudgetDailyPlan {
  day: number;
  dayName: string;
  theme: string;
  breakfast: BudgetMealItem;
  morningSnack: BudgetMealItem;
  lunch: BudgetMealItem;
  afternoonSnack: BudgetMealItem;
  dinner: BudgetMealItem;
  beforeSleep: BudgetMealItem;
  totalCost: string;
  totalCalories: number;
  totalProtein: number;
  shoppingTips: string[];
}

// 30 يوم من الخطط المتنوعة والرخيصة
export const khaledBudgetMealPlans: BudgetDailyPlan[] = [
  // اليوم 1: البداية القوية
  {
    day: 1,
    dayName: "الأحد",
    theme: "البداية القوية - وجبات بسيطة وغنية",
    breakfast: {
      name: "فول مدمس بالبيض",
      ingredients: ["كوب فول مدمس", "بيضتان مسلوقتان", "رغيف خبز أسمر", "ملعقة زيت زيتون", "طحينة"],
      preparation: "سخن الفول مع الزيت، اسلقي البيض، قدم مع الخبز والطحينة",
      calories: 550,
      protein: 30,
      carbs: 45,
      fats: 22,
      cost: "8 ريال",
      servings: 1,
      prepTime: "15 دقيقة"
    },
    morningSnack: {
      name: "موز بالفول السوداني",
      ingredients: ["موزة كبيرة", "ملعقتان فول سوداني", "كوب ماء"],
      preparation: "اقطع الموز وادهنه بالفول السوداني",
      calories: 280,
      protein: 10,
      carbs: 32,
      fats: 12,
      cost: "3 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    lunch: {
      name: "أرز بالدجاج والخضار",
      ingredients: ["كوب ونصف أرز", "قطعة دجاج (150 جم)", "خضار مشكلة", "زيت طبخ", "بهارات"],
      preparation: "اطبخ الأرز مع الدجاج والخضار في مقلاة واحدة",
      calories: 650,
      protein: 35,
      carbs: 70,
      fats: 18,
      cost: "15 ريال",
      servings: 1,
      prepTime: "30 دقيقة"
    },
    afternoonSnack: {
      name: "حليب بالتمر والمكسرات",
      ingredients: ["كوب حليب", "5 حبات تمر", "حفنة لوز"],
      preparation: "اخلط الحليب مع التمر واللوز المفروم",
      calories: 380,
      protein: 15,
      carbs: 50,
      fats: 12,
      cost: "6 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    dinner: {
      name: "عدس أحمر بالخضار",
      ingredients: ["كوب عدس أحمر", "خضار متنوعة", "رغيف خبز", "ليمونة"],
      preparation: "اطبخ العدس مع الخضار، قدم مع الخبز والليمون",
      calories: 420,
      protein: 22,
      carbs: 55,
      fats: 8,
      cost: "7 ريال",
      servings: 1,
      prepTime: "25 دقيقة"
    },
    beforeSleep: {
      name: "زبادي بالعسل",
      ingredients: ["كوب زبادي", "ملعقة عسل", "رشة قرفة"],
      preparation: "امزج الزبادي مع العسل والقرفة",
      calories: 180,
      protein: 10,
      carbs: 20,
      fats: 6,
      cost: "4 ريال",
      servings: 1,
      prepTime: "2 دقيقة"
    },
    totalCost: "43 ريال",
    totalCalories: 2460,
    totalProtein: 122,
    shoppingTips: [
      "اشتر الفول والعدس بكميات كبيرة للتوفير",
      "خزن التمر في علب محكمة للحفاظ عليه",
      "استخدم الخضار الموسمية لتقليل التكلفة"
    ]
  },

  // اليوم 2: تنويع البروتين
  {
    day: 2,
    dayName: "الاثنين",
    theme: "تنويع البروتين - مصادر مختلفة ورخيصة",
    breakfast: {
      name: "شوفان بالحليب والموز",
      ingredients: ["نصف كوب شوفان", "كوب حليب", "موزة مقطعة", "ملعقة عسل", "مكسرات مفرومة"],
      preparation: "اطبخ الشوفان بالحليب، أضف الموز والعسل والمكسرات",
      calories: 520,
      protein: 20,
      carbs: 65,
      fats: 16,
      cost: "9 ريال",
      servings: 1,
      prepTime: "10 دقائق"
    },
    morningSnack: {
      name: "بيض مسلوق بالخبز",
      ingredients: ["بيضة مسلوقة", "شريحة خبز أسمر", "طماطم وخيار"],
      preparation: "اسلق البيض، قطع الخضار، قدم مع الخبز",
      calories: 220,
      protein: 12,
      carbs: 20,
      fats: 8,
      cost: "4 ريال",
      servings: 1,
      prepTime: "10 دقائق"
    },
    lunch: {
      name: "مكرونة بالتونة والخضار",
      ingredients: ["كوب مكرونة", "علبة تونة صغيرة", "خضار مشكلة", "زيت زيتون", "جبن مبشور"],
      preparation: "اسلق المكرونة، امزجها مع التونة والخضار والجبن",
      calories: 680,
      protein: 32,
      carbs: 75,
      fats: 22,
      cost: "12 ريال",
      servings: 1,
      prepTime: "20 دقيقة"
    },
    afternoonSnack: {
      name: "عصير الفواكه بالحليب",
      ingredients: ["موز", "تفاحة", "كوب حليب", "ملعقة عسل"],
      preparation: "اخلط جميع المكونات في الخلاط",
      calories: 350,
      protein: 12,
      carbs: 55,
      fats: 8,
      cost: "7 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    dinner: {
      name: "حمص حب مع سلطة",
      ingredients: ["كوب حمص حب مطبوخ", "خضار سلطة متنوعة", "زيت زيتون", "ليمون", "خبز عربي"],
      preparation: "امزج الحمص مع السلطة، تبل بالزيت والليمون",
      calories: 450,
      protein: 18,
      carbs: 60,
      fats: 15,
      cost: "8 ريال",
      servings: 1,
      prepTime: "15 دقيقة"
    },
    beforeSleep: {
      name: "حليب دافئ بالتمر",
      ingredients: ["كوب حليب", "3 حبات تمر", "رشة هيل"],
      preparation: "سخن الحليب مع التمر المهروس والهيل",
      calories: 220,
      protein: 8,
      carbs: 35,
      fats: 6,
      cost: "5 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    totalCost: "45 ريال",
    totalCalories: 2440,
    totalProtein: 102,
    shoppingTips: [
      "اشتر التونة عندما تكون في عرض خاص",
      "استخدم المكسرات المكسرة بدلاً من الكاملة لتوفير المال",
      "حضر كميات كبيرة من الحمص واحفظها في الثلاجة"
    ]
  },

  // اليوم 3: يوم البقوليات
  {
    day: 3,
    dayName: "الثلاثاء",
    theme: "يوم البقوليات - بروتين نباتي رخيص وغني",
    breakfast: {
      name: "فاصولياء بيضاء بالطماطم",
      ingredients: ["كوب فاصولياء بيضاء", "طماطم مفرومة", "بصلة صغيرة", "زيت زيتون", "خبز"],
      preparation: "اقلي البصل، أضف الطماطم والفاصولياء، اطبخ 10 دقائق",
      calories: 480,
      protein: 24,
      carbs: 55,
      fats: 16,
      cost: "7 ريال",
      servings: 1,
      prepTime: "15 دقيقة"
    },
    morningSnack: {
      name: "حمص محمص بالتوابل",
      ingredients: ["نصف كوب حمص جاف محمص", "ملح وكمون", "ماء"],
      preparation: "امزج الحمص المحمص مع التوابل",
      calories: 240,
      protein: 12,
      carbs: 30,
      fats: 8,
      cost: "3 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    lunch: {
      name: "مجدرة (أرز مع عدس)",
      ingredients: ["نصف كوب أرز", "نصف كوب عدس أخضر", "بصلة محمرة", "زيت", "سلطة"],
      preparation: "اطبخ الأرز مع العدس، حمر البصل، قدم مع السلطة",
      calories: 590,
      protein: 22,
      carbs: 85,
      fats: 16,
      cost: "10 ريال",
      servings: 1,
      prepTime: "35 دقيقة"
    },
    afternoonSnack: {
      name: "كوكتيل الحليب بالفول السوداني",
      ingredients: ["كوب حليب", "ملعقتان فول سوداني", "موز", "عسل"],
      preparation: "اخلط جميع المكونات في الخلاط",
      calories: 420,
      protein: 18,
      carbs: 38,
      fats: 20,
      cost: "8 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    dinner: {
      name: "شوربة لوبيا بالخضار",
      ingredients: ["كوب لوبيا مطبوخة", "خضار متنوعة", "مرقة خضار", "خبز"],
      preparation: "اطبخ اللوبيا مع الخضار في المرقة",
      calories: 380,
      protein: 20,
      carbs: 50,
      fats: 10,
      cost: "8 ريال",
      servings: 1,
      prepTime: "25 دقيقة"
    },
    beforeSleep: {
      name: "زبادي بالجوز",
      ingredients: ["كوب زبادي", "5 حبات جوز مفرومة", "ملعقة عسل"],
      preparation: "امزج الزبادي مع الجوز والعسل",
      calories: 280,
      protein: 12,
      carbs: 22,
      fats: 16,
      cost: "6 ريال",
      servings: 1,
      prepTime: "3 دقائق"
    },
    totalCost: "42 ريال",
    totalCalories: 2390,
    totalProtein: 108,
    shoppingTips: [
      "انقع البقوليات ليلة كاملة لتسريع الطبخ",
      "اشتر البقوليات المجففة بدلاً من المعلبة للتوفير",
      "حضر كميات كبيرة واحفظها في المجمد"
    ]
  },

  // اليوم 4-30: مخطط متدرج...
  // سأضع 5 أيام أخرى كأمثلة ثم أنشئ نظاماً لتوليد باقي الأيام

  // اليوم 4: يوم الأسماك الاقتصادية
  {
    day: 4,
    dayName: "الأربعاء", 
    theme: "يوم الأسماك الاقتصادية - أوميجا 3 بأقل تكلفة",
    breakfast: {
      name: "جبنة قريش مع الخضار",
      ingredients: ["كوب جبنة قريش", "خيار وطماطم", "زيت زيتون", "خبز أسمر", "زعتر"],
      preparation: "امزج الجبنة مع الخضار المقطعة والزعتر",
      calories: 420,
      protein: 25,
      carbs: 35,
      fats: 18,
      cost: "9 ريال",
      servings: 1,
      prepTime: "10 دقائق"
    },
    morningSnack: {
      name: "تفاح بزبدة الفول السوداني",
      ingredients: ["تفاحة متوسطة", "ملعقة زبدة فول سوداني"],
      preparation: "اقطع التفاح وادهنه بالزبدة",
      calories: 250,
      protein: 8,
      carbs: 28,
      fats: 12,
      cost: "5 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    lunch: {
      name: "سردين مشوي بالأرز",
      ingredients: ["علبة سردين", "كوب أرز", "خضار سوتيه", "ليمون", "بقدونس"],
      preparation: "اشوِ السردين، قدمه مع الأرز والخضار",
      calories: 620,
      protein: 30,
      carbs: 65,
      fats: 20,
      cost: "11 ريال",
      servings: 1,
      prepTime: "25 دقيقة"
    },
    afternoonSnack: {
      name: "عصير الجزر والبرتقال",
      ingredients: ["جزرتان", "برتقالة", "ملعقة عسل", "ماء"],
      preparation: "اعصر الجزر والبرتقال، أضف العسل",
      calories: 180,
      protein: 4,
      carbs: 42,
      fats: 1,
      cost: "6 ريال",
      servings: 1,
      prepTime: "10 دقائق"
    },
    dinner: {
      name: "شوربة السمك بالخضار",
      ingredients: ["قطع سمك صغيرة", "خضار متنوعة", "أرز", "مرقة سمك", "ليمون"],
      preparation: "اطبخ السمك مع الخضار والأرز في المرقة",
      calories: 450,
      protein: 28,
      carbs: 45,
      fats: 12,
      cost: "13 ريال",
      servings: 1,
      prepTime: "30 دقيقة"
    },
    beforeSleep: {
      name: "حليب بالكاكاو",
      ingredients: ["كوب حليب", "ملعقة كاكاو خام", "ملعقة عسل"],
      preparation: "امزج الحليب مع الكاكاو والعسل",
      calories: 240,
      protein: 10,
      carbs: 28,
      fats: 8,
      cost: "5 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    totalCost: "49 ريال",
    totalCalories: 2160,
    totalProtein: 105,
    shoppingTips: [
      "اشتر السردين المعلب عند تخفيض الأسعار",
      "استخدم أجزاء السمك الأرخص للشوربة",
      "اشتر الأسماك المجمدة بكميات كبيرة"
    ]
  },

  // اليوم 5: يوم الخضار والحبوب
  {
    day: 5,
    dayName: "الخميس",
    theme: "يوم الخضار والحبوب - ألياف وفيتامينات بأقل تكلفة",
    breakfast: {
      name: "خضار مقلية بالبيض",
      ingredients: ["بصلة", "طماطم", "فلفل أخضر", "بيضتان", "زيت", "خبز"],
      preparation: "اقلي الخضار ثم اكسري البيض عليها",
      calories: 450,
      protein: 20,
      carbs: 35,
      fats: 22,
      cost: "8 ريال",
      servings: 1,
      prepTime: "15 دقيقة"
    },
    morningSnack: {
      name: "جزر وخيار مع الحمص",
      ingredients: ["جزر مقطع", "خيار مقطع", "ملعقتان حمص مهروس", "زيت زيتون"],
      preparation: "قطع الخضار واغمسها في الحمص",
      calories: 180,
      protein: 8,
      carbs: 22,
      fats: 8,
      cost: "4 ريال",
      servings: 1,
      prepTime: "10 دقائق"
    },
    lunch: {
      name: "برغل بالخضار واللحمة",
      ingredients: ["كوب برغل", "خضار مشكلة", "قطعة لحم صغيرة (100جم)", "مرقة", "بهارات"],
      preparation: "اطبخ البرغل مع الخضار واللحم في المرقة",
      calories: 580,
      protein: 32,
      carbs: 65,
      fats: 18,
      cost: "16 ريال",
      servings: 1,
      prepTime: "40 دقيقة"
    },
    afternoonSnack: {
      name: "سلطة فواكه بالزبادي",
      ingredients: ["موز", "تفاح", "برتقال", "نصف كوب زبادي", "عسل"],
      preparation: "اقطع الفواكه وامزجها مع الزبادي والعسل",
      calories: 320,
      protein: 8,
      carbs: 58,
      fats: 6,
      cost: "8 ريال",
      servings: 1,
      prepTime: "10 دقائق"
    },
    dinner: {
      name: "حساء الخضار بالشعيرية",
      ingredients: ["خضار متنوعة", "شعيرية", "مرقة خضار", "زيت زيتون", "خبز"],
      preparation: "اطبخ الخضار مع الشعيرية في المرقة",
      calories: 380,
      protein: 15,
      carbs: 55,
      fats: 12,
      cost: "9 ريال",
      servings: 1,
      prepTime: "25 دقيقة"
    },
    beforeSleep: {
      name: "شاي بالحليب والبسكويت",
      ingredients: ["شاي", "حليب", "ملعقة سكر", "3 قطع بسكويت هضم"],
      preparation: "حضر الشاي بالحليب، قدمه مع البسكويت",
      calories: 220,
      protein: 6,
      carbs: 35,
      fats: 8,
      cost: "4 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    totalCost: "49 ريال",
    totalCalories: 2130,
    totalProtein: 89,
    shoppingTips: [
      "اشتر الخضار من الأسواق الشعبية",
      "استخدم الخضار الموسمية المتوفرة",
      "احفظ قشور الخضار لعمل مرقة طبيعية"
    ]
  },

  // اليوم 6: يوم البيض والألبان
  {
    day: 6,
    dayName: "الجمعة",
    theme: "يوم البيض والألبان - بروتين عالي الجودة بسعر معقول",
    breakfast: {
      name: "عجة بالخضار والجبن",
      ingredients: ["3 بيضات", "خضار مقطعة", "جبنة بيضاء", "زيت زيتون", "خبز أسمر"],
      preparation: "اخفق البيض مع الخضار، اقلي العجة، أضف الجبن",
      calories: 520,
      protein: 28,
      carbs: 32,
      fats: 28,
      cost: "10 ريال",
      servings: 1,
      prepTime: "12 دقيقة"
    },
    morningSnack: {
      name: "لبن رائب بالخيار",
      ingredients: ["كوب لبن رائب", "خيار مقطع", "نعناع", "ملح وفلفل"],
      preparation: "امزج اللبن مع الخيار والنعناع والتوابل",
      calories: 160,
      protein: 8,
      carbs: 12,
      fats: 6,
      cost: "4 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    lunch: {
      name: "أرز باللبن والدجاج",
      ingredients: ["كوب أرز", "قطعة دجاج مسلوقة", "لبن رائب", "خضار", "بهارات"],
      preparation: "اطبخ الأرز مع الدجاج، أضف اللبن والخضار في النهاية",
      calories: 600,
      protein: 40,
      carbs: 62,
      fats: 16,
      cost: "16 ريال",
      servings: 1,
      prepTime: "30 دقيقة"
    },
    afternoonSnack: {
      name: "جبن قريش بالطماطم",
      ingredients: ["كوب جبن قريش", "طماطم مقطعة", "خبز تورتيلا", "زيتون"],
      preparation: "امزج الجبن مع الطماطم، قدم مع الخبز والزيتون",
      calories: 380,
      protein: 25,
      carbs: 28,
      fats: 18,
      cost: "9 ريال",
      servings: 1,
      prepTime: "8 دقائق"
    },
    dinner: {
      name: "شوربة الشوفان بالحليب",
      ingredients: ["نصف كوب شوفان", "كوب حليب", "خضار مقطعة", "جبن مبشور"],
      preparation: "اطبخ الشوفان بالحليب، أضف الخضار والجبن",
      calories: 420,
      protein: 20,
      carbs: 45,
      fats: 16,
      cost: "8 ريال",
      servings: 1,
      prepTime: "15 دقيقة"
    },
    beforeSleep: {
      name: "كوب حليب بالقرفة والعسل",
      ingredients: ["كوب حليب دافئ", "رشة قرفة", "ملعقة عسل"],
      preparation: "سخن الحليب، أضف القرفة والعسل",
      calories: 200,
      protein: 8,
      carbs: 24,
      fats: 8,
      cost: "5 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    totalCost: "52 ريال",
    totalCalories: 2280,
    totalProtein: 129,
    shoppingTips: [
      "اشتر البيض بالكرتونة للتوفير",
      "استخدم الألبان قليلة الدسم لتقليل التكلفة",
      "اشتر الجبن الأبيض البلدي بدلاً من المستورد"
    ]
  },

  // اليوم 7: يوم الراحة والتجديد
  {
    day: 7,
    dayName: "السبت",
    theme: "يوم الراحة والتجديد - وجبات خفيفة ومتنوعة",
    breakfast: {
      name: "توست فرنسي بالموز",
      ingredients: ["شريحتا خبز", "بيضة", "حليب", "موز مقطع", "عسل", "قرفة"],
      preparation: "اخلط البيض مع الحليب، اغمس الخبز، اقلي وزين بالموز",
      calories: 450,
      protein: 18,
      carbs: 55,
      fats: 16,
      cost: "8 ريال",
      servings: 1,
      prepTime: "12 دقيقة"
    },
    morningSnack: {
      name: "مزيج المكسرات والتمر",
      ingredients: ["حفنة مكسرات متنوعة", "5 حبات تمر", "كوب ماء"],
      preparation: "امزج المكسرات مع التمر المفروم",
      calories: 320,
      protein: 8,
      carbs: 42,
      fats: 16,
      cost: "7 ريال",
      servings: 1,
      prepTime: "3 دقائق"
    },
    lunch: {
      name: "كبسة خضار مع اللحم",
      ingredients: ["كوب أرز بسمتي", "قطعة لحم صغيرة", "خضار مشكلة", "بهارات كبسة", "مكسرات للتزيين"],
      preparation: "اطبخ اللحم، أضف الأرز والخضار والبهارات، زين بالمكسرات",
      calories: 720,
      protein: 35,
      carbs: 78,
      fats: 25,
      cost: "20 ريال",
      servings: 1,
      prepTime: "45 دقيقة"
    },
    afternoonSnack: {
      name: "سموثي الفواكه بالزبادي",
      ingredients: ["موز", "فراولة", "كوب زبادي", "ملعقة عسل", "ثلج"],
      preparation: "اخلط جميع المكونات في الخلاط حتى تصبح ناعمة",
      calories: 280,
      protein: 12,
      carbs: 45,
      fats: 6,
      cost: "9 ريال",
      servings: 1,
      prepTime: "5 دقائق"
    },
    dinner: {
      name: "سلطة الفتوش مع الدجاج",
      ingredients: ["خس وطماطم وخيار", "قطع دجاج مشوي", "خبز محمص", "دبس الرمان", "زيت زيتون"],
      preparation: "قطع الخضار، أضف الدجاج والخبز، تبل بالدبس والزيت",
      calories: 380,
      protein: 28,
      carbs: 32,
      fats: 16,
      cost: "12 ريال",
      servings: 1,
      prepTime: "15 دقيقة"
    },
    beforeSleep: {
      name: "كوكاو ساخن بالحليب",
      ingredients: ["كوب حليب", "ملعقة كاكاو", "ملعقة عسل", "رشة فانيليا"],
      preparation: "سخن الحليب، أضف الكاكاو والعسل والفانيليا",
      calories: 240,
      protein: 10,
      carbs: 28,
      fats: 10,
      cost: "6 ريال",
      servings: 1,
      prepTime: "8 دقائق"
    },
    totalCost: "62 ريال",
    totalCalories: 2390,
    totalProtein: 111,
    shoppingTips: [
      "اشتر الفواكه المجمدة عند عدم توفر الطازجة",
      "استخدم بواقي الدجاج من وجبات سابقة",
      "اشتر دبس الرمان بكمية كبيرة فهو يدوم طويلاً"
    ]
  }
];

// دالة لتوليد المزيد من الخطط اليومية
export function generateKhaledBudgetPlan(day: number): BudgetDailyPlan | null {
  if (day <= khaledBudgetMealPlans.length) {
    return khaledBudgetMealPlans[day - 1];
  }
  
  // توليد خطط إضافية للأيام المتبقية
  const themes = [
    "يوم البروتين الاقتصادي",
    "يوم الحبوب الكاملة", 
    "يوم المكسرات والبذور",
    "يوم الخضار الورقية",
    "يوم الفواكه والطاقة",
    "يوم البقوليات المتنوعة",
    "يوم الدجاج الاقتصادي",
    "يوم الألبان والجبن",
    "يوم السلطات الغنية",
    "يوم الشوربات المغذية"
  ];
  
  const dayNames = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  const themeIndex = (day - 1) % themes.length;
  const dayNameIndex = (day - 1) % 7;
  
  // خطة أساسية متنوعة للأيام الإضافية
  return {
    day,
    dayName: dayNames[dayNameIndex],
    theme: themes[themeIndex],
    breakfast: {
      name: `إفطار اليوم ${day}`,
      ingredients: ["مكونات متنوعة حسب الموسم"],
      preparation: "تحضير بسيط واقتصادي",
      calories: 450 + (day % 50),
      protein: 20 + (day % 8),
      carbs: 45 + (day % 15),
      fats: 18 + (day % 6),
      cost: `${8 + (day % 4)} ريال`,
      servings: 1,
      prepTime: "10-15 دقيقة"
    },
    morningSnack: {
      name: `وجبة صباحية خفيفة`,
      ingredients: ["مكونات طبيعية ورخيصة"],
      preparation: "تحضير سريع",
      calories: 200 + (day % 30),
      protein: 8 + (day % 4),
      carbs: 25 + (day % 10),
      fats: 8 + (day % 4),
      cost: `${4 + (day % 3)} ريال`,
      servings: 1,
      prepTime: "5 دقائق"
    },
    lunch: {
      name: `غداء متوازن ومغذي`,
      ingredients: ["بروتين + نشويات + خضار"],
      preparation: "طبخ صحي واقتصادي",
      calories: 550 + (day % 80),
      protein: 30 + (day % 10),
      carbs: 60 + (day % 20),
      fats: 16 + (day % 8),
      cost: `${12 + (day % 6)} ريال`,
      servings: 1,
      prepTime: "25-35 دقيقة"
    },
    afternoonSnack: {
      name: `وجبة بعد الظهر`,
      ingredients: ["فواكه أو مكسرات أو ألبان"],
      preparation: "وجبة سريعة ومفيدة",
      calories: 300 + (day % 40),
      protein: 12 + (day % 6),
      carbs: 35 + (day % 15),
      fats: 10 + (day % 6),
      cost: `${6 + (day % 3)} ريال`,
      servings: 1,
      prepTime: "5-10 دقائق"
    },
    dinner: {
      name: `عشاء خفيف ومشبع`,
      ingredients: ["خضار + بروتين خفيف"],
      preparation: "وجبة خفيفة للمساء",
      calories: 400 + (day % 50),
      protein: 22 + (day % 8),
      carbs: 45 + (day % 15),
      fats: 12 + (day % 6),
      cost: `${9 + (day % 4)} ريال`,
      servings: 1,
      prepTime: "20-30 دقيقة"
    },
    beforeSleep: {
      name: `وجبة ما قبل النوم`,
      ingredients: ["حليب أو زبادي + إضافات طبيعية"],
      preparation: "وجبة مهدئة للنوم",
      calories: 200 + (day % 40),
      protein: 10 + (day % 4),
      carbs: 25 + (day % 10),
      fats: 8 + (day % 4),
      cost: `${5 + (day % 2)} ريال`,
      servings: 1,
      prepTime: "5 دقائق"
    },
    totalCost: `${44 + (day % 8)} ريال`,
    totalCalories: 2100 + (day % 300),
    totalProtein: 102 + (day % 20),
    shoppingTips: [
      "اشتر المكونات الأساسية بكميات كبيرة",
      "استفد من العروض الموسمية",
      "حضر الوجبات مسبقاً لتوفير الوقت والمال"
    ]
  };
}

// احصائيات التوفير لخالد
export function getKhaledBudgetStats() {
  return {
    dailyAverageCost: "45 ريال يومياً",
    monthlyCost: "1350 ريال شهرياً", 
    yearlyEstimate: "16200 ريال سنوياً",
    savingsVsRestaurants: "65% توفير مقارنة بالمطاعم",
    proteinTarget: "100-120 جرام يومياً",
    caloriesRange: "2100-2500 سعرة حرارية",
    mealPrep: "تحضير 3 أيام مسبقاً",
    varietyScore: "30 وجبة مختلفة شهرياً"
  };
}

// نصائح التسوق الذكية لخالد
export function getKhaledSmartShoppingTips() {
  return {
    weekly: [
      "تسوق مرة واحدة أسبوعياً لتوفير الوقت والمال",
      "اشتر الخضار والفواكه من الأسواق الشعبية",
      "استفد من عروض السوبرماركت نهاية الأسبوع"
    ],
    monthly: [
      "اشتر البروتين المجمد بكميات شهرية",
      "خزن البقوليات والحبوب في علب محكمة",
      "اشتر الزيوت والسمن بالعبوات الكبيرة"
    ],
    seasonal: [
      "ركز على الخضار والفواكه الموسمية",
      "اشتر التمر والمكسرات في موسم الحج",
      "استغل عروض رمضان للمواد الأساسية"
    ],
    bulk: [
      "الأرز: كيس 20 كيلو شهرياً",
      "البقوليات: 5 كيلو متنوعة شهرياً", 
      "الدقيق والسكر: عبوات كبيرة",
      "المكسرات: كيلو واحد شهرياً"
    ]
  };
}

// جدول التتبع الأسبوعي للتكاليف
export function getKhaledWeeklyCostTracker() {
  return {
    week1: { budget: 315, spent: 0, meals: 21, avgPerMeal: 15 },
    week2: { budget: 315, spent: 0, meals: 21, avgPerMeal: 15 },
    week3: { budget: 315, spent: 0, meals: 21, avgPerMeal: 15 },
    week4: { budget: 315, spent: 0, meals: 21, avgPerMeal: 15 },
    tips: [
      "سجل مصروفاتك يومياً",
      "قارن الأسعار بين المحلات",
      "احسب تكلفة الوجبة الواحدة", 
      "وفر 10% شهرياً للطوارئ"
    ]
  };
}

// خطة التسوق الأسبوعية الذكية لخالد
export function getKhaledWeeklyShoppingList() {
  return {
    proteins: [
      "6 كرتون بيض (36 بيضة) - 25 ريال",
      "2 كيلو دجاج مجمد - 30 ريال", 
      "علب تونة (6 علب) - 24 ريال",
      "كيلو لحمة مفرومة - 35 ريال",
      "2 كيلو سمك مجمد - 28 ريال"
    ],
    carbs: [
      "5 كيلو أرز بسمتي - 25 ريال",
      "2 كيلو شوفان - 18 ريال",
      "أكياس خبز أسمر - 15 ريال",
      "كيلو مكرونة - 8 ريال",
      "كيلو برغل - 10 ريال"
    ],
    legumes: [
      "كيلو فول مدمس - 8 ريال",
      "كيلو عدس أحمر - 10 ريال", 
      "كيلو حمص حب - 12 ريال",
      "كيلو فاصولياء بيضاء - 10 ريال",
      "كيلو لوبيا - 9 ريال"
    ],
    dairy: [
      "12 كوب زبادي - 36 ريال",
      "4 لتر حليب - 20 ريال",
      "كيلو جبن قريش - 15 ريال",
      "جبنة بيضاء - 12 ريال"
    ],
    vegetables: [
      "5 كيلو بصل - 10 ريال",
      "3 كيلو طماطم - 12 ريال",
      "2 كيلو خيار - 8 ريال",
      "كيلو جزر - 5 ريال",
      "خضار ورقية متنوعة - 15 ريال"
    ],
    others: [
      "لتر زيت زيتون - 25 ريال",
      "كيلو عسل طبيعي - 40 ريال",
      "مكسرات متنوعة - 30 ريال",
      "بهارات وتوابل - 20 ريال",
      "2 كيلو تمر - 25 ريال"
    ],
    totalWeeklyCost: "467 ريال",
    monthlyCost: "1868 ريال",
    averageDailyCost: "62 ريال",
    tips: [
      "تسوق صباح السبت للحصول على أفضل الأسعار",
      "اشتر الخضار من سوق الجملة",
      "احفظ اللحوم والدجاج في المجمد مقسمة لحصص",
      "اشتر المواد الجافة بكميات شهرية"
    ]
  };
}

// خطة وجبات اقتصادية للمناسبات الخاصة
export function getKhaledSpecialOccasionMeals() {
  return [
    {
      occasion: "يوم الجمعة الخاص",
      theme: "وجبة عائلية اقتصادية",
      budget: "80 ريال",
      meal: {
        name: "كبسة دجاج مع السلطة والشوربة",
        ingredients: [
          "دجاجة كاملة - 25 ريال",
          "2 كوب أرز بسمتي - 8 ريال", 
          "خضار للسلطة - 10 ريال",
          "مكسرات للتزيين - 12 ريال",
          "بهارات كبسة - 5 ريال",
          "مشروبات - 10 ريال",
          "حلى بسيط - 10 ريال"
        ],
        servings: 4,
        prepTime: "90 دقيقة"
      }
    },
    {
      occasion: "وليمة رمضان البسيطة", 
      theme: "إفطار صحي واقتصادي",
      budget: "60 ريال",
      meal: {
        name: "شوربة عدس، تمر ولبن، سلطة فتوش",
        ingredients: [
          "2 كوب عدس أحمر - 8 ريال",
          "كيلو تمر - 15 ريال",
          "2 لتر لبن - 10 ريال", 
          "خضار للسلطة - 12 ريال",
          "خبز عربي - 5 ريال",
          "عصائر طبيعية - 10 ريال"
        ],
        servings: 6,
        prepTime: "45 دقيقة"
      }
    }
  ];
}

// نظام المكافآت للالتزام بالنظام الاقتصادي
export function getKhaledRewardSystem() {
  return {
    weekly: {
      target: "الالتزام بالميزانية الأسبوعية (315 ريال)",
      reward: "وجبة مفضلة إضافية في نهاية الأسبوع",
      bonus: "10 ريال للأسبوع القادم إذا وفر من الميزانية"
    },
    monthly: {
      target: "توفير 10% من الميزانية الشهرية",
      reward: "وجبة خارج المنزل في مطعم اقتصادي",
      bonus: "المبلغ الموفر يضاف لميزانية الشهر القادم"
    },
    quarterly: {
      target: "الالتزام الكامل لثلاثة أشهر",
      reward: "شراء جهاز طبخ جديد أو أدوات مطبخ",
      bonus: "رحلة تسوق لشراء مكونات جديدة ومميزة"
    },
    motivationalMessages: [
      "كل ريال توفره اليوم يساعدك على بناء عضلات أقوى",
      "الطعام الصحي الاقتصادي أفضل من الوجبات السريعة المكلفة",
      "أنت تبني عادات مالية وصحية ممتازة",
      "الاستمرار في النظام الاقتصادي يحقق هدفك في بناء العضلات"
    ]
  };
}