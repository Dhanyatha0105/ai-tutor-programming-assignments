import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertCircle, BarChart3, Users, Clock, Send, CheckCircle, Search, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

const calculateAIScore = (text) => {
  if (!text) return 0;
  // Simulated heuristic for "AI Intensity"
  const words = text.split(' ').length;
  const avgWordLength = text.length / (words || 1);
  const complexWords = text.match(/\b\w{8,}\b/g)?.length || 0;
  
  let score = Math.floor((complexWords / (words || 1)) * 100) + Math.floor(avgWordLength * 5);
  return Math.min(Math.max(score, 5), 98);
};

export function TeacherDashboard({ lang, t, assignments, submissions, setSubmissions, setAssignments }) {
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedAssignment = assignments.find(a => a.id === selectedAssignmentId);

  const handleFinalizeGrade = () => {
    if (!selectedAssignment || !grade) return;
    
    const newSubmission = {
      id: Date.now(),
      student: 'Student', // In a real app, this would be the uploader's name
      title: selectedAssignment.title,
      aiScore: calculateAIScore(selectedAssignment.content),
      content: selectedAssignment.content,
      status: 'Graded',
      grade: grade,
      feedback: feedback
    };

    setSubmissions([newSubmission, ...submissions]);
    
    // Update assignment status in the shared state
    setAssignments(assignments.map(a => 
      a.id === selectedAssignmentId ? { ...a, status: 'Completed' } : a
    ));

    setSelectedAssignmentId(null);
    setGrade('');
    setFeedback('');
  };

  const handleRunAnalysis = () => {
    if (!selectedAssignment) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Assignments', value: assignments.filter(a => a.status !== 'Completed').length, icon: Clock, color: 'text-amber-400' },
          { label: 'Reviewed Work', value: submissions.length, icon: CheckCircle, color: 'text-emerald-400' },
          { label: 'Avg. AI Intensity', value: submissions.length ? `${Math.floor(submissions.reduce((acc, s) => acc + s.aiScore, 0) / submissions.length)}%` : '0%', icon: Shield, color: 'text-indigo-400' },
          { label: 'Active Students', value: '1', icon: Users, color: 'text-slate-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 flex items-center justify-between border-opacity-5">
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h4 className="text-2xl font-black outfit">{stat.value}</h4>
            </div>
            <stat.icon className={cn("w-8 h-8 opacity-20", stat.color)} size={32} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Student Submissions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-opacity-10 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold outfit uppercase tracking-tight">Active Inbox</h3>
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <Search size={14} className="text-slate-500" />
              </div>
            </div>
            
            <div className="space-y-4">
              {assignments.length === 0 ? (
                <div className="py-12 text-center opacity-30 border-2 border-dashed border-white/5 rounded-2xl">
                   <p className="text-xs font-bold">Waiting for student uploads...</p>
                </div>
              ) : assignments.map((sub) => (
                <div 
                  key={sub.id}
                  onClick={() => { setSelectedAssignmentId(sub.id); setGrade(''); setFeedback(''); }}
                  className={cn(
                    "p-4 rounded-xl border border-white/5 cursor-pointer transition-all hover:bg-white/5",
                    selectedAssignmentId === sub.id ? "bg-indigo-500/10 border-indigo-500/30" : ""
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                     <p className="font-black text-xs uppercase tracking-widest text-indigo-400">{sub.type || 'Text'}</p>
                     <span className={cn(
                       "text-[10px] px-2 py-0.5 rounded-full font-bold",
                       sub.status === 'Completed' ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                     )}>
                       {sub.status}
                     </span>
                  </div>
                  <p className="font-bold text-sm truncate">{sub.title}</p>
                  <p className="text-[10px] text-slate-500 mt-2">Added {sub.deadline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Analysis & Tools */}
        <div className="lg:col-span-2">
           <AnimatePresence mode="wait">
             {selectedAssignment ? (
               <motion.div
                 key={selectedAssignment.id}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 className="glass-card p-8 min-h-[600px] flex flex-col relative"
               >
                 <div className="flex justify-between items-start mb-10">
                   <div>
                     <h2 className="text-3xl font-black mb-1 outfit tracking-tight">{selectedAssignment.title}</h2>
                     <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Student Submission • {selectedAssignment.type || 'Document'}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={handleRunAnalysis}
                        disabled={isAnalyzing}
                        className={cn(
                          "flex flex-col items-center px-6 py-2 rounded-2xl border transition-all shadow-xl",
                          isAnalyzing ? "bg-slate-800 border-white/5" : "border-indigo-500/30 bg-indigo-500/5 text-indigo-400 hover:bg-indigo-500/10"
                        )}
                      >
                        <span className="text-[9px] font-black uppercase tracking-tighter mb-1">
                          {isAnalyzing ? 'Processing...' : 'Run AI Detection'}
                        </span>
                        <span className="text-xl font-black">
                          {isAnalyzing ? '??%' : `${calculateAIScore(selectedAssignment.content)}%`}
                        </span>
                      </button>
                   </div>
                 </div>

                 {/* Content View */}
                 <div className="flex-1 bg-slate-950/80 p-8 rounded-3xl border border-white/5 mb-8 font-serif leading-relaxed text-slate-300 overflow-y-auto max-h-[300px] text-lg italic">
                    "{selectedAssignment.content}"
                 </div>

                 {/* Teacher Tools */}
                 <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Assign Grade</label>
                          <input 
                            type="text" 
                            placeholder="e.g. A+" 
                            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 transition-all font-black text-2xl uppercase tracking-tighter shadow-inner"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Intensity Rating</label>
                          <div className="h-[60px] w-full bg-slate-900/50 rounded-2xl flex items-center px-6 overflow-hidden relative border border-white/5 shadow-inner">
                             <div className="absolute left-0 top-0 bottom-0 bg-indigo-500/20" style={{ width: `${calculateAIScore(selectedAssignment.content)}%` }}></div>
                             <span className="text-xs font-black text-slate-200 z-10 flex items-center gap-2">
                                <Shield size={14} className="text-indigo-400" />
                                {calculateAIScore(selectedAssignment.content) > 50 ? 'AI GENERATED LIKELY' : 'HUMAN WRITTEN LIKELY'}
                             </span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Expert Feedback</label>
                      <textarea 
                        rows="3" 
                        placeholder="Provide detailed constructive feedback..."
                        className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="flex gap-4">
                       <button 
                         onClick={handleFinalizeGrade}
                         className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                       >
                          <CheckCircle size={20} />
                          Finalize and Submit Grade
                       </button>
                    </div>
                 </div>
               </motion.div>
             ) : (
               <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-6 opacity-40 h-full border-dashed border-2">
                 <div className="p-8 bg-slate-900 rounded-3xl">
                    <BarChart3 size={64} className="text-slate-600" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black outfit uppercase tracking-tight">Teacher Review Center</h3>
                    <p className="max-w-xs text-sm">Select a student upload from your inbox to begin AI analysis and grading.</p>
                 </div>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
