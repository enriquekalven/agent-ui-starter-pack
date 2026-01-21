import React, { useState } from 'react';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import { A2UISurfaceRenderer } from './a2ui/A2UIRenderer';
import { DocLayout } from './docs/DocLayout';
import { DocPage } from './docs/DocPage';
import './index.css';

const SAMPLE_A2UI_SURFACE = {
  surfaceId: 'welcome-surface',
  content: [
    {
      type: 'Text',
      props: { text: 'Agent UI Starter Pack', variant: 'h1' },
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

function Playground() {
  const [jsonText, setJsonText] = useState(JSON.stringify(SAMPLE_A2UI_SURFACE, null, 2));
  const [surface, setSurface] = useState(SAMPLE_A2UI_SURFACE);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'editor' | 'agent'>('editor');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setJsonText(newText);
    try {
      const parsed = JSON.parse(newText);
      setSurface(parsed);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMsg = { role: 'user', text: chatInput };
    setMessages([...messages, newMsg]);
    setChatInput('');

    // Simulate agent response
    setTimeout(() => {
      const agentMsg = { role: 'agent', text: "I've updated your view based on your request." };
      setMessages(prev => [...prev, agentMsg]);
      
      // Mock A2UI Update
      if (chatInput.toLowerCase().includes('chart') || chatInput.toLowerCase().includes('stats')) {
        const update = {
          ...SAMPLE_A2UI_SURFACE,
          content: [
            ...SAMPLE_A2UI_SURFACE.content,
            { type: 'Card', props: { title: 'Agent Insights' }, children: [{ type: 'Text', props: { text: 'Showing specialized metrics for your request.', variant: 'body' }}]}
          ]
        };
        setSurface(update);
        setJsonText(JSON.stringify(update, null, 2));
      }
    }, 1000);
  };

  return (
    <div className="playground-container">
      <header className="app-header">
        <div className="agent-status">
          <span className="agent-pulse"></span>
          <span className="status-text">A2UI Sandbox</span>
        </div>
        <div className="mode-toggle">
          <button className={mode === 'editor' ? 'active' : ''} onClick={() => setMode('editor')}>Editor</button>
          <button className={mode === 'agent' ? 'active' : ''} onClick={() => setMode('agent')}>Agent Mode</button>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">← Back to Docs</Link>
          <a href="/docs/be-integration" className="nav-link special">Connect to Agent →</a>
        </nav>
      </header>
      
      <div className="playground-main">
        {mode === 'editor' ? (
          <div className="editor-pane">
            <div className="pane-header">
              <h3>JSON Blueprint</h3>
              {error && <span className="error-badge">Invalid JSON</span>}
            </div>
            <textarea
              className="json-textarea"
              value={jsonText}
              onChange={handleJsonChange}
              spellCheck={false}
            />
            <div className="editor-footer">
              <p className="hint">Edit this JSON to see the UI update in real-time.</p>
            </div>
          </div>
        ) : (
          <div className="agent-pane">
            <div className="pane-header">
              <h3>Agent Interaction</h3>
            </div>
            <div className="chat-history">
              {messages.length === 0 && <p className="empty-chat">Ask the agent to modify the UI (e.g., "Show me some stats")</p>}
              {messages.map((m, i) => (
                <div key={i} className={`chat-message ${m.role}`}>
                  <div className="msg-bubble">{m.text}</div>
                </div>
              ))}
            </div>
            <div className="chat-input-area">
              <input 
                type="text" 
                placeholder="Talk to the agent..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}

        {/* Live Preview */}
        <div className="preview-pane">
          <div className="pane-header">
            <h3>Live Preview</h3>
          </div>
          <div className="preview-canvas">
            {error ? (
              <div className="parse-error">
                <p>Error parsing A2UI JSON:</p>
                <code>{error}</code>
              </div>
            ) : (
              <A2UISurfaceRenderer surface={surface} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Docs as HomePage using Outlet pattern */}
      <Route path="/" element={<DocLayout><Outlet /></DocLayout>}>
        <Route index element={<DocPage />} />
        <Route path="docs/:docId" element={<DocPage />} />
      </Route>
      
      {/* Playground moved to /playground */}
      <Route path="/playground" element={<Playground />} />
      
      {/* Legacy /docs redirect to / */}
      <Route path="/docs" element={<Navigate to="/" replace />} />
      
      {/* Fallback */}
      <Route path="*" element={<Link to="/">Go Home</Link>} />
    </Routes>
  );
}

export default App;
