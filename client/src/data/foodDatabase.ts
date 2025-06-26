// Comprehensive Arabic food database with nutritional information
export interface FoodItem {
  calories: number;
  protein: number;
  carbs: number;
  fats?: number;
}

export interface FoodCategory {
  [foodName: string]: FoodItem;
}

export interface FoodDatabase {
  [categoryName: string]: FoodCategory;
}

export const arabicFoodDatabase: FoodDatabase = {
  "المطبخ المصري": {
    "كشري": { calories: 350, protein: 8, carbs: 60, fats: 8 },
    "فول مدمس": { calories: 132, protein: 7, carbs: 19, fats: 1 },
    "طعمية": { calories: 290, protein: 13, carbs: 25, fats: 18 },
    "ملوخية": { calories: 95, protein: 6, carbs: 10, fats: 3 },
    "بامية": { calories: 85, protein: 5, carbs: 9, fats: 2 },
    "مسقعة": { calories: 140, protein: 9, carbs: 12, fats: 7 },
    "محشي كرنب": { calories: 165, protein: 7, carbs: 15, fats: 10 },
    "رز بالخلطة": { calories: 180, protein: 5, carbs: 35, fats: 3 },
    "كبدة اسكندراني": { calories: 180, protein: 25, carbs: 5, fats: 7 },
    "حمام محشي": { calories: 300, protein: 28, carbs: 20, fats: 12 },
    "رقاق باللحمة": { calories: 385, protein: 22, carbs: 30, fats: 20 },
    "سلطة بلدي": { calories: 50, protein: 2, carbs: 8, fats: 2 },
    "بابا غنوج": { calories: 70, protein: 3, carbs: 6, fats: 4 },
    "طحينة": { calories: 90, protein: 3, carbs: 5, fats: 8 },
    "مخلل": { calories: 15, protein: 0, carbs: 3, fats: 0 },
    "كوارع": { calories: 400, protein: 35, carbs: 10, fats: 25 },
    "ممبار": { calories: 350, protein: 30, carbs: 8, fats: 20 },
    "حواوشي": { calories: 280, protein: 18, carbs: 25, fats: 12 },
    "فتة": { calories: 450, protein: 15, carbs: 40, fats: 25 },
    "كبدة": { calories: 220, protein: 30, carbs: 5, fats: 8 },
    "بيض بلدي مسلوق": { calories: 70, protein: 6, carbs: 1, fats: 5 },
    "جبنة قريش": { calories: 90, protein: 12, carbs: 1, fats: 4 },
    "عيش بلدي": { calories: 160, protein: 4, carbs: 32, fats: 2 },
    "عدس أصفر": { calories: 250, protein: 12, carbs: 35, fats: 4 },
    "كشك": { calories: 300, protein: 8, carbs: 40, fats: 12 }
  },
  "كريب مالح": {
    "كريب شاورما فراخ": { calories: 480, protein: 28, carbs: 45, fats: 22 },
    "كريب شاورما لحم": { calories: 520, protein: 30, carbs: 46, fats: 25 },
    "كريب فراخ بالجبنة": { calories: 500, protein: 26, carbs: 48, fats: 23 },
    "كريب سوسيس": { calories: 470, protein: 20, carbs: 50, fats: 20 },
    "كريب بانيه": { calories: 530, protein: 25, carbs: 52, fats: 24 },
    "كريب بسطرمة": { calories: 490, protein: 24, carbs: 46, fats: 22 },
    "كريب سلامي": { calories: 480, protein: 22, carbs: 45, fats: 21 },
    "كريب ميكس جبن": { calories: 450, protein: 18, carbs: 44, fats: 20 },
    "كريب جبنة رومي": { calories: 430, protein: 16, carbs: 42, fats: 18 },
    "كريب جبنة موتزاريلا": { calories: 440, protein: 17, carbs: 43, fats: 19 },
    "كريب تونة": { calories: 450, protein: 22, carbs: 42, fats: 20 },
    "كريب جمبري": { calories: 520, protein: 30, carbs: 44, fats: 24 },
    "كريب كفتة": { calories: 500, protein: 26, carbs: 46, fats: 23 }
  },
  "كريب حلو": {
    "كريب نوتيلا": { calories: 520, protein: 10, carbs: 58, fats: 28 },
    "كريب نوتيلا + موز": { calories: 560, protein: 11, carbs: 62, fats: 30 },
    "كريب نوتيلا + فراولة": { calories: 570, protein: 11, carbs: 64, fats: 30 },
    "كريب نوتيلا + مكسرات": { calories: 600, protein: 12, carbs: 65, fats: 35 },
    "كريب بالعسل": { calories: 500, protein: 9, carbs: 60, fats: 20 },
    "كريب مربى": { calories: 490, protein: 8, carbs: 55, fats: 22 },
    "كريب كراميل": { calories: 510, protein: 9, carbs: 58, fats: 24 },
    "كريب زبدة + سكر": { calories: 460, protein: 7, carbs: 52, fats: 23 },
    "كريب أوريو": { calories: 530, protein: 9, carbs: 60, fats: 26 },
    "كريب شوكولاتة بيضاء": { calories: 540, protein: 10, carbs: 62, fats: 28 }
  },
  "فطير حادق": {
    "فطير باللحمة المفرومة": { calories: 580, protein: 18, carbs: 40, fats: 38 },
    "فطير بالفراخ": { calories: 560, protein: 20, carbs: 42, fats: 35 },
    "فطير بالسجق البلدي": { calories: 600, protein: 21, carbs: 41, fats: 40 },
    "فطير بالبسطرمة": { calories: 590, protein: 20, carbs: 43, fats: 38 },
    "فطير بالكبدة": { calories: 570, protein: 19, carbs: 40, fats: 37 },
    "فطير بالتونة": { calories: 540, protein: 18, carbs: 38, fats: 35 },
    "فطير بالجبنة الموتزاريلا": { calories: 500, protein: 12, carbs: 37, fats: 32 },
    "فطير ميكس جبن": { calories: 530, protein: 15, carbs: 36, fats: 35 },
    "فطير سبانخ وجبن": { calories: 460, protein: 12, carbs: 34, fats: 28 },
    "فطير بطاطس": { calories: 450, protein: 10, carbs: 42, fats: 26 }
  },
  "فطير حلو": {
    "فطير بالعسل الأبيض": { calories: 500, protein: 7, carbs: 58, fats: 26 },
    "فطير بالعسل الأسود": { calories: 510, protein: 8, carbs: 60, fats: 26 },
    "فطير بالعسل والطحينة": { calories: 530, protein: 9, carbs: 62, fats: 28 },
    "فطير بالسكر البودرة": { calories: 470, protein: 6, carbs: 54, fats: 24 },
    "فطير بالمربى": { calories: 490, protein: 7, carbs: 56, fats: 25 },
    "فطير بالكاسترد": { calories: 540, protein: 8, carbs: 58, fats: 28 },
    "فطير بالشوكولاتة": { calories: 550, protein: 9, carbs: 60, fats: 30 },
    "فطير نوتيلا": { calories: 570, protein: 10, carbs: 60, fats: 32 },
    "فطير نوتيلا + موز": { calories: 600, protein: 11, carbs: 64, fats: 34 },
    "فطير زبدة + سكر": { calories: 520, protein: 9, carbs: 57, fats: 28 }
  },
  "المطبخ السعودي والخليجي": {
    "كبسة لحم": { calories: 320, protein: 25, carbs: 30, fats: 12 },
    "مندي دجاج": { calories: 280, protein: 30, carbs: 25, fats: 8 },
    "مطبق": { calories: 310, protein: 12, carbs: 35, fats: 15 },
    "جريش": { calories: 220, protein: 8, carbs: 30, fats: 8 },
    "مرقوق": { calories: 245, protein: 15, carbs: 25, fats: 9 },
    "مضغوط": { calories: 290, protein: 22, carbs: 20, fats: 12 },
    "معصوب": { calories: 270, protein: 6, carbs: 45, fats: 10 },
    "شاكرية": { calories: 190, protein: 5, carbs: 35, fats: 5 },
    "مجبوس": { calories: 315, protein: 20, carbs: 30, fats: 12 },
    "صالونة": { calories: 225, protein: 18, carbs: 15, fats: 10 },
    "سليق": { calories: 300, protein: 10, carbs: 40, fats: 10 },
    "مفطح": { calories: 500, protein: 40, carbs: 30, fats: 25 },
    "قرصان": { calories: 350, protein: 25, carbs: 25, fats: 18 },
    "مراصيع": { calories: 280, protein: 18, carbs: 20, fats: 14 }
  },
  "المطبخ الشامي": {
    "فتوش": { calories: 120, protein: 3, carbs: 15, fats: 6 },
    "تبولة": { calories: 100, protein: 3, carbs: 18, fats: 4 },
    "كبة مقلية": { calories: 260, protein: 12, carbs: 20, fats: 15 },
    "كبة بالصينية": { calories: 300, protein: 14, carbs: 25, fats: 16 },
    "شيش طاووق": { calories: 220, protein: 30, carbs: 5, fats: 8 },
    "كباب حلبي": { calories: 290, protein: 28, carbs: 6, fats: 18 },
    "محشي كوسا": { calories: 190, protein: 7, carbs: 18, fats: 10 },
    "مقلوبة": { calories: 280, protein: 10, carbs: 35, fats: 12 },
    "يالنجي": { calories: 160, protein: 4, carbs: 22, fats: 6 },
    "شاورما دجاج": { calories: 320, protein: 27, carbs: 15, fats: 18 },
    "شاورما لحم": { calories: 350, protein: 30, carbs: 12, fats: 20 },
    "ورق عنب": { calories: 140, protein: 3, carbs: 20, fats: 5 },
    "بابا غنوج": { calories: 80, protein: 3, carbs: 10, fats: 4 },
    "حمص باللحمة": { calories: 250, protein: 15, carbs: 18, fats: 12 },
    "منسف": { calories: 420, protein: 30, carbs: 35, fats: 18 }
  },
  "المطبخ التركي": {
    "إسكندر كباب": { calories: 450, protein: 35, carbs: 30, fats: 22 },
    "دونر": { calories: 350, protein: 28, carbs: 25, fats: 16 },
    "بوريك": { calories: 320, protein: 10, carbs: 35, fats: 16 },
    "كفتة تركية": { calories: 280, protein: 24, carbs: 10, fats: 16 },
    "مانتي": { calories: 300, protein: 12, carbs: 35, fats: 12 },
    "شوربة عدس": { calories: 150, protein: 7, carbs: 20, fats: 5 },
    "كومبير": { calories: 400, protein: 10, carbs: 50, fats: 18 },
    "سميت": { calories: 260, protein: 6, carbs: 30, fats: 12 },
    "كنافة تركية": { calories: 370, protein: 6, carbs: 45, fats: 18 },
    "بقلاوة تركية": { calories: 330, protein: 5, carbs: 40, fats: 16 },
    "عيش باللحم": { calories: 280, protein: 14, carbs: 32, fats: 12 },
    "بيدا بالجبنة": { calories: 300, protein: 12, carbs: 35, fats: 14 }
  },
  "المطبخ الهندي": {
    "برياني دجاج": { calories: 420, protein: 25, carbs: 45, fats: 18 },
    "برياني لحم": { calories: 450, protein: 30, carbs: 42, fats: 20 },
    "ماسالا دجاج": { calories: 380, protein: 28, carbs: 20, fats: 22 },
    "تيكا ماسالا": { calories: 390, protein: 27, carbs: 18, fats: 24 },
    "دال عدس هندي": { calories: 250, protein: 12, carbs: 30, fats: 10 },
    "نان": { calories: 280, protein: 8, carbs: 45, fats: 8 },
    "كاري دجاج": { calories: 320, protein: 25, carbs: 15, fats: 20 },
    "سمبوسة": { calories: 260, protein: 6, carbs: 25, fats: 16 },
    "رايتا": { calories: 80, protein: 4, carbs: 8, fats: 4 },
    "بلاو أرز": { calories: 300, protein: 6, carbs: 50, fats: 10 }
  },
  "المطبخ الصيني": {
    "نودلز بالخضار": { calories: 300, protein: 8, carbs: 40, fats: 12 },
    "نودلز بالدجاج": { calories: 350, protein: 18, carbs: 35, fats: 15 },
    "أرز مقلي بالخضار": { calories: 320, protein: 10, carbs: 45, fats: 12 },
    "أرز مقلي بالدجاج": { calories: 360, protein: 20, carbs: 40, fats: 14 },
    "دجاج سويت أند ساور": { calories: 390, protein: 22, carbs: 35, fats: 18 },
    "ربيان بالسمسم": { calories: 340, protein: 24, carbs: 20, fats: 20 },
    "لحم بالخضار": { calories: 380, protein: 26, carbs: 18, fats: 22 },
    "حساء وان تان": { calories: 200, protein: 8, carbs: 25, fats: 8 },
    "دجاج كونغ باو": { calories: 420, protein: 28, carbs: 25, fats: 24 },
    "سبرنغ رولز": { calories: 180, protein: 4, carbs: 20, fats: 10 }
  },
  "الحلويات الشرقية": {
    "بقلاوة": { calories: 320, protein: 5, carbs: 35, fats: 18 },
    "كنافة": { calories: 350, protein: 6, carbs: 40, fats: 20 },
    "معمول": { calories: 280, protein: 4, carbs: 32, fats: 16 },
    "هريسة": { calories: 400, protein: 8, carbs: 50, fats: 20 },
    "مهلبية": { calories: 180, protein: 4, carbs: 25, fats: 8 },
    "أم علي": { calories: 320, protein: 8, carbs: 35, fats: 16 },
    "قطايف": { calories: 250, protein: 5, carbs: 30, fats: 12 },
    "زلابية": { calories: 280, protein: 4, carbs: 40, fats: 12 },
    "بسبوسة": { calories: 300, protein: 6, carbs: 45, fats: 12 },
    "مشبك": { calories: 260, protein: 4, carbs: 35, fats: 12 }
  },
  "مشروبات": {
    "عصير برتقال": { calories: 110, protein: 2, carbs: 26, fats: 0 },
    "عصير تفاح": { calories: 115, protein: 0, carbs: 28, fats: 0 },
    "عصير مانجو": { calories: 130, protein: 1, carbs: 33, fats: 0 },
    "عصير قصب": { calories: 180, protein: 0, carbs: 45, fats: 0 },
    "لبن رائب": { calories: 150, protein: 8, carbs: 12, fats: 8 },
    "كركديه": { calories: 40, protein: 0, carbs: 10, fats: 0 },
    "شاي بالنعناع": { calories: 25, protein: 0, carbs: 6, fats: 0 },
    "قهوة تركية": { calories: 30, protein: 1, carbs: 5, fats: 1 },
    "عصير جوافة": { calories: 120, protein: 1, carbs: 30, fats: 0 },
    "تمر هندي": { calories: 140, protein: 1, carbs: 35, fats: 0 }
  },
  "وجبات خفيفة": {
    "فشار": { calories: 380, protein: 12, carbs: 78, fats: 4 },
    "بذور دوار الشمس": { calories: 580, protein: 20, carbs: 20, fats: 51 },
    "لوز": { calories: 580, protein: 21, carbs: 22, fats: 50 },
    "جوز": { calories: 650, protein: 15, carbs: 14, fats: 65 },
    "فستق": { calories: 560, protein: 20, carbs: 28, fats: 45 },
    "تمر": { calories: 280, protein: 2, carbs: 75, fats: 0 },
    "تين مجفف": { calories: 250, protein: 3, carbs: 64, fats: 1 },
    "زبيب": { calories: 300, protein: 3, carbs: 79, fats: 0 },
    "بسكويت شاي": { calories: 480, protein: 7, carbs: 70, fats: 20 },
    "كعك": { calories: 350, protein: 6, carbs: 50, fats: 15 }
  }
};

// Helper functions for food database operations
export function getAllCategories(): string[] {
  return Object.keys(arabicFoodDatabase);
}

export function getFoodsInCategory(category: string): string[] {
  return Object.keys(arabicFoodDatabase[category] || {});
}

export function getFoodInfo(category: string, foodName: string): FoodItem | null {
  return arabicFoodDatabase[category]?.[foodName] || null;
}

export function searchFoods(query: string): Array<{category: string, food: string, info: FoodItem}> {
  const results: Array<{category: string, food: string, info: FoodItem}> = [];
  const searchTerm = query.toLowerCase().trim();
  
  if (searchTerm.length < 2) return results;
  
  Object.entries(arabicFoodDatabase).forEach(([category, foods]) => {
    Object.entries(foods).forEach(([foodName, foodInfo]) => {
      if (foodName.toLowerCase().includes(searchTerm)) {
        results.push({ category, food: foodName, info: foodInfo });
      }
    });
  });
  
  return results.slice(0, 10); // Limit to 10 results
}

// Quantity conversion helpers
export const quantityTypes = {
  gram: { name: "جرام", multiplier: 1 },
  tablespoon: { name: "ملعقة كبيرة", multiplier: 15 },
  cup: { name: "كوب", multiplier: 240 },
  serving: { name: "حصة", multiplier: 100 },
  piece: { name: "قطعة", multiplier: 50 },
  slice: { name: "شريحة", multiplier: 30 }
};

export function calculateNutrition(
  foodInfo: FoodItem, 
  quantity: number, 
  quantityType: keyof typeof quantityTypes
): FoodItem {
  const multiplier = (quantity * quantityTypes[quantityType].multiplier) / 100;
  
  return {
    calories: Math.round(foodInfo.calories * multiplier),
    protein: Math.round(foodInfo.protein * multiplier * 10) / 10,
    carbs: Math.round(foodInfo.carbs * multiplier * 10) / 10,
    fats: Math.round((foodInfo.fats || 0) * multiplier * 10) / 10
  };
}