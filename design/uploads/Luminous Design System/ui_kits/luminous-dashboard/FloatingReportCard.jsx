function FloatingReportCard() {
  return (
    <div className="lum-report">
      <Tile gradient="brand" size={48} style={{ background: "linear-gradient(135deg, rgba(124,109,255,0.18), rgba(96,165,250,0.18))", color: "var(--color-accent-violet-deep)" }}>
        <Icon name="file-text" size={20} />
      </Tile>
      <div className="lum-report__body">
        <p className="lum-report__name">Q2 Report.pdf</p>
        <p className="lum-report__sub">Shared by Marcus Korsgaard</p>
      </div>
      <div className="lum-report__avatars">
        {["MK","AL","JS"].map((i, idx) => (
          <Avatar key={i} initials={i} size={32} className={idx > 0 ? "is-stacked" : ""} />
        ))}
        <span className="lum-report__more">+3</span>
      </div>
    </div>
  );
}

Object.assign(window, { FloatingReportCard });
