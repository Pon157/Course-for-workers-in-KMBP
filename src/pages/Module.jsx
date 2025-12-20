import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, Send, Save, CheckCircle2 } from 'lucide-react';

export default function Module() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [moduleData, setModuleData] = useState(null);
  const [answer, setAnswer] = useState('');
  const [savingStatus, setSavingStatus] = useState('saved'); // saved, saving, error
  const [loading, setLoading] = useState(true);

  // 1. Загрузка данных модуля и черновика
  useEffect(() => {
    async function loadModule() {
      setLoading(true);
      
      // Тянем теорию
      const { data: mod } = await supabase
        .from('assignments')
        .select('*')
        .eq('id', id)
        .single();
      
      if (mod) setModuleData(mod);

      // Тянем черновик (если есть)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: ans } = await supabase
          .from('user_answers')
          .select('answer_text')
          .eq('assignment_id', id)
          .eq('user_id', user.id)
          .single();
        
        if (ans) setAnswer(ans.answer_text);
      }
      setLoading(false);
    }
    loadModule();
  }, [id]);

  // 2. Логика автосохранения черновика
  useEffect(() => {
    if (!answer || loading) return;

    setSavingStatus('saving');
    const delayDebounceFn = setTimeout(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('user_answers').upsert({
        user_id: user.id,
        assignment_id: id,
        answer_text: answer,
        is_draft: true,
        updated_at: new Date()
      });

      if (!error) setSavingStatus('saved');
      else setSavingStatus('error');
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [answer]);

  // 3. Финальная отправка и проверка скриптом
  const handleSubmit = async () => {
    if (!answer.trim()) return alert("Сначала напиши ответ!");

    setSavingStatus('saving');
    const userText = answer.toLowerCase();
    
    // Проверка ключевых слов
    const foundKeywords = moduleData.keywords.filter(word => 
      userText.includes(word.toLowerCase())
    );

    const isPassed = foundKeywords.length >= moduleData.keywords.length * 0.7;

    if (isPassed) {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('user_answers').update({
        status: 'waiting_actor',
        is_draft: false
      }).eq('user_id', user.id).eq('assignment_id', id);

      alert("🎉 Скрипт одобрил ответ! Теперь переходи в Telegram к актеру для завершения модуля.");
    } else {
      alert("❌ В ответе не хватает ключевых слов. Пожалуйста, изучи теорию внимательнее и дополни ответ.");
    }
    setSavingStatus('saved');
  };

  if (loading) return <div className="p-10 text-center dark:text-white">Загрузка модуля...</div>;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* ЛЕВАЯ ЧАСТЬ: Теория */}
      <div className="w-1/2 overflow-y-auto bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full dark:text-white transition">
            <ChevronLeft size={20} />
          </button>
          <h1 className="font-bold dark:text-white">{moduleData?.title || "Теория модуля"}</h1>
        </div>

        <div className="p-8 prose prose-slate dark:prose-invert max-w-none">
          {/* Рендеринг Markdown теории */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {moduleData?.content || "Тут пока нет текста..."}
          </ReactMarkdown>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Редактор */}
      <div className="w-1/2 flex flex-col p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Save size={20} className="text-blue-500" /> Твой ответ
          </h2>
          <span className="text-xs text-slate-400">
            {savingStatus === 'saving' && "Сохраняем черновик..."}
            {savingStatus === 'saved' && "Черновик сохранен"}
            {savingStatus === 'error' && "Ошибка сохранения"}
          </span>
        </div>

        <textarea
          className="flex-1 w-full p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white focus:border-blue-500 outline-none resize-none shadow-inner transition-all"
          placeholder="Напиши решение ситуации, используя знания из теории..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="text-sm text-slate-500 max-w-[60%]">
            После нажатия кнопки «Отправить», твой ответ проверит алгоритм.
          </div>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
          >
            <Send size={18} />
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
