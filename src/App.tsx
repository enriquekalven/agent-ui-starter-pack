import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { A2UISurfaceRenderer } from './a2ui/A2UIRenderer';
import { DocLayout } from './docs/DocLayout';
import { DocPage } from './docs/DocPage';
import { ThemeToggle } from './components/ThemeToggle';
import { Home } from './components/Home';
import OpsDashboard from './components/OpsDashboard';
import './index.css';

const SparkleIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sparkle-avatar">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M3 5h4" /><path d="M19 17v4" /><path d="M17 19h4" />
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const SAMPLE_A2UI_SURFACE = {
  surfaceId: 'welcome-surface',
  content: [
    {
      type: 'Text',
      props: { text: 'Optimized Agent Stack', variant: 'h1' },
    },
    {
      type: 'Card',
      props: { title: 'System Status' },
      children: [
        {
          type: 'Text',
          props: { text: 'Your agent is active and ready to generate interfaces. This dashboard is rendered using the A2UI protocol standard.', variant: 'body' },
        },
        {
          type: 'Button',
          props: { label: 'Explore Features', variant: 'primary' },
        },
      ],
    },
    {
      type: 'Card',
      props: { title: 'Recent Activity' },
      children: [
        {
          type: 'Text',
          props: { text: 'No recent agent activity detected.', variant: 'body' },
        },
      ],
    },
  ],
};

const RANDOM_TEMPLATES = [
  {
    name: 'Shopping Cart',
    json: {
      surfaceId: 'shopping-cart',
      content: [
        { type: 'Text', props: { text: '🛒 Your Shopping Cart', variant: 'h1' } },
        {
          type: 'Card',
          props: { title: 'Agent-Enhanced Checkout' },
          children: [
            { type: 'Image', props: { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400', alt: 'Smart Watch', caption: '✨ Premium Smart Watch - $299.00' } },
            { type: 'List', props: { title: 'Order Summary', items: ['⌚ Smart Watch: $299.00', '🚚 Shipping: $0.00', '💸 Tax: $24.50'] } },
            { type: 'Button', props: { label: 'Confirm Order ($323.50) 💳', variant: 'primary' } }
          ]
        }
      ]
    }
  },
  {
    name: 'Weather Forecast',
    json: {
      surfaceId: 'weather-forecast',
      content: [
        { type: 'Text', props: { text: '🌉 San Francisco Weather', variant: 'h1' } },
        {
          type: 'Card',
          props: { title: 'Weekly Outlook' },
          children: [
            { type: 'Text', props: { text: 'Currently: 62°F | Partly Cloudy ⛅', variant: 'h2' } },
            { type: 'StatBar', props: { label: 'Humidity', value: 78, color: '#3b82f6' } },
            { type: 'StatBar', props: { label: 'UV Index', value: 45, color: '#f59e0b' } },
            { type: 'List', props: { items: ['Monday: ☀️ 72°F', 'Tuesday: 🌤️ 68°F', 'Wednesday: ☁️ 64°F', 'Thursday: 🌧️ 58°F', 'Friday: ⛅ 62°F'] } }
          ]
        }
      ]
    }
  },
  {
    name: 'Server Dashboard',
    json: {
      surfaceId: 'server-dashboard',
      content: [
        { type: 'Text', props: { text: '🖥️ Infrastructure Overview', variant: 'h1' } },
        {
          type: 'Card',
          props: { title: 'Global Traffic' },
          children: [
            { type: 'Image', props: { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600', alt: 'World Map', caption: 'Live Global Data Mesh' } },
            { type: 'StatBar', props: { label: 'Traffic Load', value: 65, color: '#10b981' } },
            { type: 'StatBar', props: { label: 'Error Rate', value: 2, color: '#ef4444' } }
          ]
        }
      ]
    }
  }
];

function A2UICockpit() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = async (text = chatInput) => {
    const inputToUse = typeof text === 'string' ? text : chatInput;
    if (!inputToUse.trim()) return;

    const newMsg = { role: 'user', text: inputToUse };
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
    setIsThinking(true);

    try {
      const res = await fetch('http://localhost:8000/agent/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputToUse, history: messages.slice(-5) })
      });

      const result = await res.json();
      const agentMsg = {
        role: 'agent',
        text: result.text,
        surface: result.surface,
        source: result.source
      };
      setMessages(prev => [...prev, agentMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'agent',
        text: "Error: Could not connect to the Agent Engine. Please ensure the backend is running on port 8000."
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="cockpit-layout">
      <aside className="cockpit-sidebar">
        <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.25rem' }}>
          <SparkleIcon />
          <span>Agent Cockpit</span>
        </div>

        <div style={{ flex: 1, marginTop: '2rem' }}>
          <p className="a2-body" style={{ fontSize: '0.8rem', opacity: 0.6 }}>SYSTEM LOGS</p>
          <Link to="/ops" className="nav-item">
            <Activity size={16} /> Observability Console
          </Link>
          <Link to="/docs" className="nav-item">
            ← Back to Documentation
          </Link>
        </div>

        <div className="sidebar-footer" style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <ThemeToggle />
        </div>
      </aside>

      <main className="cockpit-main">
        {isThinking && (
          <div className="status-badge">
            <span className="agent-pulse"></span>
            <span>Orchestrating...</span>
          </div>
        )}

        <div className="cockpit-chat-area">
          <div className="chat-container-inner">
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', marginTop: '10vh', opacity: 0.6 }}>
                <SparkleIcon size={32} />
                <h2 style={{ marginTop: '1.5rem', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>How can I assist?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Ask me about strategy, metrics, or workflows.</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble-container ${m.role}`}>
                {m.role === 'agent' && <SparkleIcon />}
                <div className="msg-content" style={{ flex: 1 }}>
                  <div className="msg-bubble">{m.text}</div>
                  {m.surface && (
                    <div className="a2-surface-inline" style={{ marginTop: '2rem' }}>
                      <A2UISurfaceRenderer surface={m.surface} />
                      {m.source && (
                        <div className="surface-attribution">
                          <span>Source: <strong>{m.source.provider}</strong></span>
                          <span>•</span>
                          <a href={m.source.url} target="_blank" rel="noreferrer" style={{ color: '#4285f4', textDecoration: 'none' }}>
                            {m.source.title} ↗
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cockpit-input-container">
          <div className="cockpit-input-box">
            <input
              type="text" 
              placeholder="Message your agent..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="send-btn" onClick={() => handleSendMessage()}>
              <SendIcon />
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
            Agent UI Starter Pack • Production-Grade Orchestration
          </p>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/docs" element={<DocLayout />}>
        <Route index element={<Navigate to="/docs/getting-started" replace />} />
        <Route path=":docId" element={<DocPage />} />
      </Route>

      <Route path="/playground" element={<A2UICockpit />} />
      <Route path="/ops" element={<OpsDashboard />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
