// src/store/scrapStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

type ScrapItem = {
  id: string;
  type: 'photo' | 'video';
  data: any;
};

type ScrapStore = {
  photos: ScrapItem[];
  videos: ScrapItem[];
  scrapPhoto: (item: ScrapItem) => void;
  scrapVideo: (item: ScrapItem) => void;
  removePhoto: (id: string) => void;
  removeVideo: (id: string) => void;
};

export const useScrapStore = create<ScrapStore>()(
  persist(
    (set) => ({
      photos: [],
      videos: [],
      scrapPhoto: (item) =>
        set((state) => ({ photos: [...state.photos, item] })),
      scrapVideo: (item) =>
        set((state) => ({ videos: [...state.videos, item] })),
      removePhoto: (id) =>
        set((state) => ({
          photos: state.photos.filter((photo) => photo.id !== id),
        })),
      removeVideo: (id) =>
        set((state) => ({
          videos: state.videos.filter((video) => video.id !== id),
        })),
    }),
    {
      name: 'scrap-store', // localStorage에 저장될 이름
    }
  )
);