# Agent UI Starter Pack (A2UI)

### High-Fidelity Agent-Driven User Interfaces for Google Cloud.

The **Agent UI Starter Pack** is a professional distribution for developers building high-fidelity AI applications on Gemini. We provide the architectural "Golden Path" for bridging the gap between conversational intelligence and actionable software.

---

## 💡 The Core Mission

### ❌ The Problem: The "Wall of Text"
Conversational AI today is highly intelligent but **low-utility**. Users are often stuck behind a "Wall of Text"—trying to parse complex stats, project roadmaps, or financial data out of a chat bubble. This leads to **Text Fatigue** and limits the agent's ability to act as a real tool.

### ✅ The Solution: From Chatbot to Cockpit
We move users away from talking to a "box" and into an **Agent Cockpit**. Instead of just sending text, your agent "manifests" high-fidelity, interactive UI components on the fly using the **A2UI Protocol**. 

**Software isn't static anymore; it's synthesized by the Agent based on the user's intent.**

---

## 🎁 What do you get?
By using this starter pack, you aren't just getting template code—you are getting a **Production Framework**:
*   **Instant 0-to-1**: Skip 3 weeks of setting up Vertex AI Auth, NL-to-JSON parsing, and dynamic React rendering.
*   **The Artifact Registry**: A library of 20+ premium React components (`StatBars`, `QuizCards`, `Timeline`) that are native to JSON.
*   **The Bridge Orchestrator**: A specialized backend that triages "Conversational Intent" and resolves which UI surfaces to manifest.
*   **Observability-by-Default**: A built-in "Ops Console" to inspect the raw NDJSON thought-process of the agent in real-time.

---

## 🏗️ Core Pillars

### 🎭 The Face (Front End) - *Primary Focus*
**Role: The Experience.** Adaptive surfaces that change based on what the agent is doing.
*   **CLI**: `agent-ui-starter-pack`
*   **Powered by**: React, Vite, A2UI Protocol.
*   **Feature**: Dynamic A2UI Renderer and a library of high-fidelity components.

### ⚙️ The Engine (Agent)
**Role: The Brain.** Internal reasoning and tool execution.
*   **CLI**: `agent-starter-pack`
*   **Powered by**: Python, Vertex AI SDK, ADK.
*   **Feature**: Native integration with Agent Engine for managed runtimes.

---

## 🚀 Key Features

### 💎 A2UI Protocol Native
The entire stack is built on the **Agent-Driven User Interface (A2UI)** protocol. Your agent doesn't just send text; it sends structured JSON that manifests as premium UI components (Timelines, Trophies, Quizzes) in real-time.

### 🔄 State Synchronization
Seamlessly sync agent reasoning steps with frontend state. Build "Human-in-the-loop" workflows where the user can inspect and refine agent actions before they finalize.

![Agentic Stack Architecture](/diagrams/agentic-stack.png)

---

## 🛠️ Usage (Prescribed Examples)

### Scaffolding
Create a new project in seconds using our specialized CLIs:

**To create the High-Fidelity Front End:**
```bash
uvx agent-ui-starter-pack create my-ui-project
```

**To create the Agent Engine (Backend):**
```bash
uvx agent-starter-pack create my-backend-agent
```

### Local Development
Start the integrated Vite + API bridge:
```bash
make dev
```

### Production Deployment
Deploy the full stack to Google Cloud:
```bash
make deploy-prod
```

---

## 📁 Repository Structure

- `/src/a2ui`: Core A2UI rendering logic and base components.
- `/src/backend`: The agent engine logic and API bridge.
- `/src/components`: Premium UI building blocks.
- `/docs`: Detailed integration guides and protocol specifications.

---

## License

MIT
