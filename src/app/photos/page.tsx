"use client";

import { useScrapStore } from '../../store/scrapStore';
import { useNotificationStore } from '../../store/notificationStore'; // 알림 상태 추가
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as styles from './photos.css';
import DetailModal from '../components/detailModal';
import Toast from '../components/toast';

const PHOTOS_CURATED_API_URL = 'https://api.pexels.com/v1/curated';
const PHOTOS_SEARCH_API_URL = 'https://api.pexels.com/v1/search';

const PhotosPage = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  
  const { photos: scrappedPhotos, scrapPhoto } = useScrapStore(); // zustand 훅에서 스크랩 기능 가져오기
  const { showMessage, clearMessage } = useNotificationStore();

  const fetchCuratedPhotos = async (pageNumber: number) => {
    setLoading(true);
    const response = await fetch(`${PHOTOS_CURATED_API_URL}?page=${pageNumber}`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
      },
    });
    const data = await response.json();
    setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCuratedPhotos(page);
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  const openModal = (photo: any) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };
  
  // 스크랩 버튼 클릭 시 동작
  const handleScrap = (photo: any) => {
    const isAlreadyScrapped = scrappedPhotos.some((scrap) => scrap.id === photo.id); // 스크랩된 사진 배열에서 확인

    if (isAlreadyScrapped) {
      showMessage('이미 스크랩된 게시물입니다.'); // 이미 스크랩된 경우 알림
    } else {
      scrapPhoto({ id: photo.id, type: 'photo', data: photo }); // 새로운 스크랩
      showMessage('스크랩 완료!'); // 스크랩 완료 메시지
    }
  };

  useEffect(() => {
    return () => {
      clearMessage(); // 페이지를 떠날 때 알림 초기화
    };
  }, [clearMessage]);

  return (
    <div>
      <Toast /> {/* 알림 메시지 표시 */}
      <h1 className={styles.title}>Photo List</h1>
      <div className={styles.photoGrid}>
        {photos.map((photo) => (
          <div key={uuidv4()} className={styles.photoCard}>
            <img 
              src={photo.src.medium} 
              alt={photo.photographer} 
              className={styles.photoImage}
              onClick={() => openModal(photo)}
            />
            <p className={styles.photoText}>{photo.photographer}</p>
            <button
              className={styles.scrapButton}
              onClick={() => handleScrap(photo)}
            >
              Scrap
            </button>
          </div>
        ))}
      </div>
      {loading && <p className={styles.loadingText}>Loading...</p>}
      {selectedPhoto && <DetailModal type="photo" data={selectedPhoto} onClose={closeModal} />}
    </div>
  );
};

export default PhotosPage;