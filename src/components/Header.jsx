import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { token, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-800 shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold text-brand">School Payments</Link>
          <Link to="/" className="hidden md:block">Transactions</Link>
          <Link to="/school" className="hidden md:block">By School</Link>
        </div>
        <div className="flex items-center gap-3">
          {token && <span className="hidden sm:block">Hi, {user?.username}</span>}
          {token ? (
            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-brand text-white rounded">Sign up</Link>
            </>
          )}
          {/* Toggle Switch for Dark Mode */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>
      </div>
    </header>
  );
}
