import pytest
from backend.intelligence import IntelligenceOrchestrator

@pytest.fixture
def orchestrator():
    return IntelligenceOrchestrator()

def test_analytics_surface(orchestrator):
    surface = orchestrator.generate_a2ui_for_intent("analytics", "performance metrics")
    assert surface["surfaceId"] == "analytics-view"
    
    # Check for Grid and Metrics
    grid = next(c for c in surface["content"] if c["type"] == "Grid")
    assert len(grid["children"]) == 3
    assert grid["children"][0]["type"] == "Metric"
    
    # Check for Visual
    card = next(c for c in surface["content"] if c["type"] == "Card")
    visual = next(c for c in card["children"] if c["type"] == "Visual")
    assert visual["props"]["type"] == "trend"
    assert "points" in visual["props"]["data"]

def test_vision_surface(orchestrator):
    surface = orchestrator.generate_a2ui_for_intent("vision", "future roadmap")
    assert surface["surfaceId"] == "vision-roadmap"
    assert any(c["type"] == "Visual" and c["props"]["type"] == "roi" for c in surface["content"])

def test_directory_surface(orchestrator):
    surface = orchestrator.generate_a2ui_for_intent("directory", "active nodes")
    assert surface["surfaceId"] == "directory-list"
    
    # Check for Fleet Map
    visual = next(c for c in surface["content"] if c["type"] == "Visual")
    assert visual["props"]["type"] == "map"
    assert "agents" in visual["props"]["data"]

def test_weather_surface(orchestrator):
    surface = orchestrator.generate_a2ui_for_intent("weather", "San Francisco")
    assert surface["surfaceId"] == "weather-widget"
    grid = next(c for c in surface["content"] if c["type"] == "Grid")
    assert any(c["type"] == "Metric" and c["props"]["label"] == "Temperature" for c in grid["children"])

def test_stock_surface(orchestrator):
    surface = orchestrator.generate_a2ui_for_intent("stock", "GOOGL")
    assert surface["surfaceId"] == "stock-ticker"
    card = next(c for c in surface["content"] if c["type"] == "Card")
    assert any(c["type"] == "Visual" and c["props"]["type"] == "bar" for c in card["children"])

def test_time_surface(orchestrator):
    surface = orchestrator.generate_a2ui_for_intent("time", "current time")
    assert surface["surfaceId"] == "time-display"
    assert any(c["type"] == "Metric" and c["props"]["label"] == "Uptime" for c in surface["content"])

def test_fallback_surface(orchestrator):
    surface = orchestrator.generate_a2ui_for_intent("unknown_intent", "some query")
    assert surface["surfaceId"] == "standard-surface"
    assert surface["content"][0]["type"] == "Card"
