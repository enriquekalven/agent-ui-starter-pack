# UX to Code: The Vision Bridge Pipeline

This guide outlines the process of transforming high-fidelity Figma designs into dynamic A2UI surfaces using the **Vision Bridge**.

## 🎨 Overview
The Agent UI Starter Pack differentiates itself by allowing designers to define "Agentic Experiences" in Figma and having the Agent Engine "hydrate" them into reactive components.

## 🛠️ The Pipeline

### 1. Pattern Detection
The Vision Bridge scans your Figma file for specific naming conventions or component signatures:
- **`[A2UI] Reasoning`**: Maps to the `ReasoningTrace` component.
- **`[A2UI] Card`**: Maps to the standard `Card` but with `hasFeedback` enabled.
- **`[A2UI] Metric`**: Maps to the `Metric` component with trend indicators.
- **`[A2UI] Visual`**: Maps to `Recharts` based charts (Area, Bar, Radar).

### 2. A2UI Hydration
Once detected, the agent generates a JSON schema following the A2UI Protocol:

```json
{
  "surfaceId": "my-new-surface",
  "content": [
    {
      "type": "ReasoningTrace",
      "props": {
        "reasoning": "Determined by agent logic...",
        "steps": ["Step 1", "Step 2"]
      }
    }
  ]
}
```

### 3. Registry Injection
The new surface is automatically registered in the `A2UIRenderer` registry, making it instantly available for the agent to call via the `IntelligenceOrchestrator`.

## 🚀 How to use the Figma Bridge
1. Open the [Home Page](/) or [Playground](/playground).
2. Locate the **Figma to Code** section.
3. Paste your Figma community or private file link.
4. Click **Initialize Hydration**.
5. The Bridge will analyze the blueprint and update your local `A2UIRenderer.tsx` registry (simulated in dev).

## 💎 Design Standards
To ensure high-fidelity hydration, follow the **Sovereign Evolution** design system:
- **Glassmorphism**: Use `backdrop-blur-xl` and `bg-slate-900/40`.
- **Gradients**: Use `from-blue-400 to-indigo-400`.
- **Typography**: Inter (UI) and Mono (Data).
