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
    options: ["معلومات عن البرامج", "أسئلة شائعة", "تواصل مع المدرب", "الدعم الفني"]
  },
  "معلومات عن البرامج": {
    text: "نقدم برامج متنوعة لتناسب احتياجاتك. ما الذي تود معرفته؟",
    options: ["برنامج خسارة الوزن", "برنامج بناء العضلات", "برنامج الصحة واللياقة", "رجوع"]
  },
  "برنامج خسارة الوزن": {
    text: "برنامج خسارة الوزن مصمم خصيصًا لمساعدتك على فقدان الوزن بطريقة صحية ومستدامة. يشمل البرنامج تمارين كارديو وتمارين مقاومة، بالإضافة إلى نظام غذائي منخفض السعرات الحرارية. مدة البرنامج 3 أشهر بتكلفة 5000 ريال.",
    options: ["كيف أشترك؟", "رجوع"]
  },
  "برنامج بناء العضلات": {
    text: "برنامج بناء العضلات مصمم لزيادة كتلة العضلات وقوتها. يتضمن تمارين مقاومة مكثفة ونظام غذائي غني بالبروتين. مدة البرنامج 3 أشهر بتكلفة 5000 ريال.",
    options: ["كيف أشترك؟", "رجوع"]
  },
  "برنامج الصحة واللياقة": {
    text: "برنامج الصحة واللياقة يركز على تحسين الصحة العامة واللياقة البدنية. يشمل مزيجاً متوازناً من تمارين القلب والقوة والمرونة، بالإضافة إلى نظام غذائي متوازن. مدة البرنامج 3 أشهر بتكلفة 5000 ريال.",
    options: ["كيف أشترك؟", "رجوع"]
  },
  "كيف أشترك؟": {
    text: "للاشتراك، قم بتعبئة استمارة الاشتراك في صفحة 'اشتراك جديد'. بعد ذلك، سيتواصل معك أحد مدربينا خلال 24 ساعة لإكمال عملية الاشتراك والدفع.",
    options: ["رجوع للقائمة الرئيسية"]
  },
  "أسئلة شائعة": {
    text: "ما هو السؤال الذي تود معرفة إجابته؟",
    options: ["كم مدة الاشتراك؟", "هل يمكنني إلغاء الاشتراك؟", "هل يشمل البرنامج متابعة؟", "رجوع"]
  },
  "كم مدة الاشتراك؟": {
    text: "مدة الاشتراك هي 3 أشهر، ويمكن تجديده بعد انتهاء المدة بنفس الرسوم أو باشتراكات خاصة للعملاء الحاليين.",
    options: ["رجوع للأسئلة الشائعة"]
  },
  "هل يمكنني إلغاء الاشتراك؟": {
    text: "نعم، يمكنك إلغاء اشتراكك خلال أول 7 أيام واسترداد المبلغ كاملاً. بعد ذلك، يمكن إلغاء الاشتراك مع استرداد المبلغ المتبقي بعد خصم الفترة المستخدمة.",
    options: ["رجوع للأسئلة الشائعة"]
  },
  "هل يشمل البرنامج متابعة؟": {
    text: "نعم، جميع برامجنا تشمل متابعة أسبوعية مع المدرب الشخصي، بالإضافة إلى تعديلات دورية على البرنامج الغذائي والتدريبي حسب التقدم.",
    options: ["رجوع للأسئلة الشائعة"]
  },
  "تواصل مع المدرب": {
    text: "يمكنك التواصل مع المدرب الشخصي عبر رقم الواتساب: +966500000000. يرجى تحديد رقم اشتراكك عند التواصل.",
    options: ["رجوع للقائمة الرئيسية"]
  },
  "الدعم الفني": {
    text: "للحصول على المساعدة الفنية، يرجى التواصل معنا عبر البريد الإلكتروني: support@darwfit.com أو عبر رقم الواتساب: +966500000000.",
    options: ["رجوع للقائمة الرئيسية"]
  },
  "رجوع": {
    text: "ما الذي تود معرفته؟",
    options: ["معلومات عن البرامج", "أسئلة شائعة", "تواصل مع المدرب", "الدعم الفني"]
  },
  "رجوع للقائمة الرئيسية": {
    text: "كيف يمكنني مساعدتك؟",
    options: ["معلومات عن البرامج", "أسئلة شائعة", "تواصل مع المدرب", "الدعم الفني"]
  },
  "رجوع للأسئلة الشائعة": {
    text: "هل لديك أسئلة أخرى؟",
    options: ["كم مدة الاشتراك؟", "هل يمكنني إلغاء الاشتراك؟", "هل يشمل البرنامج متابعة؟", "رجوع"]
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