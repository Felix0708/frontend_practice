// src/components/Modal.css.ts
import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 배경
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000, // 상단에 표시되도록
});

export const modal = style({
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '300px',
  textAlign: 'center',
});

export const message = style({
  marginBottom: '1.5rem',
  fontSize: '1rem',
});

export const buttons = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const cancelButton = style({
  padding: '0.5rem 1rem',
  backgroundColor: '#ccc',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const confirmButton = style({
  padding: '0.5rem 1rem',
  backgroundColor: '#ff4d4d',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});