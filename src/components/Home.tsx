import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-section">
          <span className="agent-pulse"></span>
          <span className="logo-text">Agent UI Starter</span>
        </div>
        <nav className="home-nav">
          <Link to="/docs" className="nav-item">Documentation</Link>
          <Link to="/playground" className="nav-item">Playground</Link>
          <a href="https://github.com/google/A2UI" target="_blank" rel="noopener noreferrer" className="nav-item">Community</a>
          <ThemeToggle />
          <Link to="/playground" className="nav-cta">Deploy Now</Link>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            v1.0.0 Now Available
          </div>
          <h1 className="hero-title">
            The standard for <span className="highlight-text">Agentic Interfaces.</span>
          </h1>
          <p className="hero-subtitle">
            A high-performance toolkit for building and testing AI-driven user experiences. Seamlessly bridge agents and humans with A2UI.
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
              <span className="logo-pill">Type Safe</span>
              <span className="logo-pill">GenUI Ready</span>
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
      "props": { "title": "AI Action" },
      "children": [
        { "type": "Text", "props": { "text": "Deploying..." } }
      ]
    }
  ]
}`}</code>
              </pre>
            </div>
          </div>
          <div className="hero-card overlay-card">
            <div className="stat-label">Response Time</div>
            <div className="stat-value">14ms</div>
            <div className="stat-progress">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
      </main>

      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Built for the <span className="gradient-text">Agentic Era</span></h2>
          <p className="section-subtitle">A2UI provides the building blocks for interfaces that agents can understand and manipulate.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <h3>Protocol Standard</h3>
            <p>Standardized JSON-to-UI rendering for seamless agent-user communication.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3>GenUI Ready</h3>
            <p>Easily implement generative UI patterns that adapt to agent intent dynamically.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper teal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            </div>
            <h3>Developer First</h3>
            <p>Built-in tools for debugging agent outputs and inspecting the UI state machine.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="agent-pulse"></span>
            <span>Agent UI Starter</span>
          </div>
          <p>© 2026 Agentic Systems Inc. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        .home-container {
          min-height: 100vh;
        }

        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2.5rem;
          background: rgba(var(--bg-color), 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid var(--border-color);
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
        }

        .home-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .home-nav .nav-item {
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .home-nav .nav-item:hover {
          color: var(--text-primary);
        }

        .nav-cta {
          padding: 0.5rem 1.25rem;
          background: var(--accent-color);
          color: var(--bg-color);
          border-radius: var(--radius-pill);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 700;
          transition: transform 0.2s;
        }

        .nav-cta:hover {
          transform: scale(1.05);
        }

        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          padding: 8rem 4rem;
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: rgba(0, 0, 0, 0.05);
          border-radius: var(--radius-pill);
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--text-secondary);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #3b82f6;
          border-radius: 50%;
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.05em;
          margin-bottom: 1.5rem;
        }

        .highlight-text {
          background: linear-gradient(to right, #3b82f6, #8b5cf6, #10b981);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 3rem;
          max-width: 550px;
        }

        .cta-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 4rem;
        }

        .cta-button {
          padding: 1rem 2rem;
          border-radius: var(--radius-pill);
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
        }

        .cta-button.primary {
          background: var(--accent-color);
          color: var(--bg-color);
          box-shadow: 0 10px 30px var(--accent-glow);
        }

        .cta-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px var(--accent-glow);
        }

        .cta-button.secondary {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .cta-button.secondary:hover {
          background: var(--bg-color);
          transform: translateY(-2px);
        }

        .hero-meta {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .hero-logos {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .logo-pill {
          padding: 0.3rem 0.75rem;
          background: rgba(0,0,0,0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-pill);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 800;
          color: var(--text-secondary);
        }

        .hero-visual-container {
          position: relative;
        }

        .hero-visual-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          z-index: -1;
        }

        .hero-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .main-card {
          width: 100%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-browser-bar {
          padding: 0.75rem 1.25rem;
          background: rgba(0,0,0,0.03);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          gap: 6px;
        }

        .browser-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border-color);
        }

        .card-code-content {
          padding: 2rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #3b82f6;
          line-height: 1.5;
        }

        .overlay-card {
          position: absolute;
          bottom: -2rem;
          right: -1rem;
          width: 220px;
          padding: 1.5rem;
          background: var(--bg-secondary);
          z-index: 2;
          animation: float 6s infinite ease-in-out;
        }

        .stat-label { font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .stat-value { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem; }
        .stat-progress { height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px; overflow: hidden; }
        .progress-fill { width: 70%; height: 100%; background: #10b981; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px) translateX(-5px); }
        }

        .features-section {
          padding: 8rem 4rem;
          background: rgba(0,0,0,0.02);
          border-top: 1px solid var(--border-color);
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
        }

        .gradient-text {
          background: linear-gradient(to right, #3b82f6, #10b981);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .feature-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 3rem;
          border-radius: var(--radius-xl);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: var(--text-primary);
        }

        .feature-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .feature-icon-wrapper.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .feature-icon-wrapper.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        .feature-icon-wrapper.teal { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .home-footer {
          padding: 4rem;
          border-top: 1px solid var(--border-color);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .footer-content p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .hero-section { grid-template-columns: 1fr; text-align: center; }
          .hero-subtitle { margin: 0 auto 3rem; }
          .cta-group { justify-content: center; }
          .hero-visual-container { display: none; }
          .features-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 3.5rem; }
        }
      `}</style>
    </div>
  );
}
