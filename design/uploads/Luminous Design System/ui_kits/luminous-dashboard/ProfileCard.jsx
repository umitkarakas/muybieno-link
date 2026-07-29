function ProfileCard() {
  return (
    <GlassCard className="lum-profile">
      <div className="lum-profile__banner" />
      <div className="lum-profile__body">
        <div className="lum-profile__avatarwrap">
          <Avatar initials="OR" size={80} ring />
          <span className="lum-profile__presence" />
        </div>
        <h2 className="lum-profile__name">Olivia Rhye</h2>
        <p className="lum-profile__role">Product Designer</p>
        <div className="lum-profile__stats">
          {[["128","Projects"],["2.4K","Followers"],["560","Following"]].map(([v,l]) => (
            <div key={l}>
              <p className="lum-profile__statv">{v}</p>
              <p className="lum-profile__statl">{l}</p>
            </div>
          ))}
        </div>
        <button className="lum-cta">View Profile →</button>
      </div>
    </GlassCard>
  );
}

Object.assign(window, { ProfileCard });
