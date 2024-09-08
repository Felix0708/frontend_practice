// src/app/scraps/scraps.css.ts
import { style } from '@vanilla-extract/css';

export const title = style({
  fontSize: '2rem',
  marginBottom: '1.5rem',
});

export const section = style({
  marginBottom: '2rem',
});

export const subtitle = style({
  fontSize: '1.5rem',
  marginBottom: '1rem',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr);', // 카드 크기 조정
  gap: '1.5rem', // 카드 간격 설정
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // 버튼과 설명을 적절히 분리
  alignItems: 'center',
  padding: '0.8rem',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  maxWidth: '200px',
  height: '300px', // 카드 높이 고정
  // ':hover': {
  //   transform: 'translateY(-5px)',
  //   boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
  // },
});

export const image = style({
  width: '100%',
  height: '150px', // 이미지 높이 고정
  objectFit: 'cover', // 이미지 비율 유지
  borderRadius: '8px',
  marginBottom: '0.5rem',
});

export const video = style({
  width: '100%',
  height: '150px', // 이미지 높이 고정
  objectFit: 'cover', // 이미지 비율 유지
  borderRadius: '8px',
  marginBottom: '0.5rem',
});

export const text = style({
  marginTop: '0.3rem',
  fontSize: '0.9rem',
  textAlign: 'center',
});

export const removeButton = style({
  padding: '0.4rem 0.8rem',
  backgroundColor: '#ff4d4d',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  width: '90%',
  textAlign: 'center',
});

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '1rem',
});

export const pageButton = style({
  padding: '0.6rem 1rem 0.6rem 1rem',
  margin: '0 0.5rem',
  border: 'none',
  backgroundColor: '#e0e0e0',
  cursor: 'pointer',
  borderRadius: '5px',
});

export const active = style({
  backgroundColor: '#ff4d4d',
  color: '#fff',
});

export const arrowButton = style({
  padding: '0.3rem 0.7rem 0.5rem 0.7rem',
  margin: '0 0.5rem',
  border: 'none',
  backgroundColor: '#e0e0e0',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '1.2rem',
});