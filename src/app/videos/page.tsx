"use client";

import { useEffect, useState } from 'react';

const PHOTOS_API_URL = 'https://api.pexels.com/v1/curated';

const PhotosPage = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(`${PHOTOS_API_URL}?page=${page}&per_page=10`, {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
        },
      });

      const data = await response.json();
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
    };

    fetchPhotos();
  }, [page]);

  return (
    <div>
      <h1>Photo List</h1>
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.src.medium} alt={photo.photographer} />
            <p>{photo.photographer}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  );
};

export default PhotosPage;