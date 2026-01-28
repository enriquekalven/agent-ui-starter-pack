# Development Guide: Extending the Stack

The **Agent UI Starter Pack** is built to be modular. You can extend the Engine (Backend) or the Face (Frontend).

## 📁 Project Structure

### ⚙️ The Engine (Backend)
- `src/backend/agent.py`: The main FastAPI server and agent logic for generating A2UI.

### 🎭 The Face (Frontend)
- `src/a2ui/`: The core JSON ↔ React rendering engine.
- `src/components/`: Shared UI components and layout logic.
- `src/docs/`: Documentation site logic.

---

## 🎨 Adding New A2UI Components

To add a new visual component that the agent can "render":

1.  **Create the Component**: Add a new React component in `src/a2ui/components/`.
2.  **Register the Type**: Add the component to the mapping in the renderer logic.
3.  **Update the Schema**: Add any new `props` or `types` to the `A2UIComponent` model in `src/backend/agent.py`.

---

## 🧪 Testing

Start the local development stack:
```bash
make dev
```
Navigate to `http://localhost:5173` to interact with your agent and test the A2UI rendering loop.
