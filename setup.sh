#!/bin/bash

# --- Agent UI Starter Pack Setup Script ---

echo "🚀 Starting setup for Agent UI Starter Pack..."

# 1. Install Node dependencies
echo "📦 Installing Node dependencies..."
npm install

# 2. Setup Python Virtual Environment
echo "🐍 Setting up Python virtual environment..."
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
    echo "✅ Created .venv"
else
    echo "ℹ️ .venv already exists"
fi

# 3. Install Python dependencies
echo "📥 Installing Python dependencies..."
.venv/bin/python -m pip install --upgrade pip --index-url https://pypi.org/simple/
if [ -f "pyproject.toml" ]; then
    .venv/bin/python -m pip install -e . --index-url https://pypi.org/simple/
fi
if [ -f "requirements.txt" ]; then
    .venv/bin/python -m pip install -r requirements.txt
fi

# 4. Environment Configuration
echo "⚙️ Configuring environment..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env from .env.example"
    else
        touch .env
        echo "GENAI_MODEL=gemini-2.0-flash" >> .env
        echo "✅ Created .env with default model"
    fi
else
    echo "ℹ️ .env already exists"
fi

echo "✨ Setup complete! Run 'make dev-full' to start the engines."
