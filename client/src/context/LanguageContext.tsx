import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, Translation } from "../i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) =>  void;
  t: Translation;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageDirections: Record<Language, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored && stored in translations) ? stored as Language : "ar";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    
    document.documentElement.lang = lang;
    document.documentElement.dir = languageDirections[lang];
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = languageDirections[language];
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir: languageDirections[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}