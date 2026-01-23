# Agent UI Starter Pack

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/enriquekalven/agent-ui-starter-pack)

A high-performance, zero-dependency A2UI (Agentic-Adaptive User Interface) renderer built with React, TypeScript, and Vite.

![Agent UI Hero](/hero.png)

## Overview

The Agent UI Starter Pack provides a foundational implementation of the **A2UI protocol**, allowing AI agents to dynamically generate and update user interfaces using a declarative JSON schema. It is designed to be lightweight, premium, and easy to extend.

---

## Usage

You can use the CLI directly without installation using `uvx`.

```bash
# General Command Structure
uvx agentui-starter-pack create <project-name> [OPTIONS]
```

## Quick Start

Select the implementation standard that matches your tech stack:

### A2UI Standard (React + Vite)
The default template, optimized for performance and zero-dependency rendering.
```bash
uvx agentui-starter-pack create my-ui
```

### AG UI (High-Fidelity React)
Uses the **AG UI** standard (CopilotKit) for high-end React implementations with streaming pipes.
```bash
uvx agentui-starter-pack create my-ui --ui agui
```

### GenUI SDK (Flutter)
Scaffolds the project with the **GenUI SDK bridge**, ideal for cross-platform mobile and web apps.
```bash
uvx agentui-starter-pack create my-ui --ui flutter
```

### Web Components (Lit)
Standardized Web Components that can be embedded into any framework (Angular, Vue, etc).
```bash
uvx agentui-starter-pack create my-ui --ui lit
```

---

## Prerequisites

- **Node.js**: v18 or higher
- **Python**: v3.10 or higher (for the CLI)
- **Git**: Installed and configured

---

## Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `project_name` | Argument | — | The name of the new project directory |
| `--ui` | Option | `a2ui` | UI Template flavor (`a2ui`, `agui`, `flutter`, `lit`) |
| `--copilotkit` | Flag | `false` | Enable extra CopilotKit features for AG UI |

---

## ✨ Features

- **Zero-Dependency Renderer**: Recursive rendering engine that handles complex A2UI JSON trees without external SDKs.
- **Visual Analytics**: Built-in support for **StatBars**, **Images**, and **Dynamic Lists** for rich dashboard generation.
- **Interactive Playground**: A built-in sandbox with **Agent Mode** to simulate real-world AI-driven UI updates.
- **Premium Design System**: Dark-mode aesthetic with glassmorphism, smooth transitions, and professional typography (Inter).
- **Protocol Ready**: Native support for **A2UI** (Agent-to-User) and **A2A** (Agent-to-Agent) standards.

---

## 🏗️ The Agentic Ecosystem

Agent UI Starter Pack is more than just a renderer—it is the bridge between the logic-heavy world of Agent Frameworks and the visual world of Modern Frontend.

### The Agentic Stack
![Agentic Stack](/diagrams/agentic-stack.png)

A2UI sits as the critical middleware layer:
1.  **Agent Brain**: Frameworks like LangGraph, CrewAI, or Google ADK reason and plan.
2.  **A2UI Gateway**: The agent outputs a structured JSON Blueprint instead of raw text.
3.  **A2UI Renderer**: This starter pack interprets the blueprint and manifests a high-fidelity React interface in real-time.

### Value Proposition: From Text to Interface
![Value Proposition](/diagrams/value-proposition.png)

*   **Move Beyond Chat**: Don't trap your users in a chat bubble. Provide full application surfaces that adapt to the agent's current task.
*   **Standardized Schema**: Use the Google-originated A2UI standard to ensure your UI is portable across Web, Mobile (Flutter), and Desktop.
*   **Production Ready**: Built-in support for Multi-Agent orchestration, human-in-the-loop approvals, and complex data visualization.

---

## 🏗️ Architecture & Standards

- **A2UI**: The core protocol for adaptive, JSON-driven interfaces. [Official Repo](https://github.com/google/A2UI)
- **GenUI (Generative UI)**: Full support for generative patterns across Web and Flutter.
- **AG UI (Agentic UI)**: Integration-ready for [CopilotKit](https://github.com/CopilotKit/CopilotKit) and high-end React surfaces.
- **Lit Web Components**: Standards-based components for any framework.

---

## 🚀 Deployment

One-liner deployment commands are provided via the included `Makefile`.

| Platform | Command |
| :--- | :--- |
| **Cloud Run** | `make deploy-cloud-run` |
| **Firebase** | `make deploy-firebase` |
| **GKE** | `make deploy-gke` |

For advanced configuration, see the [Deployment Guide](./DEPLOYMENT.md).

---

## 📡 Protocol Standards

### A2A Protocol
The **Agent-to-Agent (A2A)** protocol enables agents to communicate over a network. See the [A2A_GUIDE.md](./A2A_GUIDE.md) for multi-agent orchestration.

### A2UI Schema
The renderer expects an `A2UISurface` object:

```json
{
  "surfaceId": "unique-id",
  "content": [
    {
      "type": "Text",
      "props": { "text": "Hello World", "variant": "h1" }
    },
    {
      "type": "Card",
      "props": { "title": "System Meta" },
      "children": []
    }
  ]
}
```

---

## License

MIT
