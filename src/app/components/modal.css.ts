// src/components/modal.css.ts
import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const modal = style({
  background: '#fff',
  borderRadius: '0.7rem',
  padding: "2rem 2rem 0 2rem",
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  position: 'relative',
});

export const modalImage = style({
  width: '100%',
  height: 'auto',
  display: 'block',
});

export const closeButton = style({
  position: 'absolute',
  top: '0.8%',
  right: '1%',
  background: 'transparent',
  border: 'none',
  fontSize: '100%',
  cursor: 'pointer',
});
