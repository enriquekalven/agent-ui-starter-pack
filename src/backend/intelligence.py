import json
import logging
import os
from typing import Dict, Any, List, Optional
from .domain_config import DOMAIN_CONFIG, get_intent_guidance, get_source_attribution
from .auth_manager import AuthManager

# Using Vertex AI SDK
try:
    import vertexai
    from vertexai.generative_models import GenerativeModel, Content, Part
    HAS_VERTEX = True
except ImportError:
    HAS_VERTEX = False

logger = logging.getLogger(__name__)
auth = AuthManager()

class IntelligenceOrchestrator:
    """
    The 'Brain' of the Agent Cockpit.
    Handles Intent Detection, Response Generation, and A2UI Surface Factory.
    """
    def __init__(self):
        self.model_name = os.environ.get("GENAI_MODEL", "gemini-1.5-flash")
        self.project_id = auth.get_project_id()
        self.location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")
        self._initialized = False

    def _ensure_init(self):
        if not self._initialized and HAS_VERTEX:
            vertexai.init(project=self.project_id, location=self.location)
            self._initialized = True

    async def process_query(self, query: str, history: List[Dict] = None) -> Dict[str, Any]:
        """
        Refactored Intent-First Orchestrator.
        1. Classifies Intent
        2. Generates Conversational Text
        3. Identifies Keywords for A2UI
        """
        self._ensure_init()
        
        system_prompt = f"""
{DOMAIN_CONFIG['persona']}

## RESPONSE FORMAT
Respond ONLY with a valid JSON object.
{{
  "intent": "<intent_name>",
  "text": "<conversational_response>",
  "keywords": "<comma_separated_keywords_for_a2ui>"
}}

{get_intent_guidance()}
"""
        
        try:
            model = GenerativeModel(
                model_name=self.model_name,
                system_instruction=system_prompt
            )
            
            # Simple wrapper for history to Vertex format
            contents = []
            if history:
                for h in history:
                    role = "user" if h["role"] == "user" else "model"
                    contents.append(Content(role=role, parts=[Part.from_text(h["text"])]))
            
            contents.append(Content(role="user", parts=[Part.from_text(query)]))
            
            response = model.generate_content(
                contents,
                generation_config={"response_mime_type": "application/json"}
            )
            
            data = json.loads(response.text)
            intent = data.get("intent", "general")
            text = data.get("text", "I've processed your request.")
            keywords = data.get("keywords", query)
            
            # 4. Surface Generation (The Dynamic Part)
            a2ui_surface = self.generate_a2ui_for_intent(intent, keywords)
            
            return {
                "intent": intent,
                "text": text,
                "surface": a2ui_surface,
                "source": get_source_attribution(keywords)
            }
            
        except Exception as e:
            logger.error(f"Intelligence processing failed: {e}")
            # Fallback to hardcoded mock
            return {
                "intent": "general",
                "text": f"Running in fallback mode. Error: {str(e)}",
                "surface": self.get_mock_surface(query),
                "source": get_source_attribution("default")
            }

    def generate_a2ui_for_intent(self, intent: str, context: str) -> Dict[str, Any]:
        """
        Surface Factory: Maps intents to high-fidelity A2UI components.
        This is the 'Graceful Degradation' fallback pattern.
        """
        if intent == "analytics":
            return {
                "surfaceId": "analytics-view",
                "content": [
                    {"type": "Text", "props": {"text": f"Analytics: {context}", "variant": "h2"}},
                    {"type": "StatBar", "props": {"label": "Performance Index", "value": 85, "color": "#3b82f6"}},
                    {"type": "StatBar", "props": {"label": "Growth Rate", "value": 12, "color": "#10b981"}}
                ]
            }
        elif intent == "vision":
            return {
                "surfaceId": "vision-roadmap",
                "content": [
                    {"type": "Text", "props": {"text": "Strategic Roadmap", "variant": "h2"}},
                    {"type": "Card", "props": {"title": "Phase 1: Foundation"}, "children": [{"type": "Text", "props": {"text": "Laying the global infrastructure for A2UI.", "variant": "body"}}]},
                    {"type": "Card", "props": {"title": "Phase 2: Scale"}, "children": [{"type": "Text", "props": {"text": "Expanding intelligence to niche industries.", "variant": "body"}}]}
                ]
            }
        elif intent == "directory":
            return {
                "surfaceId": "directory-list",
                "content": [
                    {"type": "Text", "props": {"text": "Project Directory", "variant": "h2"}},
                    {"type": "List", "props": {"title": "Active Items", "items": ["Global Supply Chain", "Healthcare Dashboard", "Fintech Bridge"]}}
                ]
            }
        elif intent == "weather":
            return {
                "surfaceId": "weather-widget",
                "content": [
                    {"type": "Text", "props": {"text": f"Current Weather: {context}", "variant": "h2"}},
                    {"type": "StatBar", "props": {"label": "Temperature", "value": 72, "color": "#f59e0b"}},
                    {"type": "StatBar", "props": {"label": "Humidity", "value": 45, "color": "#3b82f6"}}
                ]
            }
        elif intent == "stock":
            return {
                "surfaceId": "stock-ticker",
                "content": [
                    {"type": "Text", "props": {"text": f"Market Data: {context}", "variant": "h2"}},
                    {"type": "Card", "props": {"title": "GOOGL (Alphabet Inc.)"}, "children": [
                        {"type": "Text", "props": {"text": "$142.50 (+2.4%)", "variant": "h1"}},
                        {"type": "StatBar", "props": {"label": "Volume", "value": 85, "color": "#10b981"}}
                    ]}
                ]
            }
        elif intent == "time":
            return {
                "surfaceId": "time-display",
                "content": [
                    {"type": "Text", "props": {"text": "System Clock", "variant": "h2"}},
                    {"type": "Card", "children": [
                        {"type": "Text", "props": {"text": "10:14 PM GMT-8", "variant": "h1"}},
                        {"type": "Text", "props": {"text": "Tuesday, Jan 27, 2026", "variant": "body"}}
                    ]}
                ]
            }
        
        # Default fallback
        return self.get_mock_surface(context)

    def get_mock_surface(self, query: str) -> Dict[str, Any]:
        return {
            "surfaceId": "standard-surface",
            "content": [
                {"type": "Card", "props": {"title": "Intelligence Node"}, "children": [{"type": "Text", "props": {"text": f"Generated responsive UI for: {query}", "variant": "body"}}]}
            ]
        }
