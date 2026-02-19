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
        self.model_name = os.environ.get("GENAI_MODEL", "gemini-2.0-flash")
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
            error_msg = str(e)
            logger.error(f"Intelligence processing failed: {error_msg}")
            
            # Surface specific cloud errors
            ui_message = "Running in fallback mode."
            if "403" in error_msg or "Billing" in error_msg:
                ui_message = "⚠️ Cloud Billing Error: Please check your Google Cloud project billing status."
            elif "404" in error_msg or "not found" in error_msg.lower():
                ui_message = f"⚠️ Model Not Found: The model '{self.model_name}' is not available in {self.location}."
            
            # Fallback to hardcoded mock
            return {
                "intent": "general",
                "text": f"{ui_message} (Internal Error: {error_msg})",
                "surface": self.get_mock_surface(query),
                "source": get_source_attribution("default"),
                "status": "warning"
            }

    def generate_a2ui_for_intent(self, intent: str, context: str) -> Dict[str, Any]:
        """
        Surface Factory: Maps intents to premium high-fidelity A2UI components.
        Updated for Cockpit v2.0.2 with Metric, Visual, and Grid support.
        """
        if intent == "analytics":
            return {
                "surfaceId": "analytics-view",
                "content": [
                    {"type": "Text", "props": {"text": f"Strategic Analytics: {context}", "variant": "h2"}},
                    {
                        "type": "ReasoningTrace", 
                        "props": {
                            "reasoning": "Analyzing fleet performance across 3 vectors: Efficiency, ROI, and Latent Drift.",
                            "steps": [
                                "Aggregating metrics from global sovereign nodes.",
                                "Calculating ROI velocity using the waterfall model.",
                                "Optimizing latent drift targets for 2026."
                            ]
                        }
                    },
                    {
                        "type": "Grid", "props": {"cols": 3},
                        "children": [
                            {"type": "Metric", "props": {"label": "Efficiency", "value": "92.4%", "trend": "2.1%", "trendUp": True}},
                            {"type": "Metric", "props": {"label": "ROI Velocity", "value": "12.4x", "trend": "v1.8", "trendUp": True}},
                            {"type": "Metric", "props": {"label": "Latent Drift", "value": "8ms", "trend": "Optimized", "trendUp": True}}
                        ]
                    },
                    {
                        "type": "Card", 
                        "props": {
                            "title": "Growth Trajectory", 
                            "icon": "agent", 
                            "badge": "Production-Ready",
                            "hasFeedback": True
                        },
                        "children": [
                            {
                                "type": "Visual", 
                                "props": {
                                    "type": "trend", 
                                    "data": {
                                        "points": [
                                            {"name": "Q1", "value": 12}, {"name": "Q2", "value": 34}, 
                                            {"name": "Q3", "value": 56}, {"name": "Q4", "value": 89}
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        elif intent == "vision":
            return {
                "surfaceId": "vision-roadmap",
                "content": [
                    {"type": "Text", "props": {"text": "Sovereign Strategic Roadmap", "variant": "h1"}},
                    {
                        "type": "Grid", "props": {"cols": 2},
                        "children": [
                            {"type": "Card", "props": {"title": "Phase 1: Foundation", "icon": "security", "badge": "Deploying"}, "children": [{"type": "Text", "props": {"text": "Laying the global infrastructure for A2UI.", "variant": "body"}}]},
                            {"type": "Card", "props": {"title": "Phase 2: Scale", "icon": "performance"}, "children": [{"type": "Text", "props": {"text": "Expanding intelligence to niche industries.", "variant": "body"}}]}
                        ]
                    },
                    {"type": "Visual", "props": {"type": "roi", "data": {"saved": 12480}}},
                    {
                        "type": "Sources", 
                        "props": {
                            "links": [
                                {"title": "Figma SLDS Agentic Patterns", "url": "https://www.figma.com/community/file/1410651139412157582"},
                                {"title": "Salesforce Agentforce Guide", "url": "https://www.salesforce.com/agentforce/"}
                            ]
                        }
                    }
                ]
            }
        elif intent == "directory":
            return {
                "surfaceId": "directory-list",
                "content": [
                    {"type": "Text", "props": {"text": "Fleet Directory", "variant": "h2"}},
                    {"type": "Visual", "props": {"type": "map", "data": {
                        "agents": [
                            {"name": "Sales-Bot", "x": 20, "y": 40, "task": "COLD_CALL"},
                            {"name": "Ops-Pilot", "x": 60, "y": 30, "task": "AUDIT"},
                            {"name": "Fin-Chief", "x": 80, "y": 70, "task": "ROI_CALC"}
                        ]
                    }}},
                    {"type": "List", "props": {"title": "Managed Agents", "items": ["Global Supply Chain", "Healthcare Dashboard", "Fintech Bridge"]}}
                ]
            }
        elif intent == "weather":
            return {
                "surfaceId": "weather-widget",
                "content": [
                    {"type": "Text", "props": {"text": f"Current Weather: {context}", "variant": "h2"}},
                    {
                        "type": "Grid", "props": {"cols": 2},
                        "children": [
                            {"type": "Metric", "props": {"label": "Temperature", "value": "72°F", "trend": "Rising", "trendUp": True}},
                            {"type": "Metric", "props": {"label": "Humidity", "value": "45%", "trend": "Stable", "trendUp": True}}
                        ]
                    },
                    {"type": "StatBar", "props": {"label": "UV Index", "value": 15, "color": "#f59e0b"}}
                ]
            }
        elif intent == "stock":
            return {
                "surfaceId": "stock-ticker",
                "content": [
                    {"type": "Text", "props": {"text": f"Market Data: {context}", "variant": "h2"}},
                    {
                        "type": "Card", "props": {"title": "Asset Analytics", "icon": "cost"},
                        "children": [
                            {"type": "Metric", "props": {"label": "GOOGL", "value": "$142.50", "trend": "2.4%", "trendUp": True}},
                            {"type": "Visual", "props": {"type": "bar", "data": {
                                "items": [
                                    {"name": "Open", "value": 138}, {"name": "Close", "value": 142.5, "color": "#10b981"},
                                    {"name": "High", "value": 145}, {"name": "Low", "value": 137}
                                ]
                            }}}
                        ]
                    }
                ]
            }
        elif intent == "time":
            return {
                "surfaceId": "time-display",
                "content": [
                    {"type": "Text", "props": {"text": "Sovereign Clock", "variant": "h2"}},
                    {"type": "Card", "children": [
                        {"type": "Text", "props": {"text": "10:14 PM GMT-8", "variant": "h1"}},
                        {"type": "Text", "props": {"text": "Tuesday, Jan 27, 2026", "variant": "body"}}
                    ]},
                    {"type": "Metric", "props": {"label": "Uptime", "value": "99.998%", "trend": "Planetary", "trendUp": True}}
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
