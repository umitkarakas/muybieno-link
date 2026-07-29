const TASKS = [
  { name: "Design System Audit", date: "May 24, 2024", priority: "High",   icon: "sparkles",    tone: "fuchsia" },
  { name: "User Research",       date: "May 28, 2024", priority: "Medium", icon: "users",       tone: "sky" },
  { name: "Dashboard Redesign",  date: "May 31, 2024", priority: "Low",    icon: "line-chart",  tone: "emerald" },
  { name: "Q3 Marketing Plan",   date: "Jun 3, 2024",  priority: "Medium", icon: "trending-up", tone: "sky" },
  { name: "API Performance",     date: "Jun 6, 2024",  priority: "High",   icon: "bar-chart-3", tone: "fuchsia" },
];

function TasksCard() {
  const [showAll, setShowAll] = React.useState(false);
  const visible = showAll ? TASKS : TASKS.slice(0, 3);
  return (
    <GlassCard className="lum-tasks">
      <div className="lum-tasks__head">
        <h2>Upcoming Tasks</h2>
        <button className="lum-link" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
      <div className="lum-tasks__list">
        {visible.map((t) => (
          <div className="lum-taskrow" key={t.name}>
            <div className={`lum-taskrow__icon lum-taskrow__icon--${t.tone}`}>
              <Icon name={t.icon} size={16} />
            </div>
            <div className="lum-taskrow__body">
              <p className="lum-taskrow__name">{t.name}</p>
              <p className="lum-taskrow__date">{t.date}</p>
            </div>
            <span className={`lum-tag lum-tag--${t.tone}`}>{t.priority}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

Object.assign(window, { TasksCard });
