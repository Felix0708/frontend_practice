// src/app/photos/photos.css.ts
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between', // 제목과 검색창을 양쪽에 배치
  alignItems: 'center',
  marginBottom: '2rem',
});

export const searchContainer = style({
  display: 'flex',
  gap: '0.5rem',
  margin: '5rem 3.5rem 0 0',
});

export const searchInput = style({
  padding: '0.5rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
});

export const searchButton = style({
  padding: '0.5rem 1rem',
  backgroundColor: 'green',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
});

export const title = style({
  textAlign: 'center',
  margin: '2rem 0 2rem 4rem',
});

export const photoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr);', // 카드 크기 조정
  gap: '1.5rem', // 카드 간격 설정
});

export const photoCard = style({
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
  height: '300px', // 카드 높이 고정
  width: '250px', /* 카드의 가로 너비 고정 */
});

export const photoImage = style({
  width: '100%',
  height: '150px', // 이미지 높이 고정
  objectFit: 'cover', // 이미지 비율 유지
  borderRadius: '8px',
  marginBottom: '0.5rem',
});

export const photoText = style({
  marginTop: '0.3rem',
  fontSize: '0.9rem',
  textAlign: 'center',
});

export const loadingText = style({
  textAlign: 'center',
});

export const scrapButton = style({
  padding: '0.4rem 0.8rem',
  backgroundColor: 'blue',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  width: '90%',
  textAlign: 'center',
});
