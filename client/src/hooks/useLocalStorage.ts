
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // استرجاع القيمة من localStorage أو استخدام القيمة الافتراضية
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`خطأ في قراءة localStorage للمفتاح "${key}":`, error);
      return initialValue;
    }
  });

  // دالة لتحديث القيمة
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`خطأ في حفظ localStorage للمفتاح "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
