// Hand-rolled SVG area chart — matches the Recharts setup in source
// (gradient stroke L→R, gradient fill T→B, horizontal grid only, floating tooltip).

const CHART_DATA = [
  { date: "May 1",  revenue: 7400 },
  { date: "May 6",  revenue: 11600 },
  { date: "May 11", revenue: 14200 },
  { date: "May 16", revenue: 18620 },
  { date: "May 21", revenue: 17100 },
  { date: "May 26", revenue: 22100 },
  { date: "May 31", revenue: 27800 },
];

const PERIODS = ["This Month", "Last 30d", "This Quarter"];

function AreaChart({ data, width = 720, height = 280 }) {
  const padL = 44, padR = 12, padT = 16, padB = 30;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const max = 30000;
  const x = (i) => padL + (i / (data.length - 1)) * w;
  const y = (v) => padT + h - (v / max) * h;
  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.revenue)}`).join(" ");
  const fillPath = `${linePath} L${x(data.length - 1)},${padT + h} L${x(0)},${padT + h} Z`;
  const ticksY = [0, 10000, 20000, 30000];
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lum-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="55%" stopColor="#5B8CFF" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="lum-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C6DFF" stopOpacity="0.22" />
          <stop offset="48%" stopColor="#60A5FA" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {/* horizontal grid */}
      {ticksY.map((v) => (
        <line key={v} x1={padL} x2={width - padR} y1={y(v)} y2={y(v)} stroke="rgba(148,163,184,0.18)" />
      ))}
      {/* y axis labels */}
      {ticksY.map((v) => (
        <text key={`y-${v}`} x={padL - 8} y={y(v) + 4} fill="#94A3B8" fontSize="12" fontWeight="600" textAnchor="end">
          {v === 0 ? "0" : `${v / 1000}K`}
        </text>
      ))}
      {/* x axis labels */}
      {data.map((d, i) => (
        <text key={d.date} x={x(i)} y={height - 8} fill="#64748B" fontSize="12" fontWeight="600" textAnchor="middle">
          {d.date}
        </text>
      ))}
      <path d={fillPath} fill="url(#lum-fill)" />
      <path d={linePath} fill="none" stroke="url(#lum-stroke)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RevenueChartCard() {
  const [period, setPeriod] = React.useState(0);
  return (
    <GlassCard className="lum-chart">
      <div className="lum-chart__head">
        <div>
          <div className="lum-chart__titlerow">
            <h1>Revenue Overview</h1>
            <span className="lum-chart__legend">
              <span className="lum-chart__legenddot" />
              Revenue
            </span>
          </div>
          <div className="lum-chart__valuerow">
            <span className="lum-chart__value">$24,780</span>
            <span className="lum-chart__delta">↗ 12.5% vs last month</span>
          </div>
        </div>
        <div className="lum-chart__controls">
          <button className="lum-secbtn" onClick={() => setPeriod((p) => (p + 1) % PERIODS.length)}>
            {PERIODS[period]}
            <Icon name="chevron-down" size={16} />
          </button>
          <button className="lum-iconbtn lum-iconbtn--bordered" aria-label="Filter">
            <Icon name="filter" size={16} />
          </button>
        </div>
      </div>
      <div className="lum-chart__plot">
        <AreaChart data={CHART_DATA} />
        <div className="lum-chart__tooltip">
          <p className="lum-chart__tipdate">May 16, 2024</p>
          <div className="lum-chart__tipvalue">
            <span className="lum-chart__legenddot" />
            $18,620
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

Object.assign(window, { RevenueChartCard });
