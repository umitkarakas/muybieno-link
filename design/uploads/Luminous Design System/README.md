# Luminous Design System

A light glassmorphism + depth design system extracted from the **Luminous Dashboard** — a Next.js SaaS dashboard concept that pairs frosted-white surfaces with soft pastel light leaks (violet, sky, peach) to create a calm, premium, dimensional UI.

The look: *cloud-like cards floating over a pale gradient sky*. Cards are translucent white with high blur, gentle inner light highlights along their top edges, and soft drop shadows. Color is reserved for accent gradients (violet → sky → fuchsia) and small status pills.

---

## Sources

| Source | Path | Notes |
|---|---|---|
| Codebase | `Light Glassmorphism + Depth UI/` (mounted, read-only) | Next.js 16 + React 19 + Tailwind 3 + Recharts. Single dashboard page (`app/page.tsx`). |
| Branding | Inferred from code | Product name: **Luminous**. Tagline-adjacent copy: *"Light glassmorphism and depth UI SaaS dashboard concept."* |
| Icons | `lucide-react@^0.468.0` | All UI icons in the source come from Lucide. |
| Charts | `recharts@^2.15.0` | Area chart with custom gradient stroke + fill. |
| Type | Inter (declared via `--font-inter` CSS var) | Loaded as a system fallback stack — Google Fonts substitution used here. |

The codebase is a single-page concept (no routes beyond `/`) — the system is therefore built around one canonical surface (an analytics dashboard) and extrapolated outward.

---

## Index / Manifest

| File | What it is |
|---|---|
| `README.md` | This file. Brand context, content, visual foundations, iconography. |
| `SKILL.md` | Claude/Agent skill manifest — entry point for prototyping with this brand. |
| `colors_and_type.css` | CSS variables for color tokens, type scale, shadows, radii, blurs. |
| `fonts/` | Webfont files (Inter via Google Fonts). |
| `assets/` | Logos, decorative SVGs, background recipes. |
| `preview/` | Design System tab specimen cards (colors, type, shadows, components). |
| `ui_kits/luminous-dashboard/` | UI kit — recreates the Luminous dashboard. `index.html` plus JSX components. |

No slide templates were attached, so `slides/` was not created.

---

## Content Fundamentals

The product copy is **terse, professional, and friendly-but-restrained** — Stripe/Linear-adjacent SaaS voice. No jokes, no exclamation points, no emoji.

**Tone & vibe**
- Calm, capable, modern. The UI is the showcase; copy stays out of the way.
- Confident but not boastful. Numbers do the talking.
- Second-person address only when prompting action ("Unlock advanced features…"). Otherwise descriptive labels.

**Casing**
- **Title Case** for navigation items, card titles, section headings, primary buttons. *Examples:* `Dashboard`, `Revenue Overview`, `Upcoming Tasks`, `View Profile`, `Upgrade to Pro`.
- **Sentence case** for longer descriptive copy. *Example:* `"Unlock advanced features and unlimited access."`
- **ALL CAPS** is not used.

**Voice & person**
- "I" is never used. "You" appears only in CTAs/marketing-y prompts (`Upgrade to Pro`, `Unlock advanced features and unlimited access.`).
- Default voice is third-person/objective: `Total Revenue`, `New Customers`, `Avg. Order Value`, `Shared by Marcus Korsgaard`.

**Numbers & data**
- Currency with `$` and comma thousands: `$24,780`, `$86.24`.
- Percentages with one decimal: `12.5%`, `3.86%`, `4.7%`.
- Trends use Unicode arrows, not text: `↗ 12.5% vs last month`, `↘ 2.1% vs last month`.
- Counts abbreviated past 1k: `2.4K`, `1,248` (kept exact when small enough to read clean).

**Dates**
- Long form: `May 24, 2024`. Short form on chart axes: `May 1`, `May 16`.

**Microcopy patterns**
- Search placeholder: `Search anything...`
- Keyboard hint chip: `⌘ K` (rendered as a tiny pill, not a tooltip).
- Action arrows on text buttons: `Upgrade Now →`, `View Profile →` (right-arrow suffix on tertiary CTAs).
- Filter button collapses to icon + chevron: `This Month ⌄`.

**Emoji**
- **No emoji.** The brand uses Lucide line icons and a single Unicode arrow set (`↗ ↘ → ⌄ ⌘`). Trends use these arrows in place of decorative emoji.

**Names**
- Sample users use Western/European first + last names: *Olivia Rhye*, *Marcus Korsgaard*. Avatars derive 2-letter initials (`OR`, `MK`).

---

## Visual Foundations

### Backgrounds
The signature background is a **pale, off-white "atmosphere"** — never solid white, always layered:

```
radial-gradient(circle at 8%  34%, rgba(167, 139, 250, 0.24), transparent 28%),  /* violet */
radial-gradient(circle at 82% 22%, rgba( 96, 165, 250, 0.22), transparent 30%),  /* sky    */
radial-gradient(circle at 62% 96%, rgba(251, 146,  60, 0.13), transparent 24%),  /* peach  */
linear-gradient(135deg, #ffffff 0%, #f5f9ff 42%, #f6f1ff 100%);
```

Stack order, top→bottom: violet light leak (top-left), sky light leak (top-right), peach glow (bottom-center), then a 135° base gradient white → pale-blue → pale-lilac. Always `light` color-scheme.

On top of the gradient, **decorative blurred orbs** (`blur-3xl`, ~24rem) and **light streaks** (long thin pills with `via-white/45` gradient and rotation) drift across — subtle, never the focus. There are no images, no patterns, no grain, no textures.

### Glass cards (the core primitive)
Every container is a "glass card":
- `border: 1px solid rgba(255,255,255,0.6)` — bright white edge.
- `background: rgba(255,255,255,0.50)` — half-opaque white.
- `backdrop-filter: blur(40px)` (Tailwind `backdrop-blur-2xl`).
- `border-radius: 1.5rem` (24px) — large, rounded-3xl. Some surfaces 1.65rem (~26px).
- **Drop shadow** (`shadow-glass`): `0 20px 60px rgba(15,23,42,0.10)`.
- **Inner top highlight**: a 1px white line `before` pseudo at `top:0`, inset 1rem from each side (`bg-white/85`).
- **Inner glow**: `after` pseudo with `box-shadow: inset 0 1px 26px rgba(255,255,255,0.42)` — fakes a soft inner light.

Hover lifts elements `-translate-y-0.5` (2px up) with a longer shadow (`shadow-glass-lg`: `0 28px 80px rgba(70,80,140,0.18)`).

### Color vibe
- Imagery: **none** — the system is illustration-free and image-free. Decorative color comes from gradient orbs and gradient fills only.
- Palette mood: cool with a warm accent. Violet + sky dominate; peach/orange is the "alert" warm that signals downward trends or warmth.
- Accent gradients are 2–3 stops, always involving **`#7C6DFF` (violet)**, **`#5B8CFF`/`#60A5FA` (sky)**, with optional **`#A78BFA` (lilac)** or **`#F0ABFC` (pink-fuchsia)** tail.

### Type
- Family: **Inter** (variable). Single family across the system.
- Weights used: 400 (rare), 500 (medium body), 600 (semibold — body emphasis, button text), 700 (bold — small caps-y badges only).
- Letter-spacing: `tracking-[0]` is explicit on headings — Inter's default tracking is overridden to `0` (no negative tightening).
- Numerals: tabular feeling though not enabled — large numerals use 600 weight.

### Spacing
- Outer page padding: `1rem` mobile, `1.5rem` desktop.
- Card padding: `1.25rem`–`1.75rem` (`p-5` to `p-7`).
- Vertical rhythm between cards: `1.25rem`–`1.5rem` (`gap-5` to `gap-6`).
- Nav item height: `3rem` (48px). Search bar height: `3.5rem` (56px). Pills/chips: `1.5rem` (24px) tall.

### Borders & corners
- All major surfaces: `border-radius: 1.5rem` (24px) or `1.65rem` (~26px).
- Inner controls (icon tiles, badges in nav): `1rem` (16px).
- Pills/badges: fully rounded (`rounded-full`).
- Borders are always **white at 55–80% alpha** — never grey, never black. Depth comes from shadow + highlight, not contrast borders.

### Shadows (elevation system)
| Token | Value | Use |
|---|---|---|
| `shadow-glass` | `0 20px 60px rgba(15,23,42,0.10)` | Default card resting state. |
| `shadow-glass-lg` | `0 28px 80px rgba(70,80,140,0.18)` | Hover/active state. |
| Accent button shadow | `0 18px 34px rgba(91,140,255,0.25)` | Gradient CTA buttons. |
| Icon-tile shadow | `0 14px 30px rgba(91,140,255,0.20)` | Small gradient icon containers. |
| Inset highlight | `inset 0 1px 0 rgba(255,255,255,0.7~0.85)` | Top-edge sheen on glass surfaces. |
| Inner glow | `inset 0 1px 26px rgba(255,255,255,0.42)` | Whole-card light bath. |

Shadows are **always blue/violet-tinted**, never neutral grey.

### Animation & motion
- All interactive elements: `transition duration-200`. Easing is the browser default (`ease`).
- Hover affordance: `-translate-y-0.5` (2px lift). Sometimes paired with `hover:brightness-105`/`110` on gradient buttons.
- Active/press: not explicitly defined — implicit return-to-rest via the same `duration-200`.
- No bounces, no spring physics, no scroll-driven animation. Quiet, dignified.

### Hover & press states
- **Nav item hover**: `bg-white/45`, `text-slate-950`, `-translate-y-0.5`.
- **Icon button hover**: `bg-white/55`, `text-slate-950`.
- **Gradient CTA hover**: `brightness-105`, `-translate-y-0.5`.
- **Tertiary text-link hover**: `brightness-110`.
- **Active nav item**: gradient background `from-[#7C6DFF]/18 to-[#60A5FA]/16`, plus a heavier shadow + top inset highlight.

### Transparency & blur — when to use
- Use white alpha (`bg-white/40` to `bg-white/68`) + heavy blur (`backdrop-blur-2xl`) for **all primary surfaces**.
- Use lower alpha (`bg-white/36`) for **nested rows inside a card** — they should feel slightly less material than the parent.
- Solid white (`bg-white`) is essentially never used. Solid color only appears in gradient buttons, the badge dot, and the avatar fallback.

### Layout rules
- Page max width: `1500px`, centered.
- Sidebar: `280px` fixed-width on `lg+`, full-bleed glass card with rounded corners (it's not edge-to-edge, it's *floating*).
- Main grid: 4-up metric cards (`xl:grid-cols-4`), then a 2-column `1fr 340px` content grid (chart + sidecar).
- Sticky/fixed elements: none in source. Everything scrolls in flow.
- "Floating" cards (e.g. report card overlapping the chart, badge widgets in margins): used sparingly to reinforce depth — they sit `-mt-8` to overlap the card behind.

### Protection gradients vs capsules
The codebase uses **capsules** (rounded chips, gradient buttons) — not the protection-gradient overlay pattern. Where text sits over a colored hero strip (the profile-card banner), the strip is itself low-contrast pastel and the avatar sits on a white ring (`ring-4 ring-white/70`) for clarity.

### Iconography summary
Lucide line icons at 1.25rem (`h-5 w-5`), `strokeWidth={2}`. See **Iconography** below.

### Charting
Recharts area chart with:
- Stroke: 4px, `linearGradient` left→right `#60A5FA → #5B8CFF → #A78BFA`, `strokeLinecap: round`.
- Fill: `linearGradient` top→bottom `#7C6DFF (0.22) → #60A5FA (0.12) → #FFFFFF (0.01)`.
- Grid: `rgba(148,163,184,0.18)`, horizontal only.
- Axis labels: `#64748B` 12px 600. No axis lines, no tick lines.
- Tooltip: a tiny floating glass card (matches the system).

---

## Iconography

**Primary system: Lucide** (`lucide-react@^0.468.0`). All UI icons in the dashboard come from this library — there is no custom icon font, no SVG sprite, no PNG iconography.

**Usage rules**
- Stroke-only line icons. Default `strokeWidth={2}`.
- Default size: `h-5 w-5` (20px) for in-line icons. `h-4 w-4` (16px) for inline-with-text and chart filter buttons. `h-6 w-6` (24px) for floating decorative widgets.
- Icon color matches surrounding text color (`text-slate-500` resting, `text-slate-950` active, `text-[#6E66FF]` accented).
- Icons sit inside **gradient tile containers** for metric cards: `12×12` (48px) rounded-2xl with `bg-gradient-to-br` and `text-white`.

**Icons in use** (from `app/page.tsx`):
`BarChart3, Bell, CalendarDays, ChevronDown, Crown, CreditCard, FileText, Filter, FolderKanban, LayoutDashboard, LineChart, Mail, MoreHorizontal, PieChart, Search, Settings, ShoppingCart, Sparkles, TrendingUp, Users, WalletCards`.

**This system uses Lucide via CDN** for HTML prototypes (`https://unpkg.com/lucide-static@latest/icons/<name>.svg`), since Lucide is open-source MIT and the codebase uses it natively. No substitution needed.

**Unicode characters used as glyphs** (in addition to Lucide):
- `↗` `↘` — trend arrows (used everywhere a metric trend is shown).
- `→` — CTA suffix arrow.
- `⌄` — chevron-down indicator inside small text contexts.
- `⌘` — keyboard shortcut hint (paired with `K`).

**No emoji.** Anywhere.

**Logo mark**: a 48px gradient-tile square with a 45°-rotated, double-stroked white diamond inside. Generated in code, recreated as SVG in `assets/logo.svg`. Wordmark "Luminous" sits next to it in Inter 600.

---

## Caveats & substitutions

- **Inter font** is referenced in `app/globals.css` as a CSS variable but no `.ttf`/`.woff2` files ship with the codebase — the project relies on the system having Inter installed or falling back. We've pulled Inter from **Google Fonts** (`fonts/`) for a guaranteed match.
- **Logo mark** is constructed from CSS gradients in the source (`<LogoMark />` in `app/page.tsx`). We've recreated it as an SVG in `assets/logo.svg` with the same color stops and inner diamond.
- The codebase is a **single dashboard page** — flows like login, settings, etc. are extrapolated for the UI kit using the same primitives, but they aren't in the source.
