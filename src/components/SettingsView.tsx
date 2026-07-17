import React, { useState } from 'react';
import { ViewType } from '../types';

interface SettingsViewProps {
  setView: (view: ViewType) => void;
}

export default function SettingsView({ setView }: SettingsViewProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('14px');
  const [syntaxTheme, setSyntaxTheme] = useState('Subtle-Dark');
  const [sensitivity, setSensitivity] = useState(75);
  const [wakeWord, setWakeWord] = useState('"Hey Coder"');
  const [githubConnected, setGithubConnected] = useState(true);

  const handleFontSizeCycle = () => {
    const sizes = ['12px', '14px', '16px', '18px'];
    const nextIndex = (sizes.indexOf(fontSize) + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  const handleThemeCycle = () => {
    const themes = ['Subtle-Dark', 'Dracula', 'Monokai', 'Nord-Light'];
    const nextIndex = (themes.indexOf(syntaxTheme) + 1) % themes.length;
    setSyntaxTheme(themes[nextIndex]);
  };

  const handleWakeWordCycle = () => {
    const words = ['"Hey Coder"', '"VoiceCoder"', '"Computer"', '"Hey Assistant"'];
    const nextIndex = (words.indexOf(wakeWord) + 1) % words.length;
    setWakeWord(words[nextIndex]);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      setView('landing');
    }
  };

  return (
    <div className="flex flex-col w-full pb-safe bg-slate-50 min-h-screen">
      {/* Profile Section Hero */}
      <div className="px-margin-mobile py-8 flex flex-col items-center text-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl transition-all group-hover:bg-blue-500/20"></div>
          <img
            alt="Profile headshot"
            className="relative w-24 h-24 rounded-full object-cover shadow-md border-2 border-white select-none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMdSi-mp95S2z1nnXHnxQwaO37FYQscA7zCpm3V5YKemE1cr1-wSn_VBHNc2SC4LaRKZZpGzS9auxzxbEXLwEq_M1RbwK_KywjO4e1LytVEO6lkx7lVhELZ09n3vjk0pBG9bQO7zN_5QyM1I2E1wZR8L93zGL3w6k4UgcP-LTqzH-zYPL-fuQxRJ4hBg2kTHHK7f6AnySgXOiq1X0tqkOcEx6Ih9Qqsz0laMie0HPUTY0NnVQf1M_a"
          />
          <button
            onClick={() => {
              const name = prompt('Change Profile Name:', 'Alex Rivera');
              if (name) alert(`Profile name updated to ${name} (simulated)`);
            }}
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] select-none">edit</span>
          </button>
        </div>
        <h2 className="mt-4 font-headline-lg-mobile text-xl text-slate-900 font-bold">Alex Rivera</h2>
        <p className="font-body-md text-slate-500 text-sm mt-0.5">Senior AI Engineer</p>
      </div>

      {/* Settings Groups */}
      <div className="px-margin-mobile flex flex-col gap-6 max-w-xl mx-auto w-full pb-12">
        {/* Group: IDE Preferences */}
        <section className="flex flex-col gap-2">
          <h3 className="px-2 font-label-sm text-xs font-bold text-slate-400 uppercase tracking-widest select-none">
            IDE Preferences
          </h3>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            {/* Dark Mode Toggle */}
            <div
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-600 select-none">dark_mode</span>
                <span className="font-body-lg text-slate-800 font-medium text-sm">Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                <input
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                  className="sr-only peer"
                  type="checkbox"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Font Size */}
            <div
              onClick={handleFontSizeCycle}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group border-t border-slate-100"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 select-none">format_size</span>
                <span className="font-body-lg text-slate-800 font-medium text-sm">Editor Font Size</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded font-mono">
                  {fontSize}
                </span>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform select-none">
                  chevron_right
                </span>
              </div>
            </div>

            {/* Syntax Theme */}
            <div
              onClick={handleThemeCycle}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group border-t border-slate-100"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 select-none">palette</span>
                <span className="font-body-lg text-slate-800 font-medium text-sm">Syntax Theme</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                  {syntaxTheme}
                </span>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform select-none">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Group: Voice Engine */}
        <section className="flex flex-col gap-2">
          <h3 className="px-2 font-label-sm text-xs font-bold text-slate-400 uppercase tracking-widest select-none">
            Voice Engine
          </h3>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            {/* Voice Sensitivity */}
            <div className="flex flex-col p-4 gap-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 select-none">graphic_eq</span>
                  <span className="font-body-lg text-slate-800 font-medium text-sm">Mic Sensitivity</span>
                </div>
                <span className="font-label-sm text-xs font-bold text-blue-600 transition-all" id="sensitivity-label">
                  {sensitivity}%
                </span>
              </div>
              <input
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                id="sensitivity-slider"
                max="100"
                min="0"
                type="range"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider select-none font-bold">
                <span>Whisper</span>
                <span>Balanced</span>
                <span>Shout</span>
              </div>
            </div>

            {/* Wake Word */}
            <div
              onClick={handleWakeWordCycle}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group border-t border-slate-100"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 select-none">record_voice_over</span>
                <span className="font-body-lg text-slate-800 font-medium text-sm">Wake Word</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded">
                  {wakeWord}
                </span>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform select-none">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Group: Connectivity */}
        <section className="flex flex-col gap-2">
          <h3 className="px-2 font-label-sm text-xs font-bold text-slate-400 uppercase tracking-widest select-none">
            Connectivity
          </h3>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
            {/* API Keys */}
            <div
              onClick={() => alert('Secret token view: API Keys are securely injected at runtime in .env')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-600 select-none">vpn_key</span>
                <span className="font-body-lg text-slate-800 font-medium text-sm">API Keys & Tokens</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></div>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform select-none">
                  chevron_right
                </span>
              </div>
            </div>

            {/* Cloud Sync */}
            <div
              onClick={() => setGithubConnected(!githubConnected)}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group border-t border-slate-100"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 select-none">cloud_sync</span>
                <span className="font-body-lg text-slate-800 font-medium text-sm">GitHub Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-label-sm text-xs font-semibold ${githubConnected ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {githubConnected ? 'Connected' : 'Disconnected'}
                </span>
                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform select-none">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* App Info Footer */}
        <div className="mt-4 pb-8 flex flex-col items-center gap-4">
          <button
            onClick={handleLogout}
            className="w-full py-3.5 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors cursor-pointer border border-red-200 active:scale-98 text-sm"
          >
            Log Out
          </button>
          <div className="flex flex-col items-center opacity-40 select-none">
            <span className="font-label-sm text-[10px] font-bold text-slate-500">VoiceCoder v2.4.0-stable</span>
            <span className="font-label-sm text-[8px] uppercase tracking-[0.2em] mt-1 font-bold text-slate-500">
              Crafted for Focus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
