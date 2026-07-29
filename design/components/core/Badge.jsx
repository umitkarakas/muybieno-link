import React from 'react';

/**
 * Small status / category label. Use for product flags, eyebrows, on-image tags.
 */
export function Badge({ variant = 'soft', children, style, ...rest }) {
  const variants = {
    soft:     { background: 'rgba(174,142,110,0.18)', color: 'var(--color-accent-deep)', border: '1px solid rgba(123,79,39,0.30)' },
    solid:    { background: 'var(--color-accent-deep)', color: 'var(--cream-100)', border: 'none' },
    onImage:  { background: 'rgba(251,243,231,0.92)', color: 'var(--color-primary)', border: 'none' },
    eyebrow:  { background: 'transparent', color: 'var(--color-accent)', border: 'none' },
  };
  const v = variants[variant] || variants.soft;
  const isEyebrow = variant === 'eyebrow';
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: isEyebrow ? 0 : '5px 11px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: isEyebrow ? 12 : 11,
        fontWeight: isEyebrow ? 700 : 800,
        letterSpacing: isEyebrow ? '0.16em' : '0.03em',
        textTransform: isEyebrow ? 'uppercase' : 'none',
        ...v, ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
