import React, { useState } from 'react';
import { 
  Terminal, Code, Shield, Settings, 
  ChevronRight, Layout, Activity, 
  Zap, Command, FileText
} from 'lucide-react';

const JOURNEYS = [
  {
    id: 'developer',
    name: 'The Builder',
    persona: 'Developer / Engineer',
    icon: <Code size={20} />,
    color: '#3b82f6',
    description: 'Rapidly scaffold and debug production agents across any stack with professional-grade SDKs.',
    docs: [
      { name: 'Getting Started', path: '/docs/getting-started' },
      { name: 'UX & A2UI Guide', path: '/docs/ux-guide' },
      { name: 'Local Mocking / CLI', path: '/docs/commands-master' }
    ],
    command: 'agentops-cockpit create trinity',
    output: `🚀 Creating new agent: my-agent
📦 Initializing with Trinity Stack (FastAPI + React + ADK)
✅ Framework detected: Python 3.12, Node 20
✨ Agent logic scaffolded in /src/backend/agent.py
Ready to roll. Run 'make dev' to start.`
  },
  {
    id: 'architect',
    name: 'The Strategist',
    persona: 'Solution Architect',
    icon: <Layout size={20} />,
    color: '#10b981',
    description: 'Design resilient, multi-cloud agentic systems aligned with Well-Architected patterns.',
    docs: [
      { name: 'Google Architecture', path: '/docs/google-architecture' },
      { name: 'Deployment Strategy', path: '/docs/deployment' },
      { name: 'Maturity Review', path: '/docs/arch-review' }
    ],
    command: 'agentops-cockpit audit arch',
    output: `🏗️ Starting Architecture Review v2.0...
🔍 Scanning /src for Maturity drift
✅ GCP Patterns: Vertex AI Context Caching enabled (+90% savings)
📜 Generating ADR: Wisdom Store alignment at 98%`
  },
  {
    id: 'security',
    name: 'The Guardian',
    persona: 'Security Specialist',
    icon: <Shield size={20} />,
    color: '#ef4444',
    description: 'Hardening against advanced adversarial attacks with deep-scan security audits.',
    docs: [
      { name: 'Security Playbook', path: '/docs/redteam-guide' },
      { name: 'Red Team Audits', path: '/docs/redteam-guide' }
    ],
    command: 'agentops-cockpit audit security',
    output: `🛡️ RED TEAM: SECURITY AUDIT v2.0
🕵️ Testing Payload Splitting: [Attempt 1/10] -> BLOCKED
🕵️ Checking Tone of Voice: [Adversarial probe: Neutral] -> PASS
✅ Vulnerability Regression: Fixed 2 historical jailbreaks.
Status: SECURE`
  },
  {
    id: 'finops',
    name: 'The Economist',
    persona: 'FinOps Specialist',
    icon: <Zap size={20} />,
    color: '#f59e0b',
    description: 'Optimization pivots for cost-efficient intelligence at scale.',
    docs: [
      { name: 'FinOps ROI Guide', path: '/docs/finops-guide' },
      { name: 'Token Management', path: '/docs/finops-guide' }
    ],
    command: 'agentops-cockpit audit roi',
    output: `💰 FINOPS ROI WATERFALL: TCO MODELING
1. Gemini 1.5 Flash Pivot: -$3,200/mo savings
2. Context Caching (90%): -$1,850/mo savings
🚀 Total Monthly Opportunity: $5,470 (88% reduction)
ROI Multiplier: 8.2x gain confirmed.`
  }
];

export function OperationalJourneys() {
  const [activeTab, setActiveTab] = useState(JOURNEYS[0].id);
  const activeJourney = JOURNEYS.find(j => j.id === activeTab) || JOURNEYS[0];

  return (
    <div className="operational-journeys max-w-7xl mx-auto px-6 py-20">
      <div className="section-header text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">Operational <span className="gradient-text">Journeys</span></h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          One platform, specialized orbits. Experience the Agent UI through the lens of your professional role.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {JOURNEYS.map((journey) => (
            <button
              key={journey.id}
              onClick={() => setActiveTab(journey.id)}
              className={`flex items-center gap-4 p-5 rounded-3xl text-left transition-all group ${
                activeTab === journey.id 
                  ? 'bg-slate-900 border border-slate-700 shadow-xl scale-[1.02]' 
                  : 'hover:bg-slate-900/50 border border-transparent'
              }`}
            >
              <div 
                className={`p-3 rounded-2xl transition-all ${
                  activeTab === journey.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'
                }`}
              >
                {journey.icon}
              </div>
              <div>
                <div className={`font-bold ${activeTab === journey.id ? 'text-white' : 'text-slate-400'}`}>
                  {journey.name}
                </div>
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mt-0.5">
                  {journey.persona}
                </div>
              </div>
              <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${activeTab === journey.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl min-h-[500px] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div className="max-w-md">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active Persona</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-4 leading-tight">{activeJourney.description}</h3>
              </div>
              <div className="flex flex-col gap-4 min-w-[200px]">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Deep Diversion</div>
                {activeJourney.docs.map((doc, i) => (
                  <a href={doc.path} key={i} className="flex items-center justify-between text-sm font-bold text-slate-300 hover:text-blue-400 group/link">
                    {doc.name}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-6">
              <div className="relative rounded-2xl bg-black/60 border border-slate-800 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-bottom border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">A2UI-CLI_v2.0</div>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-white">~</span>
                    <span className="text-blue-400 font-bold">{activeJourney.command}</span>
                  </div>
                  <pre className="text-slate-400 whitespace-pre-wrap leading-relaxed">
                    {activeJourney.output}
                  </pre>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-12 py-6 border-t border-slate-800/50">
                 <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reports</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <Command className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tools</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                      <Zap className="w-6 h-6 text-amber-400" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ROI</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
