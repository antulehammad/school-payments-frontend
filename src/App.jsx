import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SchoolTransactions from './pages/SchoolTransactions';
import CheckStatus from './pages/CheckStatus';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App(){
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(()=> {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header theme={theme} setTheme={setTheme} />
      <main className="p-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Protected><Dashboard/></Protected>} />
          <Route path="/school" element={<Protected><SchoolTransactions/></Protected>} />
          <Route path="/check" element={<Protected><CheckStatus/></Protected>} />
        </Routes>
      </main>
    </div>
  )
}
