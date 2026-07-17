import React from 'react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export default function Header({ currentView, setView }: HeaderProps) {
  const getTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard';
      case 'workspace':
        return 'Workspace';
      case 'settings':
        return 'Settings';
      default:
        return 'VoiceCoder';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-slate-900 text-white pt-safe shadow-sm border-b border-slate-800">
      <div className="h-16 px-margin-mobile flex items-center justify-between gap-unit">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg italic text-white select-none">V</div>
          <span className="font-headline-md text-headline-md text-white tracking-tight truncate font-semibold">
            {getTitle()}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView('workspace')}
            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Open Workspace"
          >
            <span className="material-symbols-outlined">mic</span>
          </button>
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all border border-slate-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMdSi-mp95S2z1nnXHnxQwaO37FYQscA7zCpm3V5YKemE1cr1-wSn_VBHNc2SC4LaRKZZpGzS9auxzxbEXLwEq_M1RbwK_KywjO4e1LytVEO6lkx7lVhELZ09n3vjk0pBG9bQO7zN_5QyM1I2E1wZR8L93zGL3w6k4UgcP-LTqzH-zYPL-fuQxRJ4hBg2kTHHK7f6AnySgXOiq1X0tqkOcEx6Ih9Qqsz0laMie0HPUTY0NnVQf1M_a"
            onClick={() => setView('settings')}
          />
        </div>
      </div>
    </header>
  );
}
