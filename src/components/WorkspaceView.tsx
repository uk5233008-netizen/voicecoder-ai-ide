import React, { useState, useEffect } from 'react';

export default function WorkspaceView() {
  const [isMicActive, setIsMicActive] = useState(true);
  const [voiceBarHeights, setVoiceBarHeights] = useState([40, 70, 95, 60, 30]);
  const [isRunning, setIsRunning] = useState(false);
  const [runLog, setRunLog] = useState<string[]>([]);
  const [assistantChoice, setAssistantChoice] = useState<string | null>(null);

  // Animating Voice bars
  useEffect(() => {
    if (!isMicActive) {
      setVoiceBarHeights([10, 10, 10, 10, 10]);
      return;
    }
    const interval = setInterval(() => {
      setVoiceBarHeights([
        Math.floor(Math.random() * 70) + 20,
        Math.floor(Math.random() * 70) + 20,
        Math.floor(Math.random() * 70) + 20,
        Math.floor(Math.random() * 70) + 20,
        Math.floor(Math.random() * 70) + 20,
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, [isMicActive]);

  const handleRun = () => {
    setIsRunning(true);
    setRunLog(['[info] Initializing voice environment...', '[info] Resolving @voicecoder/core module...', '[success] App running smoothly! Listening on port 3000.']);
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  const handleChoice = (choice: string) => {
    setAssistantChoice(choice);
    // Append mock log message representing AI action
    setRunLog(prev => [
      ...prev,
      `[voice-agent] Applied ${choice} styled button into the main header.`
    ]);
  };

  return (
    <div className="flex flex-col w-full pb-32 bg-slate-50 min-h-screen">
      {/* Status Bar / Toolbar */}
      <div className="flex items-center justify-between px-margin-mobile py-3.5 bg-white shadow-sm sticky top-0 z-30 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
            <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isMicActive ? 'animate-pulse' : 'opacity-40'}`}></div>
            <span className="font-label-sm text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Live</span>
          </div>
          <span className="font-label-sm text-sm text-slate-700 font-bold">index.js</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Debugging environment clean. No errors found.')}
            className="flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Debug"
          >
            <span className="material-symbols-outlined text-[20px]">bug_report</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg transition-all active:scale-95 shadow-sm cursor-pointer hover:bg-blue-700 disabled:opacity-50 font-semibold text-xs"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${isRunning ? 'animate-spin' : ''}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isRunning ? 'sync' : 'play_arrow'}
            </span>
            <span>
              {isRunning ? 'RUNNING' : 'RUN'}
            </span>
          </button>
        </div>
      </div>

      {/* Workspace Stack */}
      <div className="flex flex-col w-full">
        {/* Code Editor Section */}
        <div className="relative w-full bg-[#1e293b] text-slate-100 overflow-hidden border-b border-slate-800">
          <div className="flex items-center gap-2 px-margin-mobile py-2.5 bg-[#0f172a] border-b border-slate-800">
            <span className="material-symbols-outlined text-blue-400 text-[16px] select-none">code</span>
            <span className="font-label-sm text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">
              EDITOR
            </span>
          </div>
          <div className="p-margin-mobile font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre bg-[#0f172a]/40 text-slate-300">
            <span className="text-pink-400 inline-block mr-1">import</span>{' '}
            <span className="text-slate-100">{'{ AI }'}</span>{' '}
            <span className="text-pink-400 inline-block mx-1">from</span>{' '}
            <span className="text-emerald-400">&apos;@voicecoder/core&apos;</span>;
            <br />
            <br />
            <span className="text-cyan-400 inline-block mr-1">async function</span>{' '}
            <span className="text-yellow-300">initializeFlow</span>() {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-slate-500">// AI is listening for your command...</span>
            <br />
            &nbsp;&nbsp;<span className="text-cyan-400 inline-block mr-1">const</span> session ={' '}
            <span className="text-cyan-400">await</span> AI.<span className="text-yellow-300">connect</span>();
            <br />
            <br />
            &nbsp;&nbsp;<span className="text-pink-400 inline-block mr-1">return</span> session.
            <span className="text-yellow-300">on</span>(
            <span className="text-emerald-400">&apos;voice-input&apos;</span>, (cmd) =&gt; {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400 inline-block mr-1">console</span>.
            <span className="text-yellow-300">log</span>(
            <span className="text-emerald-400">`Executing: ${'{cmd}'}`</span>);
            <br />
            &nbsp;&nbsp;{'}'});
            <br />
            {'}'}
            <br />
            <br />
            <div className="bg-blue-950/60 w-full block border-l-2 border-blue-500 -ml-margin-mobile pl-margin-mobile py-1">
              initializeFlow();
            </div>
          </div>
        </div>

        {/* AI Interaction Panel (Voice Visualizer) */}
        <div className="relative w-full bg-white p-margin-mobile flex flex-col gap-4 shadow-sm border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                {isMicActive && (
                  <div className="absolute w-10 h-10 bg-blue-500/20 rounded-full scale-110 animate-ping"></div>
                )}
                <button
                  onClick={() => setIsMicActive(!isMicActive)}
                  className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all active:scale-90 cursor-pointer ${
                    isMicActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}
                  title={isMicActive ? 'Mute Mic' : 'Activate Mic'}
                >
                  <span
                    className="material-symbols-outlined select-none"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {isMicActive ? 'mic' : 'mic_off'}
                  </span>
                </button>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-sm text-slate-900 font-bold">
                  {isMicActive ? 'Voice Active' : 'Voice Paused'}
                </span>
                <span className="font-body-md text-xs text-slate-500 italic mt-0.5">
                  {isMicActive ? '"Add a logout button to the header"' : 'Click mic to resume voice actions'}
                </span>
              </div>
            </div>

            {/* Voice Visualizer Bars */}
            <div className="flex items-end gap-1 h-8">
              {voiceBarHeights.map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-blue-500 rounded-full transition-all duration-150"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* AI Chat Bubble */}
          <div className="bg-slate-50 p-4 rounded-xl rounded-tl-none relative shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-label-sm text-[10px] text-blue-600 uppercase tracking-wider font-bold">
                AI Assistant
              </span>
              <span className="text-[10px] text-slate-400">10:42 AM</span>
            </div>
            <p className="font-body-md text-sm text-slate-700 leading-relaxed">
              I&apos;ve analyzed the component. Should I use the standard{' '}
              <span className="font-mono text-xs text-blue-600 bg-blue-50 px-1 py-0.5 rounded font-bold">Button</span>{' '}
              component or a custom ghost variant for the logout action?
            </p>

            {/* Simulated options for choice */}
            {!assistantChoice ? (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleChoice('standard')}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs transition-colors cursor-pointer border border-transparent shadow-sm"
                >
                  Standard Button
                </button>
                <button
                  onClick={() => handleChoice('ghost')}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded font-semibold text-xs transition-colors cursor-pointer border border-slate-200 shadow-sm"
                >
                  Ghost Variant
                </button>
              </div>
            ) : (
              <div className="mt-3 text-xs text-emerald-600 flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-sm select-none">check</span>
                Selected: {assistantChoice === 'standard' ? 'Standard Button' : 'Ghost Variant'}
              </div>
            )}
          </div>
        </div>

        {/* Live Preview Pane */}
        <div className="relative w-full bg-slate-50 p-margin-mobile flex flex-col gap-3 min-h-[350px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-500 text-[16px] select-none">visibility</span>
              <span className="font-label-sm text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">
                Preview
              </span>
            </div>
            <div className="flex gap-1 select-none">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            </div>
          </div>

          {/* Mock Preview Content */}
          <div className="w-full flex-1 bg-white rounded-xl p-5 flex flex-col gap-6 overflow-hidden border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="w-24 h-4 bg-slate-100 rounded"></div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-4 bg-slate-100 rounded"></div>
                <div className="w-8 h-4 bg-slate-100 rounded"></div>
                {assistantChoice && (
                  <button
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      assistantChoice === 'standard'
                        ? 'bg-blue-600 text-white shadow shadow-blue-200 animate-bounce'
                        : 'border border-slate-300 text-slate-700 opacity-80'
                    }`}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="w-2/3 h-8 bg-blue-50 rounded border border-blue-100 flex items-center px-2.5 text-xs text-blue-700 font-semibold">
                Live App Preview Ready
              </div>
              <div className="w-full h-4 bg-slate-100 rounded"></div>
              <div className="w-full h-4 bg-slate-100 rounded"></div>
              <div className="w-5/6 h-4 bg-slate-100 rounded"></div>
            </div>

            {/* Run Log Output */}
            {runLog.length > 0 && (
              <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-xs space-y-1 overflow-y-auto max-h-32 shadow-inner">
                <div className="text-slate-400 border-b border-slate-800 pb-1 mb-2 font-bold text-[10px] uppercase tracking-wider">
                  Execution Output
                </div>
                {runLog.map((log, i) => {
                  let colorClass = 'text-slate-300';
                  if (log.includes('[error]')) colorClass = 'text-red-400';
                  if (log.includes('[success]')) colorClass = 'text-emerald-400 font-semibold';
                  if (log.includes('[voice-agent]')) colorClass = 'text-blue-400 font-semibold';
                  return (
                     <div key={i} className={`${colorClass} whitespace-pre-wrap`}>
                      {log}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 group hover:border-blue-300 transition-colors">
                <span className="material-symbols-outlined text-slate-300 text-2xl group-hover:scale-110 transition-transform select-none">
                  image
                </span>
              </div>
              <div className="aspect-video bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 group hover:border-blue-300 transition-colors">
                <span className="material-symbols-outlined text-slate-300 text-2xl group-hover:scale-110 transition-transform select-none">
                  image
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
