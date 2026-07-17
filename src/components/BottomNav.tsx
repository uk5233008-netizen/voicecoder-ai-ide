import React from 'react';
import { ViewType } from '../types';

interface BottomNavProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export default function BottomNav({ currentView, setView }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: 'dashboard' },
    { id: 'workspace' as ViewType, label: 'IDE', icon: 'terminal' },
    { id: 'settings' as ViewType, label: 'Settings', icon: 'settings' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-white border-t border-slate-200 shadow-lg">
      <div className="flex justify-around items-center h-16 px-margin-mobile">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                setView(item.id);
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-all cursor-pointer ${
                isActive
                  ? 'text-blue-600 font-semibold scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>{item.icon}</span>
              <span className="font-label-sm text-label-sm tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
