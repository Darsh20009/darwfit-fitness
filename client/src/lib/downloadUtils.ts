// Download utilities for creating beautiful HTML documents

// دالة للتحقق من صحة البيانات قبل التحميل
function validateDayPlan(dayPlan: DayPlan): boolean {
  if (!dayPlan) {
    console.error('بيانات اليوم غير متوفرة');
    return false;
  }

  if (!dayPlan.date || !dayPlan.dayNumber) {
    console.error('معلومات اليوم ناقصة');
    return false;
  }

  return true;
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  weight?: number;
  notes?: string;
}

export interface MealItem {
  name: string;
  amount: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DayPlan {
  date: string;
  dayNumber: number;
  workout: {
    title: string;
    duration: string;
    exercises: {
      name: string;
      sets: number;
      reps: string;
      rest: string;
      notes?: string;
    }[];
  };
  meals: {
    breakfast: { name: string; description: string; calories: number; protein: number; carbs: number; fats: number }[];
    lunch: { name: string; description: string; calories: number; protein: number; carbs: number; fats: number }[];
    dinner: { name: string; description: string; calories: number; protein: number; carbs: number; fats: number }[];
    snacks: { name: string; description: string; calories: number; protein: number; carbs: number; fats: number }[];
  };
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export function generateWorkoutHTML(dayPlan: DayPlan): string {
  const { workout, date, dayNumber } = dayPlan;

  if (!workout || !workout.exercises) return '';

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>برنامج التمرين - اليوم ${dayNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
            direction: rtl;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
        }

        .logo {
            font-size: 2.5em;
            font-weight: bold;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }

        .workout-title {
            font-size: 1.8em;
            color: #333;
            margin-bottom: 10px;
        }

        .workout-info {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
            flex-wrap: wrap;
        }

        .info-item {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
        }

        .exercises-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }

        .exercises-title {
            font-size: 1.5em;
            text-align: center;
            margin-bottom: 30px;
            color: #333;
            position: relative;
        }

        .exercises-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 2px;
        }

        .exercise-card {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            border-left: 5px solid #667eea;
            transition: transform 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .exercise-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
            border-radius: 50%;
            transform: translate(30px, -30px);
        }

        .exercise-name {
            font-size: 1.3em;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }

        .exercise-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
        }

        .detail-item {
            background: rgba(255, 255, 255, 0.8);
            padding: 10px 15px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid rgba(102, 126, 234, 0.2);
        }

        .detail-label {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 5px;
        }

        .detail-value {
            font-weight: bold;
            color: #333;
            font-size: 1.1em;
        }

        .exercise-notes {
            background: rgba(102, 126, 234, 0.1);
            padding: 15px;
            border-radius: 10px;
            color: #333;
            font-style: italic;
            border-right: 3px solid #667eea;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            color: rgba(255, 255, 255, 0.8);
        }

        .download-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            margin-top: 20px;
            backdrop-filter: blur(10px);
        }

        @media print {
            body {
                background: white;
                color: black;
            }

            .header, .exercises-container {
                background: white;
                box-shadow: none;
            }
        }

        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }

            .header, .exercises-container {
                padding: 20px;
            }

            .workout-info {
                flex-direction: column;
                gap: 10px;
            }

            .exercise-details {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">💪 DARWFIT</div>
            <h1 class="workout-title">${workout.title}</h1>
            <div class="workout-info">
                <div class="info-item">📅 ${date}</div>
                <div class="info-item">🗓️ اليوم ${dayNumber}</div>
                <div class="info-item">⏱️ ${workout.duration}</div>
                <div class="info-item">🏋️ ${workout.exercises.length} تمارين</div>
            </div>
        </div>

        <div class="exercises-container">
            <h2 class="exercises-title">🎯 التمارين اليومية</h2>

            ${workout.exercises.map((exercise, index) => `
                <div class="exercise-card">
                    <h3 class="exercise-name">${index + 1}. ${exercise.name}</h3>
                    <div class="exercise-details">
                        <div class="detail-item">
                            <div class="detail-label">عدد المجموعات</div>
                            <div class="detail-value">${exercise.sets}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">التكرار</div>
                            <div class="detail-value">${exercise.reps}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">الراحة</div>
                            <div class="detail-value">${exercise.rest}</div>
                        </div>
                        ${exercise.weight ? `
                        <div class="detail-item" style="background: linear-gradient(45deg, #3b82f6, #1d4ed8); color: white;">
                            <div class="detail-label" style="color: rgba(255,255,255,0.9);">الوزن</div>
                            <div class="detail-value" style="color: white; font-size: 1.2em;">🏋️ ${exercise.weight} كجم</div>
                        </div>
                        ` : ''}
                    </div>
                    ${exercise.notes ? `
                        <div class="exercise-notes">
                            💡 <strong>ملاحظات:</strong> ${exercise.notes}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>

        <div class="footer">
            <div class="download-info">
                <p>📱 تم إنشاء هذا البرنامج بواسطة تطبيق داروفت</p>
                <p>💪 استمر في التمرين وحقق أهدافك!</p>
                <p>📞 للاستفسارات: WhatsApp</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export function generateMealPlanHTML(dayPlan: DayPlan): string {
  const { meals, date, dayNumber, totalCalories, totalProtein, totalCarbs, totalFats } = dayPlan;

  if (!meals) return '';

  const renderMeal = (mealName: string, mealItems: any[], emoji: string) => {
    if (!mealItems || mealItems.length === 0) return '';

    const mealCalories = mealItems.reduce((sum, item) => sum + (item.calories || 0), 0);
    const mealProtein = mealItems.reduce((sum, item) => sum + (item.protein || 0), 0);
    const mealCarbs = mealItems.reduce((sum, item) => sum + (item.carbs || 0), 0);
    const mealFats = mealItems.reduce((sum, item) => sum + (item.fats || 0), 0);

    return `
      <div class="meal-section">
        <h3 class="meal-title">${emoji} ${mealName}</h3>
        <div class="meal-summary">
          <span class="calorie-badge">${mealCalories} سعرة</span>
          <span class="macro-info">بروتين: ${mealProtein.toFixed(1)}جم | كربوهيدرات: ${mealCarbs.toFixed(1)}جم | دهون: ${mealFats.toFixed(1)}جم</span>
        </div>
        <div class="meal-items">
          ${mealItems.map(item => `
            <div class="meal-item">
              <div class="item-info">
                <h4 class="item-name">${item.name || 'وجبة'}</h4>
                <p class="item-amount">${item.description || item.amount || 'غير محدد'}</p>
              </div>
              <div class="item-nutrition">
                <div class="nutrition-grid">
                  <div class="nutrition-item">
                    <span class="nutrition-label">سعرات</span>
                    <span class="nutrition-value">${item.calories || 0}</span>
                  </div>
                  <div class="nutrition-item">
                    <span class="nutrition-label">بروتين</span>
                    <span class="nutrition-value">${item.protein || 0}جم</span>
                  </div>
                  <div class="nutrition-item">
                    <span class="nutrition-label">كربوهيدرات</span>
                    <span class="nutrition-value">${item.carbs || 0}جم</span>
                  </div>
                  <div class="nutrition-item">
                    <span class="nutrition-label">دهون</span>
                    <span class="nutrition-value">${item.fats || 0}جم</span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>النظام الغذائي - اليوم ${dayNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
            min-height: 100vh;
            color: #333;
            direction: rtl;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
        }

        .logo {
            font-size: 2.5em;
            font-weight: bold;
            background: linear-gradient(45deg, #43cea2, #185a9d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }

        .plan-title {
            font-size: 1.8em;
            color: #333;
            margin-bottom: 20px;
        }

        .daily-summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .summary-item {
            background: linear-gradient(45deg, #43cea2, #185a9d);
            color: white;
            padding: 15px;
            border-radius: 15px;
            text-align: center;
        }

        .summary-value {
            font-size: 1.5em;
            font-weight: bold;
            display: block;
        }

        .summary-label {
            font-size: 0.9em;
            opacity: 0.9;
        }

        .meals-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }

        .meal-section {
            margin-bottom: 40px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .meal-title {
            background: linear-gradient(135deg, #43cea2, #185a9d);
            color: white;
            padding: 20px;
            margin: 0;
            font-size: 1.3em;
            text-align: center;
        }

        .meal-summary {
            background: rgba(67, 206, 162, 0.1);
            padding: 15px;
            text-align: center;
            border-bottom: 2px solid rgba(67, 206, 162, 0.2);
        }

        .calorie-badge {
            background: linear-gradient(45deg, #43cea2, #185a9d);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin-left: 10px;
        }

        .macro-info {
            color: #666;
            font-size: 0.9em;
        }

        .meal-items {
            background: white;
            padding: 20px;
        }

        .meal-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            margin-bottom: 15px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 12px;
            border-right: 4px solid #43cea2;
        }

        .item-info {
            flex: 1;
        }

        .item-name {
            font-size: 1.1em;
            color: #333;
            margin-bottom: 5px;
        }

        .item-amount {
            color: #666;
            font-size: 0.9em;
        }

        .item-nutrition {
            flex: 1;
            max-width: 300px;
        }

        .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }

        .nutrition-item {
            background: rgba(67, 206, 162, 0.1);
            padding: 8px;
            border-radius: 8px;
            text-align: center;
        }

        .nutrition-label {
            display: block;
            font-size: 0.8em;
            color: #666;
            margin-bottom: 2px;
        }

        .nutrition-value {
            display: block;
            font-weight: bold;
            color: #333;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            color: rgba(255, 255, 255, 0.8);
        }

        .download-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            margin-top: 20px;
            backdrop-filter: blur(10px);
        }

        @media print {
            body {
                background: white;
                color: black;
            }

            .header, .meals-container {
                background: white;
                box-shadow: none;
            }
        }

        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }

            .header, .meals-container {
                padding: 20px;
            }

            .daily-summary {
                grid-template-columns: repeat(2, 1fr);
            }

            .meal-item {
                flex-direction: column;
                gap: 15px;
                align-items: stretch;
            }

            .nutrition-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🍽️ DARWFIT</div>
            <h1 class="plan-title">النظام الغذائي اليومي</h1>
            <div class="daily-summary">
                <div class="summary-item">
                    <span class="summary-value">📅</span>
                    <span class="summary-label">${date}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-value">${dayNumber}</span>
                    <span class="summary-label">رقم اليوم</span>
                </div>
                <div class="summary-item">
                    <span class="summary-value">${totalCalories}</span>
                    <span class="summary-label">إجمالي السعرات</span>
                </div>
                <div class="summary-item">
                    <span class="summary-value">${totalProtein.toFixed(1)}جم</span>
                    <span class="summary-label">البروتين</span>
                </div>
                <div class="summary-item">
                    <span class="summary-value">${totalCarbs.toFixed(1)}جم</span>
                    <span class="summary-label">الكربوهيدرات</span>
                </div>
                <div class="summary-item">
                    <span class="summary-value">${totalFats.toFixed(1)}جم</span>
                    <span class="summary-label">الدهون</span>
                </div>
            </div>
        </div>

        <div class="meals-container">
            ${renderMeal('الإفطار', meals.breakfast || [], '🌅')}
            ${renderMeal('الغداء', meals.lunch || [], '☀️')}
            ${renderMeal('العشاء', meals.dinner || [], '🌙')}
            ${meals.snacks && meals.snacks.length > 0 ? renderMeal('الوجبات الخفيفة', meals.snacks, '🍎') : ''}
        </div>

        <div class="footer">
            <div class="download-info">
                <p>🍽️ تم إنشاء هذا النظام الغذائي بواسطة تطبيق داروفت</p>
                <p>💚 تناول طعامك بانتظام واشرب الماء!</p>
                <p>📞 للاستفسارات: WhatsApp</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export function downloadHTML(htmlContent: string, filename: string) {
  // التحقق من وجود المحتوى
  if (!htmlContent || htmlContent.trim().length === 0) {
    console.error('محتوى HTML فارغ');
    return;
  }

  try {
    // إنشاء blob مع تحديد النوع بوضوح
    const blob = new Blob([htmlContent], { 
      type: 'text/html;charset=utf-8' 
    });

    // التحقق من حجم الملف
    if (blob.size === 0) {
      console.error('حجم الملف صفر');
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    // تنظيف بعد التحميل
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

  } catch (error) {
    console.error('خطأ في تحميل الملف:', error);
  }
}

export function downloadMealPlan(dayPlan: DayPlan) {
  // التحقق من وجود البيانات
  if (!validateDayPlan(dayPlan) || !dayPlan.meals) {
    console.error('بيانات الوجبات غير متوفرة');
    return;
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>النظام الغذائي - اليوم ${dayPlan.dayNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Tajawal', 'Arial', sans-serif;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            min-height: 100vh;
            padding: 20px;
            direction: rtl;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            backdrop-filter: blur(10px);
        }

        .header {
            background: linear-gradient(135deg, #059669, #047857);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .header h1 {
            font-size: 2.2em;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }

        .header p {
            font-size: 1.1em;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }

        .nutrition-summary {
            background: rgba(255,255,255,0.2);
            padding: 20px;
            margin-top: 20px;
            border-radius: 15px;
            position: relative;
            z-index: 1;
        }

        .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .nutrition-item {
            text-align: center;
            background: rgba(255,255,255,0.2);
            padding: 10px;
            border-radius: 10px;
        }

        .nutrition-value {
            font-size: 1.3em;
            font-weight: bold;
            display: block;
        }

        .nutrition-label {
            font-size: 0.9em;
            opacity: 0.9;
        }

        .content {
            padding: 30px;
        }

        .meal-section {
            margin-bottom: 30px;
            background: rgba(240, 242, 247, 0.8);
            border-radius: 15px;
            padding: 25px;
            border-right: 5px solid #10b981;
        }

        .meal-section h2 {
            color: #047857;
            margin-bottom: 20px;
            font-size: 1.5em;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .meal-item {
            background: white;
            margin: 15px 0;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            border-right: 4px solid #f59e0b;
            transition: transform 0.3s ease;
        }

        .meal-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .meal-name {
            font-size: 1.2em;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
        }

        .meal-description {
            color: #6b7280;
            margin-bottom: 10px;
            line-height: 1.5;
        }

        .meal-nutrition {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 8px;
            margin-top: 10px;
        }

        .nutrition-badge {
            background: rgba(16, 185, 129, 0.1);
            padding: 5px 8px;
            border-radius: 6px;
            text-align: center;
            font-size: 0.8em;
        }

        .nutrition-badge .value {
            font-weight: bold;
            color: #059669;
            display: block;
        }

        .nutrition-badge .label {
            color: #6b7280;
            font-size: 0.8em;
        }

        .footer {
            text-align: center;
            padding: 20px;
            background: rgba(107, 114, 128, 0.1);
            color: #6b7280;
        }

        .brand {
            font-weight: bold;
            color: #10b981;
        }

        @media (max-width: 768px) {
            .container {
                margin: 10px;
                border-radius: 15px;
            }

            .header {
                padding: 20px;
            }

            .header h1 {
                font-size: 1.8em;
            }

            .content {
                padding: 20px;
            }

            .nutrition-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .meal-nutrition {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍽️ النظام الغذائي</h1>
            <p>📅 اليوم ${dayPlan.dayNumber} - ${dayPlan.date}</p>
            <div class="nutrition-summary">
                <h3>📊 الملخص الغذائي اليومي</h3>
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <span class="nutrition-value">${dayPlan.totalCalories}</span>
                        <span class="nutrition-label">سعرة حرارية</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="nutrition-value">${dayPlan.totalProtein}جم</span>
                        <span class="nutrition-label">بروتين</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="nutrition-value">${dayPlan.totalCarbs}جم</span>
                        <span class="nutrition-label">كربوهيدرات</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="nutrition-value">${dayPlan.totalFats}جم</span>
                        <span class="nutrition-label">دهون</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="meal-section">
                <h2>🌅 الإفطار</h2>
                ${dayPlan.meals.breakfast.map(meal => `
                    <div class="meal-item">
                        <div class="meal-name">${meal.name}</div>
                        <div class="meal-description">${meal.description}</div>
                        <div class="meal-nutrition">
                            <div class="nutrition-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="meal-section">
                <h2>☀️ الغداء</h2>
                ${dayPlan.meals.lunch.map(meal => `
                    <div class="meal-item">
                        <div class="meal-name">${meal.name}</div>
                        <div class="meal-description">${meal.description}</div>
                        <div class="meal-nutrition">
                            <div class="nutrition-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="meal-section">
                <h2>🌙 العشاء</h2>
                ${dayPlan.meals.dinner.map(meal => `
                    <div class="meal-item">
                        <div class="meal-name">${meal.name}</div>
                        <div class="meal-description">${meal.description}</div>
                        <div class="meal-nutrition">
                            <div class="nutrition-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            ${dayPlan.meals.snacks && dayPlan.meals.snacks.length > 0 ? `
            <div class="meal-section">
                <h2>🍎 الوجبات الخفيفة</h2>
                ${dayPlan.meals.snacks.map(meal => `
                    <div class="meal-item">
                        <div class="meal-name">${meal.name}</div>
                        <div class="meal-description">${meal.description}</div>
                        <div class="meal-nutrition">
                            <div class="nutrition-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>

        <div class="footer">
            <p>💚 تم إنشاؤه بواسطة <span class="brand">داروفت</span></p>
            <p>🥗 تناول طعامك بانتظام واشرب الماء كثيراً!</p>
            <p>📞 للاستفسارات تواصل معنا عبر واتساب</p>
        </div>
    </div>
</body>
</html>`;

  downloadHTML(htmlContent, `meal-plan-day-${dayPlan.dayNumber}-${dayPlan.date}.html`);
}

export function downloadWorkoutPlanMobile(dayPlan: DayPlan) {
  const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>برنامج التمارين - اليوم ${dayPlan.dayNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: #f8fafc;
            color: #1a202c;
            line-height: 1.6;
            font-size: 16px;
            padding: 10px;
        }

        .container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: white;
            padding: 20px 15px;
            text-align: center;
        }

        .header h1 {
            font-size: 22px;
            margin-bottom: 8px;
            font-weight: bold;
        }

        .header p {
            font-size: 14px;
            opacity: 0.9;
        }

        .content {
            padding: 20px 15px;
        }

        .workout-info {
            background: #f0f9ff;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 0 8px 8px 0;
        }

        .workout-info h2 {
            color: #1e40af;
            font-size: 18px;
            margin-bottom: 8px;
        }

        .workout-info p {
            color: #374151;
            font-size: 14px;
        }

        .exercise {
            background: #ffffff;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .exercise-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        .exercise-icon {
            font-size: 20px;
            margin-left: 8px;
        }

        .exercise-name {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
            flex: 1;
        }

        .exercise-details {
            background: #f9fafb;
            padding: 12px;
            border-radius: 8px;
            margin-top: 10px;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }

        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }

        .detail-label {
            font-weight: 600;
            color: #4b5563;
            font-size: 14px;
        }

        .detail-value {
            color: #1f2937;
            font-weight: bold;
            font-size: 14px;
        }

        .weight-highlight {
            background: linear-gradient(45deg, #f59e0b, #d97706);
            color: white;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
        }

        .rest-day {
            text-align: center;
            padding: 40px 20px;
        }

        .rest-day-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }

        .rest-day h2 {
            color: #059669;
            font-size: 20px;
            margin-bottom: 10px;
        }

        .rest-day p {
            color: #6b7280;
            font-size: 14px;
        }

        .footer {
            background: #f8fafc;
            padding: 20px 15px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer p {
            color: #6b7280;
            font-size: 12px;
            margin-bottom: 5px;
        }

        .brand {
            color: #4f46e5;
            font-weight: bold;
        }

        .print-friendly {
            background: white !important;
            color: black !important;
        }

        @media print {
            body { background: white; }
            .container { box-shadow: none; }
        }

        /* تحسينات خاصة للجوالات الصغيرة */
        @media (max-width: 360px) {
            .header h1 { font-size: 20px; }
            .exercise-name { font-size: 15px; }
            .detail-label, .detail-value { font-size: 13px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💪 برنامج التمارين</h1>
            <p>📅 ${dayPlan.date} - اليوم ${dayPlan.dayNumber}</p>
        </div>

        <div class="content">
            ${dayPlan.workout.exercises.length === 0 ? `
                <div class="rest-day">
                    <div class="rest-day-icon">🛌</div>
                    <h2>يوم راحة</h2>
                    <p>استمتع بيوم راحتك! يمكنك ممارسة إطالات خفيفة أو المشي</p>
                </div>
            ` : `
                <div class="workout-info">
                    <h2>🏋️ ${dayPlan.workout.title}</h2>
                    <p><strong>⏱️ المدة:</strong> ${dayPlan.workout.duration}</p>
                </div>

                <div class="exercises-list">
                    ${dayPlan.workout.exercises.map((exercise, index) => `
                        <div class="exercise">
                            <div class="exercise-header">
                                <span class="exercise-icon">🏋️</span>
                                <span class="exercise-name">${exercise.name}</span>
                            </div>

                            <div class="exercise-details">
                                <div class="detail-row">
                                    <span class="detail-label">📊 المجموعات</span>
                                    <span class="detail-value">${exercise.sets} مجموعات</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">🔢 التكرارات</span>
                                    <span class="detail-value">${exercise.reps} تكرار</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">⏰ الراحة</span>
                                    <span class="detail-value">${exercise.rest}</span>
                                </div>
                                ${exercise.weight && exercise.weight > 0 ? `
                                <div class="detail-row">
                                    <span class="detail-label">🏋️ الوزن</span>
                                    <span class="detail-value">
                                        <span class="weight-highlight">${exercise.weight} كجم</span>
                                    </span>
                                </div>
                                ` : ''}
                                ${exercise.notes ? `
                                <div class="detail-row">
                                    <span class="detail-label">📝 ملاحظات</span>
                                    <span class="detail-value">${exercise.notes}</span>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>

        <div class="footer">
            <p>💪 تم إنشاؤه بواسطة <span class="brand">داروفت</span></p>
            <p>🏃‍♂️ مارس تمارينك بانتظام واشرب الماء!</p>
            <p>📱 تطبيق محسّن للجوال</p>
        </div>
    </div>

    <script>
        // تحسين العرض للجوال
        document.addEventListener('DOMContentLoaded', function() {
            // منع التكبير العشوائي على iOS
            document.addEventListener('gesturestart', function (e) {
                e.preventDefault();
            });

            // تحسين الأداء للجوال
            if (window.innerWidth < 768) {
                document.body.style.fontSize = '16px';
            }
        });
    </script>
</body>
</html>`;

  downloadHTML(htmlContent, `mobile-workout-day-${dayPlan.dayNumber}-${dayPlan.date}.html`);
}

export function downloadMealPlanMobile(dayPlan: DayPlan) {
  const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>النظام الغذائي - اليوم ${dayPlan.dayNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: #f8fafc;
            color: #1a202c;
            line-height: 1.6;
            font-size: 16px;
            padding: 10px;
        }

        .container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 20px 15px;
            text-align: center;
        }

        .header h1 {
            font-size: 22px;
            margin-bottom: 8px;
            font-weight: bold;
        }

        .header p {
            font-size: 14px;
            opacity: 0.9;
        }

        .nutrition-summary {
            background: #ecfdf5;
            padding: 15px;
            margin: 15px;
            border-radius: 12px;
            border: 2px solid #10b981;
        }

        .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 10px;
        }

        .nutrition-item {
            text-align: center;
            padding: 8px;
            background: white;
            border-radius: 8px;
            border: 1px solid #d1fae5;
        }

        .nutrition-value {
            font-size: 18px;
            font-weight: bold;
            color: #059669;
        }

        .nutrition-label {
            font-size: 12px;
            color: #6b7280;
            margin-top: 2px;
        }

        .meal-section {
            margin: 20px 15px;
        }

        .meal-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 12px;
            background: #f0f9ff;
            border-radius: 10px;
            border-right: 4px solid #3b82f6;
        }

        .meal-icon {
            font-size: 24px;
            margin-left: 10px;
        }

        .meal-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e40af;
        }

        .meal-item {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 10px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .meal-name {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
        }

        .meal-description {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .meal-nutrition {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-top: 10px;
        }

        .nutrition-badge {
            background: #f3f4f6;
            padding: 6px 8px;
            border-radius: 6px;
            text-align: center;
            font-size: 12px;
        }

        .nutrition-badge .value {
            font-weight: bold;
            color: #1f2937;
            display: block;
        }

        .nutrition-badge .label {
            color: #6b7280;
            font-size: 10px;
        }

        .footer {
            background: #f8fafc;
            padding: 20px 15px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer p {
            color: #6b7280;
            font-size: 12px;
            margin-bottom: 5px;
        }

        .brand {
            color: #10b981;
            font-weight: bold;
        }

        @media print {
            body { background: white; }
            .container { box-shadow: none; }
        }

        @media (max-width: 360px) {
            .header h1 { font-size: 20px; }
            .meal-title { font-size: 16px; }
            .nutrition-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍽️ النظام الغذائي</h1>
            <p>📅 ${dayPlan.date} - اليوم ${dayPlan.dayNumber}</p>
        </div>

        <div class="nutrition-summary">
            <h3 style="text-align: center; color: #059669; margin-bottom: 10px;">📊 الملخص الغذائي اليومي</h3>
            <div class="nutrition-grid">
                <div class="nutrition-item">
                    <div class="nutrition-value">${dayPlan.totalCalories}</div>
                    <div class="nutrition-label">سعرة حرارية</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-value">${dayPlan.totalProtein}جم</div>
                    <div class="nutrition-label">بروتين</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-value">${dayPlan.totalCarbs}جم</div>
                    <div class="nutrition-label">كربوهيدرات</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-value">${dayPlan.totalFats}جم</div>
                    <div class="nutrition-label">دهون</div>
                </div>
            </div>
        </div>

        ${Object.entries({
            'الإفطار': { meals: dayPlan.meals.breakfast, icon: '🌅' },
            'الغداء': { meals: dayPlan.meals.lunch, icon: '☀️' },
            'العشاء': { meals: dayPlan.meals.dinner, icon: '🌙' },
            'الوجبات الخفيفة': { meals: dayPlan.meals.snacks, icon: '🍎' }
        }).map(([mealType, data]) => `
            <div class="meal-section">
                <div class="meal-header">
                    <span class="meal-icon">${data.icon}</span>
                    <span class="meal-title">${mealType}</span>
                </div>

                ${data.meals.map(meal => `
                    <div class="meal-item">
                        <div class="meal-name">${meal.name}</div>
                        <div class="meal-description">${meal.description}</div>
                        <div class="meal-nutrition">
                            <div class="nutrition-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.carbs}</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="nutrition-badge">
                                <span class="value">${meal.fats}</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('')}

        <div class="footer">
            <p>🍽️ تم إنشاؤه بواسطة <span class="brand">داروفت</span></p>
            <p>💚 تناول طعامك بانتظام واشرب الماء!</p>
            <p>📱 تطبيق محسّن للجوال</p>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // منع التكبير العشوائي على iOS
            document.addEventListener('gesturestart', function (e) {
                e.preventDefault();
            });
        });
    </script>
</body>
</html>`;

  downloadHTML(htmlContent, `mobile-meal-plan-day-${dayPlan.dayNumber}-${dayPlan.date}.html`);
}

export function downloadWorkoutPlan(dayPlan: DayPlan) {
  try {
    const htmlContent = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>برنامج التمارين - اليوم ${dayPlan.dayNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 25px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            animation: slideIn 0.8s ease-out;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .header {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 10s linear infinite;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .header h1 {
            font-size: 3em;
            margin-bottom: 15px;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
        }

        .header p {
            font-size: 1.2em;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
        }

        .content {
            padding: 40px;
        }

        .exercise-section {
            margin-bottom: 35px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 20px;
            padding: 30px;
            border-left: 6px solid #ff6b6b;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
        }

        .exercise-section h2 {
            color: #ff6b6b;
            margin-bottom: 25px;
            font-size: 2.2em;
            display: flex;
            align-items: center;
            gap: 15px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }

        .exercise-item {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            border-right: 5px solid #ff6b6b;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .exercise-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #ff6b6b, #ee5a24, #ff9ff3);
        }

        .exercise-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .exercise-name {
            font-weight: bold;
            font-size: 1.4em;
            color: #2c3e50;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .exercise-name::before {
            content: '💪';
            font-size: 1.2em;
        }

        .exercise-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .detail-badge {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 16px;
            border-radius: 25px;
            text-align: center;
            font-size: 1em;
            font-weight: 600;
            box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
            transition: transform 0.2s ease;
        }

        .detail-badge:hover {
            transform: scale(1.05);
        }

        .detail-badge div:first-child {
            font-size: 0.85em;
            opacity: 0.9;
            margin-bottom: 3px;
        }

        .detail-badge div:last-child {
            font-size: 1.1em;
            font-weight: bold;
        }

        .notes {
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            padding: 15px;
            border-radius: 12px;
            margin-top: 15px;
            font-style: italic;
            color: #1565c0;
            border-right: 4px solid #2196f3;
            position: relative;
        }

        .notes::before {
            content: '💡';
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 1.2em;
        }

        .workout-summary {
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: white;
            padding: 25px;
            border-radius: 20px;
            margin-bottom: 30px;
            text-align: center;
        }

        .workout-summary h3 {
            font-size: 1.8em;
            margin-bottom: 15px;
        }

        .summary-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .stat-item {
            background: rgba(255, 255, 255, 0.2);
            padding: 15px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }

        .stat-value {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
        }

        .footer {
            text-align: center;
            padding: 30px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
            color: #666;
        }

        .brand {
            font-weight: bold;
            color: #667eea;
            font-size: 1.2em;
        }

        .motivational-quote {
            background: linear-gradient(135deg, #ffecd2, #fcb69f);
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            text-align: center;
            font-size: 1.1em;
            font-weight: 500;
            color: #8b4513;
            border: 2px dashed #ff6b6b;
        }

        @media (max-width: 768px) {
            .container {
                margin: 10px;
                border-radius: 20px;
            }

            .header {
                padding: 25px;
            }

            .header h1 {
                font-size: 2em;
            }

            .content {
                padding: 25px;
            }

            .exercise-details {
                grid-template-columns: 1fr 1fr;
            }

            .summary-stats {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💪 برنامج التمارين المخصص</h1>
            <p>📅 اليوم ${dayPlan.dayNumber} - ${dayPlan.date}</p>
            <p>⏱️ المدة المتوقعة: ${dayPlan.workout.duration}</p>
        </div>

        <div class="content">
            <div class="workout-summary">
                <h3>📊 ملخص التمرين</h3>
                <div class="summary-stats">
                    <div class="stat-item">
                        <div class="stat-value">${dayPlan.workout.exercises.length}</div>
                        <div class="stat-label">تمارين</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${dayPlan.workout.duration}</div>
                        <div class="stat-label">المدة</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${dayPlan.totalCalories}</div>
                        <div class="stat-label">سعرة حرارية</div>
                    </div>
                </div>
            </div>

            <div class="exercise-section">
                <h2>🏋️‍♂️ ${dayPlan.workout.title}</h2>
                ${dayPlan.workout.exercises.length > 0
                  ? dayPlan.workout.exercises.map((exercise, index) => `
                    <div class="exercise-item">
                        <div class="exercise-name">تمرين ${index + 1}: ${exercise.name}</div>
                        <div class="exercise-details">
                            <div class="detail-badge">
                                <div>المجموعات</div>
                                <div>${exercise.sets}</div>
                            </div>
                            <div class="detail-badge">
                                <div>التكرارات</div>
                                <div>${exercise.reps}</div>
                            </div>
                            <div class="detail-badge">
                                <div>الراحة</div>
                                <div>${exercise.rest}</div>
                            </div>
                        </div>
                        ${exercise.notes ? `<div class="notes">💡 ملاحظة: ${exercise.notes}</div>` : ''}
                    </div>
                  `).join('')
                  : `<div class="exercise-item">
                      <div class="exercise-name">تمرين شامل للجسم</div>
                      <div class="notes">💡 يرجى مراجعة خطة التمارين الكاملة في التطبيق</div>
                    </div>`
                }
            </div>

            <div class="motivational-quote">
                🔥 "النجاح يبدأ بخطوة واحدة، والتفوق يحتاج للاستمرار" 🔥
            </div>
        </div>

        <div class="footer">
            <p>تم إنشاؤه بواسطة <span class="brand">DarwFit</span> - تطبيق اللياقة الذكي</p>
            <p>💪 استمر في التقدم نحو هدفك!</p>
            <p style="margin-top: 10px; font-size: 0.9em; color: #999;">
                📱 حمل التطبيق للحصول على المزيد من الخطط المخصصة
            </p>
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تمارين-DarwFit-اليوم-${dayPlan.dayNumber}-${new Date().toLocaleDateString('ar-SA')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // إظهار رسالة نجاح
    console.log(`تم تحميل برنامج التمارين لليوم ${dayPlan.dayNumber} بنجاح!`);
  } catch (error) {
    console.error('خطأ في تحميل برنامج التمارين:', error);
    alert('حدث خطأ أثناء تحميل برنامج التمارين. يرجى المحاولة مرة أخرى.');
  }
}

function generateMealPlanContent(dayPlan: DayPlan): string {
  let content = `🍽️ الجدول الغذائي - ${dayPlan.date}\n`;
  content += `📅 اليوم ${dayPlan.dayNumber}\n\n`;

  content += `📊 ملخص العناصر الغذائية اليومية:\n`;
  content += `• إجمالي السعرات: ${dayPlan.totalCalories} سعرة\n`;
  content += `• البروتين: ${dayPlan.totalProtein} جرام\n`;
  content += `• الكربوهيدرات: ${dayPlan.totalCarbs} جرام\n`;
  content += `• الدهون: ${dayPlan.totalFats} جرام\n\n`;

  content += `🌅 الإفطار:\n`;
  dayPlan.meals.breakfast.forEach(meal => {
    content += `• ${meal.name}\n`;
    content += `  ${meal.description}\n`;
    if (meal.calories) content += `  السعرات: ${meal.calories}\n`;
    content += `\n`;
  });

  content += `🌞 الغداء:\n`;
  dayPlan.meals.lunch.forEach(meal => {
    content += `• ${meal.name}\n`;
    content += `  ${meal.description}\n`;
    if (meal.calories) content += `  السعرات: ${meal.calories}\n`;
    content += `\n`;
  });

  content += `🌙 العشاء:\n`;
  dayPlan.meals.dinner.forEach(meal => {
    content += `• ${meal.name}\n`;
    content += `  ${meal.description}\n`;
    if (meal.calories) content += `  السعرات: ${meal.calories}\n`;
    content += `\n`;
  });

  if (dayPlan.meals.snacks && dayPlan.meals.snacks.length > 0) {
    content += `🍎 الوجبات الخفيفة:\n`;
    dayPlan.meals.snacks.forEach(snack => {
      content += `• ${snack.name}\n`;
      content += `  ${snack.description}\n`;
      if (snack.calories) content += `  السعرات: ${snack.calories}\n`;
      content += `\n`;
    });
  }

  content += `\n💧 تذكير: اشرب 2-3 لتر من الماء يومياً\n`;
  content += `🚫 تجنب السكريات والأطعمة المصنعة\n`;

  return content;
}

function generateWorkoutPlanContent(dayPlan: DayPlan): string {
  let content = `💪 خطة التمارين - ${dayPlan.date}\n`;
  content += `📅 اليوم ${dayPlan.dayNumber}\n\n`;

  content += `🏋️ ${dayPlan.workout.title}\n`;
  content += `⏱️ المدة: ${dayPlan.workout.duration}\n\n`;

  if (dayPlan.workout.exercises.length === 0) {
    content += `🛌 يوم راحة\n`;
    content += `يمكنك ممارسة المشي الخفيف أو تمارين الإطالة\n\n`;
  } else {
    content += `📋 التمارين:\n\n`;
    dayPlan.workout.exercises.forEach((exercise, index) => {
      content += `${index + 1}. ${exercise.name}\n`;
      content += `   • المجموعات: ${exercise.sets}\n`;
      content += `   • التكرار: ${exercise.reps}\n`;
      content += `   • الراحة: ${exercise.rest}\n`;
      if (exercise.notes) content += `   • ملاحظات: ${exercise.notes}\n`;
      content += `\n`;
    });
  }

  content += `⚠️ نصائح مهمة:\n`;
  content += `• ابدأ بالإحماء لمدة 5-10 دقائق\n`;
  content += `• حافظ على الشكل الصحيح للتمرين\n`;
  content += `• لا تنس شرب الماء أثناء التمرين\n`;
  content += `• انتهي بتمارين الإطالة\n`;

  return content;
}