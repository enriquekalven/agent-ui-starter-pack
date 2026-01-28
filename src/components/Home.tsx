import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-section">
          <span className="agent-pulse"></span>
          <span className="logo-text">Agent UI Starter Pack</span>
        </div>
        <nav className="home-nav">
          <Link to="/docs" className="nav-item">Documentation</Link>
          <Link to="/playground" className="nav-item">Playground</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a href="https://github.com/enriquekalven/agent-ui-starter-pack" target="_blank" rel="noopener noreferrer" className="nav-item">GitHub</a>
            <iframe src="https://ghbtns.com/github-btn.html?user=enriquekalven&repo=agent-ui-starter-pack&type=star&count=true&size=small" frameBorder="0" scrolling="0" width="80" height="20" title="GitHub Stars"></iframe>
          </div>
          <a href="https://pypi.org/project/agent-starter-pack/" target="_blank" rel="noopener noreferrer" className="nav-item">PyPI</a>
          <ThemeToggle />
          <Link to="/docs/getting-started" className="nav-cta">Get Started</Link>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            A2UI Standard Native
          </div>
          <h1 className="hero-title">
            The <span className="highlight-text">High-Fidelity</span> Agent UI.
          </h1>
          <p className="hero-subtitle">
            The professional distribution for building Agent-Driven interfaces on Google Cloud. Focus on reasoning, we handle the rendering.
          </p>
          <div className="cta-group">
            <Link to="/docs/getting-started" className="cta-button primary">
              Start Building
            </Link>
            <Link to="/playground" className="cta-button secondary">
              Try the Playground
            </Link>
          </div>
          <div className="hero-meta">
            <p>Powering the next generation of <strong>Agentic Apps</strong>.</p>
            <div className="hero-logos">
              <span className="logo-pill">Open Source</span>
              <a href="https://a2ui.org" target="_blank" rel="noopener noreferrer" className="logo-pill link">A2UI.org</a>
              <a href="https://copilotkit.ai" target="_blank" rel="noopener noreferrer" className="logo-pill link">CopilotKit.ai</a>
            </div>
          </div>
        </div>

        <div className="hero-visual-container">
          <div className="hero-visual-glow"></div>
          <div className="hero-card main-card">
            <div className="card-browser-bar">
              <div className="browser-dot"></div>
              <div className="browser-dot"></div>
              <div className="browser-dot"></div>
            </div>
            <div className="card-code-content">
              <pre>
                <code>{`{
  "surfaceId": "agent-response",
  "content": [
    {
      "type": "Card",
      "props": { "title": "AI Insight" },
      "children": [
        { "type": "Text", "props": { "text": "Analyzing data..." } }
      ]
    }
  ]
}`}</code>
              </pre>
            </div>
          </div>

          {/* Restored High-Fidelity Performance Card */}
          <div className="hero-card sub-card performance-card" style={{ position: 'absolute', bottom: '-20px', left: '-40px', width: '240px', zIndex: 60, padding: '1.5rem', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid white', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.5 }}>LATENCY</span>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800 }}>LIVE</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.05em' }}>14<span style={{ fontSize: '1rem', opacity: 0.5 }}>ms</span></div>
            <div style={{ height: '4px', background: '#eee', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: '#10b981' }}></div>
            </div>
          </div>

          <div className="hero-card sub-card node-card" style={{ position: 'absolute', top: '40px', right: '-30px', width: '200px', zIndex: 60, padding: '1.25rem', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', border: '1px solid #333', borderRadius: '18px', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <div className="agent-pulse mini"></div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>INTELLIGENCE NODE</span>
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8, lineHeight: 1.4 }}>
              Synthesizing A2UI surface for intent: <strong>analytics</strong>...
            </div>
          </div>
        </div>
      </main>

      <section className="speed-banner" style={{ padding: '4rem 2rem', background: 'var(--accent-color)', color: 'var(--bg-color)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Skip the 3-Week Infrastructure Grind.</h2>
        <p style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.9 }}>
          We automate the Auth, the JSON parsing, and the Dynamic Rendering. You focus on the Reasoning.
        </p>
      </section>

      <section className="stack-duality-section" style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header">
          <h2 className="section-title">One Stack. <span className="gradient-text">Two Dimensions.</span></h2>
          <p className="section-subtitle">The Agent UI Starter Pack is the frontend "Face" that pairs perfectly with the Agent Starter Pack "Brain".</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '4rem' }}>
          <div className="feature-card" style={{ borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="feature-icon-wrapper blue" style={{ margin: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3 style={{ margin: 0 }}>The Brain (Engine)</h3>
            </div>
            <p className="a2-body">Powered by <strong>Agent Starter Pack</strong>. Handles reasoning, tool-use, and Vertex AI orchestration.</p>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', border: '1px solid #eee', marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              uvx agent-starter-pack create
            </div>
          </div>

          <div className="feature-card" style={{ borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="feature-icon-wrapper teal" style={{ margin: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
              </div>
              <h3 style={{ margin: 0 }}>The Face (A2UI)</h3>
            </div>
            <p className="a2-body">Powered by <strong>Agent UI Starter Pack</strong>. Handles high-fidelity rendering and adaptive surfaces.</p>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', border: '1px solid #eee', marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              uvx agent-ui-starter-pack create
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Built for <span className="gradient-text">Agent Innovation</span></h2>
          <p className="section-subtitle">A high-fidelity foundation for adaptive agent deployments on Google Cloud.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
            </div>
            <h3>Structured UI</h3>
            <p>Define interfaces as JSON. Let our renderer handle the component lifecycle natively.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3>ADK Integrated</h3>
            <p>Native integration with the Google Cloud Agent Development Kit for Python logic.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper teal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <h3>Cloud Native</h3>
            <p>Deploy to Cloud Run and Firebase Hosting with a single command.</p>
          </div>
        </div>
      </section>

      <section className="comparison-section" style={{ padding: '8rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="section-header">
          <h2 className="section-title">Choose Your <span className="gradient-text">Architectural Path</span></h2>
          <p className="section-subtitle">Selecting the right tool for your Agentic journey.</p>
        </div>

        <div className="comparison-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          <div className="comp-card standout">
            <div className="comp-tag">Recommended</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Agent UI Starter Pack</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '2rem' }}>The high-fidelity GCP distribution for end-to-end apps.</p>
            <ul className="comp-list">
              <li><strong>Use when:</strong> You need to build a professional "Agent Cockpit" on Google Cloud in minutes.</li>
              <li><strong>Value:</strong> Skips the infrastructure grind. Connects Vertex AI to premium A2UI components out-of-the-box.</li>
            </ul>
          </div>

          <div className="comp-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>A2UI Protocol</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '2rem' }}>The open standard for Agent-Driven Interfaces.</p>
            <ul className="comp-list">
              <li><strong>Use when:</strong> You are building a custom renderer from scratch or defining cross-platform agent schemas.</li>
              <li><strong>Value:</strong> Total control over the communication specification between any AI and any UI.</li>
            </ul>
          </div>

          <div className="comp-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AG UI</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '2rem' }}>The experimental framework for Lit-based agents.</p>
            <ul className="comp-list">
              <li><strong>Use when:</strong> You prefer Web Components (Lit) over React or need ultra-lightweight dynamic embedding.</li>
              <li><strong>Value:</strong> Framework-agnostic rendering with a focus on performance and raw speed.</li>
            </ul>
          </div>

          <div className="comp-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>CopilotKit.ai</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '2rem' }}>The ecosystem for built-in AI copilots.</p>
            <ul className="comp-list">
              <li><strong>Use when:</strong> You want to add "Co-pilot" sidebars and "Chat-with-my-data" to existing SaaS applications.</li>
              <li><strong>Value:</strong> Massive library of pre-built search, document, and dashboard integrations.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="deploy-section" style={{ padding: '8rem 4rem', background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="section-header" style={{ maxWidth: '1000px', margin: '0 auto 5rem auto' }}>
          <div className="hero-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <span className="badge-dot" style={{ background: '#10b981' }}></span>
            Production Persistent
          </div>
          <h2 className="section-title" style={{ color: 'white' }}>One Command. <span style={{ color: '#10b981' }}>Infinite Scale.</span></h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>
            We've automated the heavy lifting. Deploy your high-fidelity Agent UI to Firebase and your Intelligent Engine to Cloud Run in a single operation.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <code style={{ background: '#1a1a1a', padding: '1.5rem 3rem', borderRadius: '12px', border: '1px solid #333', color: '#10b981', fontSize: '1.2rem', fontFamily: 'var(--font-mono)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              make deploy-prod
            </code>
          </div>
        </div>

        <div className="architecture-container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ color: 'white', marginBottom: '3rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.5 }}>Full-Stack Orchestration</h3>
          <div className="diag-wrapper" style={{ background: 'rgba(255,255,255,0.02)', padding: '4rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 100px rgba(66, 133, 244, 0.05)' }}>
            <img
              src="/diagrams/agentic-stack.png"
              alt="Agentic Stack Architecture"
              style={{ width: '100%', height: 'auto', borderRadius: '12px', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }}
            />
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="agent-pulse"></span>
            <span>Agent UI Starter Pack</span>
          </div>
          <p>© 2026 Agent UI. MIT Licensed.</p>
        </div>
      </footer>

      <style>{`
        .home-container { min-height: 100vh; }
        .home-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2.5rem; background: var(--surface-color); backdrop-filter: blur(20px); position: sticky; top: 0; z-index: 100; border-bottom: 1px solid var(--border-color); }
        .logo-section { display: flex; align-items: center; gap: 0.75rem; font-weight: 800; font-size: 1.1rem; }
        .home-nav { display: flex; align-items: center; gap: 1.5rem; }
        .home-nav .nav-item { text-decoration: none; color: var(--text-secondary); font-weight: 600; font-size: 0.9rem; transition: color 0.2s; }
        .nav-cta { padding: 0.5rem 1.25rem; background: var(--accent-color); color: var(--bg-color); border-radius: var(--radius-pill); text-decoration: none; font-size: 0.85rem; font-weight: 700; transition: transform 0.2s; }
        .hero-section { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; padding: 8rem 4rem; max-width: 1400px; margin: 0 auto; align-items: center; }
        .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1rem; background: rgba(0, 0, 0, 0.05); border-radius: var(--radius-pill); font-size: 0.8rem; font-weight: 700; margin-bottom: 2rem; color: var(--text-secondary); }
        .badge-dot { width: 6px; height: 6px; background: #3b82f6; border-radius: 50%; }
        .hero-title { font-size: 4.5rem; font-weight: 800; line-height: 1.05; letter-spacing: -0.05em; margin-bottom: 1.5rem; }
        .highlight-text { background: linear-gradient(to right, #3b82f6, #8b5cf6, #10b981); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.25rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 3rem; max-width: 550px; }
        .cta-group { display: flex; gap: 1rem; margin-bottom: 4rem; }
        .cta-button { padding: 1rem 2rem; border-radius: var(--radius-pill); font-weight: 700; text-decoration: none; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); font-size: 1rem; }
        .cta-button.primary { background: var(--accent-color); color: var(--bg-color); box-shadow: 0 10px 30px var(--accent-glow); }
        .cta-button.secondary { background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border-color); }
        .features-section { padding: 8rem 4rem; background: rgba(0,0,0,0.02); border-top: 1px solid var(--border-color); }
        .section-header { text-align: center; margin-bottom: 5rem; }
        .section-title { font-size: 3.5rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 1rem; }
        .gradient-text { background: linear-gradient(to right, #3b82f6, #10b981); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; max-width: 1400px; margin: 0 auto; }
        .feature-card { background: var(--surface-color); padding: 2.5rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); transition: transform 0.3s; }
        .feature-card:hover { transform: translateY(-5px); }
        .logo-pill.link { text-decoration: none; color: inherit; border: 1px solid var(--border-color); cursor: pointer; transition: all 0.2s; }
        .logo-pill.link:hover { border-color: var(--accent-color); color: var(--accent-color); transform: translateY(-2px); }
        
        .hero-visual-container { position: relative; }
        .hero-visual-glow { position: absolute; top: 10%; right: 10%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(66, 133, 244, 0.2) 0%, transparent 70%); filter: blur(50px); z-index: 1; pointer-events: none; }
        
        .hero-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .hero-card:hover { transform: translateY(-10px) scale(1.02); }
        
        .comp-card { background: var(--surface-color); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); display: flex; flex-direction: column; position: relative; }
        .comp-card.standout { border: 2px solid var(--accent-color); box-shadow: 0 20px 40px rgba(66, 133, 244, 0.1); }
        .comp-tag { position: absolute; top: -12px; left: 20px; background: var(--accent-color); color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .comp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
        .comp-list li { font-size: 0.85rem; line-height: 1.5; color: var(--text-secondary); }
        .comp-list li strong { color: var(--text-primary); display: block; margin-bottom: 0.25rem; }
        
        .home-footer { padding: 4rem; border-top: 1px solid var(--border-color); }
      `}</style>
    </div>
  );
}
