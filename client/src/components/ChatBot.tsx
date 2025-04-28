import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, User, Bot } from "lucide-react";

// Define chat message types
interface ChatMessage {
  text: string;
  isBot: boolean;
  options?: string[];
}

// Define bot responses based on user selection
const botResponses: Record<string, { text: string; options?: string[] }> = {
  start: {
    text: "مرحباً بك في داروفت! كيف يمكنني مساعدتك اليوم؟",
    options: ["معلومات عن الاشتراكات", "استفسارات غذائية", "استفسارات تدريبية", "استعادة رقم الاشتراك", "الدعم الفني"]
  },
  "معلومات عن الاشتراكات": {
    text: "نقدم باقات اشتراك متنوعة تناسب احتياجاتك وميزانيتك:",
    options: ["باقة شهر", "باقة 3 شهور", "باقة 5 شهور", "باقة سنة كاملة", "رجوع"]
  },
  "باقة شهر": {
    text: "باقة الشهر الواحد تكلفتها 50 ريال فقط. تشمل برنامج غذائي مخصص وبرنامج تدريبي. هذه الباقة مثالية لمن يريد تجربة النظام.",
    options: ["كيف أشترك؟", "رجوع للباقات"]
  },
  "باقة 3 شهور": {
    text: "باقة الثلاثة أشهر تكلفتها 100 ريال فقط (بدلاً من 150). تشمل برنامج غذائي مخصص، برنامج تدريبي متكامل ومتابعة أسبوعية من المدرب. هذه الباقة هي الأكثر شعبية.",
    options: ["كيف أشترك؟", "رجوع للباقات"]
  },
  "باقة 5 شهور": {
    text: "باقة الخمسة أشهر تكلفتها 200 ريال فقط (بدلاً من 250). تشمل جميع مزايا الباقة السابقة بالإضافة لمتابعة شهرية مع المدرب وخصم 20% على التجديد.",
    options: ["كيف أشترك؟", "رجوع للباقات"]
  },
  "باقة سنة كاملة": {
    text: "باقة السنة الكاملة تكلفتها 500 ريال فقط (بدلاً من 600). تشمل جميع المزايا السابقة بالإضافة لتواصل مباشر مع المدرب الشخصي وخصم 30% على التجديد.",
    options: ["كيف أشترك؟", "رجوع للباقات"]
  },
  "كيف أشترك؟": {
    text: "للاشتراك، قم بزيارة صفحة 'الاشتراكات' من القائمة العلوية، ثم قم بتعبئة استمارة الاشتراك. سيتواصل معك أحد مدربينا خلال 24 ساعة لإكمال عملية الاشتراك والدفع.",
    options: ["معلومات عن طرق الدفع", "رجوع للباقات"]
  },
  "معلومات عن طرق الدفع": {
    text: "يمكنك الدفع عبر التحويل البنكي أو عبر منصات الدفع الإلكتروني (مدى، فيزا، ماستر كارد، آبل باي). سيتم تزويدك بالتفاصيل عند التواصل.",
    options: ["رجوع للقائمة الرئيسية"]
  },
  "رجوع للباقات": {
    text: "اختر الباقة التي تناسبك:",
    options: ["باقة شهر", "باقة 3 شهور", "باقة 5 شهور", "باقة سنة كاملة", "رجوع"]
  },
  "استفسارات غذائية": {
    text: "ما هو استفسارك حول النظام الغذائي؟",
    options: ["عدد الوجبات اليومية", "نوع النظام الغذائي", "حساب السعرات الحرارية", "مكملات غذائية", "رجوع"]
  },
  "عدد الوجبات اليومية": {
    text: "يتضمن النظام الغذائي المقدم 5-6 وجبات يومياً (3 وجبات رئيسية و2-3 وجبات خفيفة). يتم توزيعها على مدار اليوم لرفع معدل الحرق والحفاظ على مستويات الطاقة.",
    options: ["رجوع للاستفسارات الغذائية"]
  },
  "نوع النظام الغذائي": {
    text: "نقدم أنظمة غذائية متنوعة تشمل النظام الكيتوني، النظام منخفض الكربوهيدرات، ونظام متوازن العناصر. يتم اختيار النظام المناسب حسب هدفك وحالتك الصحية.",
    options: ["رجوع للاستفسارات الغذائية"]
  },
  "حساب السعرات الحرارية": {
    text: "يمكنك حساب احتياجاتك من السعرات الحرارية عبر استخدام حاسبة السعرات المتاحة في قائمة الموقع. تقوم الحاسبة بتحديد السعرات بناءً على وزنك، طولك، عمرك، جنسك، ومستوى نشاطك.",
    options: ["فتح حاسبة السعرات", "رجوع للاستفسارات الغذائية"]
  },
  "فتح حاسبة السعرات": {
    text: "لقد تم تحويلك إلى صفحة حاسبة السعرات. هل ترغب بالعودة للمساعد؟",
    options: ["رجوع للقائمة الرئيسية"]
  },
  "مكملات غذائية": {
    text: "نقدم توصيات للمكملات الغذائية حسب احتياجك وهدفك. المكملات ليست إلزامية ولكنها قد تساعد في تسريع النتائج. أبرز المكملات: بروتين، كرياتين، أحماض أمينية، وفيتامينات.",
    options: ["رجوع للاستفسارات الغذائية"]
  },
  "رجوع للاستفسارات الغذائية": {
    text: "ما هو استفسارك الآخر حول النظام الغذائي؟",
    options: ["عدد الوجبات اليومية", "نوع النظام الغذائي", "حساب السعرات الحرارية", "مكملات غذائية", "رجوع"]
  },
  "استفسارات تدريبية": {
    text: "ما هو استفسارك حول التمارين والتدريب؟",
    options: ["عدد أيام التدريب", "أنواع التمارين", "كيفية قياس التقدم", "نصائح لتجنب الإصابات", "رجوع"]
  },
  "عدد أيام التدريب": {
    text: "نوصي بالتدريب 4-5 أيام في الأسبوع مع يومين للراحة. يتم تقسيم البرنامج حسب المجموعات العضلية لضمان الراحة الكافية وتحسين النتائج.",
    options: ["رجوع للاستفسارات التدريبية"]
  },
  "أنواع التمارين": {
    text: "تشمل برامجنا التدريبية مزيجاً من تمارين المقاومة (باستخدام الأوزان أو وزن الجسم)، تمارين الكارديو، وتمارين المرونة. يتم تخصيص البرنامج حسب هدفك وقدراتك البدنية.",
    options: ["رجوع للاستفسارات التدريبية"]
  },
  "كيفية قياس التقدم": {
    text: "يمكن قياس التقدم من خلال: قياسات الجسم (محيط الخصر، الصدر، الأرداف)، الوزن، نسبة الدهون، صور قبل وبعد، وزيادة القوة في التمارين المختلفة.",
    options: ["رجوع للاستفسارات التدريبية"]
  },
  "نصائح لتجنب الإصابات": {
    text: "لتجنب الإصابات: قم بالإحماء قبل التمرين، التزم بالتقنية الصحيحة، زد الحمل تدريجياً، خذ قسطاً كافياً من الراحة بين المجموعات والأيام، واستمع لجسمك عند الشعور بالألم.",
    options: ["رجوع للاستفسارات التدريبية"]
  },
  "رجوع للاستفسارات التدريبية": {
    text: "ما هو استفسارك الآخر حول التدريب؟",
    options: ["عدد أيام التدريب", "أنواع التمارين", "كيفية قياس التقدم", "نصائح لتجنب الإصابات", "رجوع"]
  },
  "استعادة رقم الاشتراك": {
    text: "هل نسيت رقم اشتراكك؟ يمكنك استرجاعه بسهولة عبر إدخال اسم المستخدم وكلمة المرور التي استخدمتها في التسجيل.",
    options: ["أدخل بيانات الدخول", "نسيت كلمة المرور", "رجوع"]
  },
  "أدخل بيانات الدخول": {
    text: "لاستعادة رقم اشتراكك، يرجى زيارة صفحة تسجيل الدخول وإدخال بياناتك. سيظهر رقم الاشتراك تلقائياً عند الدخول لحسابك.",
    options: ["الانتقال لصفحة تسجيل الدخول", "رجوع للقائمة الرئيسية"]
  },
  "الانتقال لصفحة تسجيل الدخول": {
    text: "تم تحويلك إلى صفحة تسجيل الدخول. هل ترغب في العودة للمساعد؟",
    options: ["رجوع للقائمة الرئيسية"]
  },
  "نسيت كلمة المرور": {
    text: "في حالة نسيان كلمة المرور، يرجى التواصل مع الدعم الفني عبر البريد الإلكتروني: support@darwfit.com مع ذكر اسمك ورقم الجوال المسجل لدينا.",
    options: ["رجوع للقائمة الرئيسية"]
  },
  "الدعم الفني": {
    text: "كيف يمكننا مساعدتك؟",
    options: ["مشكلة في تسجيل الدخول", "استفسار عن الدفع", "اقتراح أو شكوى", "التواصل المباشر", "رجوع"]
  },
  "مشكلة في تسجيل الدخول": {
    text: "إذا كنت تواجه مشكلة في تسجيل الدخول، تأكد من إدخال اسم المستخدم وكلمة المرور بشكل صحيح. إذا استمرت المشكلة، يمكنك طلب استعادة كلمة المرور أو التواصل مع الدعم الفني.",
    options: ["رجوع للدعم الفني"]
  },
  "استفسار عن الدفع": {
    text: "لأي استفسار متعلق بعملية الدفع، مثل تأكيد الدفع أو استرجاع المبلغ، يمكنك التواصل مع قسم المالية عبر البريد الإلكتروني: finance@darwfit.com مع ذكر رقم الاشتراك وتفاصيل العملية.",
    options: ["رجوع للدعم الفني"]
  },
  "اقتراح أو شكوى": {
    text: "نحن نقدر اقتراحاتك وملاحظاتك. يمكنك إرسال اقتراح أو شكوى عبر البريد الإلكتروني: feedback@darwfit.com وسيتم الرد عليك خلال 24 ساعة عمل.",
    options: ["رجوع للدعم الفني"]
  },
  "التواصل المباشر": {
    text: "للتواصل المباشر مع فريق الدعم الفني، يمكنك الاتصال على الرقم: +966500000000 خلال أوقات العمل (9 صباحاً - 9 مساءً) أو التواصل عبر الواتساب على نفس الرقم في أي وقت.",
    options: ["رجوع للقائمة الرئيسية"]
  },
  "رجوع للدعم الفني": {
    text: "هل هناك شيء آخر يمكننا مساعدتك به؟",
    options: ["مشكلة في تسجيل الدخول", "استفسار عن الدفع", "اقتراح أو شكوى", "التواصل المباشر", "رجوع"]
  },
  "رجوع": {
    text: "كيف يمكنني مساعدتك اليوم؟",
    options: ["معلومات عن الاشتراكات", "استفسارات غذائية", "استفسارات تدريبية", "استعادة رقم الاشتراك", "الدعم الفني"]
  },
  "رجوع للقائمة الرئيسية": {
    text: "كيف يمكنني مساعدتك مجدداً؟",
    options: ["معلومات عن الاشتراكات", "استفسارات غذائية", "استفسارات تدريبية", "استعادة رقم الاشتراك", "الدعم الفني"]
  }
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = botResponses["start"];
      setMessages([
        {
          text: welcomeMessage.text,
          isBot: true,
          options: welcomeMessage.options
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { text: input, isBot: false }]);

    // Simple bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: "شكراً لرسالتك! يرجى اختيار أحد الخيارات أدناه لمساعدتك بشكل أفضل.",
          isBot: true,
          options: ["معلومات عن البرامج", "أسئلة شائعة", "تواصل مع المدرب", "الدعم الفني"]
        }
      ]);
    }, 500);

    setInput("");
  };

  const handleOptionClick = (option: string) => {
    // Add user selection as a message
    setMessages(prev => [...prev, { text: option, isBot: false }]);

    // Handle special navigation options
    if (option === "فتح حاسبة السعرات") {
      window.location.href = "/calories";
      return;
    } else if (option === "الانتقال لصفحة تسجيل الدخول") {
      window.location.href = "/login";
      return;
    }

    // Get bot response based on option
    setTimeout(() => {
      const response = botResponses[option] || botResponses["start"];
      setMessages(prev => [
        ...prev,
        {
          text: response.text,
          isBot: true,
          options: response.options
        }
      ]);
    }, 500);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className={`rounded-full ${isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary-dark"} w-12 h-12 p-0 shadow-lg`}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 left-0 w-80 md:w-96 shadow-xl animate-fadeIn">
          <div className="bg-primary text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className="ml-2" size={18} />
              <h3 className="font-bold">مساعد داروفت</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className="h-6 w-6 p-0 text-white hover:bg-primary-dark rounded-full"
            >
              <X size={16} />
            </Button>
          </div>
          
          <CardContent className="p-0">
            {/* Messages Container */}
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isBot
                        ? "bg-neutral-100 dark:bg-neutral-700 text-right"
                        : "bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-light text-right"
                    }`}
                  >
                    <div className="flex items-start mb-1">
                      {msg.isBot && <Bot size={14} className="ml-1 mt-1 text-primary" />}
                      {!msg.isBot && <User size={14} className="ml-1 mt-1 text-primary" />}
                      <span>{msg.text}</span>
                    </div>
                    
                    {/* Options */}
                    {msg.isBot && msg.options && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {msg.options.map((option, optionIndex) => (
                          <Button
                            key={optionIndex}
                            variant="outline"
                            size="sm"
                            className="text-xs mt-1 bg-white dark:bg-neutral-800"
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 border-t dark:border-neutral-700">
              <div className="flex">
                <Input
                  placeholder="اكتب رسالة..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  className="ml-2"
                />
                <Button
                  onClick={handleSend}
                  className="bg-primary hover:bg-primary-dark px-3"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}