"use client";

import { useScrapStore } from '../../store/scrapStore';
import { useNotificationStore } from '../../store/notificationStore'; // 알림 상태 추가
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as styles from './videos.css';
import DetailModal from '../components/detailModal';
import Toast from '../components/toast';

const VIDEOS_POPULAR_API_URL = 'https://api.pexels.com/videos/popular';
const VIDEOS_SEARCH_API_URL = 'https://api.pexels.com/videos/search';

const VideosPage = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  // 검색 상태 관리
  const [query, setQuery] = useState('');
  const [orientation, setOrientation] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드인지 여부

  const { videos: scrappedVideos, scrapVideo } = useScrapStore(); // zustand 훅에서 스크랩 기능 가져오기
  const { showMessage, clearMessage } = useNotificationStore();
  
  const fetchVideos = async (pageNumber: number) => {
    setLoading(true);
    let url = isSearchMode
      ? `${VIDEOS_SEARCH_API_URL}?query=${query}&orientation=${orientation}&page=${pageNumber}`
      : `${VIDEOS_POPULAR_API_URL}?page=${pageNumber}`;
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
      },
    });
    const data = await response.json();
    // 검색 결과가 없고, 첫 번째 페이지에서만 큐레이션 호출
    if (isSearchMode && data.videos.length === 0 && pageNumber === 1) {
      setIsSearchMode(false); // 검색 모드를 활성화
      showMessage('검색 결과가 없습니다. 다시 검색해주십시오');
    }
    else if (isSearchMode && data.videos.length !== 0 && pageNumber === 1) {
      setVideos([]); // 기존 비디오 리스트 초기화
      setVideos((prevVideos) => [...prevVideos, ...data.videos]);
    } 
    else {
      // 검색 결과나 큐레이션 비디오을 페이지에 추가
      setVideos((prevVideos) => [...prevVideos, ...data.videos]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos(page);
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

  const openModal = (video: any) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleScrap = (video: any) => {
    const isAlreadyScrapped = scrappedVideos.some((scrap) => scrap.id === video.id); // 스크랩된 사진 배열에서 확인

    if (isAlreadyScrapped) {
      showMessage('이미 스크랩된 게시물입니다.'); // 이미 스크랩된 경우 알림
    } else {
      scrapVideo({ id: video.id, type: 'video', data: video }); // 새로운 스크랩
      showMessage('스크랩 완료!'); // 스크랩 완료 메시지
    }
  };

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    if (!query.trim()) { // query가 비어있을 경우
      showMessage('검색어를 입력해주세요.');
      return;
    }
    setIsSearchMode(true); // 검색 모드 활성화
    setPage(1); // 페이지 초기화
  };

  useEffect(() => {
    return () => {
      clearMessage(); // 페이지를 떠날 때 알림 초기화
    };
  }, [clearMessage]);

  return (
    <div>
      <Toast /> {/* 알림 메시지 표시 */}
      <div className={styles.header}>
        <h1 className={styles.title}>Video List</h1>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search videos..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            <option value="">Orientation</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>
          </select>
          <button onClick={handleSearch} className={styles.searchButton}>Search</button>
        </div>
      </div>

      <div className={styles.videoGrid}>
        {videos.map((video) => (
          <div key={uuidv4()} className={styles.videoCard}>
            <img 
              src={video.image} 
              alt={video.user.name} 
              className={styles.videoThumbnail}
              onClick={() => openModal(video)}
            />
            <p className={styles.videoText}>{video.user.name}</p>
            <button 
              className={styles.scrapButton}
              onClick={() => handleScrap(video)}
            >
              Scrap
            </button>
          </div>
        ))}
      </div>
      {loading && <p className={styles.loadingText}>Loading...</p>}
      {selectedVideo && <DetailModal type="video" data={selectedVideo} onClose={closeModal} />}
    </div>
  );
};

export default VideosPage;