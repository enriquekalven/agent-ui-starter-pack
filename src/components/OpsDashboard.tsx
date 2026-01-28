import React, { useEffect, useState } from 'react';
import { Terminal, Database, Shield, RefreshCcw, Trash2 } from 'lucide-react';

interface LogEntry {
  timestamp: number;
  direction: string;
  data: any;
}

const OpsDashboard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOpsData = async () => {
    try {
      const [logsRes, healthRes] = await Promise.all([
        fetch('http://localhost:8000/agent/logs'),
        fetch('http://localhost:8000/health')
      ]);
      if (logsRes.ok) setLogs(await logsRes.json());
      if (healthRes.ok) setHealth(await healthRes.json());
    } catch (err) {
      console.warn('Backend not reachable for ops data');
    } finally {
      setLoading(false);
    }
  };

  const resetLogs = async () => {
    await fetch('http://localhost:8000/agent/debug/reset', { method: 'POST' });
    setLogs([]);
  };

  useEffect(() => {
    fetchOpsData();
    const interval = setInterval(fetchOpsData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="a2-surface" style={{ maxWidth: '1200px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="a2-h1">Agent Ops Console</h1>
          <p className="a2-body">Real-time observability into the Orchestrator's thoughts and tool-use.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="a2-button secondary" onClick={fetchOpsData}><RefreshCcw size={16} /> Refresh</button>
          <button className="a2-button secondary" style={{ color: '#ef4444' }} onClick={resetLogs}><Trash2 size={16} /> Reset Logs</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        {/* Status Side */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="a2-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Shield size={20} color="#10b981" />
              <h3 style={{ margin: 0 }}>System Health</h3>
            </div>
            <div className="a2-body" style={{ fontSize: '0.9rem' }}>
              <p>Status: <span style={{ color: '#10b981', fontWeight: 'bold' }}>{health?.status || 'Offline'}</span></p>
              <p>Project: <code>{health?.project || 'none'}</code></p>
            </div>
          </div>

          <div className="a2-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Database size={20} color="#3b82f6" />
              <h3 style={{ margin: 0 }}>Agent Config</h3>
            </div>
            <div className="a2-body" style={{ fontSize: '0.9rem' }}>
              <p>Model: <code>gemini-1.5-flash</code></p>
              <p>Location: <code>us-central1</code></p>
            </div>
          </div>
        </aside>

        {/* Logs Table */}
        <main className="a2-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={20} />
            <h3 style={{ margin: 0 }}>Interaction Trace (NDJSON)</h3>
          </div>
          <div style={{ height: '600px', overflowY: 'auto', background: '#0d0d0d', color: '#e4e4e7', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            {logs.length === 0 ? (
              <p style={{ opacity: 0.5 }}>No interactions logged yet. Talk to the agent in the playground.</p>
            ) : (
              logs.slice().reverse().map((log, i) => (
                <div key={i} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1a1a1a' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: log.direction === 'CLIENT_TO_SERVER' ? '#3b82f6' : '#10b981', fontWeight: 'bold' }}>
                      {log.direction}
                    </span>
                    <span style={{ opacity: 0.5 }}>{new Date(log.timestamp * 1000).toLocaleTimeString()}</span>
                  </div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OpsDashboard;
