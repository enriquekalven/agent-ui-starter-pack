from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import os
import time
import json
import logging

from .intelligence import IntelligenceOrchestrator
from .auth_manager import AuthManager

# Setup Logging (Observability Pattern)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Real-time Message Log for Developer Debugging
LOG_FILE = "agent-interaction-log.json"

app = FastAPI(title="Agent UI Cockpit Engine")

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = IntelligenceOrchestrator()
auth = AuthManager()

class ChatMessage(BaseModel):
    role: str
    text: str

class ChatRequest(BaseModel):
    query: str
    history: Optional[List[ChatMessage]] = []

def log_interaction(direction: str, data: Any):
    """Observability: Logs all agent traffic to a JSON file for local debugging."""
    try:
        log_entry = {
            "timestamp": time.time(),
            "direction": direction,
            "data": data
        }
        with open(LOG_FILE, "a") as f:
            f.write(json.dumps(log_entry) + "\n")
    except:
        pass

@app.get("/health")
async def health():
    return {"status": "healthy", "project": auth.get_project_id()}

@app.get("/agent/logs")
async def get_logs():
    """Retrieve the latest interaction logs for debugging."""
    if not os.path.exists(LOG_FILE):
        return []
    try:
        with open(LOG_FILE, "r") as f:
            lines = f.readlines()
            return [json.loads(line) for line in lines[-50:]]  # Return last 50
    except:
        return []

@app.post("/agent/debug/reset")
async def reset_debug():
    """Resets the debug log file."""
    try:
        if os.path.exists(LOG_FILE):
            os.remove(LOG_FILE)
        return {"status": "reset"}
    except:
        return {"status": "error"}

@app.post("/agent/query")
async def chat(request: ChatRequest):
    """
    The Main Entry Point.
    Implements the 'Bridge Agent' pattern: Intent Detection -> A2UI Surface.
    """
    logger.info(f"Query received: {request.query}")
    
    # Log incoming request
    log_interaction("CLIENT_TO_SERVER", request.dict())
    
    # Process through the Intelligence Orchestrator
    # Convert history to simpler list of dicts for the orchestrator
    history_dicts = [m.dict() for m in request.history] if request.history else []
    
    result = await orchestrator.process_query(request.query, history_dicts)
    
    # Log outgoing response
    log_interaction("SERVER_TO_CLIENT", result)
    
    return result

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"🚀 Starting Agent Cockpit Engine on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
