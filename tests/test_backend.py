import pytest
import os
from unittest.mock import MagicMock, patch
from backend.intelligence import IntelligenceOrchestrator

@pytest.fixture
def orchestrator():
    # Ensure project ID is set for tests
    os.environ["GOOGLE_CLOUD_PROJECT"] = "test-project"
    return IntelligenceOrchestrator()

@pytest.mark.asyncio
async def test_intelligence_fallback_billing_error(orchestrator):
    with patch("backend.intelligence.GenerativeModel") as MockModel:
        # Mock the model to raise a billing error
        mock_instance = MockModel.return_value
        mock_instance.generate_content.side_effect = Exception("403 User is not authorized. Billing not enabled.")
        
        result = await orchestrator.process_query("hello")
        
        assert result["intent"] == "general"
        assert "Cloud Billing Error" in result["text"]
        assert result["status"] == "warning"

@pytest.mark.asyncio
async def test_intelligence_fallback_model_not_found(orchestrator):
    with patch("backend.intelligence.GenerativeModel") as MockModel:
        # Mock the model to raise a 404 error
        mock_instance = MockModel.return_value
        mock_instance.generate_content.side_effect = Exception("404 Model gemini-2.0-flash not found in us-central1")
        
        result = await orchestrator.process_query("hello")
        
        assert result["intent"] == "general"
        assert "Model Not Found" in result["text"]
        assert result["status"] == "warning"

@pytest.mark.asyncio
async def test_intelligence_general_fallback(orchestrator):
    with patch("backend.intelligence.GenerativeModel") as MockModel:
        # Mock the model to raise a generic error
        mock_instance = MockModel.return_value
        mock_instance.generate_content.side_effect = Exception("Something went wrong")
        
        result = await orchestrator.process_query("hello")
        
        assert result["intent"] == "general"
        assert "Running in fallback mode" in result["text"]
        assert result["status"] == "warning"

@pytest.mark.asyncio
async def test_intelligence_success(orchestrator):
    with patch("backend.intelligence.GenerativeModel") as MockModel:
        mock_instance = MockModel.return_value
        # Mock the response from Gemini
        mock_response = MagicMock()
        mock_response.text = '{"intent": "analytics", "text": "Here are the metrics.", "keywords": "performance"}'
        mock_instance.generate_content.return_value = mock_response
        
        result = await orchestrator.process_query("show performance")
        
        assert result["intent"] == "analytics"
        assert result["text"] == "Here are the metrics."
        assert "surface" in result
        assert result["surface"]["surfaceId"] == "analytics-view"
        assert any(c["type"] == "Grid" for c in result["surface"]["content"])

def test_mock_surface_fallback(orchestrator):
    # Test the fallback mock surface explicitly
    surface = orchestrator.get_mock_surface("help me")
    assert surface["surfaceId"] == "standard-surface"
    assert "help me" in surface["content"][0]["children"][0]["props"]["text"]
