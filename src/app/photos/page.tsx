"use client";

import { useScrapStore } from '../../store/scrapStore';
import { useNotificationStore } from '../../store/notificationStore'; // 알림 상태 추가
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 가져오기
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from "@tanstack/react-query";
import * as styles from './photos.css';
import DetailModal from '../components/detailModal';
import Toast from '../components/toast';

const PHOTOS_CURATED_API_URL = 'https://api.pexels.com/v1/curated';
const PHOTOS_SEARCH_API_URL = 'https://api.pexels.com/v1/search';

const fetchPhotos = async (url: string, pageNumber: number) => {
  const response = await fetch(`${url}?page=${pageNumber}`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
    },
  });
  return response.json();
};

const PhotosPage = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [curatedPage, setCuratedPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  
  // 검색 상태 관리
  const [query, setQuery] = useState('');
  const [orientation, setOrientation] = useState('');
  const [color, setColor] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(3); // 검색 모드인지 여부 1: 검색모드 활성 2: 중간 3: 검색모드 비활성

  const { photos: scrappedPhotos, scrapPhoto } = useScrapStore(); // zustand 훅에서 스크랩 기능 가져오기
  const { showMessage, clearMessage } = useNotificationStore();

  const router = useRouter(); // 라우터 훅 사용

  // 메인 페이지로 돌아가는 함수
  const goToMainPage = () => {
    router.push('/'); // 메인 페이지로 이동
  };

  // const { data, error, isLoading } = useQuery(
  //   queryKey, // 필수: 쿼리를 구별하는 고유 키 (배열 또는 문자열 가능)
  //   queryFn,  // 필수: 데이터를 가져오는 비동기 함수
  //   options?  // 선택: 쿼리의 동작을 제어하는 객체
  // );

  const {data: curatedPhotos} = useQuery({
    queryKey: ["curatePhots", curatedPage],
    queryFn: () => fetchPhotos(PHOTOS_CURATED_API_URL, curatedPage),
    {
      
    }
  })

  const fetchCuratedPhotos = async (pageNumber: number) => {
    setLoading(true);
    const url = `${PHOTOS_CURATED_API_URL}?page=${pageNumber}`;
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
      },
    });
    const data = await response.json();
    setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
    setLoading(false);
  };

  const fetchSearchPhotos = async (pageNumber: number) => {
    setLoading(true);
    const url = `${PHOTOS_SEARCH_API_URL}?query=${query}&orientation=${orientation}&color=${color}&page=${pageNumber}`;
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
      },
    });
    const data = await response.json();
    // 검색 결과가 없고, 첫 번째 페이지에서만 큐레이션 호출
    if (isSearchMode && data.photos.length === 0 && pageNumber === 1) {
      showMessage('검색 결과가 없습니다. 다시 검색해주십시오');
      setPhotos([]); // 기존 사진 리스트 초기화
      setIsSearchMode(3); //검색모드 비활성
      setQuery(''); // 검색어 초기화
      setOrientation(''); // 방향 초기화
      setColor(''); // 색상 초기화
    }
    else if (isSearchMode && data.photos.length !== 0 && pageNumber === 1) {
      setPhotos([]); // 기존 사진 리스트 초기화
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
      setIsSearchMode(2); //검색모드 중립
    } 
    else {
      // 검색 결과나 큐레이션 사진을 페이지에 추가
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSearchMode == 1 || isSearchMode == 2) {
      fetchSearchPhotos(searchPage)
    }
    else {
      fetchCuratedPhotos(curatedPage);
    }
  }, [curatedPage, searchPage, isSearchMode]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      if (isSearchMode == 1 || isSearchMode == 2) {
        setSearchPage((prevPage) => prevPage + 1);
      }
      else {
        setCuratedPage((prevPage) => prevPage + 1);
      }
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
    setIsSearchMode(1); // 검색 모드 활성화
    setSearchPage(1); // 페이지 초기화
    setCuratedPage(1); // 페이지 초기화
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

  return (
    <div>
      <Toast /> {/* 알림 메시지 표시 */}
      <div className={styles.header}>
        <h1 className={styles.title}>Photo List</h1>
        <div className={styles.headerRightContents}>
          <button onClick={goToMainPage} className={styles.backButton}>메인으로 돌아가기</button> {/* 돌아가기 버튼 */}
          <div className={styles.searchContainer}>
            <input 
              id='inputTag'
              type="text" 
              placeholder="Search photos..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown} // 엔터 감지 이벤트 추가
              className={styles.searchInput}
            />
            <select id='selectTag1' value={orientation} onChange={(e) => setOrientation(e.target.value)}>
              <option value="">Orientation</option>
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
              <option value="square">Square</option>
            </select>
            <select id='selectTag2' value={color} onChange={(e) => setColor(e.target.value)}>
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