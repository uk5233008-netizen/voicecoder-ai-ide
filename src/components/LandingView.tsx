import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';

interface LandingViewProps {
  setView: (view: ViewType) => void;
}

const phrases = [
  "Adding a while loop...",
  "Refactoring class components...",
  "Importing tailwind config...",
  "Optimizing image assets...",
  "Writing unit tests..."
];

export default function LandingView({ setView }: LandingViewProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [transcriptionText, setTranscriptionText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTranscriptionText(currentFullPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTranscriptionText(currentFullPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 50);
    }

    if (!isDeleting && charIndex === currentFullPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Hero Section */}
      <section className="relative px-margin-mobile py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20"></div>
        <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="font-label-sm text-xs text-blue-700 uppercase tracking-widest font-semibold">v1.0 Now Live</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-slate-900 tracking-tight leading-tight">
            Code at the <span className="text-blue-600 italic font-bold">Speed of Thought.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-slate-600 max-w-md mx-auto">
            The world's first voice-controlled AI IDE. Speak your logic, see your code materialize in real-time.
          </p>
          <div className="flex flex-col gap-3 pt-4 max-w-sm mx-auto">
            <button
              onClick={() => setView('auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-lg shadow-md transition-colors active:scale-[0.98] cursor-pointer"
            >
              Get Started for Free
            </button>
            <button
              onClick={() => setView('workspace')}
              className="flex items-center justify-center gap-2 font-semibold text-slate-700 py-3.5 px-8 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer bg-white"
            >
              <span className="material-symbols-outlined text-blue-600">play_circle</span>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* IDE Preview Visual */}
      <section className="px-margin-mobile pb-16">
        <div className="relative group max-w-xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-md opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-800">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="font-label-sm text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                main.py — VoiceCoder
              </div>
              <span className="material-symbols-outlined text-blue-400 text-[18px]">settings</span>
            </div>
            {/* Editor Body */}
            <div className="flex h-64">
              <div className="w-12 flex flex-col items-center py-4 gap-2 border-r border-slate-800 text-slate-600 font-code-md text-code-md select-none">
                <span>1</span>
                <span>2</span>
                <span className="text-blue-400 font-bold">3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <div className="flex-1 p-4 font-code-md text-code-md overflow-hidden bg-slate-900">
                <div className="text-purple-400 inline-block mr-1 font-semibold">import</div>
                <span className="text-slate-300">voice_engine</span>
                <br />
                <br />
                <div className="bg-slate-800/50 -mx-4 px-4 border-l-2 border-blue-500 py-1.5">
                  <span className="text-pink-400 font-semibold">def</span> <span className="text-blue-300 font-medium">create_flow</span>():
                  <br />
                  &nbsp;&nbsp;<span className="text-slate-500 italic"># "Hey VoiceCoder, add a loop here"</span>
                </div>
                <div className="flex items-center gap-2 mt-4 text-slate-300">
                  <span className="material-symbols-outlined animate-pulse text-blue-400 text-sm">mic</span>
                  <span className="border-r-2 border-blue-500 pr-1 min-h-[1.5rem] inline-block font-medium text-blue-300">{transcriptionText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-margin-mobile py-8 space-y-8 max-w-xl mx-auto w-full">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="font-headline-md text-2xl text-slate-900 font-bold">Engineered for Flow</h2>
          <p className="font-body-md text-body-md text-slate-500">Ditch the keyboard. Speak your logic at the speed of thought.</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {/* Feature Card 1 */}
          <div className="bg-white p-6 rounded-xl space-y-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
              <span className="material-symbols-outlined text-blue-600">keyboard_voice</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-headline-md text-headline-md text-slate-900 font-semibold">AI Voice Control</h3>
              <p className="font-body-md text-body-md text-slate-600 leading-relaxed">Advanced natural language processing translates your verbal instructions into production-ready syntax across 40+ languages.</p>
            </div>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-white p-6 rounded-xl space-y-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <span className="material-symbols-outlined text-emerald-600">visibility</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-headline-md text-headline-md text-slate-900 font-semibold">Real-time Preview</h3>
              <p className="font-body-md text-body-md text-slate-600 leading-relaxed">See UI changes and backend logic updates instantly. Our instant-render engine keeps up with your every word.</p>
            </div>
          </div>
          {/* Feature Card 3 */}
          <div className="bg-white p-6 rounded-xl space-y-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100">
              <span className="material-symbols-outlined text-amber-600">bug_report</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-headline-md text-headline-md text-slate-900 font-semibold">Smart Debugging</h3>
              <p className="font-body-md text-body-md text-slate-600 leading-relaxed">"Why is this failing?" Just ask. VoiceCoder audits your code stack and provides spoken explanations and one-click fixes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Illustration */}
      <section className="px-margin-mobile py-8 max-w-xl mx-auto w-full">
        <div className="relative h-48 rounded-xl overflow-hidden flex items-center justify-center group border border-slate-200 shadow-md">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsbnd1db523CW66_d64knc29sGuRMbu0LEJ2VpMlIWw3vo51uhksokszKmj9Ra9MmUHSTky6SSnWH9TOCJ2kmLnDyLREFfJJVYen7zVopTGIl9AaETi0knr7qmPwkeB0ndTEhqJ3qQj2Kq98VEPuZWfp1cAs8bRUvS-GFNPtuIH5QiwycC9oVW2PYWjDD98tkXhnZA1Us07mR1k5gT4uN3m2a00u9sJipc_c-RxZqG28Piz8pPQ0vr')`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <div className="relative text-center space-y-1 z-10 p-4">
            <p className="font-label-sm text-xs text-blue-400 uppercase tracking-widest font-semibold">Unrivaled Precision</p>
            <h4 className="font-headline-md text-lg text-white font-bold">Zero-latency Recognition</h4>
          </div>
        </div>
      </section>

      {/* Social Proof / CTA */}
      <section className="px-margin-mobile py-16 text-center bg-white rounded-2xl max-w-xl mx-auto w-full border border-slate-200 shadow-sm mt-8">
        <div className="space-y-6">
          <h2 className="font-headline-lg-mobile text-2xl text-slate-900 font-bold max-w-xs mx-auto">Ready to speak code?</h2>
          <p className="font-body-md text-body-md text-slate-500 max-w-sm mx-auto">Join 50,000+ developers shipping faster with VoiceCoder.</p>
          <div className="flex justify-center -space-x-2">
            <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-blue-700 text-[10px] font-bold">JD</div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-50 flex items-center justify-center text-emerald-700 text-[10px] font-bold">ML</div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-50 flex items-center justify-center text-amber-700 text-[10px] font-bold">SK</div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs">+5k</div>
          </div>
          <button
            onClick={() => setView('auth')}
            className="w-full max-w-sm mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg active:scale-95 transition-transform cursor-pointer shadow-md"
          >
            Claim Your Free License
          </button>
          <p className="font-label-sm text-xs text-slate-400">No credit card required • 14-day pro trial included</p>
        </div>
      </section>
    </div>
  );
}
