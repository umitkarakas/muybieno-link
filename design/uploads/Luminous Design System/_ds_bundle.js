/* @ds-bundle: {"format":3,"namespace":"LuminousDesignSystem_019e08","components":[],"sourceHashes":{"ui_kits/luminous-dashboard/FloatingReportCard.jsx":"85c1ddb1d820","ui_kits/luminous-dashboard/MetricCard.jsx":"de8fbdd5a300","ui_kits/luminous-dashboard/Primitives.jsx":"32df6abc5807","ui_kits/luminous-dashboard/ProfileCard.jsx":"c774ee57a797","ui_kits/luminous-dashboard/RevenueChartCard.jsx":"6552c5e886be","ui_kits/luminous-dashboard/SearchHeader.jsx":"ff9a9e196ad7","ui_kits/luminous-dashboard/Sidebar.jsx":"5c7219282f32","ui_kits/luminous-dashboard/TasksCard.jsx":"0e618a353cf7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LuminousDesignSystem_019e08 = window.LuminousDesignSystem_019e08 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/luminous-dashboard/FloatingReportCard.jsx
try { (() => {
function FloatingReportCard() {
  return /*#__PURE__*/React.createElement("div", {
    className: "lum-report"
  }, /*#__PURE__*/React.createElement(Tile, {
    gradient: "brand",
    size: 48,
    style: {
      background: "linear-gradient(135deg, rgba(124,109,255,0.18), rgba(96,165,250,0.18))",
      color: "var(--color-accent-violet-deep)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "lum-report__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lum-report__name"
  }, "Q2 Report.pdf"), /*#__PURE__*/React.createElement("p", {
    className: "lum-report__sub"
  }, "Shared by Marcus Korsgaard")), /*#__PURE__*/React.createElement("div", {
    className: "lum-report__avatars"
  }, ["MK", "AL", "JS"].map((i, idx) => /*#__PURE__*/React.createElement(Avatar, {
    key: i,
    initials: i,
    size: 32,
    className: idx > 0 ? "is-stacked" : ""
  })), /*#__PURE__*/React.createElement("span", {
    className: "lum-report__more"
  }, "+3")));
}
Object.assign(window, {
  FloatingReportCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/luminous-dashboard/FloatingReportCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/luminous-dashboard/MetricCard.jsx
try { (() => {
function MetricCard({
  metric
}) {
  return /*#__PURE__*/React.createElement(GlassCard, {
    className: "lum-metric",
    hoverLift: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "lum-metric__top"
  }, /*#__PURE__*/React.createElement(Tile, {
    gradient: metric.tile,
    size: 48
  }, /*#__PURE__*/React.createElement(Icon, {
    name: metric.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("button", {
    className: "lum-metric__more",
    "aria-label": `${metric.label} menu`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    className: "lum-metric__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lum-metric__label"
  }, metric.label), /*#__PURE__*/React.createElement("p", {
    className: "lum-metric__value"
  }, metric.value), /*#__PURE__*/React.createElement("p", {
    className: `lum-metric__trend ${metric.trendTone === "negative" ? "is-negative" : ""}`
  }, metric.trend)));
}
const METRICS = [{
  label: "Total Revenue",
  value: "$24,780",
  trend: "↗ 12.5% vs last month",
  trendTone: "positive",
  icon: "wallet-cards",
  tile: "violet"
}, {
  label: "New Customers",
  value: "1,248",
  trend: "↗ 8.2% vs last month",
  trendTone: "positive",
  icon: "shopping-cart",
  tile: "sky"
}, {
  label: "Conversion Rate",
  value: "3.86%",
  trend: "↗ 4.7% vs last month",
  trendTone: "positive",
  icon: "trending-up",
  tile: "violet-fuchsia"
}, {
  label: "Avg. Order Value",
  value: "$86.24",
  trend: "↘ 2.1% vs last month",
  trendTone: "negative",
  icon: "pie-chart",
  tile: "peach"
}];
function MetricGrid() {
  return /*#__PURE__*/React.createElement("section", {
    className: "lum-metricgrid"
  }, METRICS.map(m => /*#__PURE__*/React.createElement(MetricCard, {
    key: m.label,
    metric: m
  })));
}
Object.assign(window, {
  MetricCard,
  MetricGrid,
  METRICS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/luminous-dashboard/MetricCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/luminous-dashboard/Primitives.jsx
try { (() => {
/* Lucide icon helper — wraps an <img src='...'> at consistent size + color.
   We use SVG icons via <img>, then tint via CSS mask trick so colors apply.
*/
function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 2
}) {
  // Use mask-image so currentColor applies to the icon stroke.
  const url = `${window.__lumIconBase || "assets/icons/"}${name}.svg`;
  return /*#__PURE__*/React.createElement("span", {
    className: `lum-icon ${className}`,
    style: {
      width: size,
      height: size,
      display: "inline-block",
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      backgroundColor: "currentColor",
      flexShrink: 0
    },
    "aria-hidden": "true"
  });
}
function GlassCard({
  children,
  className = "",
  style = {},
  hoverLift = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `lum-glass ${hoverLift ? "lum-glass--hover" : ""} ${className}`,
    style: style
  }, children);
}
function Tile({
  gradient = "violet",
  size = 48,
  children,
  className = "",
  style = {}
}) {
  const map = {
    violet: "var(--gradient-tile-violet)",
    sky: "var(--gradient-tile-sky)",
    "violet-fuchsia": "var(--gradient-tile-violet-fuchsia)",
    peach: "var(--gradient-tile-peach)",
    brand: "var(--gradient-brand)"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `lum-tile ${className}`,
    style: {
      width: size,
      height: size,
      background: map[gradient] || gradient,
      color: "white",
      ...style
    }
  }, children);
}
function Avatar({
  initials,
  size = 40,
  ring = false,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `lum-avatar ${ring ? "lum-avatar--ring" : ""} ${className}`,
    style: {
      width: size,
      height: size,
      fontSize: size <= 32 ? 10 : size <= 56 ? 13 : 18
    }
  }, initials);
}
function LogoMark({
  size = 48
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "lum-logo",
    style: {
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lum-logo__diamond"
  }));
}
function BackgroundDecor() {
  return /*#__PURE__*/React.createElement("div", {
    className: "lum-bgdecor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lum-orb lum-orb--violet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lum-orb lum-orb--sky"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lum-orb lum-orb--peach"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lum-streak"
  }));
}
Object.assign(window, {
  Icon,
  GlassCard,
  Tile,
  Avatar,
  LogoMark,
  BackgroundDecor
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/luminous-dashboard/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/luminous-dashboard/ProfileCard.jsx
try { (() => {
function ProfileCard() {
  return /*#__PURE__*/React.createElement(GlassCard, {
    className: "lum-profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lum-profile__banner"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lum-profile__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lum-profile__avatarwrap"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "OR",
    size: 80,
    ring: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "lum-profile__presence"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "lum-profile__name"
  }, "Olivia Rhye"), /*#__PURE__*/React.createElement("p", {
    className: "lum-profile__role"
  }, "Product Designer"), /*#__PURE__*/React.createElement("div", {
    className: "lum-profile__stats"
  }, [["128", "Projects"], ["2.4K", "Followers"], ["560", "Following"]].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("p", {
    className: "lum-profile__statv"
  }, v), /*#__PURE__*/React.createElement("p", {
    className: "lum-profile__statl"
  }, l)))), /*#__PURE__*/React.createElement("button", {
    className: "lum-cta"
  }, "View Profile \u2192")));
}
Object.assign(window, {
  ProfileCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/luminous-dashboard/ProfileCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/luminous-dashboard/RevenueChartCard.jsx
try { (() => {
// Hand-rolled SVG area chart — matches the Recharts setup in source
// (gradient stroke L→R, gradient fill T→B, horizontal grid only, floating tooltip).

const CHART_DATA = [{
  date: "May 1",
  revenue: 7400
}, {
  date: "May 6",
  revenue: 11600
}, {
  date: "May 11",
  revenue: 14200
}, {
  date: "May 16",
  revenue: 18620
}, {
  date: "May 21",
  revenue: 17100
}, {
  date: "May 26",
  revenue: 22100
}, {
  date: "May 31",
  revenue: 27800
}];
const PERIODS = ["This Month", "Last 30d", "This Quarter"];
function AreaChart({
  data,
  width = 720,
  height = 280
}) {
  const padL = 44,
    padR = 12,
    padT = 16,
    padB = 30;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const max = 30000;
  const x = i => padL + i / (data.length - 1) * w;
  const y = v => padT + h - v / max * h;
  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.revenue)}`).join(" ");
  const fillPath = `${linePath} L${x(data.length - 1)},${padT + h} L${x(0)},${padT + h} Z`;
  const ticksY = [0, 10000, 20000, 30000];
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "lum-stroke",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#60A5FA"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "55%",
    stopColor: "#5B8CFF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#A78BFA"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "lum-fill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#7C6DFF",
    stopOpacity: "0.22"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "48%",
    stopColor: "#60A5FA",
    stopOpacity: "0.12"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#FFFFFF",
    stopOpacity: "0.01"
  }))), ticksY.map(v => /*#__PURE__*/React.createElement("line", {
    key: v,
    x1: padL,
    x2: width - padR,
    y1: y(v),
    y2: y(v),
    stroke: "rgba(148,163,184,0.18)"
  })), ticksY.map(v => /*#__PURE__*/React.createElement("text", {
    key: `y-${v}`,
    x: padL - 8,
    y: y(v) + 4,
    fill: "#94A3B8",
    fontSize: "12",
    fontWeight: "600",
    textAnchor: "end"
  }, v === 0 ? "0" : `${v / 1000}K`)), data.map((d, i) => /*#__PURE__*/React.createElement("text", {
    key: d.date,
    x: x(i),
    y: height - 8,
    fill: "#64748B",
    fontSize: "12",
    fontWeight: "600",
    textAnchor: "middle"
  }, d.date)), /*#__PURE__*/React.createElement("path", {
    d: fillPath,
    fill: "url(#lum-fill)"
  }), /*#__PURE__*/React.createElement("path", {
    d: linePath,
    fill: "none",
    stroke: "url(#lum-stroke)",
    strokeWidth: "4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
function RevenueChartCard() {
  const [period, setPeriod] = React.useState(0);
  return /*#__PURE__*/React.createElement(GlassCard, {
    className: "lum-chart"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lum-chart__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lum-chart__titlerow"
  }, /*#__PURE__*/React.createElement("h1", null, "Revenue Overview"), /*#__PURE__*/React.createElement("span", {
    className: "lum-chart__legend"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lum-chart__legenddot"
  }), "Revenue")), /*#__PURE__*/React.createElement("div", {
    className: "lum-chart__valuerow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lum-chart__value"
  }, "$24,780"), /*#__PURE__*/React.createElement("span", {
    className: "lum-chart__delta"
  }, "\u2197 12.5% vs last month"))), /*#__PURE__*/React.createElement("div", {
    className: "lum-chart__controls"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lum-secbtn",
    onClick: () => setPeriod(p => (p + 1) % PERIODS.length)
  }, PERIODS[period], /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    className: "lum-iconbtn lum-iconbtn--bordered",
    "aria-label": "Filter"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "filter",
    size: 16
  })))), /*#__PURE__*/React.createElement("div", {
    className: "lum-chart__plot"
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: CHART_DATA
  }), /*#__PURE__*/React.createElement("div", {
    className: "lum-chart__tooltip"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lum-chart__tipdate"
  }, "May 16, 2024"), /*#__PURE__*/React.createElement("div", {
    className: "lum-chart__tipvalue"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lum-chart__legenddot"
  }), "$18,620"))));
}
Object.assign(window, {
  RevenueChartCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/luminous-dashboard/RevenueChartCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/luminous-dashboard/SearchHeader.jsx
try { (() => {
function SearchHeader({
  user,
  onSearchChange
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "lum-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lum-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20,
    className: "lum-search__icon"
  }), /*#__PURE__*/React.createElement("input", {
    "aria-label": "Search",
    placeholder: "Search anything...",
    onChange: e => onSearchChange?.(e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "lum-kbd"
  }, "\u2318 K")), /*#__PURE__*/React.createElement("div", {
    className: "lum-headerbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lum-iconbtn",
    "aria-label": "Notifications"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    className: "lum-headerbar__dot"
  })), /*#__PURE__*/React.createElement("span", {
    className: "lum-headerbar__divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lum-headerbar__user"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: user.initials,
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    className: "lum-headerbar__userinfo"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lum-headerbar__name"
  }, user.name), /*#__PURE__*/React.createElement("p", {
    className: "lum-headerbar__role"
  }, user.role)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 16,
    className: "lum-headerbar__chev"
  }))));
}
Object.assign(window, {
  SearchHeader
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/luminous-dashboard/SearchHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/luminous-dashboard/Sidebar.jsx
try { (() => {
const NAV = [{
  id: "dashboard",
  label: "Dashboard",
  icon: "layout-dashboard"
}, {
  id: "analytics",
  label: "Analytics",
  icon: "bar-chart-3"
}, {
  id: "projects",
  label: "Projects",
  icon: "folder-kanban"
}, {
  id: "calendar",
  label: "Calendar",
  icon: "calendar-days"
}, {
  id: "messages",
  label: "Messages",
  icon: "mail",
  badge: "3"
}, {
  id: "team",
  label: "Team",
  icon: "users"
}, {
  id: "documents",
  label: "Documents",
  icon: "file-text"
}, {
  id: "settings",
  label: "Settings",
  icon: "settings"
}];
function Sidebar({
  active,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(GlassCard, {
    className: "lum-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lum-sidebar__brand"
  }, /*#__PURE__*/React.createElement(LogoMark, null), /*#__PURE__*/React.createElement("span", {
    className: "lum-sidebar__wordmark"
  }, "Luminous")), /*#__PURE__*/React.createElement("nav", {
    className: "lum-sidebar__nav"
  }, NAV.map(item => {
    const isActive = active === item.id;
    return /*#__PURE__*/React.createElement("a", {
      key: item.id,
      href: "#",
      className: `lum-navitem ${isActive ? "is-active" : ""}`,
      onClick: e => {
        e.preventDefault();
        onNavigate(item.id);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "lum-navitem__left"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: item.icon,
      size: 20,
      className: "lum-navitem__icon"
    }), item.label), item.badge ? /*#__PURE__*/React.createElement("span", {
      className: "lum-navbadge"
    }, item.badge) : null);
  })), /*#__PURE__*/React.createElement("div", {
    className: "lum-sidebar__upsell"
  }, /*#__PURE__*/React.createElement(Tile, {
    gradient: "violet-fuchsia",
    size: 44,
    style: {
      background: "rgba(255,255,255,0.65)",
      color: "var(--color-accent-violet-deep)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.75), 0 12px 28px rgba(124,109,255,0.18)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "crown",
    size: 20
  })), /*#__PURE__*/React.createElement("h3", null, "Upgrade to Pro"), /*#__PURE__*/React.createElement("p", null, "Unlock advanced features and unlimited access."), /*#__PURE__*/React.createElement("button", {
    className: "lum-link"
  }, "Upgrade Now \u2192")));
}
Object.assign(window, {
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/luminous-dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/luminous-dashboard/TasksCard.jsx
try { (() => {
const TASKS = [{
  name: "Design System Audit",
  date: "May 24, 2024",
  priority: "High",
  icon: "sparkles",
  tone: "fuchsia"
}, {
  name: "User Research",
  date: "May 28, 2024",
  priority: "Medium",
  icon: "users",
  tone: "sky"
}, {
  name: "Dashboard Redesign",
  date: "May 31, 2024",
  priority: "Low",
  icon: "line-chart",
  tone: "emerald"
}, {
  name: "Q3 Marketing Plan",
  date: "Jun 3, 2024",
  priority: "Medium",
  icon: "trending-up",
  tone: "sky"
}, {
  name: "API Performance",
  date: "Jun 6, 2024",
  priority: "High",
  icon: "bar-chart-3",
  tone: "fuchsia"
}];
function TasksCard() {
  const [showAll, setShowAll] = React.useState(false);
  const visible = showAll ? TASKS : TASKS.slice(0, 3);
  return /*#__PURE__*/React.createElement(GlassCard, {
    className: "lum-tasks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lum-tasks__head"
  }, /*#__PURE__*/React.createElement("h2", null, "Upcoming Tasks"), /*#__PURE__*/React.createElement("button", {
    className: "lum-link",
    onClick: () => setShowAll(v => !v)
  }, showAll ? "Show Less" : "View All")), /*#__PURE__*/React.createElement("div", {
    className: "lum-tasks__list"
  }, visible.map(t => /*#__PURE__*/React.createElement("div", {
    className: "lum-taskrow",
    key: t.name
  }, /*#__PURE__*/React.createElement("div", {
    className: `lum-taskrow__icon lum-taskrow__icon--${t.tone}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "lum-taskrow__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lum-taskrow__name"
  }, t.name), /*#__PURE__*/React.createElement("p", {
    className: "lum-taskrow__date"
  }, t.date)), /*#__PURE__*/React.createElement("span", {
    className: `lum-tag lum-tag--${t.tone}`
  }, t.priority)))));
}
Object.assign(window, {
  TasksCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/luminous-dashboard/TasksCard.jsx", error: String((e && e.message) || e) }); }

})();
