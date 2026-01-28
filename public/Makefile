# --- Agent UI Starter Pack Makefile ---

# Project Variables
PROJECT_ID ?= $(shell gcloud config get-value project)
REGION ?= us-central1
SERVICE_NAME = agent-ui-engine
IMAGE_TAG = $(REGION)-docker.pkg.dev/$(PROJECT_ID)/agent-repo/$(SERVICE_NAME):latest

.PHONY: help dev build deploy-cloud-run deploy-firebase deploy-engine deploy-prod

help:
	@echo "Agent UI Starter Pack - Deployment Commands"
	@echo "Available commands:"
	@echo "  make dev               - Start local development server"
	@echo "  make test              - Run CLI unit tests"
	@echo "  make build             - Build production assets"
	@echo "  make deploy-prod       - Deploy full stack (Cloud Run + Firebase)"
	@echo "  make deploy-engine     - Deploy to Vertex AI Agent Engine"
	@echo "  make deploy-cloud-run  - Deploy API/Backend to Cloud Run"
	@echo "  make deploy-firebase   - Deploy Frontend to Firebase Hosting"

dev:
	npm run dev

test:
	PYTHONPATH=src pytest tests/test_cli.py

build:
	npm run build

# 🚀 Production: Full Stack Deployment
deploy-prod: build
	@echo "📦 Deploying Backend to Cloud Run..."
	gcloud run deploy $(SERVICE_NAME) --source . --region $(REGION) --allow-unauthenticated --port 80
	@echo "🔥 Deploying Frontend to Firebase..."
	firebase deploy --only hosting

# 🚀 Cloud Run: Backend Deployment
deploy-cloud-run:
	gcloud run deploy $(SERVICE_NAME) --source . --region $(REGION) --allow-unauthenticated --port 80

# 🚀 Agent Engine: Vertex AI Managed Runtime
deploy-engine:
	@echo "📦 Deploying to Vertex AI Agent Engine..."
	chmod +x setup_agent_engine.sh
	./setup_agent_engine.sh --project $(PROJECT_ID) --location $(REGION)

# 🔥 Firebase: Frontend Deployment
deploy-firebase: build
	firebase deploy --only hosting
