// src/app/videos/videos.css.ts
import { style } from '@vanilla-extract/css';

export const title = style({
  textAlign: 'center',
  margin: '2rem 0 0 0',
});

export const videoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '3rem', // 카드 간의 공백
  padding: '2rem',
});

export const videoCard = style({
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  textAlign: 'center',
  padding: '8px', // 카드 내부 여백
  boxSizing: 'border-box', // padding과 border가 width에 포함되도록 설정
});

export const videoThumbnail = style({
  width: '100%',
  height: 'auto',
  display: 'block',
  objectFit: 'cover', // 이미지를 카드의 영역에 맞게 잘라서 채우기
});

export const videoText = style({
  margin: '0.7rem 0 0.2rem 0', // 텍스트 상하 공백
  fontSize: '0.8rem',
  color: '#333',
});

export const loadingText = style({
  textAlign: 'center',
});