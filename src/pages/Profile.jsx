import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme; // Меняем класс у <html>
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Личный кабинет</h1>
        
        {/* Аватарка */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-3xl">👤</div>
          <button className="text-blue-600 font-medium">Сменить фото</button>
        </div>

        {/* Настройки темы */}
        <div className="border-t dark:border-slate-800 pt-8">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Внешний вид</h2>
          <div className="flex gap-4">
            <button onClick={() => handleThemeChange('light')} className={`px-4 py-2 rounded-lg border ${theme === 'light' ? 'border-blue-500 bg-blue-50' : ''} dark:text-white`}>☀️ Светлая</button>
            <button onClick={() => handleThemeChange('dark')} className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'border-blue-500 bg-slate-800' : ''} dark:text-white`}>🌙 Темная</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CuratorBlock = ({ curator }) => (
  <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl">
    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Ваш персональный куратор</h4>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">🎓</div>
      <div>
        <div className="font-medium dark:text-white">{curator?.name || 'Александр'}</div>
        <div className="text-xs text-blue-600 dark:text-blue-400">На связи в Telegram через бота</div>
      </div>
    </div>
  </div>
);
