from typing import Dict, List, Any

# =============================================================================
# DOMAIN MANIFEST
# =============================================================================
# This configuration allows the Agent Cockpit to be repurposed for any industry.
# Define your intents, background knowledge, and A2UI mapping here.

DOMAIN_CONFIG = {
    "industry": "Universal Agent Tech",
    "name": "General Purpose Intelligence",
    "persona": (
        "You are an A2UI Orchestration Agent. You are professional, concise, "
        "and data-driven. You never use filler phrases. You specialize in "
        "detecting user intent and returning structured knowledge."
    ),
    
    # Map topics to specific source URIs for attribution
    "sources": {
        "tech": {"title": "Technology Roadmap", "url": "https://example.com/tech"},
        "news": {"title": "Market Updates", "url": "https://example.com/news"},
        "default": {"title": "Knowledge Base", "url": "https://example.com/docs"}
    },

    # Define the "High-Signal" intents for this domain
    "intents": [
        {
            "name": "vision",
            "description": "User wants to see high-level strategy, roadmaps, or future goals.",
            "keywords": ["roadmap", "future", "strategy", "vision"]
        },
        {
            "name": "analytics",
            "description": "User asks for data, metrics, stats, or performance charts.",
            "keywords": ["stats", "metrics", "performance", "growth", "numbers"]
        },
        {
            "name": "directory",
            "description": "User wants to see a list of items, team members, or project catalog.",
            "keywords": ["list", "team", "projects", "catalog"]
        },
        {
            "name": "workflow",
            "description": "User asks about steps, processes, or how things move from A to B.",
            "keywords": ["steps", "process", "workflow", "journey"]
        },
        {
            "name": "quiz",
            "description": "User wants an interactive knowledge check or quiz.",
            "keywords": ["quiz", "test", "check knowledge"]
        },
        {
            "name": "weather",
            "description": "User asks about the weather, temperature, or conditions.",
            "keywords": ["weather", "temperature", "cloudy", "sunny"]
        },
        {
            "name": "stock",
            "description": "User asks for stock market data, market price, or GOOGL info.",
            "keywords": ["stock", "price", "market", "GOOGL"]
        },
        {
            "name": "time",
            "description": "User asks for the current time, date, or clock status.",
            "keywords": ["time", "date", "clock", "today"]
        }
    ]
}

def get_intent_guidance() -> str:
    """Generates the system prompt fragment for intent detection based on the manifest."""
    guidance = "## INTENT CLASSIFICATION\nAnalyze the request to determine one of these intents:\n"
    for intent in DOMAIN_CONFIG["intents"]:
        guidance += f"- {intent['name']}: {intent['description']}\n"
    
    guidance += "- greeting: hello, hi, etc.\n"
    guidance += "- general: everything else.\n"
    return guidance

def get_source_attribution(topic: str) -> Dict[str, str]:
    """Resolves which source info to return based on topic matching."""
    topic_lower = topic.lower()
    for key, source in DOMAIN_CONFIG["sources"].items():
        if key in topic_lower:
            return {**source, "provider": DOMAIN_CONFIG["name"]}
    return {**DOMAIN_CONFIG["sources"]["default"], "provider": DOMAIN_CONFIG["name"]}
