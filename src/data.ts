import { Project, Service, Skill, Experience } from './types';

export const SERVICES: Service[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    iconName: 'LayoutTemplate',
    description: 'Building high-performance, responsive single-page applications using modern frameworks like React, Vite, and TypeScript.',
    features: ['Custom Component Systems', 'State Management Integration', 'Robust TypeScript Types', 'Optimized Initial Page-Loads']
  },
  {
    id: 'responsive',
    title: 'Adaptive Fluid Design',
    iconName: 'Smartphone',
    description: 'Crafting responsive layouts that look breath-taking on any scale, from tiny portable screens up to massive ultra-wide monitors.',
    features: ['Mobile-First CSS Precision', 'Flexible Grid Systems', 'Touch-Target Architecture', 'No Screen Out-of-Bounds']
  },
  {
    id: 'interactive',
    title: 'Micro-Animations & UX',
    iconName: 'Flame',
    description: 'Enriching user interactions with smooth transitions, hover effects, and spring-based layouts powered by motion/react.',
    features: ['Spring Physics Transitions', 'Gesture-State Interactions', 'Staggered Entrance Effects', 'High Frame Rate Performance']
  },
  {
    id: 'prototyping',
    title: 'Fast Prototyping',
    iconName: 'Zap',
    description: 'Translating design mockups (Figma, Sketch) into production-ready pixel-perfect code in hours, not weeks.',
    features: ['Clean Block Refactoring', 'Semantic HTML Layouts', 'Rapid Iteration Workflows', 'Strict Style Guidelines']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'apex-dashboard',
    title: 'Apex Analytics Dashboard',
    description: 'A modern cybernetic dashboard featuring gorgeous real-time canvas charting, resource monitors, and rich diagnostic controls.',
    longDescription: 'An immersive dashboard created to simulate system diagnostics, task pipelines, and server health checks. Uses local calculations to serve responsive real-time data flows, customizable grid widgets, and live status displays.',
    category: 'Dashboards',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['React 19', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    githubUrl: 'https://github.com/navod-caldera/apex-dashboard',
    liveUrl: '#',
    stars: 142,
    featured: true
  },
  {
    id: 'cyber-arcade',
    title: 'Retro Neon Arcade',
    description: 'An interactive neon arcade package featuring playable client-side Retro Snake & Block Matrix games built with canvas and React.',
    longDescription: 'Includes a fully playable canvas-based Neon Snake game with sound synthesis (Web Audio API), scoreboards, and difficult stages, showing full control over state updates and keyboard event listeners.',
    category: 'Mini Games',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    tags: ['Canvas API', 'Web Audio API', 'React Hooks', 'motion'],
    githubUrl: 'https://github.com/navod-caldera/retro-arcade',
    liveUrl: '#',
    stars: 98,
    featured: true
  },
  {
    id: 'nebula-store',
    title: 'Nebula E-commerce Portal',
    description: 'A gorgeous dark-themed product store featuring interactive sidebar cart decks, slide previews, and real-time product filters.',
    longDescription: 'Created as a luxury shopping template with fluid cart drawer sidebars, keyboard-navigable detail modals, tax & total calculations, and custom item add/remove reactive layouts.',
    category: 'Web Applications',
    image: 'https://images.unsplash.com/photo-1523474253046-2cd2748b5fd2?auto=format&fit=crop&w=800&q=80',
    tags: ['React Context', 'Tailwind v4', 'Cart State Engine', 'motion'],
    githubUrl: 'https://github.com/navod-caldera/nebula-store',
    liveUrl: '#',
    stars: 119,
    featured: true
  },
  {
    id: 'scribe-workspace',
    title: 'Scribe Markdown Workspace',
    description: 'A responsive visual document planner featuring a direct live compiler, template injection modules, and custom tag renderers.',
    longDescription: 'A premium split-screen utility allowing developers or writers to draft content, preview compiled html instantly, inject custom tech boilerplate frameworks, and download raw markdown directly.',
    category: 'Web Applications',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    tags: ['Markdown Compiler', 'File Downloader', 'Theme Controller'],
    githubUrl: 'https://github.com/navod-caldera/scribe-workspace',
    liveUrl: '#',
    stars: 83,
    featured: false
  },
  {
    id: 'prism-vector',
    title: 'Prism CSS Canvas Generator',
    description: 'An advanced mathematical playground that generates bespoke CSS clip-paths, box-shadow projections, and linear gradient strings.',
    longDescription: 'A tool built to simplify frontend design work, offering draggable nodes to outline clipping hulls, background color mixing sliders, and instant clipboard exports.',
    category: 'Creative Design',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    tags: ['Clip-Path', 'CSS Generator', 'Draggable Nodes'],
    githubUrl: 'https://github.com/navod-caldera/prism-generator',
    stars: 76,
    featured: false
  }
];

export const SKILLS: Skill[] = [
  { name: 'HTML5 / Semantic Layouts', category: 'Frontend', percentage: 98, iconName: 'HtmlImage' },
  { name: 'CSS3 / Tailwind Engine', category: 'Frontend', percentage: 95, iconName: 'CssImage' },
  { name: 'JavaScript / ESNext', category: 'Frontend', percentage: 92, iconName: 'JsImage' },
  { name: 'TypeScript Integration', category: 'Frontend', percentage: 90, iconName: 'TypeScriptImage' },
  { name: 'React 19 / State Arch', category: 'Frontend', percentage: 93, iconName: 'ReactImage' },
  { name: 'motion Layout Engine', category: 'Frontend', percentage: 88, iconName: 'MotionImage' },
  
  { name: 'Git & Multi-Branch Workflows', category: 'Tools & Platforms', percentage: 86, iconName: 'GitImage' },
  { name: 'Vite / Buldr Setup', category: 'Tools & Platforms', percentage: 88, iconName: 'ViteImage' },
  { name: 'npm / Dependency Management', category: 'Tools & Platforms', percentage: 91, iconName: 'NpmImage' },
  { name: 'Chrome Developer Debugging', category: 'Tools & Platforms', percentage: 94, iconName: 'ChromeImage' },

  { name: 'Figma to Code Engineering', category: 'Design & Other', percentage: 92, iconName: 'FigmaImage' },
  { name: 'UI/UX Visual Accessibility', category: 'Design & Other', percentage: 89, iconName: 'AccessImage' },
  { name: 'Clean Code Refactoring', category: 'Design & Other', percentage: 93, iconName: 'RefactorImage' },
];

export const EXPERIENCES: Experience[] = [
  {
    year: '2024 - Present',
    role: 'Senior Frontend Developer',
    company: 'Apex Labs',
    description: 'Spearheading the engineering of highly interactive analytical dashboards and core UI components. Mentored 4 junior coders and optimized initial payload delivery speeds by 38%.',
    achievements: [
      'Engineered an extensible, highly robust template toolkit using custom Tailwind styles',
      'Architected performance audits that eliminated redundant react state re-renders',
      'Unified type coverage across 4 key repositories to reach 100% TS compliance'
    ]
  },
  {
    year: '2022 - 2024',
    role: 'Frontend Engineer',
    company: 'PixelForge Studios',
    description: 'Authored cross-browser combatible single page applications and dynamic web flows for interactive streaming products.',
    achievements: [
      'Built playable arcade components directly embedded into streaming sites using canvas APIs',
      'Translated 60+ responsive pixel-perfect Figma screens into fluid React widgets',
      'Integrated state management frameworks reducing memory footprint'
    ]
  },
  {
    year: '2021 - 2022',
    role: 'Junior Web Developer',
    company: 'Crestwood Agencies',
    description: 'Designed client-facing marketing landing sites, e-commerce templates, and customized dynamic components.',
    achievements: [
      'Coded responsive semantic CSS grid structures with clean cross-device behaviors',
      'Created micro-interactive hover frames that boosted conversion actions by 15%',
      'Integrated third-party APIs using secure serverless requests'
    ]
  }
];

export const CORE_METRICS = [
  { value: '3+', label: 'Years Experience' },
  { value: '40+', label: 'Sites Delivered' },
  { value: '1,200+', label: 'Git Contributions' },
  { value: '15+', label: 'Design Badges' }
];
