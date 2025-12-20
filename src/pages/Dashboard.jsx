import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, Circle, Lock, GraduationCap } from 'lucide-react';

export default function Dashboard() {
  const [modules, setModules] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // 1. Загружаем модули
      const { data: mods } = await supabase.from('assignments').select('*').order('id');
      setModules(mods || []);

      // 2. Загружаем прогресс юзера
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: progress } = await supabase
          .from('user_answers')
          .select('assignment_id, status')
          .eq('user_id', user.id);
        
        const progressMap = {};
        progress?.forEach(p => progressMap[p.assignment_id] = p.status);
        setUserProgress(progressMap);

        // 3. Загружаем данные профиля (куратора)
        const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(prof);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Спиок модулей */}
        <div className="flex-1">
          <h1 className="text-3xl font-black mb-8 dark:text-white uppercase tracking-tight">Твоё обучение</h1>
          <div className="grid gap-4">
            {modules.map((mod, index) => {
              const status = userProgress[mod.id];
              const isDone = status === 'approved';
              const isWaiting = status === 'waiting_actor';

              return (
                <Link 
                  key={mod.id} 
                  to={`/module/${mod.id}`}
                  className="group relative bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex items-center justify-between hover:border-blue-500 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-4xl font-black text-slate-100 dark:text-slate-800 group-hover:text-blue-500/20 transition">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg dark:text-white">{mod.title}</h3>
                      <p className="text-sm text-slate-500">Ключевых слов для проверки: {mod.keywords?.length || 0}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle size={14}/> ПРОЙДЕНО
                      </span>
                    ) : isWaiting ? (
                      <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold">
                        У АКТОРА
                      </span>
                    ) : (
                      <Circle className="text-slate-200 dark:text-slate-700" size={24} />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Сайдбар с куратором */}
        <div className="w-full md:w-80">
          <div className="bg-blue-600 rounded-3xl p-6 text-white sticky top-24 shadow-xl shadow-blue-500/20">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={32} />
              <h2 className="font-bold text-xl">Твой путь</h2>
            </div>
            
            <div className="space-y-4 text-sm opacity-90">
              <p>Прогресс: {Math.round((Object.values(userProgress).filter(s => s === 'approved').length / modules.length) * 100 || 0)}%</p>
              <div className="w-full bg-blue-400 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${(Object.values(userProgress).filter(s => s === 'approved').length / modules.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <hr className="my-6 border-white/20" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">👩‍🏫</div>
              <div>
                <p className="text-xs opacity-70">Твой куратор:</p>
                <p className="font-bold">Александр (Support Lead)</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
