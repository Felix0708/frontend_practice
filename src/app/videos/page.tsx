"use client";

import { useEffect, useState } from 'react';
import * as styles from './videos.css';
import Modal from '../components/modal';

const VIDEOS_API_URL = 'https://api.pexels.com/videos/popular';

const VideosPage = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const fetchVideos = async (pageNumber: number) => {
    setLoading(true);
    const response = await fetch(`${VIDEOS_API_URL}?page=${page}&per_page=10`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
      },
    });
    const data = await response.json();
    setVideos((prevVideos) => [...prevVideos, ...data.videos]);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos(page);
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

  const openModal = (video: any) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div>
      <h1 className={styles.title}>Video List</h1>
      <div className={styles.videoGrid}>
        {videos.map((video) => (
          <div key={video.id} className={styles.videoCard} onClick={() => openModal(video)}>
            <img src={video.image} alt={video.user.name} className={styles.videoThumbnail} />
            <p className={styles.videoText}>{video.user.name}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {selectedVideo && <Modal type="video" data={selectedVideo} onClose={closeModal} />}
    </div>
  );
};

export default VideosPage;