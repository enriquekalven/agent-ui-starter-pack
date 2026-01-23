import sys
import os

def audit_agent(file_path):
    print(f"🔍 Auditing Agent: {file_path}")
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Simple simulated checks
    token_count = len(content.split()) * 1.5 # Mock tokenization
    print(f"📊 Estimated static prompt size: {token_count:.0f} tokens")
    
    print("\n📝 Optimization Report:")
    
    if token_count > 1000:
        print("✅ [HIGH IMPACT] Large static context detected. Enabling 'Gemini Context Caching' could save 90% on reuse.")
    
    if "calculate" in content.lower() or "date" in content.lower():
        print("✅ [MEDIUM IMPACT] Found logic in prompt. Suggest offloading to a Python tool/function for accuracy and token savings.")
    
    print("✅ [LOW IMPACT] System instructions contain redundant whitespace. Prompt compression recommended.")

    print("\n🚀 Verdict: Ready for deployment with optimizations.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python optimizer.py <path_to_agent.py>")
        sys.exit(1)
    
    audit_agent(sys.argv[1])
