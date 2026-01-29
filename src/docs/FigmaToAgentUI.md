# 🎨 Figma to Agent UI: Scaling Your Templates

One of the biggest advantages of the **Agent UI Starter Pack** is that it separates **Design (Skins)** from **Logic (A2UI)**. This guide explains how to take a high-fidelity Figma dashboard and turn it into a scalable Agent template.

## 1. The Mapping Pattern
When you find a Figma template (e.g., *Untitled UI*, *Sneat*, or *Horizon*), don't think about "coding" the pages. Think about **Component Primitives**.

| Figma Element | A2UI Component | Implementation |
| :--- | :--- | :--- |
| **Grid Layout** | `Container` / `Card` | Layout handled by `index.css` |
| **Data Widgets** | `StatBar` | Variable-driven metrics |
| **Action Buttons** | `Button` | Intent-driven triggers |
| **Style Tokens** | `data-skin` | CSS Variables in `:root` |

## 2. Importing a New Template (The 3-Step Process)

### Step A: Define the Design Tokens
Take the colors, shadows, and spacing from Figma and add them to `index.css` under a new skin:
```css
[data-skin="my-new-template"] {
  --bg-color: #f0f0f0;
  --accent-color: #ff3366;
  --radius-xl: 12px;
}
```

### Step B: Register Custom Components
If the Figma design has a "Special Radar Chart," add it to `src/a2ui/A2UIRenderer.tsx`:
```tsx
const Registry = {
  Text,
  StatBar,
  RadarChart: MyCustomRadar, // New!
};
```

### Step C: Teach the Agent (The Brain)
Update `src/backend/intelligence.py` to trigger this new surface when appropriate:
```python
if intent == "advanced-stats":
    return {
        "surfaceId": "premium-dashboard",
        "content": [
            {"type": "RadarChart", "props": {"data": [10, 20, 30]}}
        ]
    }
```

## 3. Why this is more scalable than "Building a Frontend"
If you just build a frontend, you are stuck with one layout. By using **Templates + Skins**, your Agent can:
1.  **Personalize:** Show a "Minimal" skin to power users and an "Executive" skin to CEOs.
2.  **A/B Test:** Switch templates instantly without redeploying code.
3.  **Contextualize:** Switch to "Dark Ops" mode when a system error is detected.
