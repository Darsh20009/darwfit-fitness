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

function detectDevice(): 'mobile' | 'desktop' {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(userAgent);
  const isSmallScreen = window.innerWidth < 768;

  return (isMobile || isSmallScreen) ? 'mobile' : 'desktop';
}

function getUltraCreativeStyles(): string {
  return `
    :root {
      --primary-dark: #0a0a0a;
      --secondary-dark: #1a1a2e;
      --accent-purple: #16213e;
      --accent-blue: #0f3460;
      --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      --gradient-4: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      --gradient-5: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      --neon-pink: #ff006e;
      --neon-blue: #8338ec;
      --neon-green: #3a86ff;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
      background: var(--primary-dark);
      color: #ffffff;
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
    }

    /* خلفية متحركة ثلاثية الأبعاد */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(120, 255, 198, 0.2) 0%, transparent 50%),
        conic-gradient(from 0deg at 50% 50%, #667eea 0deg, #764ba2 120deg, #f093fb 240deg, #667eea 360deg);
      background-size: 100% 100%, 100% 100%, 100% 100%, 400% 400%;
      animation: ultraBackground 20s ease infinite;
      pointer-events: none;
      z-index: -2;
    }

    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(45deg, transparent 24%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.03) 26%, transparent 27%),
        linear-gradient(-45deg, transparent 24%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.03) 26%, transparent 27%);
      background-size: 30px 30px;
      animation: patternMove 25s linear infinite;
      pointer-events: none;
      z-index: -1;
    }

    @keyframes ultraBackground {
      0%, 100% { 
        background-position: 0% 0%, 0% 0%, 0% 0%, 0% 50%; 
        filter: hue-rotate(0deg) brightness(1);
      }
      25% { 
        background-position: 100% 100%, 100% 0%, 50% 50%, 100% 0%; 
        filter: hue-rotate(90deg) brightness(1.2);
      }
      50% { 
        background-position: 0% 100%, 0% 100%, 100% 0%, 100% 100%; 
        filter: hue-rotate(180deg) brightness(0.9);
      }
      75% { 
        background-position: 100% 0%, 100% 100%, 0% 100%, 0% 100%; 
        filter: hue-rotate(270deg) brightness(1.1);
      }
    }

    @keyframes patternMove {
      0% { transform: translate(0, 0) rotate(0deg); }
      100% { transform: translate(30px, 30px) rotate(360deg); }
    }

    .ultra-container {
      max-width: 1000px;
      margin: 20px auto;
      background: rgba(10, 10, 10, 0.95);
      border-radius: 30px;
      overflow: hidden;
      position: relative;
      backdrop-filter: blur(20px);
      border: 2px solid rgba(255, 255, 255, 0.1);
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 30px 80px rgba(0, 0, 0, 0.8),
        0 0 100px rgba(102, 126, 234, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      animation: containerFloat 8s ease-in-out infinite;
    }

    @keyframes containerFloat {
      0%, 100% { 
        transform: translateY(0px) rotateX(0deg); 
        box-shadow: 
          0 30px 80px rgba(0, 0, 0, 0.8),
          0 0 100px rgba(102, 126, 234, 0.3);
      }
      50% { 
        transform: translateY(-15px) rotateX(2deg); 
        box-shadow: 
          0 45px 100px rgba(0, 0, 0, 0.9),
          0 0 150px rgba(138, 43, 226, 0.5);
      }
    }

    .ultra-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, 
        var(--neon-pink) 0%, 
        var(--neon-blue) 25%, 
        var(--neon-green) 50%, 
        #ffd700 75%, 
        var(--neon-pink) 100%);
      animation: topBorderGlow 3s ease-in-out infinite;
    }

    @keyframes topBorderGlow {
      0%, 100% { 
        opacity: 1; 
        filter: brightness(1) saturate(1);
      }
      50% { 
        opacity: 0.7; 
        filter: brightness(1.5) saturate(1.5);
      }
    }

    .ultra-header {
      background: linear-gradient(135deg, 
        #0a0a0a 0%, 
        #1a1a2e 25%, 
        #16213e 50%, 
        #0f3460 75%, 
        #000000 100%);
      background-size: 400% 400%;
      animation: headerGradientUltra 12s ease infinite;
      color: white;
      padding: 50px;
      text-align: center;
      position: relative;
      overflow: hidden;
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    }

    @keyframes headerGradientUltra {
      0%, 100% { background-position: 0% 50%; }
      25% { background-position: 100% 0%; }
      50% { background-position: 100% 100%; }
      75% { background-position: 0% 100%; }
    }

    .ultra-header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(from 0deg, 
        transparent 0deg, 
        rgba(255, 0, 110, 0.3) 60deg,
        transparent 120deg,
        rgba(131, 56, 236, 0.3) 180deg,
        transparent 240deg,
        rgba(58, 134, 255, 0.3) 300deg,
        transparent 360deg);
      animation: ultraRotate 20s linear infinite;
    }

    @keyframes ultraRotate {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(360deg) scale(1); }
    }

    .ultra-header::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 30% 20%, rgba(255, 0, 110, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(131, 56, 236, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(58, 134, 255, 0.3) 0%, transparent 70%);
      animation: headerPulse 6s ease-in-out infinite;
    }

    @keyframes headerPulse {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }

    .ultra-title {
      font-size: 3.5em;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
      background: linear-gradient(45deg, 
        #ffffff, 
        #ff006e, 
        #8338ec, 
        #3a86ff, 
        #ffffff);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ultraTextGlow 4s ease-in-out infinite;
      text-shadow: 
        0 0 20px rgba(255, 255, 255, 0.5),
        0 0 40px rgba(255, 0, 110, 0.3),
        0 0 60px rgba(131, 56, 236, 0.2);
      font-weight: 900;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    @keyframes ultraTextGlow {
      0%, 100% { 
        background-position: 0% 50%; 
        filter: brightness(1) saturate(1);
      }
      25% { 
        background-position: 100% 0%; 
        filter: brightness(1.3) saturate(1.2);
      }
      50% { 
        background-position: 100% 100%; 
        filter: brightness(1.5) saturate(1.5);
      }
      75% { 
        background-position: 0% 100%; 
        filter: brightness(1.2) saturate(1.3);
      }
    }

    .ultra-subtitle {
      font-size: 1.4em;
      position: relative;
      z-index: 2;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
      font-weight: 600;
      margin-bottom: 15px;
      animation: subtitlePulse 3s ease-in-out infinite;
    }

    @keyframes subtitlePulse {
      0%, 100% { opacity: 0.9; }
      50% { opacity: 1; }
    }

    .ultra-content {
      padding: 40px;
      position: relative;
    }

    .ultra-section {
      margin-bottom: 40px;
      background: rgba(26, 26, 46, 0.9);
      border-radius: 25px;
      padding: 35px;
      position: relative;
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 
        0 15px 40px rgba(0, 0, 0, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      overflow: hidden;
    }

    .ultra-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, 
        #ff006e 0%, 
        #8338ec 25%, 
        #3a86ff 50%, 
        #06ffa5 75%, 
        #ff006e 100%);
      animation: sectionBorderFlow 4s ease-in-out infinite;
    }

    @keyframes sectionBorderFlow {
      0%, 100% { 
        opacity: 0.8; 
        background-position: 0% 50%;
      }
      50% { 
        opacity: 1; 
        background-position: 100% 50%;
      }
    }

    .ultra-section:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.7),
        0 0 50px rgba(255, 0, 110, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .ultra-section-title {
      color: #ffffff;
      margin-bottom: 30px;
      font-size: 2.2em;
      display: flex;
      align-items: center;
      gap: 20px;
      font-weight: 800;
      text-shadow: 0 3px 15px rgba(0, 0, 0, 0.7);
      background: linear-gradient(45deg, #ffffff, #ff006e, #8338ec);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: titleShimmer 5s ease-in-out infinite;
    }

    @keyframes titleShimmer {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.3); }
    }

    .ultra-item {
      background: rgba(15, 52, 96, 0.8);
      margin: 25px 0;
      padding: 30px;
      border-radius: 20px;
      position: relative;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .ultra-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.1), 
        transparent);
      transition: left 0.5s ease;
    }

    .ultra-item:hover::before {
      left: 100%;
    }

    .ultra-item::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, 
        #ff006e, 
        #8338ec, 
        #3a86ff, 
        #06ffa5);
      animation: itemBorderPulse 3s ease-in-out infinite;
    }

    @keyframes itemBorderPulse {
      0%, 100% { 
        opacity: 0.7; 
        box-shadow: 0 0 10px rgba(255, 0, 110, 0.5);
      }
      50% { 
        opacity: 1; 
        box-shadow: 0 0 20px rgba(255, 0, 110, 0.8);
      }
    }

    .ultra-item:hover {
      transform: translateY(-10px) scale(1.03);
      box-shadow: 
        0 20px 50px rgba(0, 0, 0, 0.6),
        0 0 40px rgba(255, 0, 110, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .ultra-item-title {
      font-size: 1.6em;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 15px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      background: linear-gradient(45deg, #ffffff, #e2e8f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .ultra-description {
      color: #cbd5e1;
      margin-bottom: 20px;
      line-height: 1.7;
      font-size: 1.1em;
      text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    }

    .ultra-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }

    .ultra-badge {
      background: linear-gradient(135deg, 
        rgba(255, 0, 110, 0.2) 0%, 
        rgba(131, 56, 236, 0.2) 100%);
      border: 1px solid rgba(255, 0, 110, 0.3);
      padding: 12px 15px;
      border-radius: 15px;
      text-align: center;
      font-size: 0.9em;
      color: #ffffff;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .ultra-badge::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.2), 
        transparent);
      transition: left 0.3s ease;
    }

    .ultra-badge:hover::before {
      left: 100%;
    }

    .ultra-badge:hover {
      transform: scale(1.05);
      border-color: rgba(255, 0, 110, 0.6);
      box-shadow: 0 5px 15px rgba(255, 0, 110, 0.3);
    }

    .ultra-badge .value {
      font-weight: bold;
      color: #ffffff;
      display: block;
      font-size: 1.1em;
    }

    .ultra-badge .label {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.8em;
    }

    .ultra-footer {
      text-align: center;
      padding: 30px;
      background: rgba(10, 10, 10, 0.9);
      color: rgba(255, 255, 255, 0.7);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
    }

    .ultra-footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        #ff006e 25%, 
        #8338ec 50%, 
        #3a86ff 75%, 
        transparent 100%);
      animation: footerGlow 4s ease-in-out infinite;
    }

    @keyframes footerGlow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .ultra-brand {
      font-weight: bold;
      background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.3em;
      animation: brandPulse 2s ease-in-out infinite;
    }

    @keyframes brandPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    /* تأثيرات خاصة للموبايل */
    @media (max-width: 768px) {
      .ultra-container {
        margin: 10px;
        border-radius: 20px;
      }

      .ultra-header {
        padding: 30px 20px;
      }

      .ultra-title {
        font-size: 2.2em;
        letter-spacing: 1px;
      }

      .ultra-content {
        padding: 25px;
      }

      .ultra-section {
        padding: 25px;
      }

      .ultra-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .ultra-badge {
        padding: 8px 12px;
        font-size: 0.8em;
      }
    }

    @media (max-width: 480px) {
      .ultra-title {
        font-size: 1.8em;
      }

      .ultra-subtitle {
        font-size: 1.1em;
      }

      .ultra-section-title {
        font-size: 1.6em;
      }

      .ultra-grid {
        grid-template-columns: 1fr;
      }
    }

    /* تأثيرات إضافية للطباعة */
    @media print {
      body {
        background: white;
        color: black;
      }

      .ultra-container {
        background: white;
        box-shadow: none;
        border: 1px solid #ccc;
      }

      .ultra-header {
        background: #333;
        color: white;
      }

      .ultra-section {
        background: #f9f9f9;
        border: 1px solid #ddd;
      }

      .ultra-item {
        background: white;
        border: 1px solid #ddd;
      }
    }
  `;
}

export function downloadMealPlan(dayPlan: DayPlan) {
  if (!validateDayPlan(dayPlan) || !dayPlan.meals) {
    console.error('بيانات الوجبات غير متوفرة');
    return;
  }

  const device = detectDevice();
  const isDesktop = device === 'desktop';

  const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💫 النظام الغذائي الإبداعي - اليوم ${dayPlan.dayNumber}</title>
    <style>
        ${getUltraCreativeStyles()}
    </style>
</head>
<body>
    <div class="ultra-container">
        <div class="ultra-header">
            <h1 class="ultra-title">🍽️ النظام الغذائي</h1>
            <p class="ultra-subtitle">📅 اليوم ${dayPlan.dayNumber} - ${dayPlan.date}</p>
            <div class="ultra-grid" style="margin-top: 25px;">
                <div class="ultra-badge">
                    <span class="value">${dayPlan.totalCalories}</span>
                    <span class="label">سعرة حرارية</span>
                </div>
                <div class="ultra-badge">
                    <span class="value">${dayPlan.totalProtein}جم</span>
                    <span class="label">بروتين</span>
                </div>
                <div class="ultra-badge">
                    <span class="value">${dayPlan.totalCarbs}جم</span>
                    <span class="label">كربوهيدرات</span>
                </div>
                <div class="ultra-badge">
                    <span class="value">${dayPlan.totalFats}جم</span>
                    <span class="label">دهون</span>
                </div>
            </div>
        </div>

        <div class="ultra-content">
            <div class="ultra-section">
                <h2 class="ultra-section-title">🌅 الإفطار</h2>
                ${dayPlan.meals.breakfast.map(meal => `
                    <div class="ultra-item">
                        <div class="ultra-item-title">${meal.name}</div>
                        <div class="ultra-description">${meal.description}</div>
                        <div class="ultra-grid">
                            <div class="ultra-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="ultra-section">
                <h2 class="ultra-section-title">☀️ الغداء</h2>
                ${dayPlan.meals.lunch.map(meal => `
                    <div class="ultra-item">
                        <div class="ultra-item-title">${meal.name}</div>
                        <div class="ultra-description">${meal.description}</div>
                        <div class="ultra-grid">
                            <div class="ultra-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="ultra-badge">                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="ultra-section">
                <h2 class="ultra-section-title">🌙 العشاء</h2>
                ${dayPlan.meals.dinner.map(meal => `
                    <div class="ultra-item">
                        <div class="ultra-item-title">${meal.name}</div>
                        <div class="ultra-description">${meal.description}</div>
                        <div class="ultra-grid">
                            <div class="ultra-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            ${dayPlan.meals.snacks && dayPlan.meals.snacks.length > 0 ? `
            <div class="ultra-section">
                <h2 class="ultra-section-title">🍎 الوجبات الخفيفة</h2>
                ${dayPlan.meals.snacks.map(meal => `
                    <div class="ultra-item">
                        <div class="ultra-item-title">${meal.name}</div>
                        <div class="ultra-description">${meal.description}</div>
                        <div class="ultra-grid">
                            <div class="ultra-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="ultra-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>

        <div class="ultra-footer">
            <p>💫 تم إنشاؤه بواسطة <span class="ultra-brand">داروفت</span></p>
            <p>🥗 تناول طعامك بانتظام واشرب الماء كثيراً!</p>
            <p>🎯 ${isDesktop ? 'نسخة كمبيوتر محسّنة' : 'نسخة جوال محسّنة'}</p>
            <p>📞 للاستفسارات تواصل معنا عبر واتساب</p>
        </div>
    </div>
</body>
</html>`;

  downloadHTML(htmlContent, `ultra-meal-plan-${device}-day-${dayPlan.dayNumber}-${dayPlan.date}.html`);
}

export function downloadWorkoutPlan(dayPlan: DayPlan) {
  if (!validateDayPlan(dayPlan)) {
    console.error('بيانات التمرين غير متوفرة');
    return;
  }

  const device = detectDevice();
  const isDesktop = device === 'desktop';

  const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💪 برنامج التمارين الإبداعي - اليوم ${dayPlan.dayNumber}</title>
    <style>
        ${getUltraCreativeStyles()}

        .exercise-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .rest-day {
          text-align: center;
          padding: 60px 40px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 20px;
          border: 2px dashed rgba(16, 185, 129, 0.3);
        }

        .rest-day-icon {
          font-size: 64px;
          margin-bottom: 20px;
          animation: floatIcon 3s ease-in-out infinite;
        }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .rest-day h2 {
          color: #10b981;
          font-size: 2.5em;
          margin-bottom: 15px;
          text-shadow: 0 2px 10px rgba(16, 185, 129, 0.5);
        }

        .motivational-quote {
          background: linear-gradient(135deg, 
            rgba(255, 0, 110, 0.2) 0%, 
            rgba(131, 56, 236, 0.2) 100%);
          padding: 30px;
          border-radius: 20px;
          margin: 30px 0;
          text-align: center;
          font-size: 1.3em;
          font-weight: 600;
          color: #ffffff;
          border: 2px solid rgba(255, 0, 110, 0.3);
          position: relative;
          overflow: hidden;
        }

        .motivational-quote::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.1), 
            transparent);
          animation: quoteShine 3s ease-in-out infinite;
        }

        @keyframes quoteShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
    </style>
</head>
<body>
    <div class="ultra-container">
        <div class="ultra-header">
            <h1 class="ultra-title">💪 برنامج التمارين</h1>
            <p class="ultra-subtitle">📅 اليوم ${dayPlan.dayNumber} - ${dayPlan.date}</p>
            <p class="ultra-subtitle">⏱️ المدة المتوقعة: ${dayPlan.workout.duration}</p>
        </div>

        <div class="ultra-content">
            ${dayPlan.workout.exercises.length === 0 ? `
                <div class="rest-day">
                    <div class="rest-day-icon">🛌</div>
                    <h2>يوم راحة مستحق</h2>
                    <p style="color: #cbd5e1; font-size: 1.2em; margin-top: 15px;">
                        استمتع بيوم راحتك! يمكنك ممارسة إطالات خفيفة أو المشي في الطبيعة
                    </p>
                    <div class="motivational-quote" style="margin-top: 30px;">
                        🌟 "الراحة جزء مهم من التدريب - اعطِ جسمك الوقت للتعافي والنمو" 🌟
                    </div>
                </div>
            ` : `
                <div class="ultra-section">
                    <h2 class="ultra-section-title">🏋️ ${dayPlan.workout.title}</h2>

                    <div class="ultra-grid" style="margin-bottom: 30px;">
                        <div class="ultra-badge">
                            <span class="value">${dayPlan.workout.exercises.length}</span>
                            <span class="label">تمارين</span>
                        </div>
                        <div class="ultra-badge">
                            <span class="value">${dayPlan.workout.duration}</span>
                            <span class="label">المدة</span>
                        </div>
                        <div class="ultra-badge">
                            <span class="value">${dayPlan.totalCalories || 'متغير'}</span>
                            <span class="label">سعرة محروقة</span>
                        </div>
                        <div class="ultra-badge">
                            <span class="value">${isDesktop ? 'كمبيوتر' : 'جوال'}</span>
                            <span class="label">النسخة</span>
                        </div>
                    </div>

                    ${dayPlan.workout.exercises.map((exercise, index) => `
                        <div class="ultra-item">
                            <div class="ultra-item-title">
                                ${index + 1}. ${exercise.name}
                            </div>
                            <div class="exercise-details">
                                <div class="ultra-badge">
                                    <span class="value">${exercise.sets}</span>
                                    <span class="label">مجموعات</span>
                                </div>
                                <div class="ultra-badge">
                                    <span class="value">${exercise.reps}</span>
                                    <span class="label">تكرارات</span>
                                </div>
                                <div class="ultra-badge">
                                    <span class="value">${exercise.rest}</span>
                                    <span class="label">راحة</span>
                                </div>
                                ${exercise.weight ? `
                                <div class="ultra-badge" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(29, 78, 216, 0.3)); border-color: rgba(59, 130, 246, 0.5);">
                                    <span class="value">🏋️ ${exercise.weight} كجم</span>
                                    <span class="label">الوزن</span>
                                </div>
                                ` : ''}
                            </div>
                            ${exercise.notes ? `
                                <div class="ultra-description" style="margin-top: 15px; padding: 15px; background: rgba(255, 0, 110, 0.1); border-radius: 10px; border-right: 3px solid #ff006e;">
                                    💡 <strong>ملاحظات:</strong> ${exercise.notes}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>

                <div class="motivational-quote">
                    🔥 "النجاح يبدأ بخطوة واحدة، والتفوق يحتاج للاستمرار" 🔥
                </div>
            `}
        </div>

        <div class="ultra-footer">
            <p>💪 تم إنشاؤه بواسطة <span class="ultra-brand">داروفت</span></p>
            <p>🏃‍♂️ مارس تمارينك بانتظام واشرب الماء!</p>
            <p>🎯 ${isDesktop ? 'نسخة كمبيوتر محسّنة' : 'نسخة جوال محسّنة'}</p>
            <p>📱 للاستفسارات تواصل معنا عبر واتساب</p>
        </div>
    </div>
</body>
</html>`;

  downloadHTML(htmlContent, `ultra-workout-${device}-day-${dayPlan.dayNumber}-${dayPlan.date}.html`);
}

export function generateWorkoutHTML(dayPlan: DayPlan): string {
  return downloadWorkoutPlan(dayPlan) || '';
}

export function generateMealPlanHTML(dayPlan: DayPlan): string {
  return downloadMealPlan(dayPlan) || '';
}

export function downloadHTML(htmlContent: string, filename: string) {
  if (!htmlContent || htmlContent.trim().length === 0) {
    console.error('محتوى HTML فارغ');
    return;
  }

  try {
    const blob = new Blob([htmlContent], { 
      type: 'text/html;charset=utf-8' 
    });

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

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

  } catch (error) {
    console.error('خطأ في تحميل الملف:', error);
  }
}

// الدوال القديمة للتوافق مع الكود السابق
export function downloadWorkoutPlanMobile(dayPlan: DayPlan) {
  downloadWorkoutPlan(dayPlan);
}

export function downloadMealPlanMobile(dayPlan: DayPlan) {
  downloadMealPlan(dayPlan);
}