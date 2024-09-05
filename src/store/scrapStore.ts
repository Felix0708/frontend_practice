// src/store/scrapStore.ts
import { create } from 'zustand';
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
    (set, get) => ({
      photos: [],
      videos: [],
      scrapPhoto: (item) => {
        const { photos } = get();
        const isAlreadyScrapped = photos.some((photo) => photo.id === item.id);

        if (!isAlreadyScrapped) {
          set((state) => ({ photos: [...state.photos, item] }));
        }
      },
      scrapVideo: (item) => {
        const { videos } = get();
        const isAlreadyScrapped = videos.some((video) => video.id === item.id);

        if (!isAlreadyScrapped) {
          set((state) => ({ videos: [...state.videos, item] }));
        }
      },
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