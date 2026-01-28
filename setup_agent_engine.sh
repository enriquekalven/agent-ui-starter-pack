#!/bin/bash
# Optimized Agent Stack: Agent Engine Deployment Wrapper
# This script wraps the 'agent-starter-pack deploy' command for CI/CD and manual usage.

set -e

# Load project ID if not set
if [ -z "$GOOGLE_CLOUD_PROJECT" ]; then
    export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)
fi

echo "🚀 Invoking Agent Stack Cockpit Deployment..."

# Call the agent-starter-pack CLI via uvx
# This ensures we always use the latest deployment logic without local installation.
uvx agent-starter-pack deploy "$@"

echo "✅ Wrapper execution complete."
