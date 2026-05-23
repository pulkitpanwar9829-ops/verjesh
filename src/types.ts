export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'Web Applications' | 'Creative Design' | 'Dashboards' | 'Mini Games' | 'All';
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  features: string[];
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Tools & Platforms' | 'Design & Other';
  percentage: number;
  iconName: string;
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead?: boolean;
}
