#!/bin/bash

# Agent UI Starter Pack: Production Setup Script
# This script configures your Google Cloud environment for Agent Ops.

set -e

echo "🚀 Starting Production Agent Ops Setup..."

# 1. Enable Required APIs
echo "📡 Enabling Google Cloud APIs..."
gcloud services enable \
    run.googleapis.com \
    aiplatform.googleapis.com \
    firestore.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com

# 2. Check for Project ID
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo "❌ Error: No Google Cloud project detected. Run 'gcloud config set project <your-project>'"
    exit 1
fi

echo "✅ Using Project: $PROJECT_ID"

# 3. Create Artifact Registry if not exists
echo "📦 Checking Artifact Registry..."
gcloud artifacts repositories describe agent-repo --location=us-central1 --quiet || \
gcloud artifacts repositories create agent-repo \
    --repository-format=docker \
    --location=us-central1 \
    --description="Repository for Agent UI images"

# 4. Initial Audit
echo "🔍 Running Initial Agent Audit..."
python3 src/backend/optimizer.py src/backend/agent.py

# 5. Deploy to Cloud Run
echo "⚡ Deploying Agent to Cloud Run..."
gcloud run deploy agent-ops-backend \
    --source . \
    --region us-central1 \
    --allow-unauthenticated \
    --quiet

echo ""
echo "🎉 SETUP COMPLETE!"
echo "Your Agent Ops Platform is now live."
echo "Deploy your frontend with: npm run build && firebase deploy"
