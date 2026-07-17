export type ViewType = 'landing' | 'auth' | 'dashboard' | 'workspace' | 'settings';

export interface Project {
  id: string;
  name: string;
  editedAt: string;
  icon: string;
  iconColor: string;
  tags: string[];
  progress: number;
  progressColor: string;
  statusText: string;
  isCompleted?: boolean;
  isWarning?: boolean;
}
