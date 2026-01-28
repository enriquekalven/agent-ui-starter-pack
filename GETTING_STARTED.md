# Getting Started with Agent UI Starter Pack

Welcome to the **Agent UI Starter Pack**. This guide will take you from zero to a production-grade Agent UI in four steps.

## Why A2UI? 

Standard chatbots are limited by the "Wall of Text"—they talk a lot but can't "do" much visually. This starter pack solves this by providing a framework where the agent synthesizes the **User Interface** itself. 

By getting started with this pack, you are bypassing the 3-week "infrastructure grind" (Auth, JSON Parsing, Component Mapping) and jumping straight to the **Experience Layer**.

---

## Step 1: Scaffolding your Project

Use our specialized CLIs to create your workspace. **The Face (Frontend)** is our primary component for high-fidelity A2UI rendering.

### Scaffolding the Front End (The Face)
```bash
uvx agent-ui-starter-pack create my-ui-app
```

### Scaffolding the Agent Engine (The Brain)
```bash
uvx agent-starter-pack create my-agent-engine
```

---

## Step 2: Architecture Overview

The Agent UI Starter Pack uses a decoupled architecture to ensure the fastest possible rendering and state synchronization.

![Agentic Stack Architecture](/diagrams/agentic-stack.png)

*Diagram: The flow between Agent reasoning, the A2UI Bridge, and the High-Fidelity Renderer.*

---

## Step 3: Development & Playground

1.  **Launch the Development Stack**:
    ```bash
    make dev
    ```
2.  **The Playground**:
    Navigate to `localhost:5173/playground`. Here you can hand-craft A2UI blueprints or test real agent logic by selecting "Agent Engine".

---

## Step 4: Deployment

When you are ready for production, use the unified deployment command:
```bash
# Deploys both the Face (Firebase) and the Engine (Cloud Run)
make deploy-prod
```

---

## 🔗 Resources
- [Detailed CLI Reference](./CLI_COMMANDS.md)
- [Backend Integration Guide](./BE_INTEGRATION_GUIDE.md)
- [A2UI Deployment Guide](./DEPLOYMENT.md)
