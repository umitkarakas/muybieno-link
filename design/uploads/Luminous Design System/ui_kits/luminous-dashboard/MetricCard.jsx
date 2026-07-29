function MetricCard({ metric }) {
  return (
    <GlassCard className="lum-metric" hoverLift>
      <div className="lum-metric__top">
        <Tile gradient={metric.tile} size={48}>
          <Icon name={metric.icon} size={20} />
        </Tile>
        <button className="lum-metric__more" aria-label={`${metric.label} menu`}>
          <Icon name="more-horizontal" size={20} />
        </button>
      </div>
      <div className="lum-metric__body">
        <p className="lum-metric__label">{metric.label}</p>
        <p className="lum-metric__value">{metric.value}</p>
        <p className={`lum-metric__trend ${metric.trendTone === "negative" ? "is-negative" : ""}`}>
          {metric.trend}
        </p>
      </div>
    </GlassCard>
  );
}

const METRICS = [
  { label: "Total Revenue",    value: "$24,780", trend: "↗ 12.5% vs last month", trendTone: "positive", icon: "wallet-cards",  tile: "violet" },
  { label: "New Customers",    value: "1,248",   trend: "↗ 8.2% vs last month",  trendTone: "positive", icon: "shopping-cart", tile: "sky" },
  { label: "Conversion Rate",  value: "3.86%",   trend: "↗ 4.7% vs last month",  trendTone: "positive", icon: "trending-up",   tile: "violet-fuchsia" },
  { label: "Avg. Order Value", value: "$86.24",  trend: "↘ 2.1% vs last month",  trendTone: "negative", icon: "pie-chart",     tile: "peach" },
];

function MetricGrid() {
  return (
    <section className="lum-metricgrid">
      {METRICS.map((m) => <MetricCard key={m.label} metric={m} />)}
    </section>
  );
}

Object.assign(window, { MetricCard, MetricGrid, METRICS });
