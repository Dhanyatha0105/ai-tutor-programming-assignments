import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Auth } from './components/Auth';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';

const languages = {
  en: {
    title: "AI Assignment Tutor",
    studentPortal: "Student Portal",
    teacherPortal: "Teacher Portal",
    search: "Search Assignments...",
    welcome: "Welcome back, {name}",
    toggleRole: "Switch to {role}"
  },
  hi: {
    title: "एआई असाइनमेंट ट्यूटर",
    studentPortal: "छात्र पोर्टल",
    teacherPortal: "शिक्षक पोर्टल",
    search: "असाइनमेंट खोजें...",
    welcome: "वापस स्वागत है, {name}",
    toggleRole: "{role} पर स्विच करें"
  },
  es: { // Example of a regional/other language
    title: "Tutor de Tareas AI",
    studentPortal: "Portal del Estudiante",
    teacherPortal: "Portal del Profesor",
    search: "Buscar tareas...",
    welcome: "Bienvenido de nuevo, {name}",
    toggleRole: "Cambiar a {role}"
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('student');
  const [lang, setLang] = useState('en');
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const t = languages[lang];

  const handleLogin = (userData) => {
    setUser(userData);
    setRole(userData.role);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} lang={lang} t={t} />;
  }

  return (
    <Layout 
      title={t.title} 
      lang={lang} 
      setLang={setLang}
      role={role}
      setRole={setRole}
      t={t}
      user={user}
      onLogout={handleLogout}
    >
      <div className="container mx-auto px-6 py-8">
        <header className="mb-10 animate-fade-in flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-extrabold text-gradient mb-2">
              {t.welcome.replace('{name}', user.name)}
            </h1>
            <p className="text-slate-400 text-lg">
              {role === 'student' ? 'Let\'s get those assignments done!' : 'Time to review student submissions.'}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Current Role</span>
             <span className={cn(
               "px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter",
               role === 'student' ? "bg-indigo-500/20 text-indigo-400" : "bg-orange-500/20 text-orange-400"
             )}>
               {role === 'student' ? 'Student' : 'Teacher'}
             </span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {role === 'student' ? (
              <StudentDashboard 
                lang={lang} 
                t={t} 
                assignments={assignments} 
                setAssignments={setAssignments}
                submissions={submissions}
              />
            ) : (
              <TeacherDashboard 
                lang={lang} 
                t={t} 
                assignments={assignments}
                submissions={submissions}
                setSubmissions={setSubmissions}
                setAssignments={setAssignments}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default App;
