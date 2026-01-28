# GEMINI.md - Agent Context & Instructions

This repository is optimized for **Gemini** and agentic development. AI agents should use this file as the primary source of truth for understanding the architecture, tools, and constraints of this project.

## 🚀 Project Overview
The **Agent UI Starter Pack** is a production-grade distribution for building AI agents on Google Cloud. It focuses on high-fidelity Agent-Driven User Interfaces (A2UI).

## 🛠️ Tech Stack
- **The Engine**: Python, FastAPI, Vertex AI SDK, ADK.
- **The Face**: React (Vite), TypeScript, A2UI Protocol.
- **Deployment**: Firebase Hosting (Frontend), Google Cloud Run (Backend).

## 📁 Repository Structure
- `/src/backend`: The **Engine**. Logic for reasoning, tools, and cost control.
- `/src/a2ui`: The **Face**. Core A2UI rendering logic and components.
- `/src/docs`: Documentation system.

## 🤖 AI Agent Instructions
When assisting the user:
1. **Focus on A2UI**: Prioritize the rendering and interaction logic of Agent-Driven interfaces.
2. **Professional Distribution**: We differentiate from standard templates by providing high-fidelity UI components and seamless agent integration.
3. **A2UI Schema**: When generating JSON for interfaces, follow the schema defined in `src/backend/agent.py`.

## ⌨️ CLI Commands
- `make dev`: Starts the local development stack.
- `make build`: Builds the production assets.
- `make deploy-prod`: Deploys the full stack to GCP.
- `uvx agent-ui-starter-pack create <name>`: Create a new UI project.
- `uvx agent-starter-pack create <name>`: Create a new Agent Engine project.

---
*For more detailed guides, see the `/docs` section on the live site.*
