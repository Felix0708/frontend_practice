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
  const [searchPage, setSearchPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  
  // 검색 상태 관리
  const [query, setQuery] = useState('');
  const [orientation, setOrientation] = useState('');
  const [color, setColor] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드인지 여부

  const { photos: scrappedPhotos, scrapPhoto } = useScrapStore(); // zustand 훅에서 스크랩 기능 가져오기
  const { showMessage, clearMessage } = useNotificationStore();

  const fetchPhotos = async (pageNumber: number) => {
    setLoading(true);
    let url = isSearchMode
      ? `${PHOTOS_SEARCH_API_URL}?query=${query}&orientation=${orientation}&color=${color}&page=${pageNumber}`
      : `${PHOTOS_CURATED_API_URL}?page=${pageNumber}`;
    
    console.log(url)
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
      },
    });
    const data = await response.json();
    console.log(data)
    // 검색 결과가 없고, 첫 번째 페이지에서만 큐레이션 호출
    if (isSearchMode && data.photos.length === 0 && pageNumber === 1) {
      showMessage('검색 결과가 없습니다. 다시 검색해주십시오');
    }
    else if (isSearchMode && data.photos.length !== 0 && pageNumber === 1) {
      setPhotos([]); // 기존 사진 리스트 초기화
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
    } 
    else {
      // 검색 결과나 큐레이션 사진을 페이지에 추가
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos(page);
  }, [page, isSearchMode]);

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

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    if (!query.trim()) { // query가 비어있을 경우
      showMessage('검색어를 입력해주세요.');
      return;
    }
    console.log('Search triggered with query:', query); // 디버깅용 로그
    setIsSearchMode(true); // 검색 모드 활성화
    setPage(1); // 페이지 초기화
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // 엔터를 누르면 검색 실행
    }
  };

  useEffect(() => {
    return () => {
      clearMessage(); // 페이지를 떠날 때 알림 초기화
    };
  }, [clearMessage]);

  useEffect(() => {
    console.log(isSearchMode);
    console.log(page);
  }, [isSearchMode, page]);

  return (
    <div>
      <Toast /> {/* 알림 메시지 표시 */}
      <div className={styles.header}>
        <h1 className={styles.title}>Photo List</h1>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search photos..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // 엔터 감지 이벤트 추가
            className={styles.searchInput}
          />
          <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            <option value="">Orientation</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>
          </select>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">Color</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="turquoise">Turquoise</option>
            <option value="blue">Blue</option>
            <option value="violet">Violet</option>
            <option value="pink">Pink</option>
            <option value="brown">Brown</option>
            <option value="black">Black</option>
            <option value="gray">Gray</option>
            <option value="white">White</option>
          </select>
          <button onClick={handleSearch} className={styles.searchButton}>Search</button>
        </div>
      </div>

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