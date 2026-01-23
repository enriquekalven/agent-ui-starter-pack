from datetime import datetime
import functools

def cost_guard(budget_limit=0.10):
    """
    Middleware/Decorator to enforce cost guardrails on LLM calls.
    """
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            # Mock cost calculation logic
            # In a real app, this would estimate tokens or check project quotas
            estimated_cost = 0.05 
            
            print(f"💰 [Cost Control] Estimating cost for {func.__name__}...")
            
            if estimated_cost > budget_limit:
                print(f"❌ [BLOCKED] Request estimated at ${estimated_cost}, which exceeds budget of ${budget_limit}.")
                return {
                    "error": "Budget exceeded",
                    "details": f"Estimated cost ${estimated_cost} > Limit ${budget_limit}"
                }
            
            print(f"✅ [ALLOWED] Estimated cost: ${estimated_cost}. Within budget.")
            return await func(*args, **kwargs)
        return wrapper
    return decorator

def model_router(query: str):
    """
    Smart model routing middleware.
    Flash for simple tasks, Pro for complex ones.
    """
    word_count = len(query.split())
    
    if word_count < 20:
        return "gemini-2.0-flash", "Using Flash for efficient response."
    else:
        return "gemini-2.0-pro", "Using Pro for complex reasoning."
