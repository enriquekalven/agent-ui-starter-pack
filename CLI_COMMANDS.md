# CLI Reference

The Agent UI Starter Pack includes both scaffolding commands and **Agent Ops** operational commands.

## Scaffolding (uvx)

Use `uvx` to create new projects without local installation:

### `create`
Scaffold a new project with a specific UI flavor.
```bash
uvx agentui-starter-pack create my-agent --ui a2ui
```

---

## Agent Ops (Makefile)

Once a project is created, use the included `Makefile` for production operations.

### `make audit`
Runs the **Interactive Agent Optimizer**. This tool scans your `agent.py` and proposes optimizations.
- **Interactive Flow**: Proposes changes (Context Caching, Compression, Routing).
- **Approval System**: Allows you to `approve` or `reject` each suggestion.

### `make dev`
Starts the local development stack (Vite + FastAPI).
```bash
make dev
```

### `make deploy-prod`
The "Golden Path" to production. 
1. Runs a fresh audit.
2. Builds the frontend assets.
3. Deploys the backend to **Google Cloud Run**.
4. Deploys the frontend to **Firebase Hosting**.

### `make deploy-cloud-run`
Deploy the agent backend specifically to Google Cloud Run.

### `make deploy-firebase`
Deploy the frontend assets to Firebase Hosting.
