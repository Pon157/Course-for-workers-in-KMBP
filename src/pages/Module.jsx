import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Module() {
  const { id } = useParams();
  const [theory, setTheory] = useState('');
  const [answer, setAnswer] = useState('');
  const [saving, setSaving] = useState(false);

  // 1. Загрузка теории и существующего черновика
  useEffect(() => {
    async function loadData() {
      // Загружаем теорию
      const { data: moduleData } = await supabase.from('modules').select('*').eq('id', id).single();
      setTheory(moduleData?.content);

      // Загружаем сохраненный черновик пользователя
      const { data: answerData } = await supabase
        .from('user_answers')
        .select('answer_text')
        .eq('module_id', id)
        .single();
      if (answerData) setAnswer(answerData.answer_text);
    }
    loadData();
  }, [id]);

  // 2. Логика автосохранения (Debounce)
  useEffect(() => {
    if (!answer) return;
    setSaving(true);
    const timeout = setTimeout(async () => {
      await supabase.from('user_answers').upsert({
        module_id: id,
        answer_text: answer,
        is_draft: true,
        updated_at: new Date()
      });
      setSaving(false);
    }, 1500); // Сохраняем через 1.5 сек после остановки печати
    return () => clearTimeout(timeout);
  }, [answer, id]);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Лево: Теория */}
      <div className="w-1/2 overflow-y-auto p-8 border-r dark:border-slate-800 bg-white dark:bg-slate-900 prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: theory }} />
      </div>

      {/* Право: Задание */}
      <div className="w-1/2 p-8 flex flex-col bg-slate-50 dark:bg-slate-950">
        <h3 className="text-xl font-bold mb-4 dark:text-white">Твой ответ:</h3>
        <textarea
          className="flex-1 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:border-blue-500 outline-none resize-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Начни писать... система сохранит это автоматически как черновик."
        />
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-slate-500 italic">
            {saving ? 'Сохранение...' : 'Все изменения сохранены'}
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
            Отправить на проверку
          </button>
        </div>
      </div>
    </div>
  );
}
