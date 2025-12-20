import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Отправляем магическую ссылку (Magic Link) или пароль
    const { error } = await supabase.auth.signInWithOtp({ email });
    
    if (error) alert(error.message);
    else alert('Проверь почту! Ссылка для входа отправлена.');
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <LogIn size={32} />
          </div>
          <h2 className="text-2xl font-bold dark:text-white">Вход в академию</h2>
          <p className="text-slate-500 text-sm mt-2">Введите почту для получения ссылки доступа</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="your@email.com"
            className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-500/20"
          >
            {loading ? 'Отправка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
