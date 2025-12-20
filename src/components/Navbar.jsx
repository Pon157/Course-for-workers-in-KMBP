import { Link } from 'react-router-dom';
import { User, BookOpen, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
          <BookOpen size={24} />
          <span>SupportEdu</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-500 transition">
            <LayoutDashboard size={18} />
            <span className="hidden sm:inline">Мои курсы</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-500 transition">
            <User size={18} />
            <span className="hidden sm:inline">Профиль</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
