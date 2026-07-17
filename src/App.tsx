/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewType, Project } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LandingView from './components/LandingView';
import AuthView from './components/AuthView';
import DashboardView from './components/DashboardView';
import WorkspaceView from './components/WorkspaceView';
import SettingsView from './components/SettingsView';

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce API',
    editedAt: 'Edited 2 hours ago',
    icon: 'api',
    iconColor: 'text-blue-600',
    tags: ['Node.js', 'Postgres'],
    progress: 85,
    progressColor: 'bg-blue-600',
    statusText: '85% Complete',
  },
  {
    id: '2',
    name: 'Portfolio Site',
    editedAt: 'Edited 1 day ago',
    icon: 'web',
    iconColor: 'text-indigo-500',
    tags: ['React', 'Tailwind'],
    progress: 100,
    progressColor: 'bg-indigo-600',
    statusText: 'Deployed',
    isCompleted: true,
  },
  {
    id: '3',
    name: 'Voice Bot',
    editedAt: 'Edited 3 days ago',
    icon: 'smart_toy',
    iconColor: 'text-rose-500',
    tags: ['OpenAI', 'Vercel'],
    progress: 20,
    progressColor: 'bg-rose-500 shadow-sm',
    statusText: 'Critical Bug in Auth',
    isWarning: true,
  },
];

export default function App() {
  const [currentView, setView] = useState<ViewType>('landing');
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleAddProject = (newProj: Omit<Project, 'id'>) => {
    const projectWithId: Project = {
      ...newProj,
      id: Date.now().toString(),
    };
    setProjects((prev) => [...prev, projectWithId]);
  };

  const showHeaderAndNav =
    currentView === 'dashboard' ||
    currentView === 'workspace' ||
    currentView === 'settings';

  return (
    <main className="flex flex-col relative w-full min-h-screen bg-slate-50 text-slate-800">
      {showHeaderAndNav && (
        <Header currentView={currentView} setView={setView} />
      )}

      <div className={`flex-1 w-full ${showHeaderAndNav ? 'pt-16' : ''}`}>
        {currentView === 'landing' && <LandingView setView={setView} />}
        {currentView === 'auth' && <AuthView setView={setView} />}
        {currentView === 'dashboard' && (
          <DashboardView projects={projects} onAddProject={handleAddProject} />
        )}
        {currentView === 'workspace' && <WorkspaceView />}
        {currentView === 'settings' && <SettingsView setView={setView} />}
      </div>

      {showHeaderAndNav && (
        <BottomNav currentView={currentView} setView={setView} />
      )}
    </main>
  );
}
