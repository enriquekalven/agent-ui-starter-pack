# Getting Started Guide

Welcome to the **Agent UI Starter Pack**! This guide will help you set up your environment and launch your first agentic interface.

## 🏁 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **NPM** or **Yarn**
- **Python 3.10+** (if you plan to use the backend)
- **Conda** or **venv** (recommended for backend)

## 🚀 Quick Launch

You can get a project running in seconds using our standard command:

```bash
uvx agent-ui-starter setup
```

Alternatively, clone the repository and run:

```bash
git clone https://github.com/enriquekalven/agent-ui-starter-pack.git
cd agent-ui-starter-pack
npm install
npm run dev
```

## 🛠️ Environment Setup

### 1. Frontend Development
The frontend is built with **Vite** and **React**. To start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend (Optional)
Navigate to the `src/backend` directory to set up the Python ADK agent:
```bash
cd src/backend
pip install -r requirements.txt
python agent.py
```

## 🧪 Testing the Playground
Once the frontend is running, navigate to the **Playground** tab. Here you can paste A2UI JSON snippets to see how the agent transforms data into user interfaces.

### Example A2UI Payload
```json
{
  "surfaceId": "welcome",
  "content": [
    { "type": "Text", "props": { "text": "Hello Agent!", "variant": "h1" } }
  ]
}
```

## 📚 Next Steps
- [Development Guide](/docs/development)
- [Deployment Guide](/docs/deployment)
- [CLI Reference](/docs/cli-commands)
