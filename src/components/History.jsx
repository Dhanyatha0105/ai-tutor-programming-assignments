import React from 'react';
import { History as HistoryIcon, Award, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

export function History({ role, t }) {
  const activities = [
    { title: 'Completed Calculus Assignment', date: '2 hours ago', icon: Award, color: 'text-emerald-400' },
    { title: 'Requested AI Hint for Quantum Physics', date: 'Yesterday', icon: HistoryIcon, color: 'text-indigo-400' },
    { title: 'Grade Released for Literature', date: '2 days ago', icon: TrendingUp, color: 'text-amber-400' },
    { title: 'Joined New Classroom: Advanced Math', date: '1 week ago', icon: Calendar, color: 'text-slate-400' },
  ];

  return (
    <div className="glass-card p-8 border-opacity-5">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <HistoryIcon className="text-indigo-400" />
        Activity History
      </h2>
      
      <div className="space-y-6">
        {activities.map((activity, i) => (
          <div key={i} className="flex gap-4 relative">
             {i !== activities.length -1 && (
               <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-white/5"></div>
             )}
             <div className={cn("w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center shrink-0", activity.color)}>
                <activity.icon size={22} />
             </div>
             <div className="flex-1 pb-4">
                <p className="font-bold text-lg">{activity.title}</p>
                <p className="text-slate-500 text-sm">{activity.date}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl border border-white/5 text-center">
         <p className="text-slate-300">You're on a roll! Keep up the great work.</p>
         <div className="mt-4 h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-3/4 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
         </div>
         <p className="text-[10px] uppercase font-bold text-slate-500 mt-2 tracking-widest">Growth Progress: 75%</p>
      </div>
    </div>
  );
}
