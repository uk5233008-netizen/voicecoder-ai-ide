import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface DashboardViewProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
}

export default function DashboardView({ projects, onAddProject }: DashboardViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceBarHeights, setVoiceBarHeights] = useState([40, 60, 30, 80, 50]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New project form state
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('api');
  const [newTags, setNewTags] = useState('React, Tailwind');
  const [newProgress, setNewProgress] = useState(100);

  // Animate voice visualizer bars
  useEffect(() => {
    const interval = setInterval(() => {
      setVoiceBarHeights([
        Math.floor(Math.random() * 70) + 20,
        Math.floor(Math.random() * 70) + 20,
        Math.floor(Math.random() * 70) + 20,
        Math.floor(Math.random() * 70) + 20,
        Math.floor(Math.random() * 70) + 20,
      ]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    let iconColor = 'text-primary';
    let progressColor = 'bg-primary';
    let statusText = 'Deployed';
    let isCompleted = false;
    let isWarning = false;

    if (newIcon === 'api') {
      iconColor = 'text-secondary';
      progressColor = 'bg-secondary';
      statusText = `${newProgress}% Complete`;
    } else if (newIcon === 'smart_toy') {
      iconColor = 'text-primary';
      progressColor = 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.5)]';
      statusText = 'Critical Bug in Auth';
      isWarning = true;
    } else {
      iconColor = 'text-tertiary';
      progressColor = 'bg-primary';
      statusText = 'Deployed';
      isCompleted = true;
    }

    onAddProject({
      name: newName,
      editedAt: 'Edited just now',
      icon: newIcon,
      iconColor,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      progress: newProgress,
      progressColor,
      statusText,
      isCompleted,
      isWarning,
    });

    // Reset Form
    setNewName('');
    setNewIcon('web');
    setNewTags('React, Tailwind');
    setNewProgress(100);
    setShowAddModal(false);
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      project.statusText.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col w-full pb-32 bg-slate-50 min-h-screen">
      {/* Top Search & Filter Section */}
      <div className="px-margin-mobile pt-6 pb-4">
        <div className="relative group max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 select-none">search</span>
          </div>
          <input
            className="w-full h-12 pl-12 pr-4 bg-white text-slate-900 rounded-lg font-body-md focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-200 shadow-sm focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400"
            placeholder="Search project name, stack, or command..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-blue-500 text-body-lg select-none">mic</span>
          </div>
        </div>
      </div>

      {/* Active Listening / Stats Bar */}
      <div className="px-margin-mobile mb-6">
        <div className="max-w-xl mx-auto bg-slate-900 text-white rounded-xl p-5 flex items-center justify-between overflow-hidden relative border border-slate-800 shadow-lg">
          <div className="flex flex-col z-10">
            <span className="font-label-sm text-xs text-blue-400 uppercase tracking-widest font-semibold">Voice Engine</span>
            <span className="font-headline-md text-xl text-white font-bold mt-1">System Active & Listening</span>
          </div>
          <div className="flex items-end gap-1.5 h-8 z-10" id="voice-bars">
            {voiceBarHeights.map((height, i) => (
              <div
                key={i}
                className="w-1 bg-blue-500 rounded-full transition-all duration-300"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          {/* Decorative Background Element */}
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-[80px] select-none text-slate-300">terminal</span>
          </div>
        </div>
      </div>

      {/* Project Section Header */}
      <div className="px-margin-mobile flex items-center justify-between mb-4 max-w-xl mx-auto w-full">
        <h2 className="font-headline-lg-mobile text-xl text-slate-900 font-bold">Your Projects</h2>
        <button
          onClick={() => alert('Viewing all list modes (simulated)')}
          className="text-blue-600 font-semibold text-sm flex items-center gap-1 cursor-pointer hover:underline"
        >
          View All <span className="material-symbols-outlined text-sm select-none">arrow_forward</span>
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="px-margin-mobile grid grid-cols-1 gap-4 max-w-xl mx-auto w-full">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl p-6 group active:scale-[0.99] hover:shadow-md transition-all duration-200 border border-slate-200 hover:border-slate-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <h3 className="font-headline-md text-lg text-slate-900 group-hover:text-blue-600 transition-colors font-bold">
                  {project.name}
                </h3>
                <p className="font-label-sm text-xs text-slate-400 font-medium mt-0.5">{project.editedAt}</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className={`material-symbols-outlined ${project.iconColor} select-none`}>
                  {project.icon}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 mb-6">
              {project.tags.map((tag, i) => (
                <div key={i} className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[14px] text-blue-500 select-none">
                    {tag.toLowerCase() === 'node.js' || tag.toLowerCase() === 'javascript' ? 'javascript' : 'terminal'}
                  </span>
                  <span className="font-label-sm text-xs text-slate-600 font-medium">{tag}</span>
                </div>
              ))}
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`${project.progressColor} h-full rounded-full transition-all duration-1000`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center mt-3 pt-1">
              <span className={`font-label-sm text-xs font-semibold ${project.isWarning ? 'text-red-600' : 'text-slate-400'}`}>
                {project.statusText}
              </span>
              {project.isCompleted ? (
                <span className="material-symbols-outlined text-emerald-600 text-lg select-none">
                  check_circle
                </span>
              ) : project.isWarning ? (
                <span className="material-symbols-outlined text-red-600 text-lg select-none animate-pulse">
                  warning
                </span>
              ) : (
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-800 font-bold border-2 border-white select-none">
                    AI
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white select-none">
                    <span className="material-symbols-outlined text-[12px] text-slate-500">person</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-slate-400">
            <span className="material-symbols-outlined text-[32px] select-none">search_off</span>
            <p className="font-body-md text-body-md text-center">No projects found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Empty State / Add New Placeholder */}
        <div
          onClick={() => setShowAddModal(true)}
          className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-blue-500 hover:text-blue-600 hover:shadow-sm transition-all duration-300 cursor-pointer max-w-xl mx-auto w-full group"
        >
          <span className="material-symbols-outlined text-[32px] select-none group-hover:scale-110 transition-transform text-slate-300 group-hover:text-blue-500">
            add_circle
          </span>
          <p className="font-body-md text-body-md text-center font-medium">
            Say "Create new project" or click here to start a new project.
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          title="Create New Project"
        >
          <span className="material-symbols-outlined text-[28px] select-none">add</span>
        </button>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-headline-md text-lg text-slate-900 font-bold">
                Create New Project
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined select-none text-lg">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="font-label-sm text-xs font-semibold text-slate-600">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chatbot Widget"
                  className="w-full bg-slate-50 text-slate-900 font-body-md p-3 rounded-lg border border-slate-200 outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-xs font-semibold text-slate-600">Icon Template</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'api', label: 'API Block', icon: 'api' },
                    { id: 'web', label: 'Web UI', icon: 'web' },
                    { id: 'smart_toy', label: 'AI Agent', icon: 'smart_toy' },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setNewIcon(tpl.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        newIcon === tpl.id
                          ? 'border-blue-500 bg-blue-50/50 text-blue-600 font-semibold'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      <span className="material-symbols-outlined select-none">{tpl.icon}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider">{tpl.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-xs font-semibold text-slate-600">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Tailwind, Vite"
                  className="w-full bg-slate-50 text-slate-900 font-body-md p-3 rounded-lg border border-slate-200 outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </div>

              {newIcon !== 'smart_toy' && (
                <div className="space-y-1">
                  <div className="flex justify-between font-label-sm text-xs font-semibold text-slate-600 mb-1">
                    <span>Progress</span>
                    <span>{newProgress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    value={newProgress}
                    onChange={(e) => setNewProgress(Number(e.target.value))}
                  />
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
