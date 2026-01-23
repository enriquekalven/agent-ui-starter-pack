FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml .
# Install dependencies if needed. Since we are using standard libs mostly, we might just need fastapi/uvicorn
RUN pip install fastapi uvicorn pydantic vertexai google-cloud-aiplatform google-cloud-logging google-cloud-trace

COPY src/ ./src/

# Set PYTHONPATH so it can find the modules
ENV PYTHONPATH=/app/src

CMD ["python", "src/backend/agent.py"]
