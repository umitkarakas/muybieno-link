import React from 'react';

export interface InputProps {
  /** Leading icon key from ICONS (e.g. 'search', 'mail'). Optional. */
  icon?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
