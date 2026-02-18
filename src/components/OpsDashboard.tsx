import React, { useEffect, useState, useMemo } from 'react';
import {
  Terminal, Database, Shield, RefreshCcw,
  Trash2, Cpu, Activity, Zap,
  Search, Filter, ExternalLink, Box
} from 'lucide-react';
import { Grid, Metric, Visual, Card } from '../a2ui/components';

interface LogEntry {
  timestamp: number;
  direction: string;
  data: any;
}

const OpsDashboard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredLogs = useMemo(() => {
    return logs.filter(l =>
      JSON.stringify(l.data).toLowerCase().includes(searchTerm.toLowerCase())
    ).slice().reverse();
  }, [logs, searchTerm]);

  // Premium Intelligence Mock Data for Visuals
  const radarData = {
    metrics: [
      { subject: 'Reliability', value: 92 },
      { subject: 'Safety', value: 100 },
      { subject: 'A2UI', value: 85 },
      { subject: 'Latency', value: 95 },
      { subject: 'Grounding', value: 70 },
    ]
  };

  const trendData = {
    points: [
      { name: '10:00', value: 12 },
      { name: '10:10', value: 34 },
      { name: '10:20', value: 25 },
      { name: '10:30', value: 56 },
      { name: '10:40', value: 42 },
      { name: '10:50', value: 68 },
    ]
  };

  return (
    <div className="bg-slate-950 min-h-screen p-8 text-slate-200">
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <Box className="text-blue-400" size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Observability Flight Deck</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Agent Ops Console</h1>
            <p className="text-sm text-slate-500 font-bold">Real-time tracing, audit logs, and strategic ROI metrics.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
            onClick={fetchOpsData}
          >
            <RefreshCcw size={14} className={loading ? 'animate-spin' : ''} />
            Sync
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest hover:bg-red-500/20 transition-all"
            onClick={resetLogs}
          >
            <Trash2 size={14} />
            Purge Logs
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card glass icon="performance">
            <Metric label="System Status" value={health?.status?.toUpperCase() || 'OFFLINE'} trend="99.9% Uptime" trendUp={true} />
          </Card>
          <Card glass icon="security">
            <Metric label="Compliance" value="SECURE" trend="P0 Leaks" trendUp={true} />
          </Card>
          <Card glass icon="cost">
            <Metric label="Savings Pivot" value="$12.4k" trend="Model Flash" trendUp={true} />
          </Card>
          <Card glass icon="risk">
            <Metric label="Active Intents" value="14" trend="v2.0 Logic" trendUp={true} />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Insights */}
          <div className="flex flex-col gap-6">
            <Card title="Intelligence Radar">
              <Visual type="radar" data={radarData} />
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold uppercase">Grounding</span>
                  <span className="text-amber-400 font-mono font-bold">Weak Link</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold uppercase">Safety Gate</span>
                  <span className="text-emerald-400 font-mono font-bold">Hardened</span>
                </div>
              </div>
            </Card>

            <Card title="Network Throughput">
              <Visual type="trend" data={trendData} />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-4">
                Traffic spikes detected during A2A transmission audit.
              </p>
            </Card>

            <div className="p-6 rounded-3xl bg-blue-600 shadow-[0_20px_40px_rgba(37,99,235,0.2)]">
              <div className="flex items-center gap-3 mb-4">
                <Zap size={20} className="text-white" />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Actionable ROI</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">Implement Context Caching to save 90%.</h3>
              <p className="text-sm text-blue-100/70 mb-6">Strategic pivot to Gemini 1.5 Flash recommended for summary tasks.</p>
              <button className="w-full bg-white text-blue-600 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
                Run Optimizer Audit
              </button>
            </div>
          </div>

          {/* Interaction Trace */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex-1 flex flex-col">
              <div className="p-6 bg-slate-900/80 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center">
                    <Terminal size={18} className="text-slate-400" />
                  </div>
                  <h3 className="font-bold text-white">Interaction Trace (NDJSON)</h3>
                </div>

                <div className="relative w-full md:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    placeholder="Filter logs..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-full py-2 pl-9 pr-4 text-xs font-bold outline-none focus:border-blue-500/50 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs max-h-[800px]">
                {filteredLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 opacity-30">
                    <Activity size={48} className="mb-4" />
                    <p className="font-bold">Waiting for agentic activity...</p>
                  </div>
                ) : (
                    filteredLogs.map((log, i) => (
                      <div key={i} className="group p-5 rounded-2xl bg-black/40 border border-slate-800 hover:border-slate-700 transition-all">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`px-2 py-0.5 rounded text-[10px] font-black tracking-widest ${log.direction === 'CLIENT_TO_SERVER' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                              {log.direction}
                          </div>
                          <span className="text-slate-600 text-[10px] font-bold">{new Date(log.timestamp * 1000).toLocaleTimeString()}</span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink size={14} className="text-slate-600 cursor-pointer hover:text-white" />
                        </div>
                      </div>
                      <pre className="text-slate-400 whitespace-pre-wrap leading-relaxed overflow-x-auto p-4 bg-black/60 rounded-xl border border-white/5">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 bg-slate-900 border-t border-white/5 px-8 flex justify-between items-center">
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  Showing {filteredLogs.length} of {logs.length} records
                </div>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OpsDashboard;
