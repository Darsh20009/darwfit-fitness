import { useState } from "react";
import CalorieCalculator from "@/components/CalorieCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Info } from "lucide-react";

export default function CaloriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">حاسبة السعرات الحرارية</CardTitle>
                <CardDescription>
                  احسب احتياجاتك اليومية من السعرات الحرارية والعناصر الغذائية
                </CardDescription>
              </div>
              <Calculator className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg mb-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-primary ml-2 mt-1 shrink-0" />
                <div>
                  <h3 className="text-primary font-bold mb-1">كيف تعمل الحاسبة؟</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    تقوم الحاسبة بحساب معدل الأيض القاعدي (BMR) باستخدام معادلة Mifflin-St Jeor، ثم تحسب إجمالي الطاقة اليومية المحروقة (TDEE) باستخدام معامل النشاط البدني. بناءً على هدفك (خسارة الوزن، الحفاظ على الوزن، أو زيادة الوزن)، تقوم الحاسبة بتحديد السعرات الحرارية اليومية المستهدفة وتوزيع العناصر الغذائية.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      
        <CalorieCalculator />
      </div>
    </div>
  );
}