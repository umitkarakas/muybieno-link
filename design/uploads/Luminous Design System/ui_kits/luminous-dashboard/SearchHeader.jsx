function SearchHeader({ user, onSearchChange }) {
  return (
    <header className="lum-header">
      <div className="lum-search">
        <Icon name="search" size={20} className="lum-search__icon" />
        <input
          aria-label="Search"
          placeholder="Search anything..."
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <span className="lum-kbd">⌘ K</span>
      </div>

      <div className="lum-headerbar">
        <button className="lum-iconbtn" aria-label="Notifications">
          <Icon name="bell" size={20} />
          <span className="lum-headerbar__dot" />
        </button>
        <span className="lum-headerbar__divider" />
        <div className="lum-headerbar__user">
          <Avatar initials={user.initials} size={40} />
          <div className="lum-headerbar__userinfo">
            <p className="lum-headerbar__name">{user.name}</p>
            <p className="lum-headerbar__role">{user.role}</p>
          </div>
          <Icon name="chevron-down" size={16} className="lum-headerbar__chev" />
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { SearchHeader });
