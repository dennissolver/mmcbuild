# MMC Build — Design System & Styling Guide for Claude Code

> Save as `DESIGN_SYSTEM.md` in `C:\Users\denni\PycharmProjects\MMCBuild\`
> Claude Code MUST read this file before writing any UI code.

---

## Brand Identity

**Product:** MMC Build — AI-powered compliance and design intelligence
**Aesthetic:** Premium SaaS / construction-tech. Dark, professional, trustworthy. Each product module has its own signature colour identity while sharing a consistent layout system.

---

## CRITICAL: Per-Module Colour Theming

Each MMC module has a **unique hero gradient background** and **accent colour** for its highlighted keyword. This is the core visual identity — every module page must use its assigned theme.

| Module | Badge Label | Hero Gradient | Accent Colour (keyword) | Accent Hex |
|---|---|---|---|---|
| **MMC Comply** | "MMC Comply" | Deep navy-blue gradient (dark blue → mid blue) | Cyan / Light Blue | `#22D3EE` (cyan-400) |
| **MMC Build** | "MMC Build" | Dark teal gradient (dark teal → emerald) | Teal / Cyan-green | `#2DD4BF` (teal-400) |
| **MMC Quote** | "MMC Quote" | Deep purple gradient (dark purple → violet) | Violet / Purple | `#A78BFA` (violet-400) |
| **MMC Direct** | "MMC Directory" | Warm amber/orange gradient (dark amber → burnt orange) | Amber / Gold | `#FBBF24` (amber-400) |
| **MMC Train** | "MMC Train" | Deep navy-indigo gradient (dark navy → indigo-blue) | Purple / Violet-pink | `#C084FC` (purple-400) |

### Hero Gradient CSS Values

```css
/* MMC Comply — Deep blue */
.hero-comply {
  background: linear-gradient(135deg, #0B1A3E 0%, #1E3A8A 40%, #2563EB 100%);
}

/* MMC Build — Teal / Emerald */
.hero-build {
  background: linear-gradient(135deg, #042F2E 0%, #0F766E 40%, #14B8A6 100%);
}

/* MMC Quote — Purple / Violet */
.hero-quote {
  background: linear-gradient(135deg, #1E1038 0%, #6D28D9 40%, #8B5CF6 100%);
}

/* MMC Direct — Amber / Orange */
.hero-direct {
  background: linear-gradient(135deg, #451A03 0%, #B45309 40%, #D97706 100%);
}

/* MMC Train — Navy / Indigo-purple */
.hero-train {
  background: linear-gradient(135deg, #0B1120 0%, #1E1B4B 40%, #4338CA 100%);
}
```

### Tailwind Gradient Classes

```html
<!-- MMC Comply -->
<div class="bg-gradient-to-br from-[#0B1A3E] via-blue-800 to-blue-600">

<!-- MMC Build -->
<div class="bg-gradient-to-br from-[#042F2E] via-teal-700 to-teal-500">

<!-- MMC Quote -->
<div class="bg-gradient-to-br from-[#1E1038] via-violet-700 to-violet-500">

<!-- MMC Direct -->
<div class="bg-gradient-to-br from-[#451A03] via-amber-700 to-amber-600">

<!-- MMC Train -->
<div class="bg-gradient-to-br from-[#0B1120] via-indigo-900 to-indigo-700">
```

---

## Shared Hero Section Layout (All Modules Follow This Pattern)

Every module hero uses the exact same two-column layout structure. Only the colours and content change.

```
┌─────────────────────────────────────────────────────────────────┐
│  [Nav bar — white background, always the same]                  │
├─────────────────────────────────────────────────────────────────┤
│  [Full-width hero gradient — per-module colour]                 │
│                                                                 │
│   ┌──────────────────────┐    ┌──────────────────────────┐     │
│   │                      │    │                          │     │
│   │  [Module badge pill]  │    │  [Glassmorphism card     │     │
│   │                      │    │   with module preview     │     │
│   │  [Bold italic H1     │    │   data — frosted glass   │     │
│   │   with accent word]  │    │   background with rows]  │     │
│   │                      │    │                          │     │
│   │  [Description text]  │    │                          │     │
│   │                      │    │                          │     │
│   │  [CTA buttons]       │    │                          │     │
│   │                      │    │                          │     │
│   └──────────────────────┘    └──────────────────────────┘     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  [White background content sections below]                      │
└─────────────────────────────────────────────────────────────────┘
```

### Structure Details

**Grid:** 2 columns — `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`
- Left column: ~45% width (text content)
- Right column: ~55% width (preview card)

**Padding:** `py-20 lg:py-28 px-6 lg:px-16`
**Max width:** `max-w-7xl mx-auto`

---

## Component: Module Badge Pill

The small rounded pill label at the top-left of each hero section.

```
Structure: [icon] [Module Name]
Background: white with ~15% opacity (rgba(255,255,255,0.15))
Border: 1px solid rgba(255,255,255,0.25)
Border radius: rounded-full (pill)
Padding: px-4 py-2
Text: white, text-sm, font-medium
Icon: white, 16px, left of text (module-specific Lucide icon)
Backdrop: backdrop-blur-sm (slight frosted glass)
```

Tailwind:
```html
<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full 
            bg-white/15 border border-white/25 backdrop-blur-sm">
  <IconComponent class="w-4 h-4 text-white" />
  <span class="text-sm font-medium text-white">MMC Comply</span>
</div>
```

### Module Badge Icons (Lucide React)

| Module | Icon |
|---|---|
| MMC Comply | `FileCheck` or `ClipboardCheck` |
| MMC Build | `Wrench` or `PenTool` |
| MMC Quote | `Calculator` or `Wallet` |
| MMC Directory | `Users` or `Building2` |
| MMC Train | `GraduationCap` or `BookOpen` |

---

## Component: Hero Heading Typography

```
Style: Extra-bold, italic
Size: text-5xl lg:text-6xl (48-60px)
Weight: font-extrabold
Style: italic
Line height: leading-tight (1.1)
Colour: white

ACCENT WORD: One or two keywords in each heading are coloured with the
module's accent colour instead of white. This is the key brand pattern.
```

### Examples from the live site:

| Module | Heading | Accent Words | Accent Colour |
|---|---|---|---|
| MMC Comply | "Compliance Made **Simple**" | "Simple" | `text-cyan-400` |
| MMC Build | "Build **Smarter**, Not Harder" | "Smarter" | `text-teal-400` |
| MMC Quote | "**Intelligent** Quoting Made Simple" | "Quoting Made Simple" | `text-violet-400` |
| MMC Direct | "Find Your **Perfect** Team" | "Perfect" | `text-amber-400` |
| MMC Train | "Master **Modern** Construction" | "Modern" | `text-purple-400` |

Implementation:
```tsx
<h1 class="text-5xl lg:text-6xl font-extrabold italic text-white leading-tight">
  Compliance Made{' '}
  <span class="text-cyan-400">Simple</span>
</h1>
```

---

## Component: Glassmorphism Preview Card (Right Column)

This is the key visual element on the right side of every hero. It shows a **live preview mockup** of the module's output data.

### Glass Card Container

```
Background: rgba(255, 255, 255, 0.08) — very subtle white overlay
Border: 1px solid rgba(255, 255, 255, 0.15)
Border radius: rounded-2xl (16px)
Backdrop filter: backdrop-blur-xl (strong blur)
Padding: p-6
Shadow: shadow-2xl (with dark semi-transparent shadow)
```

Tailwind:
```html
<div class="bg-white/[0.08] border border-white/15 rounded-2xl 
            backdrop-blur-xl p-6 shadow-2xl">
```

### Glass Card Header Row

```
Layout: flex items-center gap-3
Icon: module-specific, 20px, text-white/70
Title: text-base font-medium text-white/90
Optional: green dot (●) for "Live" indicator
```

### Glass Card Inner Rows

Each row inside the card is also a glass panel:

```
Background: rgba(255, 255, 255, 0.06)
Border: 1px solid rgba(255, 255, 255, 0.10)
Border radius: rounded-xl (12px)
Padding: px-5 py-4
Margin between rows: space-y-3
```

Tailwind:
```html
<div class="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-4">
```

---

## Module-Specific Glass Card Contents

### MMC Comply — "Live Compliance Check"

```
Header: ● Live Compliance Check (green dot)

Row 1: "NCC Volume 1"     → ✓ Passed  (green text + check icon)
Row 2: "NCC Volume 2"     → ✓ Passed  (green text + check icon)
Row 3: "Fire Safety"      → ✗ 1 Issue (red/amber text + x icon)
Row 4: "Structural"       → ✓ Passed  (green text + check icon)

Status colours:
  Passed: text-green-400 with CheckCircle icon
  Issue:  text-red-400 with XCircle icon

Layout per row: flex justify-between items-center
  Left: text-sm font-medium text-white
  Right: flex items-center gap-1.5 text-sm font-medium [status colour]
```

### MMC Build — (No preview card visible, clean hero with right-side empty or 3D illustration)

The MMC Build hero in the screenshot shows no glass card on the right. Below the fold, there's an architectural illustration. For the app, consider showing a before/after design comparison or a 3D model preview.

### MMC Quote — "AI Cost Analysis"

```
Header: 💰 AI Cost Analysis

Row 1 (large): 
  Label: "Base Cost" (text-white/60, text-xs uppercase)
  Value: "$485,000" (text-white, text-2xl font-bold)

Row 2 (large, accent): 
  Label: "MMC Alternative" (text-white/60, text-xs uppercase)
  Value: "$445,000" (text-green-400, text-2xl font-bold)
  Sub: "↓ 8% savings" (text-green-400, text-sm)

Row 3 (breakdown table):
  Header: "Cost Breakdown" (text-white/60, text-xs uppercase)
  Materials    $280,000   (flex justify-between, text-sm text-white)
  Labour       $125,000
  Components   $40,000
```

### MMC Directory — "Search Professionals"

```
Header: 🔍 Search Professionals (with search icon)

Row 1:
  Company: "ModularPro Australia" (text-white font-semibold)
  Type: "Modular Builder" (text-white/60 text-sm)
  Location: "📍 Sydney" (text-white/50 text-sm)
  Rating: ⭐ 4.9 (text-amber-400 font-semibold, right-aligned)

Row 2:
  Company: "CLT Structures Co"
  Type: "CLT Specialist"  
  Location: "📍 Melbourne"
  Rating: ⭐ 4.8

Row 3:
  Company: "Green Build Consulting"
  Type: "Sustainability"
  Location: "📍 Brisbane"
  Rating: ⭐ 4.7

Layout per row: 
  Left stack: company name + type + location (vertical)
  Right: star icon + rating number (amber-400)
```

### MMC Train — "Your Learning Path"

```
Header: 🎓 Your Learning Path

Row 1:
  Course: "MMC Fundamentals" (text-white font-semibold)
  Status: "Completed" badge (bg-green-500/20 text-green-400 rounded-full px-3 py-1 text-xs)
  Progress bar: 100% filled — gradient from blue-500 to pink-400
  
Row 2:
  Course: "CLT Specialist"
  Status: "In Progress" badge (bg-white/10 text-white/70)
  Progress bar: ~70% filled — same gradient

Row 3:
  Course: "Prefab Certification"
  Status: "Upcoming" badge (bg-white/10 text-white/50)
  Progress bar: ~5% filled (barely started, gray)

Progress bar:
  Container: h-1.5 bg-white/10 rounded-full w-full mt-2
  Fill: h-full rounded-full bg-gradient-to-r from-blue-500 to-pink-400
  Width: dynamic based on progress percentage
```

---

## Component: CTA Buttons (Hero Section)

Two buttons side by side in every hero:

### "Join Waitlist" — Secondary/Ghost Button
```
Background: white (#FFFFFF)
Text: slate-900, font-medium, text-sm
Icon: ArrowRight, 16px, right of text
Border radius: rounded-full (pill)
Padding: px-6 py-3
Shadow: shadow-md
Hover: shadow-lg, slight scale
Border: none (solid white fill)
```

Tailwind:
```html
<button class="inline-flex items-center gap-2 px-6 py-3 rounded-full 
               bg-white text-slate-900 font-medium text-sm shadow-md 
               hover:shadow-lg hover:scale-105 transition-all">
  Join Waitlist
  <ArrowRight class="w-4 h-4" />
</button>
```

### "Try Live Demo" — Primary Accent Button
```
Background: module accent colour (e.g., teal-500 for MMC Build)
Text: white, font-medium, text-sm
Border radius: rounded-full (pill)
Padding: px-6 py-3
Shadow: shadow-md
Hover: darker shade, shadow-lg

Note: This button is NOT present on every module — only Comply and Build show it.
Some modules only have "Join Waitlist".
```

Tailwind:
```html
<button class="inline-flex items-center gap-2 px-6 py-3 rounded-full 
               bg-teal-500 text-white font-medium text-sm shadow-md 
               hover:bg-teal-600 hover:shadow-lg transition-all">
  Try Live Demo
</button>
```

---

## Navigation Bar (Shared Across All Pages)

```
Position: Sticky top, z-50
Background: white (#FFFFFF)
Height: ~72px (py-4)
Border bottom: border-b border-slate-100 (very subtle)
Max width: full width, content constrained to max-w-7xl

Layout: flex items-center justify-between

LEFT: Logo
  - Dark navy rounded-lg square (~48px) with white gear/cog icon
  - "MMC BUILD" text beneath or beside the gear icon
  
CENTRE: Nav links — flex items-center gap-8
  - Items: Solutions ▾ | Pricing | Trades & Suppliers | Blog | About | Contact
  - "Solutions" has a chevron-down dropdown indicator
  - Active item: text-blue-500 font-medium
  - Inactive items: text-slate-600 hover:text-slate-900 font-medium
  - Font size: text-[15px]

RIGHT: "Sign In" button
  - Background: blue-500
  - Text: white, font-medium
  - Padding: px-6 py-2.5
  - Border radius: rounded-full (pill)
  - Hover: blue-600
```

---

## Section Below Hero: White Content Areas

Below the hero on each module page, the background switches to **white** with dark text.

### Section Headings (on white background)
```
Font: text-3xl lg:text-4xl font-bold text-slate-900
Style: NOT italic (italic is only used in hero headings)
Alignment: text-center
Subtitle: text-lg text-slate-500 mt-4 max-w-2xl mx-auto
```

### Examples from screenshots:
- "Powerful Features" (below MMC Comply hero)
- "Learning Experience" (below MMC Train hero)

---

## Floating Chat Widget (Present on All Pages)

```
Position: fixed bottom-6 right-6 z-50
Size: w-14 h-14 (56px)
Shape: fully rounded circle
Background: gradient from teal-500 to cyan-600
Icon: white chat bubble (MessageCircle from Lucide), 24px
Shadow: shadow-lg
Hover: scale-110, shadow-xl
```

Tailwind:
```html
<button class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
               bg-gradient-to-br from-teal-500 to-cyan-600 
               flex items-center justify-center shadow-lg 
               hover:scale-110 transition-transform">
  <MessageCircle class="w-6 h-6 text-white" />
</button>
```

---

## Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Module accent colours
        'mmc-comply': '#22D3EE',     // cyan-400
        'mmc-build': '#2DD4BF',      // teal-400
        'mmc-quote': '#A78BFA',      // violet-400
        'mmc-direct': '#FBBF24',     // amber-400
        'mmc-train': '#C084FC',      // purple-400
        
        // Dark backgrounds
        dark: {
          base: '#0B1120',
          900: '#111827',
          800: '#1F2937',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## Module Theme Config (TypeScript)

Create this as a shared config used across the app:

```typescript
// src/lib/module-themes.ts

export const moduleThemes = {
  comply: {
    label: 'MMC Comply',
    icon: 'FileCheck',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400',
    heroGradient: 'bg-gradient-to-br from-[#0B1A3E] via-blue-800 to-blue-600',
    heroCss: 'linear-gradient(135deg, #0B1A3E 0%, #1E3A8A 40%, #2563EB 100%)',
    badgeLabel: 'MMC Comply',
  },
  build: {
    label: 'MMC Build',
    icon: 'Wrench',
    accent: 'text-teal-400',
    accentBg: 'bg-teal-400',
    heroGradient: 'bg-gradient-to-br from-[#042F2E] via-teal-700 to-teal-500',
    heroCss: 'linear-gradient(135deg, #042F2E 0%, #0F766E 40%, #14B8A6 100%)',
    badgeLabel: 'MMC Build',
  },
  quote: {
    label: 'MMC Quote',
    icon: 'Calculator',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-400',
    heroGradient: 'bg-gradient-to-br from-[#1E1038] via-violet-700 to-violet-500',
    heroCss: 'linear-gradient(135deg, #1E1038 0%, #6D28D9 40%, #8B5CF6 100%)',
    badgeLabel: 'MMC Quote',
  },
  direct: {
    label: 'MMC Directory',
    icon: 'Users',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-400',
    heroGradient: 'bg-gradient-to-br from-[#451A03] via-amber-700 to-amber-600',
    heroCss: 'linear-gradient(135deg, #451A03 0%, #B45309 40%, #D97706 100%)',
    badgeLabel: 'MMC Directory',
  },
  train: {
    label: 'MMC Train',
    icon: 'GraduationCap',
    accent: 'text-purple-400',
    accentBg: 'bg-purple-400',
    heroGradient: 'bg-gradient-to-br from-[#0B1120] via-indigo-900 to-indigo-700',
    heroCss: 'linear-gradient(135deg, #0B1120 0%, #1E1B4B 40%, #4338CA 100%)',
    badgeLabel: 'MMC Train',
  },
} as const

export type ModuleKey = keyof typeof moduleThemes
```

---

## Reusable Hero Component Structure

Every module page should use the same `<ModuleHero>` component with different props:

```tsx
// src/components/shared/ModuleHero.tsx

interface ModuleHeroProps {
  module: ModuleKey
  heading: React.ReactNode        // Pre-formatted with accent spans
  description: string
  showDemoButton?: boolean
  previewCard: React.ReactNode    // Module-specific glass card
}
```

This ensures **visual consistency** across all modules while keeping each one visually distinct through its colour theme.

---

## Summary of Key Design Patterns

1. **Every module = unique gradient + unique accent colour** — This is the #1 brand pattern
2. **Italic extra-bold headings** — Hero H1 only, with one accent-coloured keyword
3. **Glassmorphism cards** — Frosted glass panels with `bg-white/[0.08] backdrop-blur-xl border-white/15`
4. **Glass inner rows** — Nested frosted panels within the glass card
5. **Pill badge** — Semi-transparent white pill with icon + module name
6. **White pill CTA buttons** — "Join Waitlist" is always white with dark text
7. **Consistent nav bar** — White background, blue Sign In pill, never changes
8. **Chat widget** — Teal-to-cyan circle, always bottom-right, all pages
9. **White sections below hero** — Content sections on white with dark text, centred headings
10. **Progress bars (Train)** — Blue-to-pink gradient fills on translucent tracks
