# --- A2UI Starter Makefile ---

# Project Variables
PROJECT_ID ?= $(shell gcloud config get-value project)
REGION ?= us-central1
SERVICE_NAME = agent-ui-starter
IMAGE_TAG = gcr.io/$(PROJECT_ID)/$(SERVICE_NAME):latest

.PHONY: help dev build deploy-cloud-run deploy-firebase deploy-gke

help:
	@echo "Available commands:"
	@echo "  make dev               - Start local development server"
	@echo "  make build             - Build production assets"
	@echo "  make deploy-cloud-run  - Deploy to Google Cloud Run (One-liner)"
	@echo "  make deploy-firebase   - Deploy to Firebase Hosting (One-liner)"
	@echo "  make deploy-gke        - Deploy to GKE (Build, Push, and Apply)"

dev:
	npm run dev

build:
	npm run build

# 🚀 Cloud Run: The fastest way to production
deploy-cloud-run:
	gcloud run deploy $(SERVICE_NAME) --source . --region $(REGION) --allow-unauthenticated

# 🔥 Firebase: Optimized for frontend hosting
deploy-firebase: build
	firebase deploy --only hosting

# ☸️ GKE: Enterprise container orchestration
deploy-gke:
	docker build -t $(IMAGE_TAG) .
	docker push $(IMAGE_TAG)
	@echo "Updating deployment.yaml..."
	sed -i '' 's|image: .*|image: $(IMAGE_TAG)|' deployment.yaml || true
	kubectl apply -f deployment.yaml || echo "No deployment.yaml found. Please create one based on DEPLOYMENT.md"
