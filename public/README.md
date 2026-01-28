# Agent UI Starter Pack (A2UI)

### High-Fidelity Agent-Driven User Interfaces for Google Cloud.

The **Agent UI Starter Pack** is a professional distribution for developers building high-fidelity AI applications on Gemini. We focus on the **Application Layer**: A2UI Protocol integration, State synchronization, and Premium UX.

![Agent UI Value Proposition](/diagrams/value-proposition.png)

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
