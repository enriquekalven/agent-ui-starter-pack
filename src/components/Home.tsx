import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { OperationalJourneys } from './OperationalJourneys';
import {
  Github, ArrowRight, Zap, Shield,
  Code, Layout, Rocket, Box,
  Cpu, Activity, CheckCircle, Globe, Terminal, Figma
} from 'lucide-react';
import { FigmaBridge } from './FigmaBridge';

export function Home() {
  return (
    <div className="home-container bg-slate-950 min-h-screen text-slate-200 selection:bg-blue-500/30">
      {/* Release Banner */}
      <div className="bg-blue-600/10 border-b border-blue-500/20 py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">v2.0.2</span>
            <span className="text-xs font-bold text-blue-400">AgentOps Cockpit: Sovereign Evolution is now GA.</span>
          </div>
          <Link to="/docs/changelog" className="text-xs font-black text-blue-400 hover:text-blue-300 flex items-center gap-1 uppercase tracking-widest">
            Changelog <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <header className="home-header sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm" />
              <div className="relative w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                <Box size={18} className="text-blue-400" />
              </div>
            </div>
            <span className="font-black text-lg tracking-tight text-white">Agent UI Starter Pack</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/docs" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Documentation</Link>
            <Link to="/playground" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Playground</Link>
            <button
              onClick={() => document.querySelector('.figma-bridge-container')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Vision Bridge
            </button>
            <div className="h-4 w-px bg-white/10" />
            <a href="https://github.com/enriquekalven/agent-ui-starter-pack" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <ThemeToggle />
            <Link to="/docs/getting-started" className="bg-white text-slate-950 px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              Initialize
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 mb-8 fade-in-shimmer">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">A2UI-Standard: Production Native</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-8">
                The <span className="gradient-text">High-Fidelity</span> <br />Agent UI.
              </h1>

              <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
                The professional distribution for building Agent-Driven interfaces on Google Cloud. Focus on reasoning, we handle the rendering.
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <Link to="/docs/getting-started" className="bg-blue-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.2)] transition-all">
                  Start Building
                </Link>
                <Link to="/playground" className="bg-slate-900 text-white border border-slate-700 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all">
                  Try Playground
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-black text-white tracking-tight">1.2M+</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">A2UI Events/Mo</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-black text-white tracking-tight">85ms</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Median Latency</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-black text-white tracking-tight">100%</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">GCP Native</div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Main Visual: Premium A2UI Code Reveal */}
              <div className="relative z-10 rounded-[2.5rem] bg-slate-900 p-2 shadow-2xl border border-white/5 overflow-hidden">
                <div className="bg-slate-950 rounded-[2.25rem] overflow-hidden border border-white/5">
                  <div className="flex items-center gap-1.5 px-6 py-4 border-b border-white/5 bg-slate-900/50">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                    <div className="ml-4 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">agent.py {'->'} ui_surface</div>
                  </div>
                  <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
                    <pre className="text-slate-400">
                      {`{
  "surfaceId": "market-pulse",
  "content": [
    {
      "type": "Metric",
      "props": { 
        "label": "Asset Value", 
        "value": "$2,481.20",
        "trend": "12.4%", "trendUp": true
      }
    },
    {
      "type": "Visual",
      "props": { "type": "trend", "data": market_data }
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-10 -left-10 z-20 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl w-56 animate-float">
                <div className="flex justify-between items-center mb-4">
                  <Activity size={16} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Latency</span>
                </div>
                <div className="text-3xl font-black text-white tracking-tighter mb-2">14<span className="text-sm font-bold text-slate-500">ms</span></div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[92%] rounded-full" />
                </div>
              </div>

              <div className="absolute -top-10 -right-10 z-20 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl w-48 animate-float-delayed">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                    <Shield size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Audit Status</div>
                    <div className="text-xs font-bold text-white">SECURE</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full h-1 bg-blue-500/40 rounded-full" />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Figma Bridge Section */}
        <section className="relative z-20">
          <FigmaBridge />
        </section>

        {/* Ecosystem Logos */}
        <section className="py-20 border-y border-white/5 bg-slate-900/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Universal A2UI Ecosystem Support</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-10 items-center opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500">
              <div className="flex items-center gap-3">
                <img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" className="w-6 h-6" alt="Vertex AI" />
                <span className="font-bold">Vertex AI</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://www.vectorlogo.zone/logos/lit/lit-icon.svg" className="w-6 h-6" alt="Lit" />
                <span className="font-bold">Lit</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" className="w-6 h-6" alt="Flutter" />
                <span className="font-bold">Flutter</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-slate-900 font-black text-[10px]">A2</div>
                <span className="font-bold">A2A Protocol</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#3b82f6] rounded flex items-center justify-center text-white font-black text-[10px]">LG</div>
                <span className="font-bold">LangGraph</span>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Journeys Section */}
        <section className="py-32">
          <OperationalJourneys />
        </section>

        {/* Scalability Banner */}
        <section className="py-40 bg-blue-600 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] animate-pulse" />
          <div className="relative z-10 px-6">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-8 max-w-4xl mx-auto">
              Skip the Infrastructure Grind.<br />Focus on the Reasoning.
            </h2>
            <div className="flex justify-center gap-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded-3xl">
                <div className="text-sm font-black text-white/60 uppercase tracking-widest mb-1">Time to Deploy</div>
                <div className="text-4xl font-black text-white tracking-tight">60s</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded-3xl">
                <div className="text-sm font-black text-white/60 uppercase tracking-widest mb-1">Operational Cost</div>
                <div className="text-4xl font-black text-white tracking-tight">-90%</div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-black text-white tracking-tight mb-20">One Stack. <span className="gradient-text">Two Dimensions.</span></h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 text-left hover:border-blue-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Cpu className="text-blue-400" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">The Brain (Engine)</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Powered by <strong>Agent Starter Pack</strong>. Optimized for reasoning, tool-use, and Vertex AI orchestration.
                </p>
                <div className="bg-black/40 rounded-xl p-4 font-mono text-blue-400 border border-slate-800">
                  uvx agent-starter-pack create
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 text-left hover:border-emerald-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Layout className="text-emerald-400" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">The Face (A2UI)</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Powered by <strong>Agent UI Starter Pack</strong>. Handles high-fidelity rendering and adaptive surfaces.
                </p>
                <div className="bg-black/40 rounded-xl p-4 font-mono text-emerald-400 border border-slate-800">
                  uvx agent-ui-starter-pack create
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Cloud Comparison Section */}
        <section className="py-32 bg-slate-900/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tighter mb-4">Architectural <span className="gradient-text">Parity</span></h2>
                <p className="text-slate-400">Deploy exactly what you need, where you need it.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "Starter Pack", tag: "Recommended", color: "blue", desc: "Best for building end-to-end apps in minutes." },
                { name: "A2UI Protocol", tag: "Standard", color: "slate", desc: "Custom renderers for specialized workflows." },
                { name: "AG UI", tag: "Experimental", color: "purple", desc: "Ultra-lightweight Lit-based components." },
                { name: "CopilotKit", tag: "Ecosystem", color: "emerald", desc: "Built-in co-pilots for existing SaaS." }
              ].map((item, i) => (
                <div key={i} className={`p-8 rounded-[2rem] bg-slate-900 border ${item.name === 'Starter Pack' ? 'border-blue-500/30 ring-1 ring-blue-500/30' : 'border-slate-800'} relative`}>
                  {item.tag && <div className={`absolute top-4 right-4 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20`}>{item.tag}</div>}
                  <h4 className="text-lg font-bold text-white mb-3">{item.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">{item.desc}</p>
                  <div className="text-xs font-black text-white hover:text-blue-400 transition-colors uppercase tracking-widest flex items-center gap-1 cursor-pointer">
                    Learn More <ArrowRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto text-center p-16 rounded-[4rem] bg-gradient-to-b from-blue-600/20 to-transparent border border-blue-500/20">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Rocket className="text-white" size={32} />
            </div>
            <h2 className="text-4xl font-black text-white mb-6">Initialize Your Ecosystem.</h2>
            <p className="text-slate-400 text-lg mb-10">
              Join 2,000+ engineers building high-fidelity agentic interfaces on Google Cloud.
            </p>
            <div className="flex flex-col items-center gap-6">
              <Link to="/docs/getting-started" className="bg-white text-slate-950 px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all">
                Get Started Free
              </Link>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold font-mono">
                <Terminal size={14} />
                make deploy-prod
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Box size={18} className="text-blue-400" />
            </div>
            <span className="font-bold text-white">Agent UI Starter Pack</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Agent UI. Native on Google Cloud. MIT Licensed.</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Globe size={20} /></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
