import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle, CheckCircle, ChevronRight, FileText, Languages, File, Image, FileCode, UploadCloud } from 'lucide-react';
import { cn } from '../lib/utils';

const generateAIHint = (text, index) => {
  const hints = [
    "Identify the main subject in the first few lines.",
    "Try breaking this down into three core components.",
    "Look for keywords that suggest specific mathematical or logical techniques.",
    "Consider the context: what is the most likely goal of this problem?"
  ];
  return hints[index % hints.length];
};

const generateAISolution = (text, lang) => {
  const solutions = {
    en: `Comprehensive AI analysis for your document: \n\n1. Found core patterns related to the input.\n2. Suggested approach: Break down the hierarchy.\n3. Final step: Verify consistency.\n\n[Full detailed solution generated based on your content]`,
    hi: `आपके दस्तावेज़ के लिए व्यापक एआई विश्लेषण: \n\n1. इनपुट से संबंधित मुख्य पैटर्न मिले।\n2. सुझाव: पदानुक्रम को तोड़ें।\n3. अंतिम चरण: निरंतरता सत्यापित करें।`,
    es: `Análisis completo de IA para su documento: \n\n1. Patrones principales encontrados.\n2. Enfoque sugerido: Desglosar la jerarquía.\n3. Paso final: Verificar la consistencia.`
  };
  return solutions[lang] || solutions.en;
};

export function StudentDashboard({ lang, t, assignments, setAssignments }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [newAssignmentText, setNewAssignmentText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState('text');

  const selectedAssignment = assignments.find(a => a.id === selectedId);

  const handleCreateAssignment = (type = 'text', fileName = '') => {
    if (type === 'text' && !newAssignmentText.trim()) return;
    setIsUploading(true);
    setTimeout(() => {
      const newId = Date.now();
      const newAss = {
        id: newId,
        title: type === 'text' 
          ? newAssignmentText.substring(0, 30) + (newAssignmentText.length > 30 ? '...' : '') 
          : (fileName || 'Uploaded Document'),
        content: type === 'text' ? newAssignmentText : `[Uploaded ${type.toUpperCase()} File: ${fileName}] Content analysis simulated.`,
        subject: 'My Upload',
        status: 'In Progress',
        deadline: 'Just Now',
        type: type 
      };
      setAssignments([newAss, ...assignments]);
      setSelectedId(newId);
      setNewAssignmentText('');
      setIsUploading(false);
      setShowHint(false);
      setShowSolution(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Assignment List */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FileText className="text-indigo-400" />
          My Assignments
        </h2>

        {/* Upload Assignment UI */}
        <div className="p-5 glass-card mb-6 border-dashed border-indigo-500/30 bg-indigo-500/10">
           <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Submit Assignment</h3>
           
           <div className="flex gap-2 mb-4">
              {[
                { id: 'text', icon: FileText, label: 'Text' },
                { id: 'pdf', icon: File, label: 'PDF' },
                { id: 'image', icon: Image, label: 'Image' },
                { id: 'docx', icon: FileCode, label: 'Docx' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setUploadType(type.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-1 p-2 rounded-lg border transition-all",
                    uploadType === type.id ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20" : "bg-slate-900/50 border-white/5 text-slate-500"
                  )}
                >
                  <type.icon size={16} />
                  <span className="text-[10px] font-bold">{type.label}</span>
                </button>
              ))}
           </div>

           {uploadType === 'text' ? (
             <textarea 
               className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-indigo-500/50 transition-all resize-none mb-3"
               placeholder="Paste your assignment text here..."
               rows="3"
               value={newAssignmentText}
               onChange={(e) => setNewAssignmentText(e.target.value)}
             ></textarea>
           ) : (
             <div className="border-2 border-dashed border-white/10 rounded-xl py-8 flex flex-col items-center justify-center gap-2 mb-3 bg-slate-900/30 relative cursor-pointer hover:bg-slate-900/50 transition-colors">
                <UploadCloud className="text-slate-600" size={32} />
                <p className="text-xs text-slate-500">Click to upload {uploadType}</p>
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={(e) => handleCreateAssignment(uploadType, e.target.files[0]?.name)} 
                />
             </div>
           )}

           {uploadType === 'text' && (
             <button 
               onClick={() => handleCreateAssignment('text')}
               disabled={isUploading}
               className={cn(
                 "w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/10",
                 isUploading ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-500"
               )}
             >
               {isUploading ? 'Analyzing...' : 'Analyze My Assignment'}
             </button>
           )}
        </div>

        {assignments.length === 0 ? (
          <div className="p-12 text-center opacity-30 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center">
            <Sparkles size={32} className="mb-4 text-indigo-400" />
            <p className="text-sm font-bold">No assignments submitted</p>
            <p className="text-xs mt-1">Submit your first one above!</p>
          </div>
        ) : assignments.map((assignment) => (
          <motion.div
            key={assignment.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setSelectedId(assignment.id); setShowHint(false); setShowSolution(false); }}
            className={cn(
              "p-5 glass-card cursor-pointer transition-all border-opacity-10",
              selectedId === assignment.id ? "border-indigo-500 bg-indigo-500/10" : "hover:border-white/20"
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">{assignment.type || 'Text'}</span>
              <span className="text-[10px] px-2 py-1 rounded-full font-bold bg-amber-500/20 text-amber-400">
                {assignment.status}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-4 truncate">{assignment.title}</h3>
            <div className="flex justify-between items-center text-slate-500 text-xs text-uppercase tracking-widest font-bold">
               <span>Added {assignment.deadline}</span>
               <ChevronRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Column: AI Tutor Area */}
      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          {selectedId ? (
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="glass-card p-8 min-h-[500px] flex flex-col relative overflow-hidden"
            >
              <h2 className="text-3xl font-black mb-4 outfit tracking-tight">{selectedAssignment.title}</h2>
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 mb-8 text-sm text-slate-300 leading-relaxed font-serif max-h-48 overflow-y-auto">
                 "{selectedAssignment.content}"
              </div>

              <div className="flex flex-wrap gap-4 mt-auto">
                <button 
                  onClick={() => { setShowHint(true); setShowSolution(false); setCurrentHintIndex(prev => (prev + 1) % 4); }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                >
                  <Sparkles size={18} />
                  Get AI Hint
                </button>
                <button 
                  onClick={() => { setShowSolution(true); setShowHint(false); }}
                  className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 font-black uppercase text-xs tracking-widest active:scale-95"
                >
                   <CheckCircle size={18} className="text-emerald-400" />
                   Explain Full Solution
                </button>
              </div>

              {/* AI Content Display */}
              <div className="mt-10 space-y-6">
                <AnimatePresence mode="wait">
                  {showHint && (
                    <motion.div
                      key="hint"
                      initial={{ height: 0, opacity: 0, y: 10 }}
                      animate={{ height: 'auto', opacity: 1, y: 0 }}
                      className="p-8 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 relative"
                    >
                      <div className="flex items-center gap-2 mb-4 text-indigo-400 font-black uppercase text-[10px] tracking-widest">
                        <HelpCircle size={14} />
                        AI Hint Selection
                      </div>
                      <p className="text-slate-200 text-xl leading-relaxed italic outfit">
                        "{generateAIHint(selectedAssignment.content, currentHintIndex)}"
                      </p>
                    </motion.div>
                  )}

                  {showSolution && (
                    <motion.div
                      key="solution"
                      initial={{ height: 0, opacity: 0, y: 10 }}
                      animate={{ height: 'auto', opacity: 1, y: 0 }}
                      className="p-8 bg-slate-950/80 rounded-3xl border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-[10px] tracking-widest">
                          <CheckCircle size={14} />
                          Full AI Breakdown
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-widest font-black">
                           <Languages size={14} /> {lang}
                        </div>
                      </div>
                      <div className="space-y-4 text-slate-300 leading-relaxed text-lg font-serif">
                        {generateAISolution(selectedAssignment.content, lang)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-6 opacity-40 h-full border-dashed border-2">
              <div className="p-8 bg-slate-900 rounded-full border border-white/5">
                <FileText size={64} className="text-slate-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black outfit uppercase tracking-tight">Focus on Learning</h3>
                <p className="max-w-xs text-sm mx-auto">Upload an assignment to get started with step-by-step AI guidance.</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
