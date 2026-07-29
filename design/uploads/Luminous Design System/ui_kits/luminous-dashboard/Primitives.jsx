/* Lucide icon helper — wraps an <img src='...'> at consistent size + color.
   We use SVG icons via <img>, then tint via CSS mask trick so colors apply.
*/
function Icon({ name, size = 20, className = "", strokeWidth = 2 }) {
  // Use mask-image so currentColor applies to the icon stroke.
  const url = `${window.__lumIconBase || "assets/icons/"}${name}.svg`;
  return (
    <span
      className={`lum-icon ${className}`}
      style={{
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
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}

function GlassCard({ children, className = "", style = {}, hoverLift = false }) {
  return (
    <div
      className={`lum-glass ${hoverLift ? "lum-glass--hover" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function Tile({ gradient = "violet", size = 48, children, className = "", style = {} }) {
  const map = {
    violet: "var(--gradient-tile-violet)",
    sky: "var(--gradient-tile-sky)",
    "violet-fuchsia": "var(--gradient-tile-violet-fuchsia)",
    peach: "var(--gradient-tile-peach)",
    brand: "var(--gradient-brand)",
  };
  return (
    <div
      className={`lum-tile ${className}`}
      style={{
        width: size,
        height: size,
        background: map[gradient] || gradient,
        color: "white",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Avatar({ initials, size = 40, ring = false, className = "" }) {
  return (
    <span
      className={`lum-avatar ${ring ? "lum-avatar--ring" : ""} ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size <= 32 ? 10 : size <= 56 ? 13 : 18,
      }}
    >
      {initials}
    </span>
  );
}

function LogoMark({ size = 48 }) {
  return (
    <div className="lum-logo" style={{ width: size, height: size }}>
      <div className="lum-logo__diamond" />
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div className="lum-bgdecor" aria-hidden="true">
      <div className="lum-orb lum-orb--violet" />
      <div className="lum-orb lum-orb--sky" />
      <div className="lum-orb lum-orb--peach" />
      <div className="lum-streak" />
    </div>
  );
}

Object.assign(window, { Icon, GlassCard, Tile, Avatar, LogoMark, BackgroundDecor });
