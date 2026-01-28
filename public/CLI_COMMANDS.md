# Agent UI Starter Pack: CLI Reference

The **Agent UI Starter Pack** provides specialized tools for building high-fidelity Agent-Driven interfaces and optimized backend engines.

## 1. Scaffolding

Use `uvx` to create new projects without local installation.

### 🎭 `agent-ui-starter-pack` (The Face) - *Primary Tool*
Scaffold a high-fidelity frontend component. 
**App-ification Logic**: Projects created with this command are automatically configured to use the **A2UI Playground** as the home route (`/`), making it a standalone dashboard out of the box.

```bash
uvx agent-ui-starter-pack create my-ui-project --template a2ui
```

### ⚙️ `agent-starter-pack` (The Engine)
Scaffold the backend agent engine for managed runtimes.
```bash
uvx agent-starter-pack create my-agent-project
```

---

## 2. One-Click Stack Deployment

The `agent-ui-starter-pack` CLI is designed to ship the entire experience (The Face + The Engine) in a single flow.

### `deploy`
Deploys the UI to **Firebase Hosting** and the Agent Engine to **Google Cloud Run** (on behalf of the user).

```bash
uvx agent-ui-starter-pack deploy --project [YOUR_PROJECT_ID]
```

**What it does:**
1.  **Engine Deployment**: Containerizes and ships `src/backend/agent.py` to Cloud Run.
2.  **Face Build**: Compiles the React/A2UI frontend.
3.  **Face Deployment**: Ships the static assets to Firebase Hosting.

---

## 🛠️ 3. Integrated Operations (Makefile)
The `Makefile` provides a unified interface for developers working within this repository.

### Local Development
```bash
# Start the Vite + FastAPI development environment
make dev
```

### Full Stack Deployment
```bash
# Build assets and deploy the entire Face + Engine ecosystem
make deploy-prod
```
