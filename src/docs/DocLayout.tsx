import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  Menu, X, ChevronRight, BookOpen, Terminal,
  Rocket, Cpu, Layout, Activity, ShieldCheck,
  Search, Github, Zap, Shield, Box
} from 'lucide-react';

import { ThemeToggle } from '../components/ThemeToggle';

const PILLAR_NAV = [
  {
    title: 'The Vision',
    items: [
      { id: 'getting-started', label: 'Overview & Architecture', path: '/docs/getting-started', icon: <Rocket size={18} /> },
      { id: 'a2a', label: 'The A2UI Protocol', path: '/docs/a2a', icon: <BookOpen size={18} /> },
    ]
  },
  {
    title: 'The Implementation',
    items: [
      { id: 'be-integration', label: 'The Brain (Backend)', path: '/docs/be-integration', icon: <Terminal size={18} /> },
      { id: 'development', label: 'The Face (Frontend)', path: '/docs/development', icon: <Layout size={18} /> },
      { id: 'cli-commands', label: 'CLI Reference', path: '/docs/cli-commands', icon: <Cpu size={18} /> },
    ]
  }
];

export const DocLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="doc-layout bg-slate-950 min-h-screen">
      {/* Sidebar */}
      <aside className={`doc-sidebar ${isSidebarOpen ? 'open' : 'closed'} bg-slate-900/50 backdrop-blur-xl border-r border-white/5`}>
        <div className="doc-sidebar-header p-6 border-b border-white/5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Box size={18} className="text-white" />
            </div>
            <span className="font-black text-white tracking-tight">Agent UI</span>
          </Link>
          <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="doc-nav p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="space-y-2">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Discovery</div>
            <Link to="/playground" className="flex items-center gap-3 p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold hover:bg-blue-600/20 transition-all group">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Interactive Cockpit</span>
              <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
            </Link>
            <Link to="/ops" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
              <Activity size={18} />
              <span className="font-bold">Ops Flight Deck</span>
            </Link>
          </div>

          {PILLAR_NAV.map((group) => (
            <div className="space-y-4" key={group.title}>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{group.title}</div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-white/10 text-white shadow-xl ring-1 ring-white/10' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Maturity Scorecard (Premium Cockpit Feature) */}
          <div className="pt-8 mt-8 border-t border-white/5">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Maturity Scorecard</div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl">
              <div className="flex justify-between items-end">
                <div className="text-3xl font-black text-white tracking-tighter">92<span className="text-xs text-slate-600">%</span></div>
                <div className="text-[8px] font-black bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest leading-none">Healthy</div>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[92%] rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-500">Security Gate</span>
                  <ShieldCheck size={10} className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-500">A2UI Protocol</span>
                  <ShieldCheck size={10} className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-500">Cost Optimized</span>
                  <Activity size={10} className="text-blue-500" />
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold">
                  <span className="text-slate-500">GCP Native</span>
                  <ShieldCheck size={10} className="text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="doc-main md:ml-72 transition-all">
        <header className="doc-header sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="opacity-30" />
            <Link to="/docs" className="hover:text-white transition-colors">Docs</Link>
            <ChevronRight size={14} className="opacity-30" />
            <span className="text-blue-400 capitalize">{location.pathname.split('/').pop()?.replace(/-/g, ' ')}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/enriquekalven/agent-ui-starter-pack" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <ThemeToggle />
          </div>
        </header>

        <div className="doc-content-wrapper p-8 md:p-12 max-w-4xl mx-auto">
          <Outlet />
        </div>

        <footer className="max-w-4xl mx-auto p-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-slate-500 font-bold uppercase tracking-widest">
          <div>© 2026 Agent UI • Native on Google Cloud</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Community</a>
            <a href="#" className="hover:text-white">Security</a>
            <a href="#" className="hover:text-white">ROI Model</a>
          </div>
        </footer>
      </main>
    </div>
  );
};
