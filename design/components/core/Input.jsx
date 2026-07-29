import React from 'react';
import { maskStyle, ICONS } from './icons.js';

/**
 * Text input with optional leading icon, on warm latte surface.
 */
export function Input({ icon, placeholder, value, onChange, type = 'text', style, ...rest }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, height: 50, padding: '0 16px',
      borderRadius: 'var(--radius-md)', background: 'var(--surface-latte)',
      border: '1px solid var(--line)', ...style,
    }}>
      {icon ? <span style={maskStyle(ICONS[icon] || icon, 18, 'var(--text-placeholder)')} /> : null}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
          color: 'var(--text-heading)',
        }}
        {...rest}
      />
    </div>
  );
}
