# Changelog

All notable changes to this project will be documented in this file.

## [0.3.1] - 2026-02-18

### ✨ Added
- **Vision Bridge**: New interactive Figma-to-A2UI hydration tool on the Home page.
- **SLDS Agentic Patterns**: 
  - `ReasoningTrace`: Component for displaying multi-step agent reasoning.
  - `Sources`: Component for citing external research and links.
  - `Skeleton`: Stencil components for "Generating..." states.
- **Agentic Card Enhancements**: Added `hasFeedback` (Thumbs Up/Down) and `badge` props to the `Card` component.
- **Designer Persona**: Added "The Creator" to Operational Journeys.
- **UX to Code Guide**: Detailed documentation for the Figma hydration pipeline.

### 🔧 Changed
- Updated `A2UIRenderer` registry to support new Agentic patterns.
- Refactored `IntelligenceOrchestrator` backend to produce SLDS-inspired surfaces for `analytics` and `vision` intents.

---

## [0.3.0] - 2026-02-17

### ✨ Added
- **Cockpit v2.0.2 Support**: Integrated premium A2UI components (Grid, Metric, Visual charts).
- **Fleet Map**: New component for visualizing agent estates on a global map.
- **Surface Discovery**: Auto-injection of `data-surface-id` for audit compliance.
- **Operational Journeys**: Role-based landing page experience.

### 🧪 Fixed
- Resolved "Missing surfaceId mapping" audit findings.
- Fixed JSX parsing errors in Home page.
- Optimized typography and design system for "Sovereign" aesthetic.

---

## [0.1.0] - [0.2.x]
- Initial releases and A2UI Core protocol implementation.
