# Luminous Dashboard — UI Kit

A pixel-faithful recreation of the **Luminous** SaaS analytics dashboard from the source codebase.

## Source
- Codebase: `Light Glassmorphism + Depth UI/app/page.tsx` (single-page Next.js app)
- Tokens: `colors_and_type.css`
- Icons: `assets/icons/` (Lucide, copied from `lucide-react`)

## Components
- `Sidebar.jsx` — left nav with logo, items, Pro upsell
- `SearchHeader.jsx` — top search bar + bell + user dropdown
- `MetricCard.jsx` — 4-up KPI cards with gradient icon tiles
- `RevenueChartCard.jsx` — area chart with gradient stroke + floating tooltip
- `ProfileCard.jsx` — banner + avatar + 3-stat grid + CTA
- `TasksCard.jsx` — list of priority-tagged tasks
- `FloatingReportCard.jsx` — overlapping floating card with avatar stack
- `Primitives.jsx` — `GlassCard`, `Avatar`, `Tile`, `BackgroundDecor`, `LogoMark`

## Click-thru
- Click any sidebar item to switch the active state.
- Hover any card or button to see the lift/brighten transition.
- Click the date filter to cycle through periods (`This Month` → `Last 30d` → `This Quarter`).
- Click `View All` on Tasks to expand the list.
- Click the gradient `Upgrade Now` to see the pressed state.

## What's NOT here
The source is a single page; flows like login, settings, project detail are not in the codebase. Stay within the dashboard surface or extend by re-using the primitives (`GlassCard`, `Tile`, gradient tokens).
