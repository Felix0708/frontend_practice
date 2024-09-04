// src/app/scraps/scraps.css.ts
import { style } from '@vanilla-extract/css';

export const title = style({
  textAlign: 'center',
  margin: '2rem 0',
});

export const section = style({
  margin: '2rem 0',
});

export const subtitle = style({
  fontSize: '1.5rem',
  marginBottom: '1rem',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1rem',
  padding: '1rem',
});

export const card = style({
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  textAlign: 'center',
  padding: '8px',
  boxSizing: 'border-box',
});

export const image = style({
  width: '100%',
  height: 'auto',
  display: 'block',
  objectFit: 'cover',
});

export const video = style({
  width: '100%',
  height: 'auto',
});

export const text = style({
  marginTop: '0.5rem',
  fontSize: '0.9rem',
  color: '#333',
});