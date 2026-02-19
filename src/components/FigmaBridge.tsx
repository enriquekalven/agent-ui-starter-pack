import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Figma, Sparkles, Wand2, ArrowRight, CheckCircle, BrainCircuit, Layout } from 'lucide-react';

export const FigmaBridge: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'hydrating' | 'success'>('idle');

  const handleHydrate = () => {
    if (!url) return;
    setStatus('analyzing');
    // Simulation of the Vision Bridge pipeline
    setTimeout(() => setStatus('hydrating'), 2000);
    setTimeout(() => setStatus('success'), 4500);
  };

  return (
    <div className="figma-bridge-container max-w-4xl mx-auto px-6 py-20">
      <div className="relative p-8 md:p-12 rounded-[3.5rem] bg-slate-900/40 backdrop-blur-3xl border border-blue-500/20 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10" />
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Vision Bridge v1.0</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">Hydrate <span className="gradient-text">Figma to Code</span></h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Paste your Figma link and let the Vision Bridge transform static patterns into dynamic, agent-driven A2UI components in seconds.
            </p>

            <div className="flex flex-col gap-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Figma className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.figma.com/file/..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-mono text-sm"
                />
              </div>
              <button 
                onClick={handleHydrate}
                disabled={status !== 'idle'}
                className="group relative flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'idle' ? (
                  <>
                    Initialize Hydration
                    <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </>
                ) : (
                  <span className="animate-pulse">Processing Vision Stream...</span>
                )}
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 h-80 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl">
                    <Layout className="w-12 h-12 text-slate-700" />
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Waiting for Blueprint</div>
                </motion.div>
              )}

              {status === 'analyzing' && (
                <motion.div 
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                    <BrainCircuit className="w-20 h-20 text-blue-400 relative z-10 animate-spin-slow" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Analyzing Patterns</div>
                    <div className="text-[10px] text-slate-500 italic">Mapping SLDS Agentic Elements...</div>
                  </div>
                </motion.div>
              )}

              {status === 'hydrating' && (
                <motion.div 
                  key="hydrating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full space-y-4"
                >
                   <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[10px] space-y-2">
                      <div className="text-emerald-400 flex items-center gap-2">
                        <CheckCircle size={10} /> Pattern Detected: ReasoningTrace
                      </div>
                      <div className="text-emerald-400 flex items-center gap-2">
                        <CheckCircle size={10} /> Pattern Detected: Agentic Card
                      </div>
                      <div className="text-blue-400 animate-pulse">
                        ➜ Injecting A2UI Schema...
                      </div>
                   </div>
                   <div className="flex justify-center">
                      <div className="flex gap-2">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: `${i*0.2}s` }} />
                         ))}
                      </div>
                   </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-white mb-2 tracking-tight">Hydration Complete!</div>
                    <p className="text-xs text-slate-400 mb-6 font-bold uppercase tracking-widest">A2UI Registry Updated</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="flex items-center gap-2 mx-auto text-[10px] font-black text-blue-400 hover:text-white transition-colors"
                    >
                      VIEW IN PLAYGROUND <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <style>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
