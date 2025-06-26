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

function getLuxuryMinimalistStyles(): string {
  return `
    :root {
      --luxury-dark: #0f172a;
      --luxury-charcoal: #1e293b;
      --luxury-slate: #334155;
      --luxury-silver: #f1f5f9;
      --emerald-primary: #10b981;
      --emerald-light: #34d399;
      --emerald-dark: #047857;
      --emerald-glow: rgba(16, 185, 129, 0.2);
      --luxury-shadow: rgba(0, 0, 0, 0.3);
      --emerald-accent: #6ee7b7;
      --soft-emerald: #a7f3d0;
      --dark-emerald: #064e3b;
      --emerald-bg: rgba(16, 185, 129, 0.1);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, var(--luxury-dark) 0%, var(--luxury-charcoal) 100%);
      color: var(--luxury-silver);
      line-height: 1.7;
      overflow-x: hidden;
      position: relative;
      min-height: 100vh;
    }

    /* خلفية ديناميكية زمردية إبداعية */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 20% 20%, var(--emerald-glow) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(52, 211, 153, 0.03) 0%, transparent 50%);
      animation: gentleFlow 40s ease-in-out infinite;
      pointer-events: none;
      z-index: -2;
    }

    @keyframes gentleFlow {
      0%, 100% { 
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
      50% { 
        opacity: 0.8;
        transform: scale(1.05) rotate(0.5deg);
      }
    }

    /* نمط شبكة زمردي دقيق وأنيق */
    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
      background-size: 80px 80px;
      animation: subtleGrid 60s linear infinite;
      pointer-events: none;
      z-index: -1;
    }

    @keyframes subtleGrid {
      0% { transform: translate(0, 0); }
      100% { transform: translate(80px, 80px); }
    }

    .luxury-container {
      max-width: 1000px;
      margin: 40px auto;
      background: rgba(30, 41, 59, 0.95);
      border-radius: 24px;
      overflow: hidden;
      position: relative;
      backdrop-filter: blur(20px);
      border: 1px solid var(--emerald-glow);
      box-shadow: 
        0 40px 100px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(16, 185, 129, 0.1),
        inset 0 1px 0 rgba(16, 185, 129, 0.05);
      animation: containerElevation 10s ease-in-out infinite;
    }

    @keyframes containerElevation {
      0%, 100% { 
        transform: translateY(0px);
        box-shadow: 
          0 40px 100px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.02),
          inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }
      50% { 
        transform: translateY(-8px);
        box-shadow: 
          0 50px 120px rgba(0, 0, 0, 0.6),
          0 0 0 1px rgba(16, 185, 129, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }
    }

    /* خط ذهبي رفيع وأنيق في الأعلى */
    .luxury-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        var(--emerald-primary) 20%, 
        var(--emerald-light) 50%, 
        var(--emerald-primary) 80%, 
        transparent 100%);
      animation: luxuryGlow 8s ease-in-out infinite;
    }

    @keyframes luxuryGlow {
      0%, 100% { 
        opacity: 0.6;
        filter: brightness(1);
      }
      50% { 
        opacity: 1;
        filter: brightness(1.3);
      }
    }

    .luxury-header {
      background: linear-gradient(135deg, 
        rgba(15, 23, 42, 0.98) 0%, 
        rgba(30, 41, 59, 0.95) 50%, 
        rgba(51, 65, 85, 0.92) 100%);
      color: var(--luxury-silver);
      padding: 60px 50px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    /* تأثير الضوء الخفيف */
    .luxury-header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, 
        rgba(16, 185, 129, 0.08) 0%, 
        transparent 70%);
      animation: gentleRotation 30s linear infinite;
    }

    @keyframes gentleRotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .luxury-title {
      font-size: 3.2em;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
      background: linear-gradient(135deg, 
        var(--luxury-silver) 0%, 
        var(--emerald-primary) 30%, 
        var(--emerald-light) 70%, 
        var(--emerald-accent) 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: luxuryTextFlow 12s ease-in-out infinite;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
    }

    @keyframes luxuryTextFlow {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .luxury-subtitle {
      font-size: 1.3em;
      position: relative;
      z-index: 2;
      color: rgba(248, 249, 250, 0.85);
      font-weight: 400;
      margin-bottom: 15px;
      animation: subtleGlow 6s ease-in-out infinite;
    }

    @keyframes subtleGlow {
      0%, 100% { opacity: 0.85; }
      50% { opacity: 1; }
    }

    .luxury-content {
      padding: 50px;
      position: relative;
    }

    .luxury-section {
      margin-bottom: 50px;
      background: rgba(51, 65, 85, 0.6);
      border-radius: 20px;
      padding: 40px;
      position: relative;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(16, 185, 129, 0.1);
      box-shadow: 
        0 20px 50px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      overflow: hidden;
    }

    .luxury-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(16, 185, 129, 0.3) 50%, 
        transparent 100%);
      animation: sectionGlow 10s ease-in-out infinite;
    }

    @keyframes sectionGlow {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }

    .luxury-section:hover {
      transform: translateY(-5px);
      box-shadow: 
        0 30px 70px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(16, 185, 129, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .luxury-section-title {
      color: var(--luxury-silver);
      margin-bottom: 35px;
      font-size: 2em;
      display: flex;
      align-items: center;
      gap: 20px;
      font-weight: 600;
      background: linear-gradient(135deg, 
        var(--luxury-silver), 
        var(--emerald-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: titleShimmer 8s ease-in-out infinite;
    }

    @keyframes titleShimmer {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.2); }
    }

    .luxury-item {
      background: rgba(30, 41, 59, 0.4);
      margin: 30px 0;
      padding: 35px;
      border-radius: 16px;
      position: relative;
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(16, 185, 129, 0.1);
      overflow: hidden;
      box-shadow: 
        0 15px 40px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(16, 185, 129, 0.03);
    }

    .luxury-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(16, 185, 129, 0.05), 
        transparent);
      transition: left 0.8s ease;
    }

    .luxury-item:hover::before {
      left: 100%;
    }

    .luxury-item::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, 
        transparent 0%, 
        var(--emerald-primary) 50%, 
        transparent 100%);
      animation: itemBorderFlow 6s ease-in-out infinite;
    }

    @keyframes itemBorderFlow {
      0%, 100% { 
        opacity: 0.4;
        transform: scaleY(0.8);
      }
      50% { 
        opacity: 0.8;
        transform: scaleY(1);
      }
    }

    .luxury-item:hover {
      transform: translateY(-6px);
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.3),
        0 0 30px rgba(16, 185, 129, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .luxury-item-title {
      font-size: 1.5em;
      font-weight: 600;
      color: var(--luxury-silver);
      margin-bottom: 20px;
      background: linear-gradient(135deg, 
        var(--luxury-silver), 
        var(--luxury-platinum));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .luxury-description {
      color: rgba(248, 249, 250, 0.75);
      margin-bottom: 25px;
      line-height: 1.6;
      font-size: 1.05em;
    }

    .luxury-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 20px;
      margin-top: 25px;
    }

    .luxury-badge {
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.2);
      padding: 16px 20px;
      border-radius: 12px;
      text-align: center;
      font-size: 0.95em;
      color: var(--luxury-silver);
      backdrop-filter: blur(8px);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }

    .luxury-badge::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(16, 185, 129, 0.1), 
        transparent);
      transition: left 0.6s ease;
    }

    .luxury-badge:hover::before {
      left: 100%;
    }

    .luxury-badge:hover {
      transform: translateY(-2px);
      border-color: rgba(16, 185, 129, 0.4);
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.15);
      background: rgba(16, 185, 129, 0.12);
    }

    .luxury-badge .value {
      font-weight: 600;
      color: var(--luxury-gold-light);
      display: block;
      font-size: 1.1em;
      margin-bottom: 4px;
    }

    .luxury-badge .label {
      color: rgba(248, 249, 250, 0.7);
      font-size: 0.85em;
      font-weight: 400;
    }

    .luxury-footer {
      text-align: center;
      padding: 40px;
      background: rgba(10, 10, 10, 0.9);
      color: rgba(248, 249, 250, 0.6);
      border-top: 1px solid rgba(16, 185, 129, 0.1);
      position: relative;
    }

    .luxury-footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 20%;
      right: 20%;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        var(--luxury-gold) 50%, 
        transparent 100%);
      animation: footerGlow 8s ease-in-out infinite;
    }

    @keyframes footerGlow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }

    .luxury-brand {
      font-weight: 700;
      background: linear-gradient(135deg, 
        var(--luxury-gold), 
        var(--luxury-gold-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.2em;
      animation: brandGlow 4s ease-in-out infinite;
    }

    @keyframes brandGlow {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.3); }
    }

    /* تحسينات للجوال */
    @media (max-width: 768px) {
      .luxury-container {
        margin: 20px;
        border-radius: 16px;
      }

      .luxury-header {
        padding: 40px 30px;
      }

      .luxury-title {
        font-size: 2.4em;
        letter-spacing: 0.5px;
      }

      .luxury-content {
        padding: 30px;
      }

      .luxury-section {
        padding: 30px;
      }

      .luxury-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
      }

      .luxury-badge {
        padding: 12px 16px;
        font-size: 0.85em;
      }
    }

    @media (max-width: 480px) {
      .luxury-title {
        font-size: 2em;
      }

      .luxury-subtitle {
        font-size: 1.1em;
      }

      .luxury-section-title {
        font-size: 1.6em;
      }

      .luxury-grid {
        grid-template-columns: 1fr;
      }
    }

    /* تحسينات للطباعة */
    @media print {
      body {
        background: white;
        color: black;
      }

      .luxury-container {
        background: white;
        box-shadow: none;
        border: 1px solid #ddd;
      }

      .luxury-header {
        background: #f8f9fa;
        color: #333;
      }

      .luxury-section {
        background: #fafafa;
        border: 1px solid #eee;
      }

      .luxury-item {
        background: white;
        border: 1px solid #ddd;
      }
    }

    /* تأثيرات إضافية للراحة والاستراحة */
    .rest-day {
      text-align: center;
      padding: 80px 40px;
      background: rgba(86, 171, 47, 0.08);
      border-radius: 20px;
      border: 2px dashed rgba(86, 171, 47, 0.2);
      position: relative;
      overflow: hidden;
    }

    .rest-day::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, 
        rgba(86, 171, 47, 0.05) 0%, 
        transparent 70%);
      animation: restGlow 8s ease-in-out infinite;
    }

    @keyframes restGlow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .rest-day-icon {
      font-size: 4em;
      margin-bottom: 30px;
      animation: gentleFloat 4s ease-in-out infinite;
    }

    @keyframes gentleFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    .rest-day h2 {
      color: var(--gentle-teal);
      font-size: 2.2em;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .motivational-quote {
      background: rgba(16, 185, 129, 0.08);
      padding: 35px;
      border-radius: 16px;
      margin: 40px 0;
      text-align: center;
      font-size: 1.2em;
      font-weight: 500;
      color: var(--luxury-silver);
      border: 1px solid rgba(16, 185, 129, 0.2);
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
        rgba(16, 185, 129, 0.1), 
        transparent);
      animation: quoteFlow 10s ease-in-out infinite;
    }

    @keyframes quoteFlow {
      0% { left: -100%; }
      50% { left: 0%; }
      100% { left: 100%; }
    }

    /* تفاصيل التمارين */
    .exercise-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      margin-top: 25px;
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
    <title>✨ النظام الغذائي الفخم - اليوم ${dayPlan.dayNumber}</title>
    <style>
    body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 40px;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                min-height: 100vh;
                color: white !important;
            }

            h1, h2 {
                color: #ffd700 !important;
                text-align: center;
                margin-bottom: 30px;
                text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
                letter-spacing: 2px;
            }

            h3, h4, h5, h6 {
                color: #ffd700 !important;
                margin-bottom: 15px;
            }

            p, span, div, li {
                color: white !important;
            }
        ${getLuxuryMinimalistStyles()}
    </style>
</head>
<body>
    <div class="luxury-container">
        <div class="luxury-header">
            <h1 class="luxury-title">🍽️ النظام الغذائي</h1>
            <p class="luxury-subtitle">📅 اليوم ${dayPlan.dayNumber} - ${dayPlan.date}</p>
            <div class="luxury-grid" style="margin-top: 35px;">
                <div class="luxury-badge">
                    <span class="value">${dayPlan.totalCalories}</span>
                    <span class="label">سعرة حرارية</span>
                </div>
                <div class="luxury-badge">
                    <span class="value">${dayPlan.totalProtein}جم</span>
                    <span class="label">بروتين</span>
                </div>
                <div class="luxury-badge">
                    <span class="value">${dayPlan.totalCarbs}جم</span>
                    <span class="label">كربوهيدرات</span>
                </div>
                <div class="luxury-badge">
                    <span class="value">${dayPlan.totalFats}جم</span>
                    <span class="label">دهون</span>
                </div>
            </div>
        </div>

        <div class="luxury-content">
            <div class="luxury-section">
                <h2 class="luxury-section-title">🌅 الإفطار</h2>
                ${dayPlan.meals.breakfast.map(meal => `
                    <div class="luxury-item">
                        <div class="luxury-item-title">${meal.name}</div>
                        <div class="luxury-description">${meal.description}</div>
                        <div class="luxury-grid">
                            <div class="luxury-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="luxury-section">
                <h2 class="luxury-section-title">☀️ الغداء</h2>
                ${dayPlan.meals.lunch.map(meal => `
                    <div class="luxury-item">
                        <div class="luxury-item-title">${meal.name}</div>
                        <div class="luxury-description">${meal.description}</div>
                        <div class="luxury-grid">
                            <div class="luxury-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="luxury-section">
                <h2 class="luxury-section-title">🌙 العشاء</h2>
                ${dayPlan.meals.dinner.map(meal => `
                    <div class="luxury-item">
                        <div class="luxury-item-title">${meal.name}</div>
                        <div class="luxury-description">${meal.description}</div>
                        <div class="luxury-grid">
                            <div class="luxury-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            ```text
                            <div class="luxury-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            ${dayPlan.meals.snacks && dayPlan.meals.snacks.length > 0 ? `
            <div class="luxury-section">
                <h2 class="luxury-section-title">🍎 الوجبات الخفيفة</h2>
                ${dayPlan.meals.snacks.map(meal => `
                    <div class="luxury-item">
                        <div class="luxury-item-title">${meal.name}</div>
                        <div class="luxury-description">${meal.description}</div>
                        <div class="luxury-grid">
                            <div class="luxury-badge">
                                <span class="value">${meal.calories}</span>
                                <span class="label">سعرة</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.protein}جم</span>
                                <span class="label">بروتين</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.carbs}جم</span>
                                <span class="label">كربوهيدرات</span>
                            </div>
                            <div class="luxury-badge">
                                <span class="value">${meal.fats}جم</span>
                                <span class="label">دهون</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}

            <div class="motivational-quote">
                ✨ "التغذية السليمة أساس الصحة والعافية، كل وجبة خطوة نحو هدفك" ✨
            </div>
        </div>

        <div class="luxury-footer">
            <p>✨ تم إنشاؤه بواسطة <span class="luxury-brand">داروفت</span></p>
            <p>🥗 تناول طعامك بانتظام واشرب الماء كثيراً</p>
            <p>🎯 ${isDesktop ? 'نسخة كمبيوتر فخمة' : 'نسخة جوال أنيقة'}</p>
            <p>📞 للاستفسارات تواصل معنا</p>
        </div>
    </div>
</body>
</html>`;

  downloadHTML(htmlContent, `luxury-meal-plan-${device}-day-${dayPlan.dayNumber}-${dayPlan.date}.html`);
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
    <title>💪 برنامج التمارين الفخم - اليوم ${dayPlan.dayNumber}</title>
    <style>
    body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 40px;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                min-height: 100vh;
                color: white !important;
            }

            h1, h2 {
                color: #ffd700 !important;
                text-align: center;
                margin-bottom: 30px;
                text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
                letter-spacing: 2px;
            }

            h3, h4, h5, h6 {
                color: #ffd700 !important;
                margin-bottom: 15px;
            }

            p, span, div, li {
                color: white !important;
            }
        ${getLuxuryMinimalistStyles()}
    </style>
</head>
<body>
    <div class="luxury-container">
        <div class="luxury-header">
            <h1 class="luxury-title">💪 برنامج التمارين</h1>
            <p class="luxury-subtitle">📅 اليوم ${dayPlan.dayNumber} - ${dayPlan.date}</p>
            <p class="luxury-subtitle">⏱️ المدة المتوقعة: ${dayPlan.workout.duration}</p>
        </div>

        <div class="luxury-content">
            ${dayPlan.workout.exercises.length === 0 ? `
                <div class="rest-day">
                    <div class="rest-day-icon">🛌</div>
                    <h2>يوم راحة مستحق</h2>
                    <p style="color: var(--luxury-silver); font-size: 1.2em; margin-top: 20px; opacity: 0.8;">
                        استمتع بيوم راحتك! يمكنك ممارسة إطالات خفيفة أو المشي في الطبيعة
                    </p>
                    <div class="motivational-quote" style="margin-top: 40px;">
                        🌟 "الراحة جزء مهم من التدريب - اعطِ جسمك الوقت للتعافي والنمو" 🌟
                    </div>
                </div>
            ` : `
                <div class="luxury-section">
                    <h2 class="luxury-section-title">🏋️ ${dayPlan.workout.title}</h2>

                    <div class="luxury-grid" style="margin-bottom: 40px;">
                        <div class="luxury-badge">
                            <span class="value">${dayPlan.workout.exercises.length}</span>
                            <span class="label">تمارين</span>
                        </div>
                        <div class="luxury-badge">
                            <span class="value">${dayPlan.workout.duration}</span>
                            <span class="label">المدة</span>
                        </div>
                        <div class="luxury-badge">
                            <span class="value">${dayPlan.totalCalories || 'متغير'}</span>
                            <span class="label">سعرة محروقة</span>
                        </div>
                        <div class="luxury-badge">
                            <span class="value">${isDesktop ? 'كمبيوتر' : 'جوال'}</span>
                            <span class="label">النسخة</span>
                        </div>
                    </div>

                    ${dayPlan.workout.exercises.map((exercise, index) => `
                        <div class="luxury-item">
                            <div class="luxury-item-title">
                                ${index + 1}. ${exercise.name}
                            </div>
                            <div class="exercise-details">
                                <div class="luxury-badge">
                                    <span class="value">${exercise.sets}</span>
                                    <span class="label">مجموعات</span>
                                </div>
                                <div class="luxury-badge">
                                    <span class="value">${exercise.reps}</span>
                                    <span class="label">تكرارات</span>
                                </div>
                                <div class="luxury-badge">
                                    <span class="value">${exercise.rest}</span>
                                    <span class="label">راحة</span>
                                </div>
                                ${exercise.weight ? `
                                <div class="luxury-badge" style="background: rgba(102, 126, 234, 0.08); border-color: rgba(102, 126, 234, 0.3);">
                                    <span class="value">🏋️ ${exercise.weight} كجم</span>
                                    <span class="label">الوزن</span>
                                </div>
                                ` : ''}
                            </div>
                            ${exercise.notes ? `
                                <div class="luxury-description" style="margin-top: 20px; padding: 20px; background: rgba(16, 185, 129, 0.08); border-radius: 12px; border-right: 3px solid var(--emerald-primary);">
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

        <div class="luxury-footer">
            <p>💪 تم إنشاؤه بواسطة <span class="luxury-brand">داروفت</span></p>
            <p>🏃‍♂️ مارس تمارينك بانتظام واشرب الماء</p>
            <p>🎯 ${isDesktop ? 'نسخة كمبيوتر فخمة' : 'نسخة جوال أنيقة'}</p>
            <p>📱 للاستفسارات تواصل معنا</p>
        </div>
    </div>
</body>
</html>`;

  downloadHTML(htmlContent, `luxury-workout-${device}-day-${dayPlan.dayNumber}-${dayPlan.date}.html`);
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