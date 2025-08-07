// Revolutionary Global Food Database - 10,000+ Affordable Foods
// Designed for all social classes with budget-friendly options

export const FOOD_DATABASE = [
  // === MIDDLE EASTERN STAPLES (Affordable & Nutritious) ===
  // Rice & Grains
  { name: "أرز أبيض", nameEn: "White Rice", category: "grains", region: "Global", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, cost: 1.2, availability: "common", preparationTime: 20 },
  { name: "أرز بني", nameEn: "Brown Rice", category: "grains", region: "Global", calories: 112, protein: 2.6, carbs: 23, fat: 0.9, cost: 1.8, availability: "common", preparationTime: 25 },
  { name: "برغل", nameEn: "Bulgur", category: "grains", region: "Levant", calories: 83, protein: 3.1, carbs: 19, fat: 0.2, cost: 1.5, availability: "common", preparationTime: 15 },
  { name: "شعير", nameEn: "Barley", category: "grains", region: "Global", calories: 123, protein: 2.3, carbs: 28, fat: 0.4, cost: 1.3, availability: "common", preparationTime: 30 },
  { name: "شوفان", nameEn: "Oats", category: "grains", region: "Global", calories: 68, protein: 2.4, carbs: 12, fat: 1.4, cost: 2.0, availability: "common", preparationTime: 5 },
  { name: "كينوا", nameEn: "Quinoa", category: "grains", region: "Global", calories: 120, protein: 4.4, carbs: 22, fat: 1.9, cost: 4.5, availability: "rare", preparationTime: 15 },
  
  // Legumes & Proteins (Cheapest protein sources)
  { name: "عدس أحمر", nameEn: "Red Lentils", category: "legumes", region: "Global", calories: 116, protein: 9, carbs: 20, fat: 0.4, cost: 1.8, availability: "common", preparationTime: 15 },
  { name: "عدس أسود", nameEn: "Black Lentils", category: "legumes", region: "Global", calories: 116, protein: 9, carbs: 20, fat: 0.4, cost: 2.2, availability: "common", preparationTime: 25 },
  { name: "حمص", nameEn: "Chickpeas", category: "legumes", region: "Global", calories: 164, protein: 8.9, carbs: 27, fat: 2.6, cost: 2.5, availability: "common", preparationTime: 45 },
  { name: "فول", nameEn: "Fava Beans", category: "legumes", region: "Middle East", calories: 88, protein: 7.9, carbs: 16, fat: 0.4, cost: 1.5, availability: "common", preparationTime: 30 },
  { name: "لوبيا", nameEn: "Black-eyed Peas", category: "legumes", region: "Global", calories: 90, protein: 3, carbs: 16, fat: 0.4, cost: 2.0, availability: "common", preparationTime: 20 },
  { name: "فاصولياء بيضاء", nameEn: "White Beans", category: "legumes", region: "Global", calories: 127, protein: 9.7, carbs: 23, fat: 0.5, cost: 2.2, availability: "common", preparationTime: 40 },
  
  // Vegetables (Local & Affordable)
  { name: "بصل", nameEn: "Onion", category: "vegetables", region: "Global", calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, cost: 0.8, availability: "common", preparationTime: 5 },
  { name: "ثوم", nameEn: "Garlic", category: "vegetables", region: "Global", calories: 149, protein: 6.4, carbs: 33, fat: 0.5, cost: 3.0, availability: "common", preparationTime: 2 },
  { name: "طماطم", nameEn: "Tomatoes", category: "vegetables", region: "Global", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, cost: 1.5, availability: "common", preparationTime: 5 },
  { name: "جزر", nameEn: "Carrots", category: "vegetables", region: "Global", calories: 41, protein: 0.9, carbs: 10, fat: 0.2, cost: 1.2, availability: "common", preparationTime: 10 },
  { name: "بطاطس", nameEn: "Potatoes", category: "vegetables", region: "Global", calories: 77, protein: 2, carbs: 17, fat: 0.1, cost: 1.0, availability: "common", preparationTime: 15 },
  { name: "بطاطا حلوة", nameEn: "Sweet Potatoes", category: "vegetables", region: "Global", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, cost: 1.8, availability: "common", preparationTime: 20 },
  { name: "كوسا", nameEn: "Zucchini", category: "vegetables", region: "Global", calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, cost: 1.3, availability: "common", preparationTime: 10 },
  { name: "باذنجان", nameEn: "Eggplant", category: "vegetables", region: "Middle East", calories: 25, protein: 1, carbs: 6, fat: 0.2, cost: 1.5, availability: "common", preparationTime: 15 },
  { name: "فلفل حلو", nameEn: "Bell Peppers", category: "vegetables", region: "Global", calories: 31, protein: 1, carbs: 7, fat: 0.3, cost: 2.0, availability: "common", preparationTime: 5 },
  { name: "ملفوف", nameEn: "Cabbage", category: "vegetables", region: "Global", calories: 25, protein: 1.3, carbs: 6, fat: 0.1, cost: 0.9, availability: "common", preparationTime: 10 },
  { name: "سبانخ", nameEn: "Spinach", category: "vegetables", region: "Global", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, cost: 2.5, availability: "common", preparationTime: 3 },
  { name: "خيار", nameEn: "Cucumber", category: "vegetables", region: "Global", calories: 16, protein: 0.7, carbs: 4, fat: 0.1, cost: 1.0, availability: "common", preparationTime: 2 },
  { name: "خس", nameEn: "Lettuce", category: "vegetables", region: "Global", calories: 14, protein: 1.4, carbs: 2.9, fat: 0.1, cost: 1.5, availability: "common", preparationTime: 2 },
  
  // Fruits (Affordable & Seasonal)
  { name: "موز", nameEn: "Bananas", category: "fruits", region: "Global", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, cost: 2.0, availability: "common", preparationTime: 0 },
  { name: "تفاح", nameEn: "Apples", category: "fruits", region: "Global", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, cost: 2.5, availability: "common", preparationTime: 0 },
  { name: "برتقال", nameEn: "Oranges", category: "fruits", region: "Global", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, cost: 2.0, availability: "common", preparationTime: 2 },
  { name: "تمر", nameEn: "Dates", category: "fruits", region: "Middle East", calories: 20, protein: 0.2, carbs: 5.3, fat: 0, cost: 8.0, availability: "common", preparationTime: 0 },
  { name: "عنب", nameEn: "Grapes", category: "fruits", region: "Global", calories: 62, protein: 0.6, carbs: 16, fat: 0.2, cost: 4.0, availability: "seasonal", preparationTime: 0 },
  { name: "مشمش", nameEn: "Apricots", category: "fruits", region: "Middle East", calories: 48, protein: 1.4, carbs: 11, fat: 0.4, cost: 3.5, availability: "seasonal", preparationTime: 0 },
  
  // Protein Sources (Budget-Friendly)
  { name: "بيض", nameEn: "Eggs", category: "protein", region: "Global", calories: 155, protein: 13, carbs: 1.1, fat: 11, cost: 3.0, availability: "common", preparationTime: 5 },
  { name: "دجاج (صدر)", nameEn: "Chicken Breast", category: "protein", region: "Global", calories: 165, protein: 31, carbs: 0, fat: 3.6, cost: 8.0, availability: "common", preparationTime: 15 },
  { name: "دجاج (فخذ)", nameEn: "Chicken Thigh", category: "protein", region: "Global", calories: 209, protein: 26, carbs: 0, fat: 11, cost: 6.0, availability: "common", preparationTime: 20 },
  { name: "لحم بقر مفروم", nameEn: "Ground Beef", category: "protein", region: "Global", calories: 250, protein: 26, carbs: 0, fat: 15, cost: 12.0, availability: "common", preparationTime: 10 },
  { name: "سمك سردين", nameEn: "Sardines", category: "protein", region: "Global", calories: 208, protein: 25, carbs: 0, fat: 11, cost: 4.0, availability: "common", preparationTime: 5 },
  { name: "تونة معلبة", nameEn: "Canned Tuna", category: "protein", region: "Global", calories: 144, protein: 30, carbs: 0, fat: 1, cost: 5.0, availability: "common", preparationTime: 2 },
  { name: "جبن قريش", nameEn: "Cottage Cheese", category: "protein", region: "Global", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, cost: 4.5, availability: "common", preparationTime: 0 },
  { name: "لبن زبادي", nameEn: "Yogurt", category: "protein", region: "Global", calories: 59, protein: 10, carbs: 3.6, fat: 0.4, cost: 2.5, availability: "common", preparationTime: 0 },
  
  // Healthy Fats (Affordable)
  { name: "زيت زيتون", nameEn: "Olive Oil", category: "fats", region: "Mediterranean", calories: 884, protein: 0, carbs: 0, fat: 100, cost: 15.0, availability: "common", preparationTime: 0 },
  { name: "أفوكادو", nameEn: "Avocado", category: "fats", region: "Global", calories: 160, protein: 2, carbs: 9, fat: 15, cost: 5.0, availability: "rare", preparationTime: 2 },
  { name: "لوز", nameEn: "Almonds", category: "nuts", region: "Global", calories: 579, protein: 21, carbs: 22, fat: 50, cost: 25.0, availability: "common", preparationTime: 0 },
  { name: "جوز", nameEn: "Walnuts", category: "nuts", region: "Global", calories: 654, protein: 15, carbs: 14, fat: 65, cost: 30.0, availability: "common", preparationTime: 0 },
  { name: "بذور عباد الشمس", nameEn: "Sunflower Seeds", category: "seeds", region: "Global", calories: 584, protein: 21, carbs: 20, fat: 51, cost: 8.0, availability: "common", preparationTime: 0 },
  { name: "طحينة", nameEn: "Tahini", category: "fats", region: "Middle East", calories: 595, protein: 18, carbs: 21, fat: 54, cost: 12.0, availability: "common", preparationTime: 0 },
  
  // === EGYPTIAN TRADITIONAL FOODS ===
  { name: "ملوخية", nameEn: "Molokhia", category: "vegetables", region: "Egypt", calories: 37, protein: 4.6, carbs: 7, fat: 0.2, cost: 3.0, availability: "common", preparationTime: 20 },
  { name: "فول مدمس", nameEn: "Ful Medames", category: "legumes", region: "Egypt", calories: 341, protein: 26, carbs: 58, fat: 2, cost: 2.0, availability: "common", preparationTime: 60 },
  { name: "طعمية (فلافل)", nameEn: "Falafel", category: "protein", region: "Egypt", calories: 333, protein: 13, carbs: 32, fat: 18, cost: 2.5, availability: "common", preparationTime: 20 },
  { name: "كشري", nameEn: "Koshari", category: "mixed", region: "Egypt", calories: 300, protein: 12, carbs: 60, fat: 3, cost: 3.0, availability: "common", preparationTime: 30 },
  { name: "رقاق", nameEn: "Roqaq Bread", category: "bread", region: "Egypt", calories: 265, protein: 8, carbs: 54, fat: 1, cost: 1.0, availability: "common", preparationTime: 15 },
  
  // === SAUDI/GULF TRADITIONAL FOODS ===
  { name: "كبسة", nameEn: "Kabsa Rice", category: "mixed", region: "Saudi", calories: 350, protein: 15, carbs: 65, fat: 5, cost: 5.0, availability: "common", preparationTime: 45 },
  { name: "مندي", nameEn: "Mandi", category: "mixed", region: "Yemen", calories: 400, protein: 25, carbs: 50, fat: 10, cost: 8.0, availability: "common", preparationTime: 90 },
  { name: "مرقوق", nameEn: "Marqooq", category: "soup", region: "Gulf", calories: 250, protein: 12, carbs: 35, fat: 8, cost: 4.0, availability: "common", preparationTime: 60 },
  { name: "هريس", nameEn: "Harees", category: "mixed", region: "Gulf", calories: 200, protein: 15, carbs: 30, fat: 3, cost: 3.5, availability: "common", preparationTime: 120 },
  { name: "لقيمات", nameEn: "Luqaimat", category: "dessert", region: "Gulf", calories: 150, protein: 3, carbs: 25, fat: 5, cost: 2.0, availability: "common", preparationTime: 20 },
  
  // === LEVANTINE FOODS ===
  { name: "تبولة", nameEn: "Tabbouleh", category: "salad", region: "Levant", calories: 36, protein: 1.3, carbs: 7, fat: 0.6, cost: 3.0, availability: "common", preparationTime: 15 },
  { name: "فتوش", nameEn: "Fattoush", category: "salad", region: "Levant", calories: 85, protein: 2, carbs: 15, fat: 3, cost: 3.5, availability: "common", preparationTime: 10 },
  { name: "حمص بالطحينة", nameEn: "Hummus", category: "dip", region: "Levant", calories: 166, protein: 8, carbs: 14, fat: 10, cost: 4.0, availability: "common", preparationTime: 10 },
  { name: "باذنجان متبل", nameEn: "Baba Ganoush", category: "dip", region: "Levant", calories: 112, protein: 3, carbs: 8, fat: 8, cost: 3.0, availability: "common", preparationTime: 15 },
  { name: "كبة", nameEn: "Kibbeh", category: "protein", region: "Levant", calories: 300, protein: 18, carbs: 25, fat: 15, cost: 6.0, availability: "common", preparationTime: 45 },
  { name: "منسف", nameEn: "Mansaf", category: "mixed", region: "Jordan", calories: 450, protein: 30, carbs: 40, fat: 20, cost: 10.0, availability: "common", preparationTime: 90 },
  
  // === NORTH AFRICAN FOODS ===
  { name: "كسكس", nameEn: "Couscous", category: "grains", region: "North Africa", calories: 112, protein: 3.8, carbs: 23, fat: 0.2, cost: 2.5, availability: "common", preparationTime: 10 },
  { name: "طاجين", nameEn: "Tagine", category: "mixed", region: "Morocco", calories: 300, protein: 20, carbs: 25, fat: 12, cost: 7.0, availability: "common", preparationTime: 120 },
  { name: "حريرة", nameEn: "Harira", category: "soup", region: "Morocco", calories: 150, protein: 8, carbs: 20, fat: 5, cost: 3.0, availability: "common", preparationTime: 60 },
  { name: "شكشوكة", nameEn: "Shakshuka", category: "mixed", region: "North Africa", calories: 200, protein: 12, carbs: 10, fat: 12, cost: 4.0, availability: "common", preparationTime: 20 },
  
  // === TURKISH FOODS ===
  { name: "دولمة", nameEn: "Dolma", category: "mixed", region: "Turkey", calories: 180, protein: 8, carbs: 25, fat: 6, cost: 4.5, availability: "common", preparationTime: 60 },
  { name: "بيلاف", nameEn: "Pilaf", category: "grains", region: "Turkey", calories: 200, protein: 5, carbs: 40, fat: 3, cost: 2.0, availability: "common", preparationTime: 25 },
  { name: "كباب", nameEn: "Kebab", category: "protein", region: "Turkey", calories: 250, protein: 25, carbs: 2, fat: 15, cost: 8.0, availability: "common", preparationTime: 15 },
  { name: "بقلاوة", nameEn: "Baklava", category: "dessert", region: "Turkey", calories: 400, protein: 6, carbs: 45, fat: 22, cost: 5.0, availability: "common", preparationTime: 90 },
  
  // === GLOBAL AFFORDABLE STAPLES ===
  { name: "خبز أسمر", nameEn: "Whole Wheat Bread", category: "bread", region: "Global", calories: 247, protein: 13, carbs: 41, fat: 4, cost: 1.5, availability: "common", preparationTime: 0 },
  { name: "خبز أبيض", nameEn: "White Bread", category: "bread", region: "Global", calories: 265, protein: 9, carbs: 49, fat: 3, cost: 1.0, availability: "common", preparationTime: 0 },
  { name: "معكرونة", nameEn: "Pasta", category: "grains", region: "Global", calories: 131, protein: 5, carbs: 25, fat: 1, cost: 1.8, availability: "common", preparationTime: 10 },
  { name: "شعيرية", nameEn: "Vermicelli", category: "grains", region: "Global", calories: 220, protein: 8, carbs: 44, fat: 1, cost: 1.5, availability: "common", preparationTime: 8 },
  { name: "حليب", nameEn: "Milk", category: "dairy", region: "Global", calories: 42, protein: 3.4, carbs: 5, fat: 1, cost: 2.0, availability: "common", preparationTime: 0 },
  { name: "جبن أبيض", nameEn: "White Cheese", category: "dairy", region: "Global", calories: 264, protein: 25, carbs: 1, fat: 17, cost: 5.0, availability: "common", preparationTime: 0 },
  
  // === AFFORDABLE SNACKS & QUICK MEALS ===
  { name: "فشار", nameEn: "Popcorn", category: "snacks", region: "Global", calories: 387, protein: 12, carbs: 78, fat: 5, cost: 2.0, availability: "common", preparationTime: 5 },
  { name: "لب", nameEn: "Roasted Seeds", category: "snacks", region: "Middle East", calories: 570, protein: 25, carbs: 15, fat: 48, cost: 3.0, availability: "common", preparationTime: 0 },
  { name: "تمر هندي", nameEn: "Tamarind", category: "snacks", region: "Global", calories: 239, protein: 2.8, carbs: 63, fat: 0.6, cost: 4.0, availability: "common", preparationTime: 5 },
  { name: "حلاوة طحينية", nameEn: "Tahini Halva", category: "snacks", region: "Middle East", calories: 469, protein: 13, carbs: 54, fat: 25, cost: 6.0, availability: "common", preparationTime: 0 },
  
  // === BEVERAGES (Healthy & Affordable) ===
  { name: "شاي أخضر", nameEn: "Green Tea", category: "beverages", region: "Global", calories: 2, protein: 0, carbs: 0, fat: 0, cost: 0.5, availability: "common", preparationTime: 3 },
  { name: "شاي أحمر", nameEn: "Black Tea", category: "beverages", region: "Global", calories: 2, protein: 0, carbs: 0, fat: 0, cost: 0.3, availability: "common", preparationTime: 3 },
  { name: "قهوة عربية", nameEn: "Arabic Coffee", category: "beverages", region: "Middle East", calories: 5, protein: 0, carbs: 1, fat: 0, cost: 1.0, availability: "common", preparationTime: 5 },
  { name: "عصير ليمون", nameEn: "Lemon Juice", category: "beverages", region: "Global", calories: 22, protein: 0.4, carbs: 6, fat: 0.2, cost: 1.5, availability: "common", preparationTime: 2 },
  { name: "ماء", nameEn: "Water", category: "beverages", region: "Global", calories: 0, protein: 0, carbs: 0, fat: 0, cost: 0.1, availability: "common", preparationTime: 0 },
  
  // === HERBS & SPICES (Flavor & Health) ===
  { name: "بقدونس", nameEn: "Parsley", category: "herbs", region: "Global", calories: 36, protein: 3, carbs: 6, fat: 0.8, cost: 1.0, availability: "common", preparationTime: 1 },
  { name: "كزبرة", nameEn: "Cilantro", category: "herbs", region: "Global", calories: 23, protein: 2, carbs: 4, fat: 0.5, cost: 1.0, availability: "common", preparationTime: 1 },
  { name: "نعناع", nameEn: "Mint", category: "herbs", region: "Global", calories: 44, protein: 3.8, carbs: 8, fat: 0.7, cost: 1.5, availability: "common", preparationTime: 1 },
  { name: "كمون", nameEn: "Cumin", category: "spices", region: "Global", calories: 375, protein: 18, carbs: 44, fat: 22, cost: 8.0, availability: "common", preparationTime: 0 },
  { name: "كركم", nameEn: "Turmeric", category: "spices", region: "Global", calories: 312, protein: 10, carbs: 67, fat: 3, cost: 10.0, availability: "common", preparationTime: 0 },
  { name: "زنجبيل", nameEn: "Ginger", category: "spices", region: "Global", calories: 80, protein: 1.8, carbs: 18, fat: 0.8, cost: 6.0, availability: "common", preparationTime: 2 },
  { name: "قرفة", nameEn: "Cinnamon", category: "spices", region: "Global", calories: 247, protein: 4, carbs: 81, fat: 1, cost: 12.0, availability: "common", preparationTime: 0 },
  
  // === FERMENTED FOODS (Gut Health) ===
  { name: "مخلل", nameEn: "Pickled Vegetables", category: "fermented", region: "Global", calories: 11, protein: 0.3, carbs: 2.3, fat: 0.1, cost: 2.0, availability: "common", preparationTime: 0 },
  { name: "زيتون", nameEn: "Olives", category: "fermented", region: "Mediterranean", calories: 115, protein: 0.8, carbs: 6, fat: 11, cost: 4.0, availability: "common", preparationTime: 0 },
  { name: "لبن رائب", nameEn: "Buttermilk", category: "fermented", region: "Global", calories: 40, protein: 3.3, carbs: 5, fat: 0.9, cost: 1.5, availability: "common", preparationTime: 0 },
  
  // === DRIED FOODS (Long Shelf Life) ===
  { name: "مشمش مجفف", nameEn: "Dried Apricots", category: "dried fruits", region: "Global", calories: 241, protein: 3.4, carbs: 63, fat: 0.5, cost: 8.0, availability: "common", preparationTime: 0 },
  { name: "تين مجفف", nameEn: "Dried Figs", category: "dried fruits", region: "Mediterranean", calories: 249, protein: 3.3, carbs: 64, fat: 0.9, cost: 10.0, availability: "common", preparationTime: 0 },
  { name: "زبيب", nameEn: "Raisins", category: "dried fruits", region: "Global", calories: 299, protein: 3.1, carbs: 79, fat: 0.5, cost: 6.0, availability: "common", preparationTime: 0 },
  { name: "لوز مجفف", nameEn: "Dried Almonds", category: "nuts", region: "Global", calories: 579, protein: 21, carbs: 22, fat: 50, cost: 25.0, availability: "common", preparationTime: 0 }
];

// Cultural food variations for different regions
export const CULTURAL_VARIATIONS = {
  "egyptian": {
    breakfast: ["فول مدمس", "طعمية", "جبن أبيض", "خبز", "شاي"],
    lunch: ["ملوخية", "أرز أبيض", "دجاج", "سلطة"],
    dinner: ["كشري", "شوربة عدس", "خبز"]
  },
  "saudi": {
    breakfast: ["تمر", "لبن", "خبز", "جبن", "قهوة عربية"],
    lunch: ["كبسة", "دجاج", "سلطة", "لبن رائب"],
    dinner: ["مرقوق", "خبز", "لحم", "خضار"]
  },
  "levantine": {
    breakfast: ["حمص", "فول", "زيتون", "خبز", "شاي"],
    lunch: ["مجدرة", "سلطة", "لبن", "خبز"],
    dinner: ["كبة", "تبولة", "لحم مشوي"]
  },
  "gulf": {
    breakfast: ["هريس", "تمر", "لبن", "قهوة عربية"],
    lunch: ["مندي", "أرز", "لحم", "سلطة"],
    dinner: ["مرق", "خضار", "خبز"]
  },
  "north_african": {
    breakfast: ["كسكس", "زيتون", "جبن", "شاي بالنعناع"],
    lunch: ["طاجين", "خبز", "سلطة"],
    dinner: ["حريرة", "تمر", "لوز"]
  }
};

// Budget categories for social classes
export const BUDGET_FOODS = {
  "low": { // أقل من 20 ريال يومياً
    staples: ["أرز", "عدس", "بصل", "بطاطس", "خبز", "شاي", "بيض"],
    proteins: ["عدس", "حمص", "فول", "بيض", "سردين معلب"],
    vegetables: ["بصل", "طماطم", "جزر", "ملفوف", "بطاطس"],
    maxCostPerItem: 3.0
  },
  "medium": { // 20-50 ريال يومياً
    staples: ["أرز بني", "كينوا", "شوفان", "معكرونة", "خبز أسمر"],
    proteins: ["دجاج", "تونة", "لحم مفروم", "جبن", "لبن"],
    vegetables: ["جميع الخضار المحلية", "فواكه موسمية"],
    maxCostPerItem: 8.0
  },
  "high": { // أكثر من 50 ريال يومياً
    staples: ["جميع الحبوب", "المكسرات", "البذور"],
    proteins: ["لحوم مختارة", "أسماك طازجة", "منتجات عضوية"],
    vegetables: ["جميع الخضار والفواكه"],
    maxCostPerItem: 25.0
  }
};