const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "analytics", label: "Analytics", icon: "bar-chart-3" },
  { id: "projects", label: "Projects", icon: "folder-kanban" },
  { id: "calendar", label: "Calendar", icon: "calendar-days" },
  { id: "messages", label: "Messages", icon: "mail", badge: "3" },
  { id: "team", label: "Team", icon: "users" },
  { id: "documents", label: "Documents", icon: "file-text" },
  { id: "settings", label: "Settings", icon: "settings" },
];

function Sidebar({ active, onNavigate }) {
  return (
    <GlassCard className="lum-sidebar">
      <div className="lum-sidebar__brand">
        <LogoMark />
        <span className="lum-sidebar__wordmark">Luminous</span>
      </div>

      <nav className="lum-sidebar__nav">
        {NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href="#"
              className={`lum-navitem ${isActive ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
            >
              <span className="lum-navitem__left">
                <Icon name={item.icon} size={20} className="lum-navitem__icon" />
                {item.label}
              </span>
              {item.badge ? <span className="lum-navbadge">{item.badge}</span> : null}
            </a>
          );
        })}
      </nav>

      <div className="lum-sidebar__upsell">
        <Tile gradient="violet-fuchsia" size={44} style={{ background: "rgba(255,255,255,0.65)", color: "var(--color-accent-violet-deep)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.75), 0 12px 28px rgba(124,109,255,0.18)" }}>
          <Icon name="crown" size={20} />
        </Tile>
        <h3>Upgrade to Pro</h3>
        <p>Unlock advanced features and unlimited access.</p>
        <button className="lum-link">Upgrade Now →</button>
      </div>
    </GlassCard>
  );
}

Object.assign(window, { Sidebar });
