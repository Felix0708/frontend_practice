"use client";

// src/app/scraps/ScrapPage.tsx
import { useEffect, useState } from 'react';
import { useScrapStore } from '../../store/scrapStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useRouter } from 'next/navigation'; // useRouter 가져오기
import * as styles from './scraps.css';
import DetailModal from '../components/detailModal';
import ConfirmModal from '../components/confirmModal';
import Toast from '../components/toast';

const ScrapPage = () => {
  const { photos, videos, removePhoto, removeVideo } = useScrapStore();
  const { showMessage, clearMessage } = useNotificationStore();

  const itemsPerPage = 5;
  const pagesPerGroup = 5;

  const [photoPage, setPhotoPage] = useState(1);
  const [photoGroup, setPhotoGroup] = useState(0);
  const [videoPage, setVideoPage] = useState(1);
  const [videoGroup, setVideoGroup] = useState(0);

  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const [selectedPhotoRemoveBtn, setselectedPhotoRemoveBtn] = useState(false);
  const [selectedVideoRemoveBtn, setselectedVideoRemoveBtn] = useState(false);
  const [deleteId, setdeleteId] = useState<string | null >(null);

  const router = useRouter(); // 라우터 훅 사용

  // 메인 페이지로 돌아가는 함수
  const goToMainPage = () => {
    router.push('/'); // 메인 페이지로 이동
  };

  // 사진 페이지 그룹 관련 계산
  const totalPhotosPages = Math.ceil(photos.length / itemsPerPage);
  const totalPhotosGroups = Math.ceil(totalPhotosPages / pagesPerGroup);
  
  const getPhotoPageRange = (totalPages: number, currentGroup: number) => {
    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    return { startPage, endPage };
  };

  const { startPage: photoStartPage, endPage: photoEndPage } = getPhotoPageRange(totalPhotosPages, photoGroup);

  const currentPhotos = photos.slice((photoPage - 1) * itemsPerPage, photoPage * itemsPerPage);

  const handlePhotoPageChange = (page: number) => {
    setPhotoPage(page);
  };

  const handlePhotoNextGroup = () => {
    if (photoGroup < totalPhotosGroups - 1) {
      setPhotoGroup(photoGroup + 1);
      setPhotoPage(photoStartPage + pagesPerGroup); // 다음 그룹 첫 페이지로 이동
    }
  };

  const handlePhotoPrevGroup = () => {
    if (photoGroup > 0) {
      setPhotoGroup(photoGroup - 1);
      setPhotoPage(photoStartPage - pagesPerGroup + 4); // 이전 그룹 마지막 페이지로 이동
    }
  };

  // 비디오 페이지 그룹 관련 계산
  const totalVideosPages = Math.ceil(videos.length / itemsPerPage);
  const totalVideosGroups = Math.ceil(totalVideosPages / pagesPerGroup);

  const getVideoPageRange = (totalPages: number, currentGroup: number) => {
    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    return { startPage, endPage };
  };

  const { startPage: videoStartPage, endPage: videoEndPage } = getVideoPageRange(totalVideosPages, videoGroup);

  const currentVideos = videos.slice((videoPage - 1) * itemsPerPage, videoPage * itemsPerPage);

  const handleVideoPageChange = (page: number) => {
    setVideoPage(page);
  };

  const handleVideoNextGroup = () => {
    if (videoGroup < totalVideosGroups - 1) {
      setVideoGroup(videoGroup + 1);
      setVideoPage(videoStartPage + pagesPerGroup); // 다음 그룹 첫 페이지로 이동
    }
  };

  const handleVideoPrevGroup = () => {
    if (videoGroup > 0) {
      setVideoGroup(videoGroup - 1);
      setVideoPage(videoStartPage - pagesPerGroup + 4); // 이전 그룹 마지막 페이지로 이동
    }
  };

  // 페이지네이션 버튼의 활성화/비활성화 상태를 결정
  const isPhotoNextGroupDisabled = photoGroup >= totalPhotosGroups - 1;
  const isPhotoPrevGroupDisabled = photoGroup === 0;

  const isVideoNextGroupDisabled = videoGroup >= totalVideosGroups - 1;
  const isVideoPrevGroupDisabled = videoGroup === 0;

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  const openVideoModal = (video: any) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const openRemovePhotoModal = (id: string) => {
    setselectedPhotoRemoveBtn(true);
    setdeleteId(id);
  };

  const closeRemovePhotoModal = () => {
    setselectedPhotoRemoveBtn(false);
  }

  const handleRemovePhoto = () => {
    if(deleteId) {
      removePhoto(deleteId);
      showMessage('사진이 삭제되었습니다');
      setselectedPhotoRemoveBtn(false);
      setdeleteId(null);
    }
  };

  const openRemoveVideoModal = (id: string) => {
    setselectedVideoRemoveBtn(true);
    setdeleteId(id);
  };

  const closeRemoveVideoModal = () => {
    setselectedVideoRemoveBtn(false);
  }

  const handleRemoveVideo = () => {
    if(deleteId) {
      removeVideo(deleteId);
      showMessage('비디오가 삭제되었습니다');
      setselectedVideoRemoveBtn(false);
      setdeleteId(null);
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
        <h1 className={styles.title}>Scrapped Items</h1>
        <div className={styles.headerRightContents}>
          <button onClick={goToMainPage} className={styles.backButton}>메인으로 돌아가기</button> {/* 돌아가기 버튼 */}
        </div>
      </div>

      {/* 사진 섹션 */}
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Scrapped Photos</h2>
        <div className={styles.grid}>
          {currentPhotos.map((scrap) => (
            <div key={scrap.id} className={styles.card}>
              <img
                src={scrap.data.src.medium}
                alt={scrap.data.photographer}
                className={styles.image}
                onClick={() => openPhotoModal(scrap.data)}
              />
              <p className={styles.text}>{scrap.data.photographer}</p>
              <button
                className={styles.removeButton}
                onClick={() => openRemovePhotoModal(scrap.id)}
              >
                Remove
              </button>
            </div>
          ))}
          {selectedPhotoRemoveBtn && <ConfirmModal isOpen={selectedPhotoRemoveBtn} onClose={closeRemovePhotoModal} onConfirm={handleRemovePhoto} />}
          {selectedPhoto && <DetailModal type="photo" data={selectedPhoto} onClose={closePhotoModal} />}
        </div>
        {/* 페이지네이션 버튼 */}
        <div className={styles.pagination}>
          <button
            onClick={handlePhotoPrevGroup}
            className={styles.arrowButton}
            disabled={isPhotoPrevGroupDisabled}
          >
            ←
          </button>
          {Array.from({ length: photoEndPage - photoStartPage + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePhotoPageChange(photoStartPage + index)}
              className={`${styles.pageButton} ${
                photoPage === photoStartPage + index ? styles.active : ''
              }`}
            >
              {photoStartPage + index}
            </button>
          ))}
          <button
            onClick={handlePhotoNextGroup}
            className={styles.arrowButton}
            disabled={isPhotoNextGroupDisabled}
          >
            →
          </button>
        </div>
      </section>

      {/* 비디오 섹션 */}
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Scrapped Videos</h2>
        <div className={styles.grid}>
          {currentVideos.map((scrap) => (
            <div key={scrap.id} className={styles.card}>
              <img
                src={scrap.data.image}
                alt={scrap.data.user.name} 
                className={styles.video}
                onClick={() => openVideoModal(scrap.data)}
              />
              <p className={styles.text}>{scrap.data.user.name}</p>
              <button
                className={styles.removeButton}
                onClick={() => openRemoveVideoModal(scrap.id)}
              >
                Remove
              </button>
            </div>
          ))}
          {selectedVideoRemoveBtn && <ConfirmModal isOpen={selectedVideoRemoveBtn} onClose={closeRemoveVideoModal} onConfirm={handleRemoveVideo} />}
          {selectedVideo && <DetailModal type="video" data={selectedVideo} onClose={closeVideoModal} />}
        </div>
        {/* 페이지네이션 버튼 */}
        <div className={styles.pagination}>
          <button
            onClick={handleVideoPrevGroup}
            className={styles.arrowButton}
            disabled={isVideoPrevGroupDisabled}
          >
            ←
          </button>
          {Array.from({ length: videoEndPage - videoStartPage + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => handleVideoPageChange(videoStartPage + index)}
              className={`${styles.pageButton} ${
                videoPage === videoStartPage + index ? styles.active : ''
              }`}
            >
              {videoStartPage + index}
            </button>
          ))}
          <button
            onClick={handleVideoNextGroup}
            className={styles.arrowButton}
            disabled={isVideoNextGroupDisabled}
          >
            →
          </button>
        </div>
      </section>
    </div>
  );
};

export default ScrapPage;
