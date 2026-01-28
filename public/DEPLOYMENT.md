# Deployment: Shipping the Agent UI Starter Pack

The **Agent UI Starter Pack** is designed for high-fidelity deployment on **Google Cloud**.

## ⚡️ 1-Click Deployment

The built-in `Makefile` handles the production deployment flow.

| Target | Command | Platform |
| :--- | :--- | :--- |
| **Full Stack** | `make deploy-prod` | Cloud Run (API) + Firebase (UI) |
| **The Engine** | `make deploy-engine` | Vertex AI Agent Engine |
| **The API** | `make deploy-cloud-run` | Google Cloud Run (Backend) |
| **The UI** | `make deploy-firebase` | Firebase Hosting (Frontend) |

---

## 1. Google Cloud Run (The API Bridge)

The backend bridge/API is served via Cloud Run, offering serverless scaling and native integration with vertex AI.

### Manual Deployment Steps
```bash
# Set your project
gcloud config set project YOUR_PROJECT_ID

# Deploy the backend
gcloud run deploy agent-ui-engine \
  --source . \
  --dockerfile Dockerfile.backend \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 2. Firebase Hosting (The UI)

Firebase is used for hosting the static A2UI renderer assets. This ensures your users get the fastest possible bundle delivery.

### Deployment Steps
```bash
# Set up hosting
firebase use YOUR_PROJECT_ID

# Build and Deploy
npm run build
firebase deploy --only hosting
```

---

## 🏗️ Scaffolding New Projects

You can use the CLI to scaffold new specialized projects:

```bash
# Standard A2UI Template
uvx agent-starter-pack create my-app
```

---

## 🛡️ Observability

*   **Google Cloud Trace**: Pre-configured to track requests from the frontend into the backend agent.
*   **Logging**: All agent generated A2UI payloads are logged for easier debugging and refinement.
