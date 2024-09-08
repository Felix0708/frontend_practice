// src/components/toast.css.ts
import { style } from '@vanilla-extract/css';

export const toast = style({
  position: 'fixed',
  top: '20px',
  right: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '8px',
  zIndex: 1000,
  opacity: 0.9,
});