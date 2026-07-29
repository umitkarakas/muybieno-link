import React from 'react';

/**
 * Crisp white surface card with warm hairline + soft elevation.
 */
export function Card({ pad = 20, hover = false, children, style, ...rest }) {
  return (
    <div
      style={{
        background: 'var(--surface-card)', border: '1px solid var(--line)',
        borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)',
        padding: pad, transition: 'transform .2s ease, box-shadow .2s ease', ...style,
      }}
      onMouseEnter={hover ? (e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; } : undefined}
      onMouseLeave={hover ? (e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
