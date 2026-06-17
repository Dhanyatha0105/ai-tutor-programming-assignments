import React from 'react';
import { Globe, User, BookOpen, GraduationCap, Moon, Search, LogOut, LayoutGrid } from 'lucide-react';

export function Layout({ children, title, lang, setLang, role, setRole, t }) {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 px-6 py-4 glass-card mx-4 my-2 border-opacity-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/30">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight outfit">{title}</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Search (Simplified) */}
            <div className="hidden md-flex items-center gap-2 bg-slate-900 bg-opacity-50 px-4 py-2 rounded-full border border-white border-opacity-10 focus-within-border-indigo-500 transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t.search} 
                className="bg-transparent border-none outline-none text-sm w-48 text-slate-200 placeholder-slate-500"
              />
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-slate-900 bg-opacity-50 p-1 rounded-xl">
              {['en', 'hi', 'es'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === l ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover-text-white bg-transparent border-none cursor-pointer'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Role Switcher */}
            <button
              onClick={() => setRole(role === 'student' ? 'teacher' : 'student')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 bg-opacity-10 text-orange-400 border border-orange-500 border-opacity-20 hover-bg-orange-500 transition-all font-semibold text-sm cursor-pointer"
            >
              <LayoutGrid size={18} />
              {role === 'student' ? 'Switch to Teacher' : 'Switch to Student'}
            </button>
            
            <button 
              onClick={() => onLogout()}
              className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>


      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 px-6 border-t border-white/5 bg-slate-950/30 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <BookOpen size={20} />
            <span className="font-semibold">{title}</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 AI Assignment Tutor. Built for excellence.
          </div>
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors">
               <Globe size={16} />
             </div>
             <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors">
               <Moon size={16} />
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
