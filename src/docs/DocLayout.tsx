import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Menu, X, ChevronRight, BookOpen, Terminal, Rocket, Cpu, Layout } from 'lucide-react';

import { ThemeToggle } from '../components/ThemeToggle';

interface DocLayoutProps {
  children?: React.ReactNode;
}

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

export const DocLayout: React.FC<DocLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();

  return (
    <div className="doc-layout">
      {/* Sidebar */}
      <aside className={`doc-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="doc-sidebar-header">
          <Link to="/" className="doc-logo">
            <span className="agent-pulse mini"></span>
            Agent UI Starter Pack
          </Link>
          <button className="mobile-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="doc-nav">
          <div className="nav-group">
            <div className="nav-group-title">The Lab (Interactive)</div>
            <Link to="/playground" className="nav-item special-accent" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="agent-pulse mini"></span>
              <span>Interactive Cockpit</span>
            </Link>
            <Link to="/ops" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={18} />
              <span>Ops Console</span>
            </Link>
            <a href="https://pypi.org/project/agent-starter-pack/" target="_blank" rel="noopener noreferrer" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} />
              <span>PyPI Package</span>
            </a>
          </div>

          {PILLAR_NAV.map((group) => (
            <div className="nav-group" key={group.title}>
              <div className="nav-group-title">{group.title}</div>
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}

          <div className="nav-group">
            <div className="nav-group-title">Resources</div>
            <a href="https://a2ui.org" target="_blank" rel="noopener noreferrer" className="nav-item">
              <BookOpen size={18} />
              <span>Official A2UI.org</span>
            </a>
          </div>
        </nav>
      </aside>


      {/* Main Content */}
      <main className="doc-main">
        <header className="doc-header">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/docs/getting-started">Docs</Link>
            <ChevronRight size={14} />
            <span>{location.pathname.split('/').pop()}</span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ThemeToggle />
          </div>
        </header>
        <div className="doc-content-wrapper">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};
