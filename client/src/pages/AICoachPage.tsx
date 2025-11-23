import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Lightbulb, Brain, Zap } from "lucide-react";

export default function AICoachPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "ai", content: "مرحباً بك! أنا مدربك الذكي 🤖 كيف يمكنني مساعدتك اليوم؟" }
  ]);
  const [input, setInput] = useState("");

  const quickQuestions = [
    { icon: "💪", text: "كيف أبني العضلات بسرعة؟" },
    { icon: "🥗", text: "ما أفضل وجبة لتقليل الوزن؟" },
    { icon: "🔥", text: "كم سعرة أحتاج يومياً؟" },
    { icon: "⚡", text: "أفضل تمرين في البيت" }
  ];

  const aiResponses: Record<string, string> = {
    "كيف أبني العضلات بسرعة؟": "لبناء العضلات بفعالية: 1) تناول 1.6-2.2g بروتين لكل كيلو وزن 2) رفع أثقال 3-4 مرات أسبوعياً 3) احصل على 7-9 ساعات نوم 4) قم بالكارديو معتدل 🏋️",
    "ما أفضل وجبة لتقليل الوزن؟": "الوجبات الصحية لتقليل الوزن: - دجاج مشوي مع خضار 🍗 - سمك مع أرز بني 🐟 - بيض مسلوق مع خبز أسمر 🥚 كل هذا منخفض السعرات وغني بالبروتين!",
    "كم سعرة أحتاج يومياً؟": "السعرات اليومية تعتمد على: معادل الهاريس بينديكت = احسبها بناءً على العمر والوزن والجنس والنشاط. في المتوسط: الرجال 2200-2500، النساء 1800-2000 🎯",
    "أفضل تمرين في البيت": "أفضل التمارين المنزلية: 1) تمارين الضغط (Push-ups) 💪 2) القرفصاء (Squats) 3) تمارين البلانك (Plank) 4) الجري في المكان كل منها فعال وبدون معدات! 🔥"
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      
      const response = aiResponses[input as keyof typeof aiResponses] || 
        "هذا سؤال رائع! بناءً على خبرتي كمدرب ذكي، يمكنني أن أساعدك... استشر متخصصاً صحياً للحصول على نصيحة شخصية أفضل 💡";
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "ai", content: response }]);
      }, 500);
      
      setInput("");
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setMessages(prev => [...prev, { role: "user", content: question }]);
    
    const response = aiResponses[question as keyof typeof aiResponses];
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", content: response }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Brain className="w-10 h-10 text-indigo-600" />
            مدربك الذكي
          </h1>
          <p className="text-gray-600 dark:text-gray-400">اسأل عن أي شيء متعلق باللياقة والتغذية</p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-xl ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                }`}
              >
                <p className="text-sm md:text-base">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="mb-6">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              أسئلة سريعة
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q.text)}
                  className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-all text-xs md:text-sm font-semibold text-gray-900 dark:text-white text-right"
                  data-testid={`button-question-${idx}`}
                >
                  {q.icon} {q.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="اسأل سؤالك هنا..."
            className="dark:bg-gray-800 dark:border-gray-700 text-right"
            data-testid="input-question"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
            size="icon"
            data-testid="button-send-message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
