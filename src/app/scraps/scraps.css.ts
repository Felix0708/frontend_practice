// src/app/scraps/scraps.css.ts
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between', // 제목과 검색창을 양쪽에 배치
  // alignItems: 'center',
  marginBottom: '3vh',
});

export const title = style({
  // textAlign: 'center',
  margin: '2vh 0 2vh 1vw',
});

export const headerRightContents = style({
  margin: '6vh 1vw 0 0',
});

export const backButton = style({
  padding: '0.5rem 1rem',
  backgroundColor: '#ff6b6b', // 버튼 색상
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
});

export const section = style({
  marginBottom: '1vh',
});

export const subtitle = style({
  fontSize: '1.5rem',
  margin: '0 0 1vh 1vw',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr);', // 카드 크기 조정
  gap: '1.5vw', // 카드 간격 설정
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // 버튼과 설명을 적절히 분리
  alignItems: 'center',
  padding: '0.8rem',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  maxWidth: '200px',
  width: '250px', /* 카드의 가로 너비 고정 */
  height: '300px', // 카드 높이 고정
});

export const image = style({
  width: '100%',
  height: '150px', // 이미지 높이 고정
  objectFit: 'cover', // 이미지 비율 유지
  borderRadius: '8px',
  marginBottom: '0.5vh',
});

export const video = style({
  width: '100%',
  height: '150px', // 이미지 높이 고정
  objectFit: 'cover', // 이미지 비율 유지
  borderRadius: '8px',
  marginBottom: '0.5vh',
});

export const text = style({
  marginTop: '0.3vh',
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
  marginTop: '1.5vh',
});

export const pageButton = style({
  padding: '0.6rem 1rem 0.6rem 1rem',
  margin: '0 0.5vw',
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
  margin: '0 0.5vw',
  border: 'none',
  backgroundColor: '#e0e0e0',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '1.2rem',
});