import os
import time
import subprocess
import json
import logging
from typing import Optional, Dict

try:
    import google.auth
    from google.auth.transport.requests import Request
    HAS_GOOGLE_AUTH = True
except ImportError:
    HAS_GOOGLE_AUTH = False

logger = logging.getLogger(__name__)

class AuthManager:
    """
    Handles Google Cloud authentication triaging.
    Ports the robust logic from the Portfolio Agent to Python.
    """
    def __init__(self):
        self.cached_token: Optional[str] = None
        self.expires_at: float = 0
        self.project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")

    def get_access_token(self) -> str:
        """Get access token with caching and multi-method triaging."""
        now = time.time()
        if self.cached_token and self.expires_at > now + 60:
            return self.cached_token

        # 1. Try Google Auth (ADC / Service Account / Environment)
        if HAS_GOOGLE_AUTH:
            try:
                credentials, project = google.auth.default(
                    scopes=['https://www.googleapis.com/auth/cloud-platform']
                )
                if not self.project_id:
                    self.project_id = project
                
                auth_req = Request()
                credentials.refresh(auth_req)
                
                self.cached_token = credentials.token
                # Typical expiry is 1 hour, we assume 50 mins
                self.expires_at = now + 3000
                logger.debug("Obtained token via google-auth ADC")
                return self.cached_token
            except Exception as e:
                logger.debug(f"google-auth ADC failed: {e}")

        # 2. Fallback to gcloud CLI (Local Dev)
        try:
            result = subprocess.run(
                ["gcloud", "auth", "print-access-token"],
                capture_output=True, text=True, check=True
            )
            self.cached_token = result.stdout.strip()
            self.expires_at = now + 3000
            logger.debug("Obtained token via gcloud CLI")
            return self.cached_token
        except Exception as e:
            logger.error(f"Failed to obtain token via gcloud: {e}")
            raise Exception("Authentication failed. Run 'gcloud auth application-default login'")

    def get_project_id(self) -> str:
        """Returns the detected or configured project ID."""
        if not self.project_id:
            # Try to get from gcloud if not in env
            try:
                result = subprocess.run(
                    ["gcloud", "config", "get-value", "project"],
                    capture_output=True, text=True, check=True
                )
                self.project_id = result.stdout.strip()
            except:
                pass
        return self.project_id or "unknown-project"
