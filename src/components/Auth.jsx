import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, GraduationCap, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export function Auth({ onLogin, lang, t }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth
    onLogin({ name: name || 'User', email, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#030712]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl shadow-indigo-500/20">
             <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black outfit tracking-tight mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isLogin ? 'Sign in to continue your learning journey' : 'Join the most advanced AI tutoring platform'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={cn(
                  "flex flex-col items-center p-4 rounded-xl border transition-all",
                  role === 'student' ? "border-indigo-500 bg-indigo-500/10 text-indigo-400" : "border-white/5 bg-white/5 text-slate-500"
                )}
              >
                <GraduationCap size={24} className="mb-2" />
                <span className="text-xs font-bold uppercase">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={cn(
                  "flex flex-col items-center p-4 rounded-xl border transition-all",
                  role === 'teacher' ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-white/5 bg-white/5 text-slate-500"
                )}
              >
                <ShieldCheck size={24} className="mb-2" />
                <span className="text-xs font-bold uppercase">Teacher</span>
              </button>
            </div>
          )}

          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500/50 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500/50 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500/50 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/20 transition-all mt-6"
          >
            {isLogin ? 'Sign In' : 'Get Started'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-400 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
