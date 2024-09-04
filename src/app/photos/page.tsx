"use client";

import { useEffect, useState } from 'react';
import * as styles from './photos.css';
import Modal from '../components/modal';

const PHOTOS_API_URL = 'https://api.pexels.com/v1/curated';

const PhotosPage = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  
  const fetchPhotos = async (pageNumber: number) => {
    setLoading(true);
    const response = await fetch(`${PHOTOS_API_URL}?page=${pageNumber}`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
      },
    });
    const data = await response.json();
    setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos(page);
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

  return (
    <div>
      <h1 className={styles.title}>Photo List</h1>
      <div className={styles.photoGrid}>
        {photos.map((photo) => (
          <div key={`${photo.id}-${page}`} className={styles.photoCard} onClick={() => openModal(photo)}>
            <img src={photo.src.medium} alt={photo.photographer} className={styles.photoImage} />
            <p className={styles.photoText}>{photo.photographer}</p>
          </div>
        ))}
      </div>
      {loading && <p className={styles.loadingText}>Loading...</p>}
      {selectedPhoto && <Modal type="photo" data={selectedPhoto} onClose={closeModal} />}
    </div>
  );
};

export default PhotosPage;